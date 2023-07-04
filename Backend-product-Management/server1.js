const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors =require('cors');



const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'categories',
  port:'3306'
});

db.connect((err =>{
  if(err){
    console.log('error')
  }else{
    console.log('success')
  }
}));


//get all data from database Categories

app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM category';
db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


//Create the Records
// app.post("/categories", (req, res) => {
//   let details = {
//     categoryName: req.body.categoryName,
//   };
//   let sql = 'insert into category(categoryName) values (\''+categoryName+'\')';
//   db.query(sql, details, (error) => {
//     if (error) {
//       res.send({ status: false, message: "category created Failed" });
//     } else {
//       res.send({ status: true, message: "category created successfully" });
//     }
//   });
// });

//delete record


app.post('/categories',(req, res) => {
  const name = req.body.categoryName;
  const query = 'insert into category(categoryName) values (\''+name+'\')';
  db.query(query, name, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(200);
    }
  });
});
//delete database from category table


app.delete('/categories/:id', (req, res) => {
  const sql = 'DELETE FROM category WHERE categoryId ='+req.params.categoryId+"";
  const query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});



//get all data form database products
app.get('/product', (req, res) => {
  const query = 'SELECT * FROM products';
db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id =?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
      } else {
      res.json(results);
    }
})
});


//
  

// app.post('/categories',(req, res) => {
//   const name = req.body.categoryName;
//   const query = 'insert into category(categoryName) values (\''+name+'\')';
//   db.query(query, name, (error) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

app.post('/categories', (req, res) => {

  const { categoryName } = req.body;
  const query = 'INSERT INTO category (categoryName) VALUES (?)';
  db.query(query, [categoryName], (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(200);
    }
  });
});


app.post('/product',async (req, res) => {
  try {
    const { productName, categoryId } = req.body;
    const product = await product.create({ productName, categoryId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

















// // const express=require('express')
// // const bodyParser=require('body-parser')
// // const mysql=require("mysql")
// // const server=express()

// // //database Connection
// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'root',
// //     database: 'student'
// //   });

// //   connection.connect(function(error){
// //     if(error){
// //         console.log("error Connection to DB")
// //     }else{
// //         console.log("Successfully Connected to DB")
// //     }
// //   });