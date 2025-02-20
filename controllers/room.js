const Hotel = require('../models/Hotel.js');
const Room = require('../models/Room.js');

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const room = await Room.create(req.body);

    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const room = await Hotel.findByIdAndUpdate(
      req.params._id,
      { $set: req.body },
      { new: true }
    );

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Hotel.findByIdAndDelete(req.params._id);

    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params._id },
    });

    res.status(200).json({ message: 'silme işleminiz başarılı...' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getDetailRoom = async (req, res, next) => {
  try {
    const room = await Hotel.findById(req.params._id);

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllRoom = async (req, res, next) => {
  try {
    const room = await Hotel.find();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllRoom,
  getDetailRoom,
  updateRoom,
  createRoom,
  deleteRoom,
};
