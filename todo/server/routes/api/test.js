const express = require('express');
const router = express.Router();

router.get('/',async (req, res) => {
  res.send('hello');
});

router.post('/',async (req,res)=>{
  res.send("hello")
})

module.exports = router;