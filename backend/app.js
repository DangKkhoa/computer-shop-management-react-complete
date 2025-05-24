const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const authRoute = require('./route/auth.route.js');
const userRoute = require('./route/user.route.js');
const productRoute = require('./route/product.route.js');
const aiRoute = require('./route/ai.route.js');
const orderRoute = require('./route/order.route.js');
const saleHistoryRoute = require('./route/saleHistory.route.js');

const authMiddleware = require('./middleware/auth.middleware.js');

const allowOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if(!origin || allowOrigins.includes(origin))  {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by cors'));
    }
  },
  credentials: true,
  
}));


app.use('/uploads/users', express.static(path.join(__dirname, 'public/uploads/avatars')));
app.use('/uploads/products', express.static(path.join(__dirname, 'public/uploads/products')));

const pathPrefix = '/api/v1';



app.use(`${pathPrefix}/orders`, orderRoute);
app.use(`${pathPrefix}/auth`, authRoute);
app.use(`${pathPrefix}/products`, productRoute);
app.use(`${pathPrefix}/users`, userRoute);
app.use(authMiddleware.requireAuth);



// app.use(`${pathPrefix}/ai`, aiRoute);
app.use(`${pathPrefix}/sale-history`, saleHistoryRoute);

app.listen(3000, () => console.log('http://localhost:3000'));