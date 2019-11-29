/* 
用户模块
*/
const express = require('express');
const router = express.Router();
const tokenTool = require('../utils/token.js')
const ipWithPort = require('../utils/getIp.js').ipWithPort
const UserModel = require('../db/models').UserModel
const findCount = require('../utils/page.js').findCount
const setPage = require('../utils/page.js').setPage
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

router.get('/info', (req, res, next) => {
  let { authorization } = req.headers
  let verifyToken = tokenTool.verifyToken(authorization)
  let { _id, username } = verifyToken
  UserModel.findOne({ _id, username }, filter, (err, user) => {
    if (user) {
      let data = JSON.parse(JSON.stringify(user))
      data.http = ipWithPort
      res.send({ code: 200, data });
    } else {
      res.send({ code: 200, msg: "无此用户信息" });
    }
    if (err) {
      res.send({ code: 0, msg: JSON.stringify(err) });
    }
  })
});

router.post('/page', async (req, res) => {
  const { pageNum, pageSize, data } = req.body

  try {
    let pageData = {
      pageNum, pageSize
    }
    let filterArr = ['createTime', 'updateTime', 'password', '__v']
    const pageRes = await setPage(UserModel, data, pageData, filterArr)
    res.send({ code: 200, data: pageRes });
  } catch (err) {
    res.send({ code: 0, err });
  }

});


module.exports = router;
