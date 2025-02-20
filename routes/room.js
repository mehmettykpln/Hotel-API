const express = require('express'); // express modülünü import ediyoruz
const router = express.Router(); // express.Router() ile router'ı tanımlıyoruz

const {
  getAllRoom,
  getDetailRoom,
  updateRoom,
  createRoom,
  deleteRoom,
} = require('../controllers/room.js');

const { verifyAdmin } = require('../middleware/verify.js');

router.get('/getAllRoom', getAllRoom);
router.get('/getDetailRoom:id', getDetailRoom);
router.put('/updateRoom:id', verifyAdmin, updateRoom);
router.post('/createRoom:id/:hotelid', verifyAdmin, createRoom);
router.delete('/deleteRoom:id/:hotelid', verifyAdmin, deleteRoom);

module.exports = router;
