exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("buttons")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("buttons").insert([
        {
          "permissions": "admin",
          "dateOfAdditionalWorksBt": true,
          "dateOfInvoiceBt": true,
          "dateOfArrivalBt": false,
          "dateOfFinishedOrderBt": false
        },
        {
          "permissions": "ambasador",
          "dateOfAdditionalWorksBt": true,
          "dateOfInvoiceBt": true,
          "dateOfArrivalBt": false,
          "dateOfFinishedOrderBt": false
        },
        {
          "permissions": "worker",
          "dateOfAdditionalWorksBt": true,
          "dateOfInvoiceBt": true,
          "dateOfArrivalBt": false,
          "dateOfFinishedOrderBt": false
        }
      ]);
    });
};

