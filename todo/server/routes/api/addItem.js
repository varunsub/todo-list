const express = require('express');
const eventHelper = require('../../helpers/eventHelper');
const router = express.Router();

router.get('/',async (req, res) => {
  console.log(req)
  res.send('');
});

router.post('/',async (req,res)=>{
  console.log(req.body)
  var data = await eventHelper.add(req.body.item)
  res.send(data)
})

module.exports = router;