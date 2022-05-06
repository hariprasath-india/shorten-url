

module.exports = (app) => {
    app.get("/", (req, res, next) => {
        res.json({
          code: 200,
          title: "Everything looks fine.",
        });
    });
}