================================================================================
                        CONNX SERVER - README
                Backend API Documentation & Architecture
================================================================================

PROJECT OVERVIEW:
Connx Server is a Node.js/Express REST API backend that powers the Connx platform.
It handles user authentication, post management, image uploads, and social features
like following/followers system.

TECHNOLOGY STACK:
- Node.js with ES Modules
- Express.js (Web Framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Cloudinary (Image Storage)
- Nodemailer (Email Service)
- CORS (Cross-Origin Resource Sharing)

================================================================================
                           FILE STRUCTURE
================================================================================

ROOT FILES:
-----------
• server.js                  - Main application entry point
• package.json               - Dependencies and scripts
• vercel.json               - Vercel deployment configuration

DIRECTORIES:
============

1. CONTROLLERS/ - Business logic and request handlers
   ├── auth.js              - Authentication & user profile operations
   ├── post.js              - Post CRUD & social features (like, comment)
   └── emailconfig.js       - Email sending configuration

2. MODELS/ - MongoDB schemas
   ├── user.js              - User schema (name, email, followers, etc.)
   └── posts.js             - Post schema (content, image, comments, likes)

3. ROUTES/ - API endpoint definitions
   ├── auth.js              - Authentication routes
   └── post.js              - Post-related routes

4. MIDDLEWARE/ - Request processing
   └── index.js             - JWT authentication middleware

5. HELPERS/ - Utility functions
   └── auth.js              - Password hashing and comparison functions

================================================================================
                         DATABASE MODELS
================================================================================

USER MODEL (models/user.js)
==========================

Fields:
-------
_id                 ObjectId      - MongoDB auto-generated ID
name                String        - User's display name (auto-generated)
email               String        - User's email (unique, required)
password            String        - Hashed password (min 6 chars, required)
username            String        - Username (unique, required)
about               String        - User biography/bio section
image               Object        - Profile image
  ├── url           String        - Image URL from Cloudinary
  └── public_id     String        - Cloudinary public ID for deletion
following           Array         - Array of User IDs the user follows
followers           Array         - Array of User IDs following this user
createdAt           Timestamp     - Account creation date
updatedAt           Timestamp     - Last profile update date

Indexes:
- email (unique)
- username (unique)


POST MODEL (models/posts.js)
=============================

Fields:
-------
_id                 ObjectId      - MongoDB auto-generated ID
content             Mixed         - Post text content (required)
postedBy            ObjectId      - Reference to User who created post
image               Object        - Post image (optional)
  ├── url           String        - Image URL from Cloudinary
  └── public_id     String        - Cloudinary public ID
likes               Array         - Array of User IDs who liked the post
comments            Array         - Array of comment objects
  ├── _id           ObjectId      - Comment ID (auto-generated)
  ├── text          String        - Comment text
  ├── created       Timestamp     - Comment creation time
  └── postedBy      ObjectId      - Reference to User who commented
createdAt           Timestamp     - Post creation date
updatedAt           Timestamp     - Last post edit date

================================================================================
                         API ENDPOINTS
================================================================================

BASE URL: http://localhost:8000/api (or deployed URL)

AUTHENTICATION ENDPOINTS:
==========================

1. POST /register
   --------
   Description: Register a new user account
   Authorization: None (Public)
   
   Request Body:
   {
     "username": "string (required, unique)",
     "email": "string (required, unique, valid email)",
     "password": "string (required, min 6 chars)",
     "confirmpassword": "string (required, must match password)"
   }
   
   Response (Success - 200):
   {
     "ok": true
   }
   
   Response (Error - 400):
   {
     "error": "Detailed error message"
   }
   
   Validations:
   - Username cannot be empty
   - Email cannot be empty
   - Email must not already exist in database
   - Password must be at least 6 characters
   - Password and confirmpassword must match


2. POST /login
   -----------
   Description: Authenticate user and receive JWT token
   Authorization: None (Public)
   
   Request Body:
   {
     "email": "string (required)",
     "password": "string (required)"
   }
   
   Response (Success - 200):
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "_id": "ObjectId",
       "username": "string",
       "email": "string",
       "name": "string",
       "about": "string",
       "image": { "url": "string", "public_id": "string" },
       "followers": [],
       "following": [],
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
   }
   
   Response (Error - 400):
   {
     "error": "User Does not exist" | "Incorrect Credentials"
   }
   
   Token Details:
   - Expires in 7 days
   - Must be sent in Authorization header: "Bearer <token>"
   - Uses HS256 algorithm


3. GET /current-user
   -----------------
   Description: Verify current user's authentication status
   Authorization: Required (Bearer token)
   
   Response (Success - 200):
   {
     "ok": true
   }
   
   Response (Error - 401):
   {
     "error": "Unauthorized"
   }


4. POST /forgot-password
   ---------------------
   Description: Reset password without authentication
   Authorization: None (Public)
   
   Request Body:
   {
     "email": "string (required)",
     "newpassword": "string (required, min 6 chars)",
     "confirmpassword": "string (required)"
   }
   
   Response (Success - 200):
   {
     "success": "Congrats ,Now you can login with your new password"
   }
   
   Response (Error - 400):
   {
     "error": "Error message"
   }


5. POST /resetpassword
   -------------------
   Description: Send password reset token via email
   Authorization: None (Public)
   
   Request Body:
   {
     "email": "string (required, user's email)"
   }
   
   Response (Success - 200):
   {
     "success": "Password reset link sent to your email address."
   }
   
   Response (Error - 404):
   {
     "error": "Email not found. Please enter a valid email address."
   }
   
   Token Details:
   - Token expires in 1 hour
   - Sent via email with reset link
   - Link format: http://connx.vercel.app/reset?token={token}&redirect=...


6. PUT /profile-update
   -------------------
   Description: Update user profile information
   Authorization: Required (Bearer token)
   
   Request Body (all fields optional):
   {
     "username": "string",
     "name": "string",
     "about": "string",
     "password": "string (min 6 chars)",
     "image": { "url": "string", "public_id": "string" }
   }
   
   Response (Success - 200):
   {
     "user": {
       "_id": "ObjectId",
       "username": "string",
       "email": "string",
       "name": "string",
       "about": "string",
       "image": { "url": "string", "public_id": "string" },
       "followers": [],
       "following": [],
       "createdAt": "timestamp",
       "updatedAt": "timestamp"
     }
   }
   
   Response (Error - 400):
   {
     "error": "Duplicate Username" | "Error message"
   }


USER FOLLOWING/FOLLOWERS ENDPOINTS:
====================================

7. PUT /user-follow
   ----------------
   Description: Follow a user
   Authorization: Required (Bearer token)
   Middleware: requireSignIn, addFollower
   
   Request Body:
   {
     "_id": "ObjectId (user ID to follow)"
   }
   
   Response (Success - 200):
   {
     "user": {
       "_id": "ObjectId",
       "username": "string",
       "following": ["...array of followed user IDs"],
       "followers": ["...array of follower user IDs"],
       ...other user fields
     }
   }


8. PUT /user-unfollow
   ------------------
   Description: Unfollow a user
   Authorization: Required (Bearer token)
   Middleware: requireSignIn, removeFollower
   
   Request Body:
   {
     "_id": "ObjectId (user ID to unfollow)"
   }
   
   Response (Success - 200):
   {
     "user": {...updated user object}
   }


9. GET /find-people
   ----------------
   Description: Find suggested people to follow
   Authorization: Required (Bearer token)
   
   Response (Success - 200):
   [
     {
       "_id": "ObjectId",
       "username": "string",
       "name": "string",
       "image": { "url": "string", "public_id": "string" },
       "about": "string",
       ...other user fields
     },
     ...up to 10 users (excluding already following)
   ]
   
   Logic:
   - Returns 10 users not in current user's following list
   - Excludes the current user


10. GET /user-following
    ------------------
    Description: Get list of users the current user is following
    Authorization: Required (Bearer token)
    
    Response (Success - 200):
    [
      {
        "_id": "ObjectId",
        "username": "string",
        "name": "string",
        ...user fields
      },
      ...array of followed users
    ]


11. GET /user-followers
    -------------------
    Description: Get list of users following the current user
    Authorization: Required (Bearer token)
    
    Response (Success - 200):
    [
      {
        "_id": "ObjectId",
        "username": "string",
        "name": "string",
        ...user fields
      },
      ...array of followers
    ]


POST ENDPOINTS:
===============

12. POST /create-post
    ----------------
    Description: Create a new post
    Authorization: Required (Bearer token)
    
    Request Body:
    {
      "content": "string (required, post text)",
      "image": {
        "url": "string (from upload-image endpoint)",
        "public_id": "string (from upload-image endpoint)"
      }
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "postedBy": "ObjectId",
      "image": { "url": "string", "public_id": "string" },
      "likes": [],
      "comments": [],
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    Response (Error - 400):
    {
      "error": "content is required"
    }


13. POST /upload-image
    ------------------
    Description: Upload and store image on Cloudinary
    Authorization: Required (Bearer token)
    Content-Type: multipart/form-data
    Max File Size: 5MB
    
    Form Data:
    - Field name: "images" (not "image")
    - File: image file
    
    Response (Success - 200):
    {
      "url": "https://cloudinary.com/secure_url",
      "public_id": "cloudinary_public_id"
    }
    
    Response (Error - 400):
    {
      "error": "Error message"
    }


14. GET /user-posts
    ----------------
    Description: Get posts from users current user is following
    Authorization: Required (Bearer token)
    
    Response (Success - 200):
    [
      {
        "_id": "ObjectId",
        "content": "string",
        "postedBy": {
          "_id": "ObjectId",
          "username": "string",
          "image": { "url": "string", "public_id": "string" },
          "about": "string"
        },
        "image": { "url": "string", "public_id": "string" },
        "likes": [],
        "comments": [
          {
            "_id": "ObjectId",
            "text": "string",
            "postedBy": {
              "_id": "ObjectId",
              "username": "string",
              "image": { "url": "string", "public_id": "string" },
              "about": "string"
            },
            "created": "timestamp"
          }
        ],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...array of posts
    ]
    
    Logic:
    - Returns posts from users in current user's following list
    - Includes current user's own posts
    - Limit: 2000 posts
    - Sorted by creation date (newest first)
    - Includes populated user and comment details


15. GET /postByCurrentUser
    -----------------------
    Description: Get only current user's own posts
    Authorization: Required (Bearer token)
    
    Response (Success - 200):
    [
      {
        "_id": "ObjectId",
        "content": "string",
        "postedBy": {...user details},
        "image": { "url": "string", "public_id": "string" },
        "likes": [],
        "comments": [...array of comments],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...array of user's posts
    ]


16. GET /user-post/:_id
    -------------------
    Description: Get a specific post by ID
    Authorization: Required (Bearer token)
    
    Request Parameters:
    - _id: Post ID (in URL path)
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "postedBy": {...user details},
      "image": { "url": "string", "public_id": "string" },
      "likes": [],
      "comments": [...array of comments],
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }


17. PUT /update-post/:_id
    ---------------------
    Description: Update a post
    Authorization: Required (Bearer token)
    
    Request Parameters:
    - _id: Post ID (in URL path)
    
    Request Body:
    {
      "content": "string (optional)",
      "image": { "url": "string", "public_id": "string" } (optional)
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      ...updated post object
    }


18. DELETE /delete-post/:_id
    -----------------------
    Description: Delete a post and remove its image from Cloudinary
    Authorization: Required (Bearer token)
    
    Request Parameters:
    - _id: Post ID (in URL path)
    
    Response (Success - 200):
    {
      "ok": true
    }
    
    Side Effects:
    - Post deleted from MongoDB
    - Associated image deleted from Cloudinary


LIKE & COMMENT ENDPOINTS:
=========================

19. PUT /like-post
    ---------------
    Description: Like a post
    Authorization: Required (Bearer token)
    
    Request Body:
    {
      "_id": "ObjectId (post ID to like)"
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "likes": ["userId1", "userId2", "...current user ID"],
      ...post object
    }


20. PUT /unlike-post
    ----------------
    Description: Unlike a post
    Authorization: Required (Bearer token)
    
    Request Body:
    {
      "_id": "ObjectId (post ID to unlike)"
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "likes": ["userId1", "...other likes excluding current user"],
      ...post object
    }


21. PUT /add-comment
    ----------------
    Description: Add a comment to a post
    Authorization: Required (Bearer token)
    
    Request Body:
    {
      "postId": "ObjectId (post ID)",
      "comments": "string (comment text)"
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "comments": [
        {
          "_id": "ObjectId",
          "text": "string (comment text)",
          "postedBy": {
            "_id": "ObjectId",
            "username": "string",
            "name": "string",
            "image": { "url": "string", "public_id": "string" }
          },
          "created": "timestamp"
        },
        ...array of comments
      ],
      ...post object
    }


22. DELETE /remove-comment
    ----------------------
    Description: Delete a comment from a post
    Authorization: Required (Bearer token)
    
    Request Body:
    {
      "postId": "ObjectId (post ID)",
      "commentId": "ObjectId (comment ID)"
    }
    
    Response (Success - 200):
    {
      "_id": "ObjectId",
      "content": "string",
      "comments": [...updated comments array without deleted comment],
      ...post object
    }
    
    Response (Error - 404):
    {
      "error": "Post not found"
    }


TEST ENDPOINT:
==============

23. GET /hello
    -----------
    Description: Test endpoint to verify server is running
    Authorization: None (Public)
    
    Response (Success - 200):
    "Hello server"

================================================================================
                       MIDDLEWARE & AUTHENTICATION
================================================================================

REQUIRESIGNIN MIDDLEWARE (middleware/index.js)
==============================================

Purpose: Verify JWT token and attach user data to request

Implementation:
- Uses express-jwt package
- Verifies token signature with JWT_SECRET
- Algorithm: HS256
- Extracts user ID from token payload and stores in req.auth._id

Usage:
- Applied to all protected routes
- Returns 401 Unauthorized if token is missing or invalid

Header Format:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


ADDREMOVEFOLLOWER MIDDLEWARE (controllers/auth.js)
===================================================

Purpose: Handle follower/following array updates as middleware

addFollower Middleware:
- Adds current user ID to target user's followers array
- Uses MongoDB $addToSet operator (prevents duplicates)
- Called before userFollow controller

removeFollower Middleware:
- Removes current user ID from target user's followers array
- Uses MongoDB $pull operator
- Called before userUnfollow controller

================================================================================
                       UTILITY FUNCTIONS
================================================================================

PASSWORD HASHING (helpers/auth.js)
==================================

1. hashPassword(password)
   ----------------------
   Purpose: Hash password using bcrypt
   
   Parameters:
   - password: string (plaintext password)
   
   Returns: Promise<string> (hashed password)
   
   Process:
   - Generates salt with 12 rounds
   - Hashes password with salt
   - Returns promise that resolves to hash
   
   Usage:
   const hashedPassword = await hashPassword(password);


2. comparePassword(password, hashed)
   --------------------------------
   Purpose: Compare plaintext password with hash
   
   Parameters:
   - password: string (plaintext password)
   - hashed: string (hashed password from database)
   
   Returns: Promise<boolean> (true if match, false if not)
   
   Usage:
   const isMatch = await comparePassword(password, user.password);


EMAIL CONFIGURATION (controllers/emailconfig.js)
================================================

sendTokenEmail(email, token)
---------------------------
Purpose: Send password reset email with token link

Parameters:
- email: string (recipient email address)
- token: string (reset token from nanoid)

Configuration (from .env):
- SMTP_HOST: Email server host
- SMTP_PORT: Email server port
- SMTP_USER: Sender email address
- SMTP_PASS: Sender email password

Email Template:
- Includes reset password link
- Link format: http://connx.vercel.app/reset?token={token}&redirect=...
- Token valid for 1 hour

Returns: Promise (resolves when email is sent)

================================================================================
                       ENVIRONMENT VARIABLES
================================================================================

Required .env Variables:
========================

DATABASE
  - MongoDB connection string
  - Format: mongodb+srv://username:password@cluster.mongodb.net/dbname
  - Example: mongodb+srv://user:pass@connx.1z2x3.mongodb.net/connxdb

JWT_SECRET
  - Secret key for signing JWT tokens
  - Should be a strong random string
  - Example: your-super-secret-key-12345

CLOUDINARY_NAME
  - Cloudinary account name/cloud name
  - Used for image uploads

CLOUDINARY_KEY
  - Cloudinary API key
  - Used for image operations

CLOUDINARY_SECRET
  - Cloudinary API secret
  - Used for secure image operations

PORT (Optional)
  - Server port number
  - Default: 8000
  - Example: 8000, 5000, 3001

SMTP_HOST
  - Email server hostname
  - Example: smtp.gmail.com

SMTP_PORT
  - Email server port
  - Example: 465 (for SSL), 587 (for TLS)

SMTP_USER
  - Email account username/address
  - Example: your-email@gmail.com

SMTP_PASS
  - Email account password
  - Note: Use app-specific password for Gmail

================================================================================
                       DATA FLOW & WORKFLOWS
================================================================================

REGISTRATION FLOW:
==================
1. Client POST /register with {username, email, password, confirmpassword}
2. Server validates all fields
3. Server checks if email already exists
4. Server hashes password using bcrypt
5. Server creates new User document in MongoDB
6. Server responds with { ok: true }
7. User can now login

LOGIN FLOW:
===========
1. Client POST /login with {email, password}
2. Server finds user by email
3. Server compares provided password with hashed password
4. If match:
   - Server generates JWT token (expires in 7 days)
   - Server returns { token, user }
   - Client stores in localStorage
5. If no match: returns error

POST CREATION FLOW:
===================
1. Client uploads image (if any) via POST /upload-image
   - Image stored on Cloudinary
   - Returns { url, public_id }
2. Client POST /create-post with {content, image}
3. Server creates Post document with current user ID
4. Server returns created post
5. Client updates UI with new post

FOLLOW/UNFOLLOW FLOW:
=====================
1. Client PUT /user-follow with {_id: targetUserId}
2. addFollower middleware:
   - Adds current user ID to target user's followers array
3. userFollow controller:
   - Adds target user ID to current user's following array
   - Returns updated current user object
4. Client updates state with new following list

LIKE/UNLIKE FLOW:
=================
1. Client PUT /like-post with {_id: postId}
2. Server adds current user ID to post's likes array
3. Server returns updated post with new likes count
4. Client updates UI

COMMENT FLOW:
=============
1. Client PUT /add-comment with {postId, comments: text}
2. Server pushes new comment object to post's comments array
3. Server populates comment and post details
4. Server returns updated post with all comments
5. Client displays new comment

DELETE COMMENT FLOW:
====================
1. Client DELETE /remove-comment with {postId, commentId}
2. Server removes comment by ID from post's comments array
3. Server returns updated post
4. Client removes comment from UI

================================================================================
                       DEPLOYMENT NOTES
================================================================================

VERCEL DEPLOYMENT (vercel.json):
================================

Build Configuration:
- src: "server.js"
- use: "@vercel/node"

Rewrites:
- All requests to "/" rewritten to "/server.js"
- Enables API routing on Vercel

Environment Variables on Vercel:
1. Go to Vercel project settings
2. Add all required .env variables
3. Redeploy project

POST Request Size Limits (server.js):
- JSON: 5mb
- URL-encoded: unlimited

CORS Configuration:
- Origin: * (allows all origins)
- Methods: GET, POST, PUT, DELETE
- Headers: Content-Type, Authorization

================================================================================
                       NPM SCRIPTS
================================================================================

npm start       - Run production server (node server.js)
npm run build   - Build for production (node server.js)
npm run dev     - Run with nodemon (auto-reload on changes)
npm test        - Test command (not configured)

Start Command (production):
node server.js

Start Command (development with nodemon):
npx nodemon server.js

================================================================================
                       ERROR HANDLING
================================================================================

HTTP Status Codes:
- 200: Success
- 400: Bad Request (validation error, duplicate email, etc.)
- 401: Unauthorized (invalid token)
- 404: Not Found (user/post not found)
- 500: Server Error

Error Response Format:
{
  "error": "Descriptive error message"
}

or

{
  "success": "Success message"
}

Common Errors:
- "Email already exists" - Email used in registration
- "User Does not exist" - Email not found at login
- "Incorrect Credentials" - Wrong password
- "Unauthorized" - Missing or invalid token
- "Duplicate Username" - Username already taken
- "content is required" - Post content empty
- "Password should be 6 characters long" - Password too short

================================================================================
                       TROUBLESHOOTING
================================================================================

1. Database Connection Error:
   - Check MongoDB connection string in .env
   - Verify database credentials
   - Ensure IP address is whitelisted in MongoDB Atlas

2. Image Upload Fails:
   - Check Cloudinary credentials
   - Verify image file size < 5MB
   - Ensure field name is "images" not "image"

3. Email Not Sending:
   - Check SMTP credentials
   - Verify SMTP host and port
   - Use app-specific password for Gmail
   - Check email account is not blocked

4. Token Expiration Issues:
   - Token expires in 7 days
   - Client must handle 401 errors and redirect to login
   - Clear localStorage and login again

5. CORS Issues:
   - Ensure client URL is in allowed origins
   - Check Authorization header is sent correctly
   - Verify Content-Type header is set

6. Duplicate Key Error:
   - MongoDB collection has duplicate unique index
   - Check database indexes
   - Rebuild indexes if necessary

================================================================================
                       LOGGING & MONITORING
================================================================================

Console Logs:
- "Database connected" - Successful MongoDB connection
- "DB connection error =>" - MongoDB connection failed
- Error logs prefixed with context (e.g., "ERROR WHILE LOGIN =>")
- Request logs via Morgan middleware (dev format)

Morgan Middleware:
- Logs all HTTP requests in development format
- Includes: method, path, status, response time, size

Debug Mode:
- Set NODE_ENV=development for more detailed logs
- Check browser console for client-side errors
- Check server console for backend errors

================================================================================
                       SECURITY NOTES
================================================================================

1. Password Security:
   - Passwords hashed with bcrypt (12 rounds)
   - Passwords never returned in API responses
   - Use HTTPS in production

2. JWT Security:
   - Token signed with JWT_SECRET
   - Token includes expiration (7 days)
   - Token sent in Authorization header (not URL)

3. CORS:
   - Currently allows all origins (*, update for production)
   - Restrict to specific domain in production
   - Example: origin: "https://connx.vercel.app"

4. Environment Variables:
   - Never commit .env file to git
   - Use strong random strings for secrets
   - Rotate secrets regularly

5. Image Security:
   - File size limited to 5MB
   - Uploaded to Cloudinary (not local storage)
   - Public ID stored for deletion capability

6. Email Security:
   - Reset tokens expire in 1 hour
   - Tokens are unique (nanoid)
   - Use SMTP with authentication

================================================================================
                      LAST UPDATED: 2025-11-27
================================================================================
