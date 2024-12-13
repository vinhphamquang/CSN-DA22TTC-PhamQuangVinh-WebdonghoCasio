const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Đọc dữ liệu từ file products.json
const products = require('./products.json');

// API endpoint để lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
  try {
    console.log('Đang gửi dữ liệu:', products); // Thêm log để debug
    res.json(products);
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API endpoint để lấy sản phẩm theo danh mục
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  const categoryProducts = products.categories.find(cat => cat.name === category);
  if (categoryProducts) {
    res.json(categoryProducts);
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục' });
  }
});

// API lấy chi tiết sản phẩm theo ID
app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    let foundProduct = null;

    // Tìm sản phẩm trong tất cả các danh mục
    for (const category of products.categories) {
        const product = category.products.find(p => p.id === productId);
        if (product) {
            foundProduct = {
                ...product,
                category: category.name,
                specifications: {
                    "Thương hiệu": "Casio",
                    "Model": product.model,
                    "Xuất xứ": "Nhật Bản",
                    "Bảo hành": "1 năm",
                    "Chống nước": product.id.startsWith('g-') ? "200m" : "50m",
                    "Chất liệu vỏ": "Thép không gỉ",
                    "Chất liệu dây": product.description.toLowerCase().includes('thép') ? "Thép không gỉ" : "Dây da cao cấp",
                    "Kích thước": "40mm x 11mm",
                    "Màu mặt số": product.description.toLowerCase().includes('trắng') ? "Trắng" : "Đen"
                }
            };
            break;
        }
    }

    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
});

// API lấy sản phẩm liên quan
app.get('/api/related-products/:id', (req, res) => {
    const productId = req.params.id;
    let relatedProducts = [];
    let productCategory = '';

    // Tìm danh mục của sản phẩm
    for (const category of products.categories) {
        if (category.products.some(p => p.id === productId)) {
            productCategory = category.name;
            // Lấy 4 sản phẩm khác trong cùng danh mục
            relatedProducts = category.products
                .filter(p => p.id !== productId)
                .slice(0, 4);
            break;
        }
    }

    res.json(relatedProducts);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
