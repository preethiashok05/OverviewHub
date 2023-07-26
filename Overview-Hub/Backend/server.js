const express = require('express');
const db = require('./config/db'); 
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const teamRoutes = require('./routes/user/team');
const userRoutes = require('./routes/user/user');
const barDataRoutes = require('./routes/statistics/barData');
const pieRoutes = require('./routes/statistics/piedata');
const transactionRoutes = require('./routes/statistics/transactions');
const lineRoutes = require('./routes/statistics/linedata');
const invoiceRoutes = require('./routes/statistics/invoice');
const authRoutes = require('./routes/user/auth');
const adminRouter = require('./routes/user/admin');
const clientRouter = require('./routes/user/client');
const reportRoutes = require('./routes/statistics/reports');

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/invoice', invoiceRoutes);
app.use('/team', teamRoutes);
app.use('/user', userRoutes);
app.use('/bar', barDataRoutes);
app.use('/pie', pieRoutes);
app.use('/transactions', transactionRoutes);
app.use('/line', lineRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/reports', reportRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


