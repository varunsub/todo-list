const express = require('express');
const logoutHelper = require("../../helpers/logoutHelper")
const router = express.Router();

router.get('/',async (req, res) => {
  res.send('hello world');
});

router.post('/',async (req,res)=>{
  let data = await logoutHelper.logout(req.body);
  res.send({data});
})

module.exports = router;