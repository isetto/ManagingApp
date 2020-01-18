const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const basicRoutes = require("./routes/basicRoutes");
const cors = require("@koa/cors");
const fetch = require("node-fetch");
const app = new Koa();
const moment = require("moment");
const emaiInfo = require('../EmailInfo')
const MailListener = require("mail-listener-next");



const PORT = emaiInfo.prodChillmeets.port
const login = emaiInfo.prodChillmeets.username
const password = emaiInfo.prodChillmeets.password
const host = emaiInfo.prodChillmeets.host
const apiUrl = emaiInfo.prodChillmeets.url;

app.use(cors());
app.use(bodyParser());
app.use(basicRoutes.routes());

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

  console.log('err', err);
});



mailListener.on("mail", async function (mail, seqno, attributes) {
  const lastNameList = ["socha", "kasprzycki", "tomaszewski", "jakubowski", "spodarczyk",
    "sołtysiak", "wyszomirska", "skałecki", "osękowski", "kucharski"]



  const work = async () => {

    try {

      let regexChoosed;

      let RegexText = [/Status pracy o numerze (....[0-9]+)./g, /Zlecona przez:.+?\s(.+).Data/g,
        /Data zlecenia:.(.+).Dla/g, /adres:.(.+)Rodzaj/g,
        /Opis:.(.+)/g, /Kategoria:.(.+)Tryb/g,
        /Tryb realizacji:.(.+)Wymagane/g, /Wymagane pobranie części:.(.+)Planowana/g,
        /Dla lokalizacji:.+?\[(.+?)\]/g,
        /został zmieniony z ([^\s]+)/g, /Status pracy o numerze ....([0-9]+)/g, /Zlecona przez:.(.+)Data/g,
        /Status pracy(.+?)przez/gi
      ];

      let RegexHtml = [/Status pracy o numerze <b>(.+?(?=<))/g, /Zlecona przez:.+?\s(.+?(?=<))/g,
        /Data zlecenia: <b>(.+?(?=<))./g, /Dla lokalizacji: <b>(.+?)\[/g,
        /Opis: <b>(.+?(?=<))/g, /Kategoria:..(.+)./g,
        /Tryb realizacji: <b>(.+?(?=<))./g, /Wymagane pobranie części:..(.+)./g,
        /Dla lokalizacji:.+?\[(.+?)\]/g,
        /został zmieniony z <b>([^\s]+)/g, /Status pracy o numerze <b>....([0-9]+)/g, /Zlecona przez: <b>(.+?(?=<))/g
      ];
      let mailType;
      if (mail.hasOwnProperty('html')) {
        const data = mail.html.toString()
        const res = data.replace(/<.*?>/g, " ")
        mailType = res.replace(/\s\s+/g, " ")
        // console.log('html prepared', mailType)
        regexChoosed = RegexText
      }
      else if (mail.hasOwnProperty('text')) {
        const data = mail.text
        const res = data.replace(/[*]/g, "")
        mailType = res.replace(/\n/g, " ")
        //  console.log('text prepared', mailType)
        regexChoosed = RegexText
      }

      let orderLabel = regexChoosed[0].exec(mailType);
      let secondNameInstructing = regexChoosed[1].exec(mailType);
      let orderDate = regexChoosed[2].exec(mailType);
      let forLocation = regexChoosed[3].exec(mailType);
      let description = regexChoosed[4].exec(mailType);
      let kategoria = regexChoosed[5].exec(mailType);
      let realizationMode = regexChoosed[6].exec(mailType);
      let pobranieCzesci = regexChoosed[7].exec(mailType);
      let siteNr = regexChoosed[8].exec(mailType);
      let type = regexChoosed[9].exec(mailType);
      let orderId = regexChoosed[10].exec(mailType);
      let orderCreatedBy = regexChoosed[11].exec(mailType);
      let generalType = regexChoosed[12].exec(mailType);

      const dane = () => {
        let orderIdNew
        let orderCreatedByNew
        let dateOfOrderNew
        let localizationNew
        let realizationModedNew
        let jobDescriptionNew
        let localizationIdNew
        let generalTypeNew

        try {
          orderIdNew = orderLabel[1]
        } catch (error) {
          orderIdNew = error.message
        }

        try {
          orderCreatedByNew = orderCreatedBy[1]
        } catch (error) {
          orderCreatedByNew = error.message
        }

        try {
          dateOfOrderNew = orderDate[1]
          console.log(dateOfOrderNew)
          console.log(typeof dateOfOrderNew)
          dateOfOrderNew = new Date(dateOfOrderNew)
          console.log(dateOfOrderNew)
          console.log(typeof dateOfOrderNew)
        } catch (error) {
          dateOfOrderNew = error.message
        }

        try {
          localizationNew = forLocation[1]
        } catch (error) {
          localizationNew = error.message
        }

        try {
          realizationModedNew = realizationMode[1]
        } catch (error) {
          realizationModedNew = error.message
        }

        try {
          jobDescriptionNew = description[1]
        } catch (error) {
          try {
            jobDescriptionNew = /Opis: <b>(.+?(?=\n))/g.exec(mailType)[1]
          } catch (error) {
            jobDescriptionNew = error.message
          }
        }

        try {
          localizationIdNew = siteNr[1]
        } catch (error) {
          localizationIdNew = error.message
        }



        let zlecenie = {
          orderId: orderIdNew,
          orderCreatedBy: orderCreatedByNew,
          dateOfOrder: dateOfOrderNew,
          localization: localizationNew,
          realizationMode: realizationModedNew,
          jobDescription: jobDescriptionNew,
          localizationId: localizationIdNew,
          showDatePicker: "true",
          showDateInput: "none",
          disableInputs: false
        }
        return zlecenie
      }

      // console.log('generalTypeNew', generalType[1])
      if (lastNameList.includes(secondNameInstructing[1].toLowerCase())) {
        if (generalType[1].toLowerCase().includes('utworz')) {

          const post = await dane();
          console.log('zlecenie pracy')
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

        if (generalType[1].toLowerCase().includes('anulow')) {

          const cancelation =
          {
            comments: "anulowano",
            showDatePicker: "none",
            showDateInput: "true",
            disableInputs: true
          }
          try {
            console.log('anulowanie', cancelation)
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


        if (generalType[1].toLowerCase().includes('zatwierdz')) {
          const zatwierdzono =
          {
            dateOfAcceptationPlk: moment().format('YYYY-MM-DD HH:mm'),
            showDatePicker: "none",
            showDateInput: "true",
            disableInputs: true
          }
          try {
            console.log('zatwierdzono', zatwierdzono)
            fetch(`${apiUrl}/acceptOrder/${orderId[1]}`, {
              method: 'PUT',
              body: JSON.stringify(zatwierdzono),
              headers: {
                'content-type': 'application/json'
              }
            })
          }
          catch (error) {
            console.log("blad", error);
          }
        }

      }
      else {
        console.log(`zlecajacy ${secondNameInstructing[1]} nie nalezy do naszych`)
      }
    }
    catch (err) {
      console.log("blad", err)
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
