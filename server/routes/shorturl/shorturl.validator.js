const Joi = require('@hapi/joi');

module.exports = {
    fetch_all_links: () => {
        return Joi.object().keys({
            url: Joi.string(),
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            sortBy: Joi.string().valid("default","created_at").default("default")
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