const { addClickCount } = require('./shorturl.helper');
const shorturlHelper = require('./shorturl.helper');

module.exports = {
    redirectUrl: async (req, res, next) => {
        try {      
            if (req.params.code) {
                const code = req.params.code;
                const url = await shorturlHelper.fetchOrginalUrl(code);
                if (url){
                    await addClickCount(url.id);
                    // return res.redirect(url.original_url)
                    console.log(url.original_url)
                    return res.status(200).json({
                        statusCode: 200,
                        url: url.original_url
                    });
                }
                
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid url"
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