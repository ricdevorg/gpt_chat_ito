const { Router } = require('express');
const { callChatGpt, callImageGpt } = require('../controllers/chatgpt.controller');

const router = Router();

router.post('/chatgpt',callChatGpt);
router.post('/imagegpt',callImageGpt);

module.exports = router;