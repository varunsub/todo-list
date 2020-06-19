const express = require('express');
const loginHelper = require('../../helpers/loginHelper')
const router = express.Router();

router.get('/',async (req, res) => {
  res.send('hello world');
});

router.post('/',async (req,res)=>{
  console.log(req.body)
  const data = await loginHelper.authenticate(req);
  res.json({data});
})

module.exports = router;