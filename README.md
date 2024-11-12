# Clothes Website

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd clothes-website
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:
   - Create a [.env](http://_vscodecontentref_/1) file in the root directory.
   - Add the following environment variables:
     ```env
     DB_HOST=<your-database-host>
     DB_PORT=<your-database-port>
     DB_USER=<your-database-username>
     DB_PASS=<your-database-password>
     DB_NAME=<your-database-name>
     ACCESS_TOKEN_SECRET=<your-access-token-secret>
     ACCESS_TOKEN_EXPIRES=<access-token-expiry-time>
     REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
     REFRESH_TOKEN_EXPIRES=<refresh-token-expiry-time>
     INIT_PASSWORD=<initial-password>
     SHOULD_INIT=true
     ```

## Starting the Application

1. Start the application in development mode:

   ```sh
   npm run dev
   ```

2. Start the application in production mode:
   ```sh
   npm run start:prod
   ```

## API Endpoints

### Auth

- **Sign Up**

  - `POST /api/v1/auth/signup`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "name": "string",
      "age": "number",
      "gender": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Sign In**

  - `POST /api/v1/auth/signin`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "access_token": "string"
    }
    ```

- **Sign Out**

  - `POST /api/v1/auth/signout`
  - **Response:**
    ```json
    {
      "message": "Đăng xuất thành công"
    }
    ```

- **Refresh Token**

  - `GET /api/v1/auth/refresh`
  - **Response:**
    ```json
    {
      "access_token": "string"
    }
    ```

- **Get Profile**
  - `GET /api/v1/auth/account`
  - **Response:**
    ```json
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

### Users

- **Create User**

  - `POST /api/v1/user`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "roleId": "string",
      "contactIds": ["string"],
      "reviewIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Users**

  - `GET /api/v1/user`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "email": "string",
        "name": "string",
        "age": "number",
        "gender": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get User by ID**

  - `GET /api/v1/user/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update User**

  - `PATCH /api/v1/user/:id`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "roleId": "string",
      "contactIds": ["string"],
      "reviewIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete User**
  - `DELETE /api/v1/user/:id`
  - **Response:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

### Roles

- **Create Role**

  - `POST /api/v1/role`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "permissionIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Roles**

  - `GET /api/v1/role`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Role by ID**

  - `GET /api/v1/role/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Role**

  - `PATCH /api/v1/role/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "permissionIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Role**
  - `DELETE /api/v1/role/:id`
  - **Response:**
    ```json
    {
      "message": "Role deleted successfully"
    }
    ```

### Permissions

- **Create Permission**

  - `POST /api/v1/permission`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "apiPath": "string",
      "method": "string",
      "module": "string",
      "roleIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Permissions**

  - `GET /api/v1/permission`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "apiPath": "string",
        "method": "string",
        "module": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Permission by ID**

  - `GET /api/v1/permission/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "apiPath": "string",
      "method": "string",
      "module": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Permission**

  - `PATCH /api/v1/permission/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "apiPath": "string",
      "method": "string",
      "module": "string",
      "roleIds": ["string"]
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Permission**
  - `DELETE /api/v1/permission/:id`
  - **Response:**
    ```json
    {
      "message": "Permission deleted successfully"
    }
    ```

### Contacts

- **Create Contact**

  - `POST /api/v1/contact`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "phone": "string",
      "address": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Contacts**

  - `GET /api/v1/contact`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "phone": "string",
        "address": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Contact by ID**

  - `GET /api/v1/contact/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "phone": "string",
      "address": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Contact**

  - `PATCH /api/v1/contact/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "phone": "string",
      "address": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Contact**
  - `DELETE /api/v1/contact/:id`
  - **Response:**
    ```json
    {
      "message": "Contact deleted successfully"
    }
    ```

### Products

- **Create Product**

  - `POST /api/v1/product`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "productDetailIds": ["string"],
      "categoryId": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Products**

  - `GET /api/v1/product`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Product by ID**

  - `GET /api/v1/product/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Product**

  - `PATCH /api/v1/product/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "productDetailIds": ["string"],
      "categoryId": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Product**
  - `DELETE /api/v1/product/:id`
  - **Response:**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Product Details

- **Create Product Detail**

  - `POST /api/v1/product-detail`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "value": "string",
      "productId": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Product Details**

  - `GET /api/v1/product-detail`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "value": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Product Detail by ID**

  - `GET /api/v1/product-detail/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "value": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Product Detail**

  - `PATCH /api/v1/product-detail/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "value": "string",
      "productId": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Product Detail**
  - `DELETE /api/v1/product-detail/:id`
  - **Response:**
    ```json
    {
      "message": "Product detail deleted successfully"
    }
    ```

### Reviews

- **Create Review**

  - `POST /api/v1/review`
  - **Request Body:**
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
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Reviews**

  - `GET /api/v1/review`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Review by ID**

  - `GET /api/v1/review/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Review**

  - `PATCH /api/v1/review/:id`
  - **Request Body:**
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
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Review**
  - `DELETE /api/v1/review/:id`
  - **Response:**
    ```json
    {
      "message": "Review deleted successfully"
    }
    ```

### Categories

- **Create Category**

  - `POST /api/v1/category`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "createdAt": "date"
    }
    ```

- **Get Categories**

  - `GET /api/v1/category`
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
    ```

- **Get Category by ID**

  - `GET /api/v1/category/:id`
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **Update Category**

  - `PATCH /api/v1/category/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "string",
      "updatedAt": "date"
    }
    ```

- **Delete Category**
  - `DELETE /api/v1/category/:id`
  - **Response:**
    ```json
    {
      "message": "Category deleted successfully"
    }
    ```
