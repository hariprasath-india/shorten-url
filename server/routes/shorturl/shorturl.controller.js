const shortUrlValidator = require('./shorturl.validator');
const pool = require('../../config/database');
const logger = require('../../config/logger');
const shortUrlHelper = require('./shorturl.helper');
const shrinkUrl =  require('../../config/shrinkUrl');

const isValidUrl = require('is-url');

module.exports = {
    fetchAllLinks: async (req, res, next) => {
        try {
            let {type, query, skip, limit, sortBy} = await shortUrlValidator.fetch_all_links().validateAsync(req.query);
            const result = await shortUrlHelper.fetchAllLinks(type, query, skip, limit, sortBy);
            return res.json({
                statusCode: 200,
                message: "success",
                data: result.rows,
                next_page: result.next_page,
                is_next_page_available: result.is_next_page
            })
        } catch (error) {
            logger.error(error.message);
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Problem in Fetching Data"
            })
            next(error);
        }
    },
    createLink: async (req, res, next) => {
        try {
            let {url} = await shortUrlValidator.create_link().validateAsync(req.body);
            if (!url){
                return res.status(400).json({
                    statusCode: 400,
                    error: "Url not given",
                    message: "Please enter url"
                })
            }
            url = shortUrlHelper.checkPrefix(url);
            console.log(url)
            if (!isValidUrl(url)) {
                console.log({
                    statusCode: 400,
                    error: "Invalid URL given",
                    message: "Please enter proper URL"
                })
                return res.status(400).json({
                    statusCode: 400,
                    error: "Invalid URL given",
                    message: "Please enter proper URL"
                })
            }     
            const findUrl = await shortUrlHelper.checkUrlAlreadyExists(url);
            if (findUrl.rows[0]){
                logger.info({
                    statusCode: 200,
                    message: "success",
                    data: findUrl.rows[0]
                })
                return res.status(200).json({
                    statusCode: 200,
                    message: "success",
                    data: findUrl.rows[0]
                });
            }
            let urlCode = shrinkUrl();
            while (await shortUrlHelper.checkUrlCodeExists(urlCode)){
                urlCode = shrinkUrl();
            }
            shortUrlHelper.getUrlTitle(url, async (urlTitle) => {
                const nanoUrls = await pool.query(
                    "INSERT INTO links (original_url, url_title, short_url_code) VALUES($1, $2, $3) RETURNING *",
                    [url.toLowerCase(), urlTitle, urlCode]
                );
                if (nanoUrls.rows[0]){
                    logger.info({
                        statusCode: 200,
                        message: "success",
                        data: nanoUrls.rows[0]
                    })
                    return res.status(200).json({
                        statusCode: 200,
                        message: "success",
                        data: nanoUrls.rows[0]
                    });
                }
            });
            
        } catch (error) {
            console.log("error", error.message);
            logger.error(error);
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "error in creating url"
            })
            next(error);
        }
    },
    getLinkDetailsById: async (req, res, next) => {
        try {
            const {id} = await shortUrlValidator.get_link_id().validateAsync(req.query);
            const result = await shortUrlHelper.fetchLinkDetailsById(id);
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: result
            })
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    updateLinkDetailsById: async (req, res, next) => {
        try {
            
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}