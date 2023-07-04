const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'categories',
  port:'3306'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create category
app.post('/categories', (req, res) => {
  const category = req.body;

  db.query('INSERT INTO categories SET ?', category, (err, result) => {
    if (err) {
      console.error('Error creating category: ', err);
      return res.status(500).json({ error: 'Error creating category' });
    }

    category.id = result.insertId;
    res.status(201).json(category);
  });
});

// Get all categories
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error getting categories: ', err);
      return res.status(500).json({ error: 'Error getting categories' });
    }

    res.json(results);
  });
});

// Create product
app.post('/products', (req, res) => {
  const product = req.body;

  db.query('INSERT INTO products SET ?', product, (err, result) => {
    if (err) {
      console.error('Error creating product: ', err);
      return res.status(500).json({ error: 'Error creating product' });
    }

    product.id = result.insertId;
    res.status(201).json(product);
  });
});

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error getting products: ', err);
      return res.status(500).json({ error: 'Error getting products' });
    }

    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const categoryRoutes = require('./routers/categoryRoutes');
// const productRoutes = require('./routers/productRoutes');

// const app = express();
// const port = 3000;
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON request bodies
// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);


//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });
  