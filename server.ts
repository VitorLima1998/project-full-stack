import express from 'express';
import http from 'http';
const app = express();
const port = 3000;

import bodyParser from 'body-parser';
// import routes from './routes';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

// app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
