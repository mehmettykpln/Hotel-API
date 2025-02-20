const express = require('express');
const router = express.Router();

const {
  updateUser,
  deleteUser,
  detailUser,
  allUser,
} = require('../controllers/user.js');
const expres = require('express');
const { verifyAdmin, verifyUser } = require('../middleware/verify.js');

router.put('/allUser', verifyAdmin, allUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/detailUse/:id', verifyUser, detailUser);
router.get('/updateUser/:id', verifyUser, updateUser);

module.exports = router;
