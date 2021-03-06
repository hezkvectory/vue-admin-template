/* 
用户模块
*/
const express = require('express');
const router = express.Router();
const view = require('./view.js').view
const add = require('./add.js').add
const edit = require('./edit.js').edit
const remove = require('./remove.js').remove
const page = require('./page.js').page
const list = require('./list.js').list

router.get('/', (req, res) => {
  res.send({ code: 200, msg: 'ok' })
});

router.post('/list', async (req, res) => {
  list(req, res)
});

router.post('/page', async (req, res) => {
  page(req, res)
});

router.post('/view', async (req, res) => {
  view(req, res)
});

router.post('/add', async (req, res) => {
  add(req, res)
});

router.post('/edit', async (req, res) => {
  edit(req, res)
});

router.post('/remove', async (req, res) => {
  remove(req, res)
});

module.exports = router;
