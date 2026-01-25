# OrderEase API Gateway

Minimal NestJS-based API Gateway for HTTP routing and request forwarding.

## Responsibilities

- HTTP routing to backend services
- Request forwarding with JWT verification (TODO)
- Shared DTO validation

## Routes

### Backend Service (Port 3001)
- `/api/auth/*` - Authentication endpoints
- `/api/user/*` - User management
- `/api/admin/*` - Admin operations
- `/api/food/*` - Food catalog
- `/api/public/*` - Public endpoints
- `/api/health/*` - Health checks

### Order Service (Port 3002)
- `/api/order/*` - Order management
- `/api/cart/*` - Shopping cart

## Environment Variables

```env
PORT=3000
BACKEND_URL=http://localhost:3001
ORDER_SERVICE_URL=http://localhost:3002
CORS_ORIGIN=*
```

## Development

```bash
# Run in development mode
pnpm dev

# Build
pnpm build

# Start production
pnpm start:prod
```

## Future Enhancements

- [ ] JWT verification middleware
- [ ] Rate limiting
- [ ] Request/response logging
- [ ] Circuit breaker pattern
- [ ] Load balancing
