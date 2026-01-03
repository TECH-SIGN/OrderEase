# OrderEase - Restaurant Ordering System

A complete full-stack restaurant ordering system with modern architecture. This project showcases professional backend design with a modular monolith pattern, comprehensive API Gateway, and production-ready features.

## 🚀 Features

### Customer Features
- 📱 Browse menu by categories (Starters, Main Course, Drinks, etc.)
- 🛒 Shopping cart with quantity management
- 📝 Place orders with dine-in or delivery options
- ✅ Order confirmation with real-time status
- 💳 Mobile-responsive design

### Admin Features
- 🔐 Secure JWT authentication with RBAC
- 📊 Dashboard with order statistics and revenue tracking
- 📋 Menu management (CRUD operations)
- 🍽️ Order management with status updates
- 👤 User management
- 🔐 Role-based access control

## 🏗️ Architecture

This project features **two backend implementations**:

### 1. NestJS Backend (Recommended - Production Ready)
Located in `/nestjs-backend/`

**Architecture:**
- **Modular Monolith** with clear service boundaries
- **API Gateway Layer** for centralized logging, error handling, and rate limiting
- **Role-Based Access Control (RBAC)** with JWT authentication
- **PostgreSQL** with Prisma ORM
- **Production-ready** with comprehensive security features

**Modules:**
- Auth Service - JWT authentication and authorization
- User Service - User profile management
- Admin Service - Administrative functions
- Food Service - Menu and food item management
- Cart Service - Shopping cart functionality
- Order Service - Order processing and management
- Public Service - Public endpoints (no auth required)

**Features:**
- ✅ Request/response logging
- ✅ Centralized error handling
- ✅ Rate limiting (100 req/15min per IP)
- ✅ Input validation with class-validator
- ✅ Database transactions for data consistency
- ✅ Comprehensive API documentation

[📚 NestJS Backend Documentation](./nestjs-backend/README.md)

### 2. Express.js Backend (Legacy)
Located in `/backend/`

Simple Express.js implementation with MongoDB.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Axios

**Backend (NestJS - Recommended):**
- NestJS Framework
- PostgreSQL with Prisma ORM
- JWT Authentication with refresh tokens
- TypeScript
- bcrypt for password hashing
- class-validator for input validation

**Backend (Express - Legacy):**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📋 Prerequisites

**For NestJS Backend (Recommended):**
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

**For Express Backend (Legacy):**
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

## 🔧 Quick Start

### Option 1: NestJS Backend (Recommended)

#### 1. Clone and setup
```bash
git clone https://github.com/TECH-SIGN/OrderEase.git
cd OrderEase/nestjs-backend
npm install
```

#### 2. Configure environment
Create `.env` file:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/orderease"
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_refresh_secret_key
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

#### 3. Setup database
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

#### 4. Start server
```bash
npm run start:dev
```

The API will be running on `http://localhost:3000/api`

**Default Users After Seeding:**
- Admin: `admin@orderease.com` / `admin123`
- User: `user@orderease.com` / `user123`

**Documentation:**
- [Architecture Guide](./nestjs-backend/ARCHITECTURE.md)
- [API Reference](./nestjs-backend/API.md)
- [Development Guide](./nestjs-backend/README.md)

### Option 2: Express Backend (Legacy)

#### 1. Setup backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orderease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The API will be running on `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📚 Key API Endpoints

### NestJS Backend

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

**Cart (Authenticated):**
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart

**Orders:**
- `POST /api/order/from-cart` - Create order from cart (Recommended)
- `POST /api/order` - Create order with items
- `GET /api/order` - Get all orders (Admin only)
- `PUT /api/order/:id/status` - Update order status (Admin only)

**Food Management (Admin):**
- `POST /api/food` - Create food item
- `GET /api/food` - List all food items
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item

**Public:**
- `GET /api/public/menu` - Browse menu (no auth required)
- `GET /api/public/health` - Health check

📖 **Full API Documentation**: [API.md](./nestjs-backend/API.md)

### Express Backend (Legacy)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/menu` - Get all menu items
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin only)

## 📱 Typical User Flow

### Customer Journey (NestJS Backend)
1. Browse menu: `GET /api/public/menu`
2. Register/Login: `POST /api/auth/signup` or `/api/auth/login`
3. Add items to cart: `POST /api/cart`
4. View cart: `GET /api/cart`
5. Create order from cart: `POST /api/order/from-cart`
6. View order history: `GET /api/user/orders`

### Admin Journey (NestJS Backend)
1. Login: `POST /api/auth/login` (with admin credentials)
2. View dashboard: `GET /api/admin/dashboard`
3. Manage food items: CRUD on `/api/food`
4. View all orders: `GET /api/order`
5. Update order status: `PUT /api/order/:id/status`
6. Manage users: CRUD on `/api/admin/users`

## 🗂️ Project Structure

```
OrderEase/
├── nestjs-backend/          # Production-ready NestJS backend
│   ├── prisma/              # Database schema and migrations
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── user/            # User management
│   │   ├── admin/           # Admin functionality
│   │   ├── food/            # Food/menu management
│   │   ├── cart/            # Shopping cart
│   │   ├── order/           # Order processing
│   │   ├── public/          # Public endpoints
│   │   ├── gateway/         # API Gateway (logging, errors, rate limiting)
│   │   ├── database/        # Prisma service
│   │   └── main.ts          # Application entry point
│   ├── ARCHITECTURE.md      # Detailed architecture documentation
│   └── API.md               # Complete API reference
├── backend/                 # Legacy Express.js backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── server.js            # Entry point
├── frontend/
│   ├── public/              # Static files
│   └── src/
│       ├── api/             # API configuration
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── redux/           # Redux store and slices
│       └── App.js           # Main app component
└── README.md
```

## 🎨 Database Schema (NestJS Backend)

### User
```typescript
{
  id: String (CUID),
  email: String (unique),
  password: String (hashed with bcrypt),
  name: String,
  role: ADMIN | USER,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Food
```typescript
{
  id: String (CUID),
  name: String,
  description: String,
  price: Float,
  category: String,
  image: String (URL),
  isAvailable: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Cart
```typescript
{
  id: String (CUID),
  userId: String (unique),
  cartItems: CartItem[],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### CartItem
```typescript
{
  id: String (CUID),
  cartId: String,
  foodId: String,
  quantity: Integer,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Order
```typescript
{
  id: String (CUID),
  userId: String,
  totalPrice: Float,
  status: PENDING | PREPARING | READY | DELIVERED | CANCELLED,
  orderItems: OrderItem[],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### OrderItem
```typescript
{
  id: String (CUID),
  orderId: String,
  foodId: String,
  quantity: Integer,
  price: Float (price at time of order)
}
```

## 🔒 Security Features (NestJS Backend)

### Authentication & Authorization
- ✅ JWT-based authentication with access and refresh tokens
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Role-based access control (RBAC) - ADMIN and USER roles
- ✅ Protected routes with guards
- ✅ Secure token generation and validation

### Input Validation
- ✅ Global validation pipe with class-validator
- ✅ DTO-based request validation
- ✅ Whitelist mode (strips unknown properties)
- ✅ Type transformation and coercion
- ✅ Custom validation rules

### API Gateway Protection
- ✅ Request/response logging with sensitive data sanitization
- ✅ Centralized error handling
- ✅ Rate limiting (100 requests per 15 minutes per IP)
- ✅ CORS configuration
- ✅ Structured error responses with codes

### Database Security
- ✅ Parameterized queries via Prisma (no SQL injection)
- ✅ Database transactions for data consistency
- ✅ Cascade deletes for referential integrity
- ✅ Unique constraints on critical fields
- ✅ Foreign key relationships

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Proper error handling throughout
- ✅ No security vulnerabilities (CodeQL verified)

## 🚀 Deployment

### NestJS Backend (Recommended)

#### Option 1: Railway/Render
1. Create PostgreSQL database
2. Push code to GitHub
3. Connect repository to hosting platform
4. Set environment variables
5. Deploy

#### Option 2: Docker
```bash
# Build image
docker build -t orderease-backend .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="your_secret" \
  orderease-backend
```

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the build folder
3. Set environment variable for API URL

### Database
- **PostgreSQL**: Use Railway, Supabase, or managed PostgreSQL
- **MongoDB** (Legacy backend): Use MongoDB Atlas

## 📝 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] SMS order updates
- [ ] Customer order history
- [ ] Reviews and ratings
- [ ] Multiple restaurant support
- [ ] Analytics and reporting

## 👨‍💻 About TechSign

This project is part of TechSign's portfolio, demonstrating full-stack development skills including:
- RESTful API design
- Database modeling
- State management
- Authentication & authorization
- Responsive UI design
- Modern JavaScript (ES6+)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For any queries or collaboration opportunities, feel free to reach out!

---

⭐ If you found this project helpful, please consider giving it a star!
