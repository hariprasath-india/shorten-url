const pool = require('../../config/database');
var getTitleAtUrl = require('get-title-at-url');

const sortByQueryText = (sortBy) => {
    switch (sortBy){
        case "created_at_desc":
             return "created_at desc"
        case "total_clicks_asc":
            return "total_clicks"
        case "total_clicks_desc":
            return  "total_clicks desc"
        default:
            return  "created_at"
    }    
}

module.exports = {
    checkUrlAlreadyExists: async (url) => {
        return await pool.query(
            "select * from links where lower(original_url) = lower($1) ",
            [url]
        );
    },
    checkUrlCodeExists: async (urlCode) => {
        const result =  await pool.query(
            "select id from links where short_url_code = $1 ",
            [urlCode]
        );
        return result.rows && result.rows.length != 0 ? true : false;
    },
    fetchOrginalUrl: async (urlCode) => {

        const result =  await pool.query(
            "select * from links where short_url_code = $1 ",
            [urlCode]
        );
        return result.rows[0] ? result.rows[0] : null;
    },
    getUrlTitle: async (url, callback) => {
        getTitleAtUrl(url, function(title){ callback(title); });
    },
    fetchAllLinks: async(type="url", input_text="", skip, limit, sortBy) => {
        // Pagination if needed
        const offset =  (skip || 0 )* (limit || 10)
        
        let query; 
        let pagination = '';
        if(limit|| skip){
            pagination = ` offset ${offset} limit ${limit}`
        }
        const sortByQuery = sortByQueryText(sortBy)
        console.log("Sort",sortByQueryText(sortBy))
        if (type == 'url'){
            if (sortBy == 'total_clicks') {
                query = `select * from links where lower(original_url) like lower('%${input_text}%') order by ${sortByQuery}`+pagination;
                
            }else{
                query = `select * from links where lower(original_url) like lower('%${input_text}%') order by ${sortByQuery}`+pagination;
            }
            
        }else {
            if (sortBy == 'total_clicks'){
                query = `select * from links where lower(url_title) like lower('%${input_text}%') order by ${sortByQuery}`+pagination;
            }else{
                query = `select * from links where lower(url_title) like lower('%${input_text}%') order by ${sortByQuery}`+pagination;
            }
        }
        console.log(query)
        let result = await pool.query(query);
        
        return {
            rows: result.rows,
            next_page: result.rows.length == 0 ? null : `/api/v1/shorturl/fetch-all-links?query=${input_text}&skip=${skip+1}&limit=${limit}&type=${type}&sortBy=${sortBy}`,
            is_next_page: result.rowCount == limit ? true: false
        }
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