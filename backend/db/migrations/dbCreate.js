exports.up = async (knex, Promise) => {
  try {
    await Promise.all([

      await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("login")
        table.string("password")
        table.string("permissions")
      }),

      knex.schema.createTable("spacenet", table => {
        table.increments();
        table.string("orderId");
        table.float("localizationId");
        table.string("localization");
        table.string("realizationMode");
        table.string("orderCreatedBy");
        table.string("executor");
        table.string("orderAcceptedBy");
        table.string("showDatePicker");
        table.string("showDateInput");
        table.boolean("disableInputs");

        table.datetime("dateOfOrder");
        table.datetime("dateOfFinishedOrder");
        table.datetime("dateOfArrival");
        table.datetime("dateOfAdditionalWorks");
        table.datetime("dateOfInvoice");
        table.datetime("dateOfAcceptationSpacenet");
        table.datetime("dateOfAcceptationPlk");


        table.string("workDoneDescription");
        table.string("problemDescription");
        table.string("comments");
        table.string("jobDescription");
        table.string("additionalWorks");
        table.string("additionalWorksDescription");
        table.string("additionalWorksExecutor");
        table.string("coordinatorPlk");
        table.string("systemRecovery");
        table.string("photos");
        table.string("photosAttached");

        table.string("invoiceId");
        table.float("serviceCost");
        table.float("materialCost");
        table.string("oldSn");
        table.string("newSn");


        table.integer("user_id").references("id").inTable("users");

      }),

      knex.schema.createTable('buttons', (table) => {
        table.increments();
        table.string("permissions")
        table.boolean("executorBt");
        table.boolean("orderAcceptedByBt");


        table.boolean("dateOfFinishedOrderBt");
        table.boolean("dateOfArrivalBt");
        table.boolean("dateOfAdditionalWorksBt");
        table.boolean("dateOfInvoiceBt");
        table.boolean("dateOfAcceptationSpacenetBt");
        table.boolean("dateOfAcceptationPlkBt");


        table.boolean("workDoneDescriptionBt");
        table.boolean("problemDescriptionBt");
        table.boolean("commentsBt");

        table.boolean("protocolBt");
        table.boolean("actionBt");

        table.boolean("additionalWorksBt");
        table.boolean("additionalWorksDescriptionBt");
        table.boolean("additionalWorksExecutorBt");


        table.boolean("coordinatorPlkBt");
        table.boolean("systemRecoveryBt");
        table.boolean("photosAttachedBt");
        table.boolean("photosBt");

        table.boolean("serviceCostBt");
        table.boolean("materialCostBt");
        table.boolean("oldSnBt");
        table.boolean("newSnBt");
        table.boolean("invoiceIdBt");
      })

    ]);
  }
  catch (error) {
    console.log("error db create", error)
  }
}

exports.down = async function (knex) {
  await Promise.all([
    knex.schema
      .dropTableIfExists("spacenet")
      .dropTableIfExists("buttons")
      .dropTableIfExists("users")
  ])
};

