const express = require('express');
const completionHelper = require('../../helpers/completionHelper')
const router = express.Router();

router.get('/',async (req, res) => {
  res.send('hello world');
});

router.post('/',async (req,res)=>{
    let data = await completionHelper.update(req.body.id);
    res.send(data);
})

module.exports = router;