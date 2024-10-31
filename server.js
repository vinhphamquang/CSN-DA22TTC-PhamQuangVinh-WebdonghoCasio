const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import dữ liệu từ file JSON
const data = require('./data.json');

app.use(cors());
app.use(express.json());

// API lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
  const allProducts = Object.values(data.products).flat();
  res.json(allProducts);
});

// API lấy sản phẩm theo danh mục
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  const products = data.products[category];
  
  if (!products) {
    return res.status(404).json({ message: 'Không tìm thấy danh mục' });
  }
  
  res.json(products);
});

// API lấy sản phẩm theo ID
app.get('/api/product/:id', (req, res) => {
  const productId = req.params.id;
  const allProducts = Object.values(data.products).flat();
  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
  
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
}); 