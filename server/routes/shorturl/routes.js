const router = require('express').Router();
const shortUrlController = require('./shorturl.controller');

router.get('/fetch-all-links',shortUrlController.fetchAllLinks);
router.post('/create-link',shortUrlController.createLink);
router.get('/get-link-details-by-id',shortUrlController.getLinkDetailsById);
router.put('/update-link-details-by-id',shortUrlController.updateLinkDetailsById);


module.exports = router;