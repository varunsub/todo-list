const express = require('express');
const getListHelper= require('../../helpers/getListHelper')

const router = express.Router();
/**
 * Verifies email through link clicked
 */
router.get('/*', async (req, res) => {
  console.log(req.body)
   const events = await getListHelper.getList(req.headers)
   res.send(events);
});

/**
 * Router post method
 * Expect email and password
 */
router.post('/*', async (req, res) => {
  // console.log(req.body)
  // var worked = await verifyHelper.verify(req.body.uuid);
  // res.send(worked);
});

module.exports = router;