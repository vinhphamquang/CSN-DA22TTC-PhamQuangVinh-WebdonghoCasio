# Dự án Website Bán Đồng Hồ Casio

## Giới thiệu
Đây là một website bán đồng hồ Casio với các dòng sản phẩm chính như G-SHOCK, EDIFICE, VINTAGE và các dòng đồng hồ dành cho nam, nữ. Website được thiết kế với giao diện thân thiện, dễ sử dụng và đầy đủ chức năng cần thiết cho một trang thương mại điện tử.

## Công nghệ sử dụng
- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5.3.2
  - jQuery 3.7.1

- **Backend:**
  - Node.js
  - Express.js
  - RESTful API

- **Database:**
  - JSON (data storage)

## Tính năng chính
1. Hiển thị danh sách sản phẩm theo danh mục
2. Tìm kiếm sản phẩm
3. Xem chi tiết sản phẩm
4. Responsive design (tương thích mobile)
5. API endpoints cho các thao tác CRUD

## Cách cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản 12 trở lên)
- npm (Node Package Manager)

### Các bước cài đặt

1. Clone dự án về máy:
```bash
git clone [repository-url]
cd cosonganh
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Khởi động server:
```bash
node app.js
```


4. Truy cập website:
- Mở trình duyệt web
- Truy cập địa chỉ: `http://localhost:3000`

## Cấu trúc thư mục
```
cosonganh/
├── app.js # Server entry point
├── data.json # Database chính
├── data/ # Thư mục chứa các file JSON theo danh mục
├── index.html # Trang chủ
├── nav.html # Navigation component
├── search.html # Trang tìm kiếm
└── [category]-detail.html # Các trang chi tiết sản phẩm
```

## API Endpoints
- `GET /api/products`: Lấy tất cả sản phẩm
- `GET /api/products/:category`: Lấy sản phẩm theo danh mục
- `GET /api/product/:id`: Lấy chi tiết sản phẩm theo ID
- `GET /api/search?q=keyword`: Tìm kiếm sản phẩm

## Lưu ý
- Đảm bảo port 3000 không bị sử dụng bởi ứng dụng khác
- Cần có kết nối internet để tải các thư viện Bootstrap và jQuery từ CDN
- Các hình ảnh sản phẩm cần được đặt trong thư mục phù hợp và đảm bảo đường dẫn chính xác
