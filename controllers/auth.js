const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne(email);
    if (user) {
      return res
        .status(500)
        .json({ message: 'zaten böyle bir kullanıcı bulunmakta..' });
    }
    if (password.lenght < 6)
      res.status(500).json({ message: 'Parolanız Çok Kısa...' });
    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email))
      res.status(500).json({ message: ' email çok kısa...' });

    const newUser = await User.create({ ...req.body, password: passwordHash });

    const token = await jwt.sign(
      { id: newUser.id, idAdmin: newUser._id },
      'SECRET_KEY',
      { expresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true }).status(201).json({
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne(email);
    if (!user) {
      return res
        .status(500)
        .json({ message: 'zaten böyle bir kullanıcı bulunmamakta..' });
    }
    const passwordCompare = await bcrypt.Compare(password, use.password);

    if (!passwordCompare) {
      return res.status(500).json({ message: 'parolalar eşleşmemekte...' });
    }

    const token = await jwt.sign(
      { id: user.id, idAdmin: user._id },
      'SECRET_KEY',
      { expresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true }).status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

function isEmail(emailAdress) {
  let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,3}$/;

  if (emailAdress.match(regex)) return true;
  else return false;
}

module.exports = { register, login };
