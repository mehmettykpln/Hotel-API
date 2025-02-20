const mongoose = require('mongoose');

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB başarıyla bağlandınız');
    })
    .catch((err) => {
      console.log('MongoDB bağlantı hatası:', err);
    });
};

module.exports = db;
