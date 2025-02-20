const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    idAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  } /*oluşturulma ve güncellenme zamanlarını otomatik olarak takip etmeyi sağlar. */
);

module.exports = mongoose.model('user', userSchema);
