const express = require(`express`);
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
const sqlite = require(`sqlite`);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get(`/api/products`, (req, res) => {
  fs.readFile(__dirname + `/products.json`, "utf8", (err, data) => {
    try {
      if (err) throw new Error(Err);
      const products = JSON.parse(data);
      res.json({ res: products });
    } catch (e) {
      res.json({ error: err.message });
    }
  });
});

app.post(`/api/products`, (req, res) => {
  console.log(req.body);
  let product = req.body.product;
  fs.readFile(__dirname + `/products.json`, "utf8", (err, data) => {
    try {
      if (err) throw new Error(err);
      var products = JSON.parse(data);
      products.push(JSON.parse(product));

      fs.writeFile(__dirname + `/products.json`, JSON.stringify(products), "utf8", (err) => {
        if (err) throw new Error(err);

        res.json(true);
      });
    } catch (e) {
      res.json({ error: err.message });
    }
  });
});

async function initSqlite() {
  const db = await sqlite.open(__dirname + `/database.sqlite`)

  await db.run(`
    DROP TABLE IF EXISTS product;
  `);
  await db.run(`
    DROP TABLE IF EXISTS orders;
  `);
  await db.run(`
    CREATE TABLE product(
      id integer PRIMARY KEY AUTOINCREMENT,
      country text NOT NULL,
      city text NOT NULL,
      price int NOT NULL,
      image text NOT NULL
    );
  `);

  await db.run(`
    CREATE TABLE orders(
      id integer PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL,
      phone text NOT NULL,
      cart string NOT NULL
    );
  `);

  await db.run(`INSERT INTO product(country, city, price, image) VALUES('Россия', 'Москва', 150000, 'https://placeimg.com/255/255/nature?0')`);
  await db.run(`INSERT INTO product(country, city, price, image) VALUES('Россия', 'Сочи', 200000, 'https://placeimg.com/255/255/nature?1')`);
  await db.run(`INSERT INTO product(country, city, price, image) VALUES('Франция', 'Париж', 400000, 'https://placeimg.com/255/255/nature?2')`);
  await db.run(`INSERT INTO product(country, city, price, image) VALUES('Тайланд', 'Бангкок', 50000, 'https://placeimg.com/255/255/nature?3')`);
  await db.run(`INSERT INTO product(country, city, price, image) VALUES('Тайланд', 'Пхукет', 60000, 'https://placeimg.com/255/255/nature?4')`);
  return db;
};

async function getSql() {
const db = await sqlite.open(__dirname + `/database.sqlite`);
return db}
const dbPromise = getSql();

app.get(`/api/v2/products`, async (req, res) => {
  const db = await dbPromise;

  const city = (req.query.city || ``) + `%`;
  const country = req.query.country || `%`;

  const count = (await db.get(`SELECT COUNT(*) AS cnt FROM product WHERE country LIKE ? AND city LIKE ?`, [country, city])).cnt;
  const limit = req.query.limit || count;
  const offset = req.query.offset || 0;
  const rows = await db.all(`SELECT * FROM product WHERE country LIKE ? AND city LIKE ? ORDER BY id LIMIT ? OFFSET ?`, [country, city, limit, offset]);


  if (rows.length < 1) {
    res.json({
      error: {
        message: `Products not found`,
      }
    })
    return;
  }
   
  res.json({
    res: {
      products: rows,
      count: count 
    }
  });
});

app.post(`/api/v2/products`, async (req, res) => {
  console.log(req.body);
  var product = JSON.parse(req.body.product);
  const db = await dbPromise;
  await db.run(`INSERT INTO product(country, city, price, image) VALUES(?, ?, ?, ?)`, [product.country, product.name, product.price, product.img]);
  res.json({ res: true });
});

app.get(`/api/v2/orders`, async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all(`SELECT * from orders`);
  console.log(rows);
  for (var i = 0; i < rows.length; i++) {
	rows[i].cart = JSON.parse(rows[i].cart);
  }

  res.json({
    res: {
      rows,
    }
  });
});

app.post(`/api/v2/orders`, async (req, res) => {
	console.log(req.body)
  const cust = JSON.parse(req.body.cust);
  const cart = JSON.parse(req.body.cart);

  const err = [];
  const db = await dbPromise;

  if (!cust.name) {
    err.push(`name should not be empty`);
  }

  if (!cust.phone) {
    err.push(`phone should not be empty`);
  } else if (!/^\+7[\s]?[0-9]{3,3}[\s]?[0-9]{3,3}[\s]?[0-9]{4,4}$/.test(cust.phone)) {
    err.push(`phone should be in format +7 999 999 9999`);
  }

  if (!cart || cart.length == 0) {
    err.push(`cart should not be empty`);
  } else {
    for (var i = 0; i < cart.length; i++) {
      if (!(Number(cart[i].count) >= 1)) {
        err.push(`cart should have items with count >=1`);
        break;
      }
    }
    for (var i = 0; i < cart.length; i++) {
      const count = await db.get(`SELECT count(*) as cnt from product WHERE id = ?`, [cart[i].id]);
      if (count < 1) {
        err.push(`cart should have items that exist in database`);
      }
    }
  }

  if (err.length > 0) {
    res.json({
      error: {
        validationErrors: err,
      }
    });
    return;
  }

  var statement = await db.run(`INSERT INTO orders(name, phone, cart) VALUES(?, ?, ?)`, [cust.name, cust.phone, JSON.stringify(cart)]);
  res.json({
    res: {
      id: statement.lastID,
    }
  });
});

app.listen(5000, () => console.log('Listening on 5000'));