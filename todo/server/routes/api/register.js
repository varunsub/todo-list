const express = require('express');
const router = express.Router();
const registrationHelper = require("../../helpers/registrationHelper")

/**
 * 
 */
router.get('/', (req, res) => {
   res.send('hello world');
});

/**
 * Router post method
 * Expect email and password
 */
router.post('/', async (req, res) => {
  console.log(req.body)
  const data = await registrationHelper.register(req)
  res.send(data);
});

module.exports = router;