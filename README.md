# 🔐 MERN Authentication System

A full-stack MERN (MongoDB, Express.js, React, Node.js) authentication application with advanced security features including email verification, password reset, and JWT token-based authentication.

## ✨ Features

- 🔑 **User Authentication** - Secure login and registration
- 📧 **Email Verification** - OTP-based email verification system
- 🔄 **Password Reset** - Secure password reset via email
- 🍪 **JWT Tokens** - HTTP-only cookie-based authentication
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🛡️ **Security** - Password hashing with bcrypt, CORS protection
- 📱 **Responsive** - Mobile-friendly interface
- 🔔 **Notifications** - Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending functionality
- **Cookie Parser** - Parse HTTP cookies
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Mern-Auth/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── context/       # React context
│   │   │   └── AppContext.jsx
│   │   ├── assets/        # Static assets
│   │   └── App.jsx        # Main app component
│   └── package.json
│
└── server/                # Node.js backend
    ├── config/            # Configuration files
    │   ├── mongodb.js     # Database connection
    │   ├── nodemailer.js  # Email configuration
    │   └── emailTemplates.js
    ├── controllers/       # Request handlers
    │   ├── authController.js
    │   └── userController.js
    ├── middleware/        # Custom middleware
    │   └── userAuth.js
    ├── models/           # Database models
    │   └── userModel.js
    ├── routes/           # API routes
    │   ├── authRoutes.js
    │   └── userRoutes.js
    └── server.js         # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NileshBhardwaj52/Mern_Auth_Authentication.git
   cd Mern_Auth_Authentication
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Server (.env)
Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mern-auth
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-auth

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
SENDER_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

#### Client (.env)
Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run server
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

## 📧 Email Configuration

This application uses Nodemailer for sending emails. You'll need to configure your email service:

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in your `.env` file

### Other Email Services
You can configure other email services by modifying the `nodemailer.js` configuration file.

## 🔑 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/send-verify-otp` - Send verification OTP
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/send-reset-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### User Routes
- `GET /api/user/data` - Get user profile data
- `GET /api/user/is-auth` - Check authentication status

## 🛡️ Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Tokens** - Secure authentication with HTTP-only cookies
- **Email Verification** - OTP-based email verification
- **CORS Protection** - Configured for secure cross-origin requests
- **Input Validation** - Server-side validation for all inputs
- **Secure Cookies** - HTTP-only cookies for token storage

## 🎨 UI Features

- **Responsive Design** - Works on all device sizes
- **Modern Interface** - Clean and intuitive user experience
- **Loading States** - Visual feedback during operations
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback for user actions
- **Form Validation** - Client-side form validation

## 📱 Pages

- **Home** - Dashboard/welcome page
- **Login** - User authentication page
- **Register** - User registration page
- **Email Verification** - OTP verification page
- **Password Reset** - Reset password page
- **404 Page** - Custom not found page

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

**Nilesh Bhardwaj**
- GitHub: [@Nilesh4158](https://github.com/Nilesh4158)

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Inspiration from various authentication tutorials
- UI components inspired by modern web design trends

---

⭐ **Star this repository if you found it helpful!**
