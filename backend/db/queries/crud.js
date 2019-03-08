const knex = require("../connection");
const moment = require("moment");
const bodyParser = require("koa-bodyparser");
const Koa = require("koa");
const app = new Koa();
app.use(bodyParser());

module.exports = {


  addOrder: async (order) =>
    knex("spacenet")
      .insert(order)
      .returning("*")
      .then(array => array[0]),

  signIn: async (user) =>
    knex("users")
      .select("login", "permissions")
      .where(user)
      .then(array => array.length > 0 ? array[0] : "wrong"),

  updateReport: async (id, report) =>
    knex("spacenet")
      .update(report)
      .where("id", "=", id)
      .returning("*")
      .then(array => array[0]),

  cancelOrder: async (orderId, body) =>
    knex("spacenet")
      .update(body)
      .where("orderId", "=", "WRK/" + orderId)
      .returning("*")
      .then(array => array[0]),

  acceptOrder: async (orderId, body) =>
    knex("spacenet")
      .update(body)
      .where("orderId", "=", "WRK/" + orderId)
      .returning("*")
      .then(array => array[0]),

  updateButtons: async (permissions, buttons) =>
    knex("buttons")
      .update(buttons)
      .where("permissions", "=", permissions)
      .returning("*")
      .then(array => array[0]),

  downloadReport: async id =>
    knex("spacenet")
      .select("*")
      .where("id", "=", id)
      .then(res => res[0]),

  deleteOrder: async id =>
    knex("spacenet")
      .where("id", "=", id)
      .del()
      .then(res => res[0]),

  downloadReportsByUser: async (user) => knex("spacenet")
    .select("*")
    .where(user),

  downloadReportsAll: async () => knex("spacenet")
    .select("*"),

  downloadButtons: async (permissions) => knex("buttons")
    .select("*")
    .where(permissions)
    .then(res => res[0])
};
