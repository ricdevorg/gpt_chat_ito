const { Router } = require('express');
const { callChatGpt } = require('../controllers/chatgpt.controller');

const router = Router();

router.post('/chatgpt', callChatGpt);

module.exports = router;