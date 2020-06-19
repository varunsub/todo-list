const express = require('express');
const updateHelper = require('../../helpers/updateHelper');
const router = express.Router();

router.get('/',async (req, res) => {
  console.log(req)
  res.send('');
});

router.post('/',async (req,res)=>{
  console.log(req.body);
  var data = await updateHelper.add(req.body);  
  res.send(data);
})

module.exports = router;