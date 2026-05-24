# Louis Aparkwon Sanyenni — Portfolio

A modern, full-stack personal portfolio showcasing professional work and projects. This repository features a responsive React frontend with a Django REST backend, deployed on GitHub Pages.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Features](#features)
- [License](#license)

---

## 🎯 Overview

This portfolio is a full-stack web application designed to showcase professional work, projects, and experience. It combines a modern React frontend with a Django REST API backend, providing a seamless, interactive user experience with professional aesthetics.

**Key Highlights:**
- Dark-themed, modern UI with responsive design
- Interactive project showcase and work portfolio
- RESTful API backend for dynamic content
- Optimized for performance and accessibility
- Deployed on GitHub Pages with custom domain support

---

## 🛠️ Technology Stack

### Frontend
- **React 19** — Modern UI library with hooks
- **Vite** — Lightning-fast build tool and dev server
- **Axios** — Promise-based HTTP client
- **ESLint** — Code quality and style consistency

### Backend
- **Django 4+** — Robust Python web framework
- **Django REST Framework** — RESTful API development
- **django-cors-headers** — Cross-Origin Resource Sharing support
- **Gunicorn** — WSGI application server
- **WhiteNoise** — Static file serving

---

## 📁 Project Structure

```
Portfolio/
├── ReactFrontend/              # React frontend application
│   ├── src/                    # Source code
│   ├── public/                 # Static assets
│   ├── dist/                   # Production build output
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── eslint.config.js        # ESLint configuration
│
├── Backend/                    # Django backend application
│   ├── portfolio/              # Main Django app
│   │   ├── models.py           # Database models
│   │   ├── views.py            # API views
│   │   ├── serializers.py      # DRF serializers
│   │   ├── urls.py             # URL routing
│   │   └── admin.py            # Django admin
│   ├── manage.py               # Django management
│   ├── Pipfile                 # Python dependencies
│   ├── Procfile                # Heroku/deployment config
│   └── db.sqlite3              # Development database
│
├── assets/                     # Shared assets (favicon, icons)
├── index.html                  # Main HTML entry point
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+) and npm
- **Python** (3.11+)
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/King-Leo58148/King-Leo58148.github.io.git
cd Portfolio
```

#### 2. Setup Frontend

```bash
cd ReactFrontend
npm install
```

#### 3. Setup Backend

```bash
cd ../Backend
pip install pipenv
pipenv install
```

---

## 💻 Development

### Running the Frontend

```bash
cd ReactFrontend
npm run dev
```

The development server will start at `http://localhost:5173` with hot module replacement enabled.

### Running the Backend

```bash
cd Backend
pipenv shell
python manage.py runserver
```

The API will be available at `http://localhost:8000`.

### Building for Production

**Frontend:**
```bash
cd ReactFrontend
npm run build
```

Output is generated in `dist/` directory.

**Backend:**
```bash
cd Backend
python manage.py collectstatic
```

### Linting & Quality Checks

**Frontend:**
```bash
cd ReactFrontend
npm run lint
```

---

## 📦 Deployment

### GitHub Pages Deployment

This project is configured for GitHub Pages. For user/organization pages, the site is served from the repository root.

#### Deploy Frontend to GitHub Pages:

```bash
# Build the frontend
cd ReactFrontend
npm run build

# Copy dist contents to root
cp -r dist/* ../

# Commit and push
cd ..
git add .
git commit -m "Deploy: Update portfolio"
git push origin main
```

Your portfolio will be available at `https://King-Leo58148.github.io`

#### Custom Domain (Optional):

1. Create a `CNAME` file in the root directory with your domain name:
   ```
   yourdomain.com
   ```

2. Configure DNS records with your domain registrar to point to GitHub Pages servers.

3. Commit and push the CNAME file:
   ```bash
   git add CNAME
   git commit -m "chore: add custom domain"
   git push origin main
   ```

### Alternative Deployment Options

**Heroku / Railway / Render:**
- Update `.env` configuration for backend
- Use `Procfile` for web process management
- Deploy with platform CLI or GitHub integration

---

## ✨ Features

- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Dark Theme** — Modern, professional aesthetic
- **Dynamic Content** — REST API-powered project showcase
- **Fast Performance** — Vite optimizations and code splitting
- **CORS Support** — Secure cross-origin requests
- **Static Asset Optimization** — WhiteNoise for efficient serving
- **Admin Dashboard** — Django admin for content management

---

## 📝 API Documentation

The backend provides the following endpoints:

- `GET /api/projects/` — Retrieve all projects
- `GET /api/projects/<id>/` — Retrieve project details
- `GET /api/skills/` — Retrieve skill sets
- `GET /api/contact/` — Contact form submission

For full API documentation, visit `/api/docs/` (if schema is enabled).

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `Backend/` directory:

```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=yourdomain.com,King-Leo58148.github.io
CORS_ALLOWED_ORIGINS=https://yourdomain.com
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Louis Aparkwon Sanyenni**

- GitHub: [@King-Leo58148](https://github.com/King-Leo58148)
- Portfolio: [King-Leo58148.github.io](https://King-Leo58148.github.io)

---

## 📞 Support

For questions or issues, please open an [issue](https://github.com/King-Leo58148/King-Leo58148.github.io/issues) on GitHub.