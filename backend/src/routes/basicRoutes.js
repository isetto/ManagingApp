const Router = require("koa-router");
const queries = require("../../db/queries/crud");

const router = new Router();

router.post("/downloadReports", async ctx => {
  ctx.body = await queries.downloadReportsByUser(ctx.request.body);
});

router.get("/downloadReports", async ctx => {
  ctx.body = await queries.downloadReportsAll();
});

router.post("/downloadButtons", async ctx => {
  ctx.body = await queries.downloadButtons(ctx.request.body);
});

router.get("/downloadReport/:id", async ctx => {
  ctx.body = await queries.downloadReport(ctx.params["id"]);
});

router.delete("/deleteReport/:id", async ctx => {
  ctx.body = await queries.deleteOrder(ctx.params["id"]);
});

router.put("/updateReport/:id", async ctx => {
  ctx.body = await queries.updateReport(ctx.params["id"], ctx.request.body);
});

router.put("/updateButtons/:permissions", async ctx => {
  ctx.body = await queries.updateButtons(ctx.params["permissions"], ctx.request.body);
});

router.put("/cancelOrder/:orderId", async ctx => {
  ctx.body = await queries.cancelOrder(ctx.params["orderId"], ctx.request.body);
});

router.put("/acceptOrder/:orderId", async ctx => {
  ctx.body = await queries.acceptOrder(ctx.params["orderId"], ctx.request.body);
});

router.post("/addOrder", async ctx => {
  ctx.body = await queries.addOrder(ctx.request.body);
});

router.post("/signIn", async ctx => {
  ctx.body = await queries.signIn(ctx.request.body);

});



module.exports = router;
