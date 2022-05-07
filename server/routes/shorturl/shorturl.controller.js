const shortUrlValidator = require('./shorturl.validator');
const pool = require('../../config/database');
const logger = require('../../config/logger');
const shortUrlHelper = require('./shorturl.helper');
const shrinkUrl =  require('../../config/shrinkUrl');

module.exports = {
    fetchAllLinks: async (req, res, next) => {
        try {
            let {url, skip, limit, sortBy} = await shortUrlValidator.fetch_all_links().validateAsync(req.body);
            const result = await shortUrlHelper.fetchAllLinks(url, skip, limit, sortBy);
            return res.json({
                statusCode: 200,
                message: "success",
                data: result
            })
        } catch (error) {
            logger.error(error);
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
            if (!shortUrlHelper.checkValidUrl(url)) {
                return res.status(401).json({
                    statusCode: 400,
                    error: "Invalid URL given",
                    message: "Please enter proper URL"
                })
            }
            url = shortUrlHelper.checkPrefix(url);

            const findUrl = await shortUrlHelper.checkUrlAlreadyExists(url);
            if (findUrl.rows[0]){
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
            
            const urlTitle = await shortUrlHelper.getUrlTitle(url);

            const nanoUrls = await pool.query(
                "INSERT INTO links (original_url, url_title, short_url_code) VALUES($1, $2, $3) RETURNING *",
                [url, urlTitle, urlCode]
            );
            if (nanoUrls.rows[0]){
                return res.status(200).json({
                    statusCode: 200,
                    message: "success",
                    data: nanoUrls.rows[0]
                });
            }
        } catch (error) {
            logger.error(error);
            res.status(400).json({
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