const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const PORT = process.env.PORT || 38002;
const basicRoutes = require("./routes/basicRoutes");
const cors = require("@koa/cors");
const fetch = require("node-fetch");
const app = new Koa();
const moment = require("moment");
const emaiInfo = require('../EmailInfo')
app.use(cors());
app.use(bodyParser());
app.use(basicRoutes.routes());

const login = emaiInfo.username
const password = emaiInfo.password
const host = emaiInfo.host
const apiUrl = "http://localhost:38002";

const MailListener = require("mail-listener-next");

const mailListener = new MailListener({
  username: login,
  password: password,
  host: host,
  port: 993, // imap 
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  //attachmentOptions: { directory: "attachments/" }, // specify a download directory for attachments
  // to make server respond to other requests you may want
  // to pause for 'fetchingPauseTime' fetching of the email, because it 'hangs' your app
  fetchingPauseThreshold: null, // amount bytes
  fetchingPauseTime: null // ms to pause fetching and process other requests
});



mailListener.start(); // start listening

// stop listening
//mailListener.stop();


mailListener.on("server:connected", function () {
  console.log("imapConnected");

});

mailListener.on("server:disconnected", function () {
  console.log("imapDisconnected");
  mailListener.start();
  console.log("Auto-restarted");
});


mailListener.on("error", function (err) {

  console.log(err);
});



mailListener.on("mail", async function (mail, seqno, attributes) {
  const lastNameList = ["Socha", "Kasprzycki", "Tomaszewski", "Jakubowski", "Spodarczyk",
    "Sołtysiak", "Wyszomirska", "Skałecki", "Osękowski", "Kucharski"]


  const work = async () => {

    try {

      let RegexQuery = [/Status pracy o numerze .(....[0-9]+)./g, /Zlecona przez:.+?\s(.+)./g,
        /Data zlecenia:..(.+)./g, /Dla lokalizacji:..(.+?)\[/g,
        /Opis:..(.+)./g, /Kategoria:..(.+)./g,
        /Tryb realizacji:..(.+)./g, /Wymagane pobranie części:..(.+)./g,
        /Dla lokalizacji:.+?\[(.+?)\]/g,
        /został zmieniony z .([^\s]+)/g, /Status pracy o numerze .....([0-9]+)./g, /Zlecona przez:..(.+)./g
      ];




      let orderLabel = RegexQuery[0].exec(mail.text);
      let secondNameInstructing = RegexQuery[1].exec(mail.text);
      let orderDate = RegexQuery[2].exec(mail.text);
      let forLocation = RegexQuery[3].exec(mail.text);
      let description = RegexQuery[4].exec(mail.text);
      let kategoria = RegexQuery[5].exec(mail.text);
      let realizationMode = RegexQuery[6].exec(mail.text);
      let pobranieCzesci = RegexQuery[7].exec(mail.text);
      let siteNr = RegexQuery[8].exec(mail.text);
      let type = RegexQuery[9].exec(mail.text);
      let orderId = RegexQuery[10].exec(mail.text);
      let orderCreatedBy = RegexQuery[11].exec(mail.text);



      const dane = () => {
        let zlecenie = {
          orderId: orderLabel[1],
          orderCreatedBy: orderCreatedBy[1],
          dateOfOrder: orderDate[1],
          localization: forLocation[1],
          realizationMode: realizationMode[1],
          jobDescription: description[1],
          localizationId: siteNr[1],
          showDatePicker: "true",
          showDateInput: "none",
          disableInputs: false
        }
        return zlecenie
      }

      console.log("zlecona przez: ", orderCreatedBy[1])
      console.log("secondNameInstructing: ", secondNameInstructing[1])

      if (lastNameList.includes(secondNameInstructing[1])) {

        if (type[1] === "Formularz") {

          const post = await dane();
          try {
            fetch(`${apiUrl}/addOrder`, {
              method: 'POST',
              body: JSON.stringify(post),
              headers: {
                'content-type': 'application/json'
              }
            })
          }
          catch (error) {
            console.log("blad", error);
          }
        }

        if (type[1] === "Zlecenie") {

          const cancelation =
          {
            comments: "anulowano",
            showDatePicker: "none",
            showDateInput: "true",
            disableInputs: true
          }
          try {

            fetch(`${apiUrl}/cancelOrder/${orderId[1]}`, {
              method: 'PUT',
              body: JSON.stringify(cancelation),
              headers: {
                'content-type': 'application/json'
              }
            })

          }
          catch (error) {
            console.log("blad", error);
          }

        }


        if (type[1] === "Praca") {
          const zatwierdzono =
          {
            dateOfAcceptationPlk: moment().format('YYYY-MM-DD HH:mm'),
            showDatePicker: "none",
            showDateInput: "true",
            disableInputs: true
          }

          fetch(`${apiUrl}/acceptOrder/${orderId[1]}`, {
            method: 'PUT',
            body: JSON.stringify(zatwierdzono),
            headers: {
              'content-type': 'application/json'
            }
          })
        }

      }
      else {
        console.log(`zlecajacy ${secondNameInstructing[1]} nie nalezy do naszych`)
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  await work();
});

mailListener.on("attachment", function (attachment, email) {
  console.log(attachment.path);
});

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(msguids, mailboxes, function(){})
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
