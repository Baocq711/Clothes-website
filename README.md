# Project Name

## Installation and Running

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Create a [.env](http://_vscodecontentref_/1) file in the root directory.
   - Add the necessary environment variables as specified in `.env.example`.

4. Run the application:

   ```sh
   npm run start
   ```

5. For development mode with hot-reloading:

   ```sh
   npm run dev
   ```

6. To run tests:
   ```sh
   npm run test
   ```

## API Endpoints

## Authentication

### Sign In

- **URL:** `/api/v1/auth/signin`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Đăng nhập thành công",
    "data": {
      "access_token": "string"
    }
  }
  ```

### Sign Up

- **URL:** `/api/v1/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Đăng ký thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Refresh Token

- **URL:** `/api/v1/auth/refresh`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <refresh_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy access token mới thành công",
    "data": {
      "access_token": "string"
    }
  }
  ```

### Get Profile

- **URL:** `/api/v1/auth/account`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin tài khoản thành công",
    "data": {
      "id": "string",
      "username": "string",
      "email": "string",
      "createdAt": "string"
    }
  }
  ```

## User

### Create User

- **URL:** `/api/v1/user`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "age": "number",
    "gender": "string",
    "contactIds": ["string"],
    "roleId": "string",
    "reviewIds": ["string"]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo tài khoản thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Users

- **URL:** `/api/v1/user`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách tài khoản thành công",
    "data": [
      {
        "id": "string",
        "email": "string",
        "name": "string",
        "age": "number",
        "gender": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get User by ID

- **URL:** `/api/v1/user/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin tài khoản thành công",
    "data": {
      "id": "string",
      "email": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "createdAt": "string"
    }
  }
  ```

### Update User

- **URL:** `/api/v1/user/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "age": "number",
    "gender": "string",
    "contactIds": ["string"],
    "roleId": "string",
    "reviewIds": ["string"]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin tài khoản thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete User

- **URL:** `/api/v1/user/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa tài khoản thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Product

### Create Product

- **URL:** `/api/v1/product`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo sản phẩm thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Products

- **URL:** `/api/v1/product`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách sản phẩm thành công",
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Product by ID

- **URL:** `/api/v1/product/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin sản phẩm thành công",
    "data": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "createdAt": "string"
    }
  }
  ```

### Update Product

- **URL:** `/api/v1/product/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin sản phẩm thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Product

- **URL:** `/api/v1/product/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa sản phẩm thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Product Detail

### Create Product Detail

- **URL:** `/api/v1/product-detail`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "productId": "string",
    "color": "string",
    "size": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo chi tiết sản phẩm thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Product Details

- **URL:** `/api/v1/product-detail`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách chi tiết sản phẩm thành công",
    "data": [
      {
        "id": "string",
        "productId": "string",
        "color": "string",
        "size": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Product Detail by ID

- **URL:** `/api/v1/product-detail/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin chi tiết sản phẩm thành công",
    "data": {
      "id": "string",
      "productId": "string",
      "color": "string",
      "size": "string",
      "createdAt": "string"
    }
  }
  ```

### Update Product Detail

- **URL:** `/api/v1/product-detail/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "productId": "string",
    "color": "string",
    "size": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin chi tiết sản phẩm thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Product Detail

- **URL:** `/api/v1/product-detail/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa chi tiết sản phẩm thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Category

### Create Category

- **URL:** `/api/v1/category`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo danh mục thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Categories

- **URL:** `/api/v1/category`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách danh mục thành công",
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Category by ID

- **URL:** `/api/v1/category/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin danh mục thành công",
    "data": {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "string"
    }
  }
  ```

### Update Category

- **URL:** `/api/v1/category/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin danh mục thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Category

- **URL:** `/api/v1/category/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa danh mục thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Review

### Create Review

- **URL:** `/api/v1/review`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "rating": "number",
    "comment": "string",
    "userId": "string",
    "productId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo đánh giá thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Reviews

- **URL:** `/api/v1/review`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách đánh giá thành công",
    "data": [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "userId": "string",
        "productId": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Review by ID

- **URL:** `/api/v1/review/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin đánh giá thành công",
    "data": {
      "id": "string",
      "rating": "number",
      "comment": "string",
      "userId": "string",
      "productId": "string",
      "createdAt": "string"
    }
  }
  ```

### Update Review

- **URL:** `/api/v1/review/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "rating": "number",
    "comment": "string",
    "userId": "string",
    "productId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin đánh giá thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Review

- **URL:** `/api/v1/review/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa đánh giá thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Contact

### Create Contact

- **URL:** `/api/v1/contact`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "phone": "string",
    "address": "string",
    "userId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo liên hệ thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Contacts

- **URL:** `/api/v1/contact`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách liên hệ thành công",
    "data": [
      {
        "id": "string",
        "name": "string",
        "phone": "string",
        "address": "string",
        "userId": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Contact by ID

- **URL:** `/api/v1/contact/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin liên hệ thành công",
    "data": {
      "id": "string",
      "name": "string",
      "phone": "string",
      "address": "string",
      "userId": "string",
      "createdAt": "string"
    }
  }
  ```

### Update Contact

- **URL:** `/api/v1/contact/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "phone": "string",
    "address": "string",
    "userId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin liên hệ thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Contact

- **URL:** `/api/v1/contact/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa liên hệ thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Role

### Create Role

- **URL:** `/api/v1/role`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Tạo vai trò thành công",
    "data": {
      "id": "string",
      "createdAt": "string"
    }
  }
  ```

### Get Roles

- **URL:** `/api/v1/role`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy danh sách vai trò thành công",
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "createdAt": "string"
      }
    ]
  }
  ```

### Get Role by ID

- **URL:** `/api/v1/role/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Lấy thông tin vai trò thành công",
    "data": {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "string"
    }
  }
  ```

### Update Role

- **URL:** `/api/v1/role/:id`
- **Method:** `PATCH`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Cập nhật thông tin vai trò thành công",
    "data": {
      "id": "string",
      "updatedAt": "string"
    }
  }
  ```

### Delete Role

- **URL:** `/api/v1/role/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <access_token>"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Xóa vai trò thành công",
    "data": {
      "id": "string",
      "deletedAt": "string"
    }
  }
  ```

## Note

- All responses follow the structure defined in `TransformInterceptor`:
  ```json
  {
    "statusCode": number,
    "message": string,
    "data": T extends Object
  }
  ```
