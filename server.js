const express = require('express');
const http = require('http');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

app.use(bodyParser.json());

app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
