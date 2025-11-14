# OrderEase Backend

Backend API for OrderEase Restaurant Ordering System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orderease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Seed the database (optional):
```bash
npm run seed
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Documentation

See main README for API endpoints.

## Deployment

### Deploy to Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create orderease-api`
4. Set environment variables: `heroku config:set MONGODB_URI=...`
5. Deploy: `git push heroku main`
