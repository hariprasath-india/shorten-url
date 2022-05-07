const validUrl = require('valid-url');
const getUrlTitle = require("get-url-title");
const pool = require('../../config/database');
const { off } = require('../../config/logger');
const baseUrl = process.env.BASE_URL

module.exports = {
    checkValidUrl: (url) => {
        return validUrl.isUri(url)
    },
    checkUrlAlreadyExists: async (url) => {

        return  await pool.query(
            "select * from links where original_url = $1 ",
            [url]
        );
    },
    checkUrlCodeExists: async (urlCode) => {

        const result =  await pool.query(
            "select id from links where short_url_code = $1 ",
            [urlCode]
        );
        return result.rows.length != 0 ? true : false;
    },
    fetchOrginalUrl: async (urlCode) => {

        const result =  await pool.query(
            "select * from links where short_url_code = $1 ",
            [urlCode]
        );
        return result.rows[0] ? result.rows[0] : null;
    },
    getUrlTitle: async(url) => {
        return await getUrlTitle(url);
    },
    fetchAllLinks: async(url,skip,limit,sortBy) => {
        const offset =  (skip || 0 )* (limit || 10)
        let result;
        if (url){
            result = await pool.query("select * from links where original_url like '%$1%' limit $2 offset $3", [url, limit, offset])
        }else {
            result = await pool.query("select * from links order by updated_at desc limit $1 offset $2", [limit, offset])
        }
        return result.rows
    },
    fetchLinkDetailsById: async(linkId) => {
        const result = await pool.query("update links set total_clicks = total_clicks +1 where id = $1 returning *", [linkId]);
        return result.rows[0] ? result.rows[0] : {};
    },
    addClickCount: async(linkId) => {
        await pool.query("update links set total_clicks = total_clicks +1 where id = $1 returning *", [linkId]);
        return
    },
    checkPrefix: (url) => {
        if ( !(url.substr(0,8).indexOf("http://") == 0 || url.substr(0,8).indexOf("https://") == 0 )){
            return "http://"+url;
        }
        return url;
    }

}