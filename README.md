# Portfolio Frontend

A modern, responsive portfolio website built with React.js, featuring dynamic content management, interactive UI components, and professional design.

## 🚀 Features

- **Modern React Architecture**: Built with React 19, React Router DOM, and modern hooks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Interactive UI**: Smooth animations with Framer Motion and AOS
- **Dynamic Content**: Real-time data from backend API
- **Authentication**: Secure login and dashboard access
- **Theme Support**: Light and dark mode with smooth transitions
- **SEO Optimized**: React Helmet Async for meta tags and SEO
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized with lazy loading and code splitting

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Modern React with latest features
- **React Router DOM 6.20.1** - Client-side routing
- **Axios 1.6.2** - HTTP client for API requests

### UI & Animation
- **Framer Motion 10.16.16** - Advanced animations and gestures
- **React Icons 4.12.0** - Comprehensive icon library
- **AOS 2.3.4** - Animate On Scroll library
- **Swiper 11.0.5** - Touch slider and carousel

### Forms & Validation
- **React Hook Form 7.48.2** - Performant forms with validation
- **React Hot Toast 2.4.1** - Beautiful toast notifications

### Development Tools
- **React Scripts 5.0.1** - Create React App tooling
- **React Helmet Async 1.3.0** - Document head management
- **React Intersection Observer 9.5.3** - Intersection observer hooks

## 📁 Project Structure

```
portfolio-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/        # Common components
│   │   └── layout/        # Layout components
│   ├── context/           # React Context providers
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── App.js             # Main app component
│   ├── App.css            # Global styles
│   ├── index.js           # App entry point
│   └── index.css          # Base styles and utilities
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API running (see portfolio-backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENVIRONMENT=development
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎭 Animations

### Framer Motion
- Page transitions
- Component animations
- Gesture support
- Layout animations

### AOS (Animate On Scroll)
- Scroll-triggered animations
- Intersection Observer API
- Performance optimized
- Accessibility compliant

## 🔐 Authentication

### AuthContext
- User state management
- Login/logout functionality
- Protected routes
- Token management

## 🎨 Theming

### ThemeContext
- Light/dark mode support
- CSS custom properties
- Smooth transitions
- System preference detection

## 📊 Performance

### Optimization Strategies
- Code splitting with React.lazy()
- Image optimization
- Bundle analysis
- Lazy loading components
- Memoization with React.memo()

## 🧪 Testing

### Testing Stack
- Jest - Unit testing
- React Testing Library - Component testing
- User Event - Interaction testing

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3**: Cloud storage
- **GitHub Pages**: Free hosting

## 📈 SEO & Analytics

### SEO Features
- React Helmet Async for meta tags
- Semantic HTML structure
- Open Graph tags
- Twitter Card support
- Sitemap generation

## 🔧 Development

### Code Quality
- ESLint configuration
- Prettier formatting
- Husky git hooks
- Conventional commits

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Getting Help
- Check the documentation
- Search existing issues
- Create a new issue
- Contact the maintainers

---

**Built with ❤️ using React.js**