// routes/auth.js

const todolist = require('../controllers/todolist.js'); 
const router = require('koa-router')();

todolist(router);

module.exports = router; // 把router规则暴露出去
