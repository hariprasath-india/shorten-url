
const shorturlRoutes = require('./shorturl/routes');
const redirectUrl = require('./shorturl/redirect');
const shorturlController = require('./shorturl/shorturl.controller');

module.exports = (app) => {
    // app.get("/",shorturlController.fetchAllLinks);
    app.get("/:code",redirectUrl.redirectUrl);
    app.use("/api/v1/shorturl",shorturlRoutes);

    app.use((req, res, next) => {
      res.status(404).json({
        statusCode:404,
        data: null,
        error: "Api call not found",
        message: "This feature is currently unavailable.",
      })
    });
}