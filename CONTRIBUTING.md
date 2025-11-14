# Contributing to OrderEase

Thank you for your interest in contributing to OrderEase! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/OrderEase.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add: your feature description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## 📋 Development Guidelines

### Code Style

**JavaScript/React:**
- Use ES6+ features
- Use functional components with hooks
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic

**Example:**
```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Avoid
const calc = (x) => {
  let t = 0;
  for(let i = 0; i < x.length; i++) {
    t += x[i].price * x[i].quantity;
  }
  return t;
};
```

### Commit Messages

Follow conventional commit format:

- `feat: Add new feature`
- `fix: Fix bug in cart calculation`
- `docs: Update README`
- `style: Format code`
- `refactor: Restructure menu component`
- `test: Add tests for order service`
- `chore: Update dependencies`

### Branch Naming

- Feature: `feature/add-payment-gateway`
- Bug fix: `fix/cart-quantity-bug`
- Documentation: `docs/update-setup-guide`
- Refactor: `refactor/menu-component`

## 🧪 Testing

Before submitting a PR, ensure:

1. **Backend Tests:**
```bash
cd backend
npm test  # When tests are added
```

2. **Frontend Tests:**
```bash
cd frontend
npm test
```

3. **Manual Testing:**
- Test all affected features
- Check responsive design
- Test on different browsers
- Verify API endpoints work correctly

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description:** Clear description of the bug
2. **Steps to Reproduce:**
   - Step 1
   - Step 2
   - Step 3
3. **Expected Behavior:** What should happen
4. **Actual Behavior:** What actually happens
5. **Screenshots:** If applicable
6. **Environment:**
   - OS: [e.g., Windows 10]
   - Browser: [e.g., Chrome 91]
   - Node version: [e.g., 16.13.0]

## ✨ Feature Requests

When requesting features, include:

1. **Problem:** What problem does this solve?
2. **Solution:** Describe your proposed solution
3. **Alternatives:** Other solutions you've considered
4. **Additional Context:** Any other relevant information

## 🎯 Areas for Contribution

### High Priority
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications for orders
- [ ] SMS notifications
- [ ] Order history for customers
- [ ] Reviews and ratings system

### Medium Priority
- [ ] Advanced search and filters
- [ ] Multi-restaurant support
- [ ] Delivery tracking
- [ ] Promotional codes/discounts
- [ ] Analytics dashboard

### Low Priority
- [ ] Dark mode
- [ ] Multiple languages
- [ ] Social media integration
- [ ] Mobile app (React Native)

## 🔧 Development Setup

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup instructions.

Quick setup:
```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Pull Request Process

1. Update README.md with details of changes if needed
2. Update documentation if you're changing APIs
3. The PR will be merged once you have approval
4. Delete your branch after merge

## 💬 Questions?

Feel free to open an issue for questions or join discussions!

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to OrderEase! 🙏
