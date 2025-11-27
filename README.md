# 🚀 CONNX - Talent Platform & Social Network

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.4-000000.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.3.0-13AA52.svg)

> **CONNX** is a full-stack talent platform that connects professionals, showcases skills, and fosters meaningful collaborations. Share posts, build your portfolio, and connect with like-minded professionals in a vibrant community.

## 🎯 Project Overview

CONNX is a modern social networking and talent-sharing platform built with cutting-edge web technologies. It enables users to:
- Create and share content (posts with images)
- Build a professional network (follow/followers system)
- Engage with the community (likes and comments)
- Discover talented professionals
- Manage their professional profile

### Key Features

✨ **User Authentication**
- Secure registration and login with JWT tokens
- Password hashing with bcrypt
- Password reset via email
- Token expiration (7 days)

📝 **Post Management**
- Create posts with text and images
- Edit and delete posts
- Like/unlike posts
- Add and remove comments
- Image storage via Cloudinary

👥 **Social Features**
- Follow/unfollow users
- View followers and following lists
- Discover suggested people to follow
- See posts from followed users in personalized feed

🎨 **User Profile**
- Customizable profile with avatar
- Bio/about section
- Profile picture upload
- Follow statistics

📧 **Email Services**
- Password reset emails
- Email verification
- SMTP integration with Nodemailer

🖼️ **Image Management**
- Cloudinary integration for image storage
- Image optimization and CDN delivery
- Automatic image cleanup on post deletion

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18.3.1** | UI Library |
| **Next.js 14.2.4** | React Framework (SSR, routing) |
| **Tailwind CSS** | Utility-first CSS framework |
| **Material-UI 5.15.20** | Component library |
| **Ant Design 5.18.1** | Enterprise UI components |
| **Axios 1.7.2** | HTTP client |
| **React Toastify** | Notifications |
| **React-highlight-words** | Text highlighting |
| **Draft.js** | Rich text editor |
| **Moment.js** | Date formatting |
| **TypeScript 5.4.5** | Type safety |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js 4.19.2** | Web framework |
| **MongoDB 8.3.0** | NoSQL database |
| **Mongoose 8.3.0** | MongoDB ODM |
| **JWT (express-jwt)** | Authentication |
| **Bcrypt 5.1.1** | Password hashing |
| **Cloudinary 2.1.0** | Image storage & CDN |
| **Nodemailer 6.9.13** | Email sending |
| **Morgan 1.10.0** | HTTP logging |
| **CORS 2.8.5** | Cross-origin requests |
| **Dotenv 16.4.5** | Environment variables |

---

## 📁 Project Structure

```
connxmain/
│
├── client/                          # Next.js Frontend Application
│   ├── components/
│   │   ├── Nav.jsx                 # Navigation bar
│   │   ├── cards/
│   │   │   ├── PostList.jsx        # Post list display
│   │   │   └── people.jsx          # People suggestions
│   │   ├── forms/
│   │   │   ├── AuthForm.jsx        # Login/Register form
│   │   │   ├── CreatePostForm.jsx  # Post creation
│   │   │   └── ForgotPasswordform.jsx
│   │   └── router/
│   │       └── UserRouter.jsx      # Route protection
│   ├── context/
│   │   └── index.jsx               # User context provider
│   ├── pages/
│   │   ├── _app.jsx                # App wrapper
│   │   ├── index.jsx               # Landing page
│   │   ├── login.jsx               # Login page
│   │   ├── register.jsx            # Registration page
│   │   ├── dashboard.jsx           # User dashboard
│   │   ├── contribution.jsx        # Main feed
│   │   ├── about.jsx               # About page
│   │   ├── community.jsx           # Community page
│   │   └── user/                   # User-related pages
│   │       ├── profile/
│   │       ├── post/
│   │       ├── follower.tsx
│   │       └── following.jsx
│   ├── public/
│   │   └── global.css              # Global styles
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── server/                          # Express.js Backend API
│   ├── controllers/
│   │   ├── auth.js                 # Auth & user logic
│   │   ├── post.js                 # Post management logic
│   │   └── emailconfig.js          # Email configuration
│   ├── models/
│   │   ├── user.js                 # User schema
│   │   └── posts.js                # Post schema
│   ├── routes/
│   │   ├── auth.js                 # Auth routes
│   │   └── post.js                 # Post routes
│   ├── middleware/
│   │   └── index.js                # JWT middleware
│   ├── helpers/
│   │   └── auth.js                 # Password utilities
│   ├── server.js                   # Server entry point
│   ├── package.json
│   ├── vercel.json                 # Vercel config
│   └── readme.txt                  # Server documentation
│
├── README.md                        # This file
└── connxmain/
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **npm** or **yarn** package manager
- **MongoDB** (Cloud or local)
- **Cloudinary** account (for image uploads)
- **Email credentials** (Gmail/SMTP for password reset)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/amitkumar2308/connxmain.git
cd connxmain
```

#### 2. Setup Backend Server

```bash
cd server
npm install
```

Create `.env` file in the server directory:
```env
# Database
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/connxdb

# JWT
JWT_SECRET=your-super-secret-key-here

# Cloudinary
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET=your-cloudinary-api-secret

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# Server Port
PORT=8000
```

Start the server:
```bash
npm start
# or for development with auto-reload
npx nodemon server.js
```

Server will run at: `http://localhost:8000`

#### 3. Setup Frontend Client

```bash
cd ../client
npm install
```

Create `.env.local` file in the client directory:
```env
# API configuration (if needed)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the development server:
```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:8000/api`
- **Production**: Your deployed server URL

### Key Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register new user |
| `POST` | `/login` | User login |
| `GET` | `/current-user` | Verify authentication |
| `POST` | `/forgot-password` | Request password reset |
| `POST` | `/resetpassword` | Send reset link |

#### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/create-post` | Create new post |
| `GET` | `/user-posts` | Get feed posts |
| `GET` | `/postByCurrentUser` | Get user's posts |
| `DELETE` | `/delete-post/:id` | Delete post |
| `PUT` | `/like-post` | Like a post |
| `PUT` | `/unlike-post` | Unlike a post |
| `PUT` | `/add-comment` | Add comment |
| `DELETE` | `/remove-comment` | Remove comment |

#### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/profile-update` | Update profile |
| `GET` | `/find-people` | Find people to follow |
| `PUT` | `/user-follow` | Follow user |
| `PUT` | `/user-unfollow` | Unfollow user |
| `GET` | `/user-following` | Get following list |
| `GET` | `/user-followers` | Get followers list |

#### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload-image` | Upload image to Cloudinary |

For detailed API documentation, see [server/readme.txt](server/readme.txt)

---

## 📖 Usage Guide

### 1. User Registration
1. Navigate to `/register`
2. Enter username, email, password
3. Confirm password
4. Click "Create Account"
5. Success modal appears
6. Redirect to login

### 2. User Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"
4. JWT token saved to localStorage
5. Redirect to `/contribution` (main feed)

### 3. Create a Post
1. Go to `/contribution` or `/dashboard`
2. Click "Create Post" button
3. Write post content
4. (Optional) Upload an image
5. Click "Post"
6. Post appears in feed

### 4. Interact with Posts
- **Like**: Click heart icon
- **Comment**: Click comment icon, write comment, submit
- **Delete**: Click delete (only on own posts)

### 5. Follow Users
1. Go to Suggested For You section
2. Click "Follow" button next to user
3. User added to your following list
4. See their posts in your feed

### 6. View Profile
1. Click your username in navbar
2. View profile or edit profile
3. Update avatar, bio, name, username

---

## 🔐 Authentication Flow

```
User Registration
     ↓
POST /register {username, email, password}
     ↓
Validate input & check duplicate email
     ↓
Hash password with bcrypt
     ↓
Save user to MongoDB
     ↓
Response: {ok: true}
     ↓
User logs in

User Login
     ↓
POST /login {email, password}
     ↓
Find user by email
     ↓
Compare password with hash
     ↓
Generate JWT token (7 days expiration)
     ↓
Response: {token, user}
     ↓
Store in localStorage
     ↓
Access protected routes with JWT
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  username: String (unique),
  about: String (bio),
  image: {
    url: String,
    public_id: String
  },
  following: [ObjectId],
  followers: [ObjectId],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Post Model
```javascript
{
  _id: ObjectId,
  content: String,
  postedBy: ObjectId (ref: User),
  image: {
    url: String,
    public_id: String
  },
  likes: [ObjectId],
  comments: [{
    _id: ObjectId,
    text: String,
    postedBy: ObjectId (ref: User),
    created: Timestamp
  }],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js
4. Set environment variables
5. Deploy automatically on push

### Backend (Vercel)
1. See `server/vercel.json` for configuration
2. Deploy using Vercel CLI: `vercel`
3. Set environment variables in Vercel dashboard
4. API will be available at Vercel domain

### Database (MongoDB Atlas)
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Add IP whitelist
4. Create database user
5. Copy connection string
6. Add to `.env` DATABASE variable

### Images (Cloudinary)
1. Create account at cloudinary.com
2. Get Cloud Name, API Key, API Secret
3. Add to `.env` CLOUDINARY_* variables

---

## 🧪 Testing

### Test Register
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "confirmpassword": "123456"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:8000/api/current-user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎨 UI/UX Features

- **Responsive Design**: Mobile, tablet, and desktop support
- **Material-UI Components**: Professional UI elements
- **Ant Design Integration**: Enterprise components
- **Tailwind CSS**: Custom styling and utilities
- **Toast Notifications**: Real-time user feedback
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages
- **Dark/Light Mode Ready**: Easy to implement

---

## 📊 Performance Optimizations

- **Image Optimization**: Cloudinary handles image delivery
- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: Lazy load heavy components
- **Caching**: JWT tokens cached in localStorage
- **MongoDB Indexing**: Optimized queries
- **Pagination**: Limit 2000 posts per query
- **Population**: Only fetch needed fields

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 12 rounds
- **JWT Authentication**: Secure token-based auth
- **Token Expiration**: 7-day expiration for security
- **CORS Protection**: Configured CORS headers
- **Environment Variables**: Sensitive data in .env
- **HTTPS**: Use HTTPS in production
- **Input Validation**: Server-side validation
- **Email Verification**: Optional email confirmation

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### MongoDB Connection Error
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure database credentials are correct
- Test connection: `mongosh "mongodb+srv://..."`

### Image Upload Fails
- Check Cloudinary credentials
- Verify file size < 5MB
- Ensure field name is "images"
- Check CORS headers

### Email Not Sending
- Verify SMTP credentials
- Use app-specific password for Gmail
- Check firewall/antivirus blocking SMTP
- Enable "Less secure app access" (if using Gmail)

### Token Expiration Issues
- Token lasts 7 days
- Clear localStorage and login again
- Check system time synchronization

---

## 📝 Development Workflow

### Backend Development
```bash
cd server
npm install
npx nodemon server.js
# Server runs at http://localhost:8000
```

### Frontend Development
```bash
cd client
npm install
npm run dev
# Client runs at http://localhost:3000
```

### Building for Production

Backend:
```bash
cd server
npm run build
npm start
```

Frontend:
```bash
cd client
npm run build
npm start
```

---

## 📦 Available Scripts

### Client Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

### Server Scripts
```bash
npm start         # Start server (production)
npm run build     # Build for production
npm run dev       # Start with nodemon (development)
npm test          # Run tests (not configured)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
```

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Amit Kumar**
- GitHub: [@amitkumar2308](https://github.com/amitkumar2308)
- Email: amitk.developer23@gmail.com

---

## 🔗 Resources & Links

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Cloudinary API](https://cloudinary.com/documentation)

### Tools & Services
- [Vercel Deployment](https://vercel.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)
- [JWT Guide](https://jwt.io/)

### External Links
- [WhatsApp Community](https://chat.whatsapp.com/LnH7GvcK3sV541KWMtr5RY)
- [Live Demo](https://connx.vercel.app/)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Support

Have questions? Create an issue or reach out:
- GitHub Issues: [Create Issue](https://github.com/amitkumar2308/connxmain/issues)
- Email: amitk.developer23@gmail.com

---

## 🎯 Roadmap

- [ ] Dark/Light Mode Toggle
- [ ] Notifications System
- [ ] Direct Messaging
- [ ] Advanced Search
- [ ] User Verification Badge
- [ ] Video Upload Support
- [ ] Mobile App (React Native)
- [ ] Analytics Dashboard
- [ ] Advanced User Recommendations
- [ ] Block/Report User Features

---

## 📚 Additional Documentation

- **Client README**: See [client/readme.txt](client/readme.txt) for detailed frontend documentation
- **Server README**: See [server/readme.txt](server/readme.txt) for detailed backend documentation

---

**Made with ❤️ by Amit Kumar**

```
██████╗ ██████╗ ███╗   ██╗███╗   ██╗██╗  ██╗
██╔════╝██╔═══██╗████╗  ██║████╗  ██║╚██╗██╔╝
██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║ ╚███╔╝ 
██║     ██║   ██║██║╚██╗██║██║╚██╗██║ ██╔██╗ 
╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║██╔╝ ██╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝
```
