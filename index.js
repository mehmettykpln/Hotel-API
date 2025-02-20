const expres = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db.js');

const authRouthes = require('./routes/auth.js');
const hotelRouthes = require('./routes/hotel.js');
const roomRouthes = require('./routes/room.js');
const userRouthes = require('./routes/user.js');

dotenv.config();

const app = expres();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use('/', authRouthes);
app.use('/', hotelRouthes);
app.use('/', roomRouthes);
app.use('/', userRouthes);

db();

const PORT = 5000;
app.listen(PORT, () => {
  console.log('server is running on port:', PORT);
});
