
module.exports = {
    redirectUrl: async (req, res, next) => {
        try {
            if (req.params.code) {
                const code = req.params.code;
                // const url = 
                return res.status(200).json({
                    statusCode: 200,
                    message: "Redirect API call"
                })
                // if (url) {
                //     // when valid we perform a redirect
                //     return res.redirect(url.longUrl)
                // } else {
                //     // else return a not found 404 status
                //     return res.status(404).json('No URL Found')
                // }
            }
        } catch (error) {
            next(error)
        }
    }
}