const express = require('express');
const verifyHelper = require('../../helpers/verifyHelper')

const router = express.Router();
/**
 * Verifies email through link clicked
 */
router.get('/*', (req, res) => {
   res.send('hello world');
});

/**
 * Router post method
 * Expect email and password
 */
router.post('/*', async (req, res) => {
  console.log(req.body)
  var worked = await verifyHelper.verify(req.body.uuid);
  res.send(worked);
});

module.exports = router;