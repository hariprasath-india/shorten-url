const shortUrlValidator = require('./shorturl.validator');

module.exports = {
    fetchAllLinks: async (req, res, next) => {
        try {
            let {url, skip, limit, sortBy} = await shortUrlValidator.fetch_all_links().validateAsync(req.body);

            return res.json({
                statusCode: 200,
                message: "success"
            })
        } catch (error) {
            next(error)
        }
    },
    createLink: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    },
    getLinkDetailsById: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    },
    updateLinkDetailsById: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}