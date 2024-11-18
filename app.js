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
  const allProducts = Object.values(data.products).flat();
  const products = allProducts.filter(p => p.category === category);
  
  if (!products || products.length === 0) {
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

// API tìm kiếm sản phẩm
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q?.toLowerCase();
  
  if (!searchTerm) {
    return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm' });
  }

  const allProducts = Object.values(data.products).flat();
  console.log('Tất cả sản phẩm:', allProducts);

  const results = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
  
  console.log('Kết quả tìm kiếm:', results);
  
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
}); 