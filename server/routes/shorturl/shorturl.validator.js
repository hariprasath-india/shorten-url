const Joi = require('@hapi/joi');

module.exports = {
    fetch_all_links: () => {
        return Joi.object().keys({
            query: Joi.string(),
            type: Joi.string().default('url'),
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            sortBy: Joi.string().valid("created_at_asc","created_at_desc","total_clicks_asc","total_clicks_desc").default("total_clicks_desc")
        });
    },
    create_link: () => {
        return Joi.object().keys({
            url: Joi.string()
        });
    },
    get_link_id: () =>{
        return Joi.object().keys({
            id: Joi.string().required()
        });
    }
}