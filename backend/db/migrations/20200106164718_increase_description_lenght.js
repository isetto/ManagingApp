exports.up = (knex, Promise) => {
    return knex.schema.table('spacenet', (table) => {
        table.string('workDoneDescription', 2000).alter();
        table.string('problemDescription', 2000).alter();
        table.string('jobDescription', 2000).alter();
        table.string('additionalWorksDescription', 2000).alter();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.table('spacenet', (table) => {
        table.dropColumn('workDoneDescription');
        table.dropColumn('problemDescription');
        table.dropColumn('jobDescription');
        table.dropColumn('additionalWorksDescription');
    });
};