================================================================================
                        CONNX CLIENT - README
                  File Structure & Endpoints Documentation
================================================================================

PROJECT OVERVIEW:
Connx is a Next.js-based talent platform for showcasing skills, sharing content,
and connecting with professionals and clients.

================================================================================
                           FILE STRUCTURE
================================================================================

ROOT FILES:
-----------
• next-env.d.ts              - TypeScript type definitions for Next.js
• next.config.mjs            - Next.js configuration file
• package.json               - Project dependencies and scripts
• postcss.config.mjs         - PostCSS configuration for Tailwind CSS
• tailwind.config.ts         - Tailwind CSS configuration
• tsconfig.json              - TypeScript configuration
• .babelrc                   - Babel configuration for transpilation
• README.md                  - Main README file

DIRECTORIES:
============

1. COMPONENTS/ - Reusable React components
   ├── Nav.jsx                      - Navigation bar component (responsive header)
   └── cards/
       ├── people.jsx              - People/suggestions card display component
       └── PostList.jsx            - Post list display component
   └── forms/
       ├── AuthForm.jsx            - Authentication form (login/register)
       ├── CreatePostForm.jsx      - Form for creating new posts
       └── ForgotPasswordform.jsx  - Password recovery form
   └── router/
       └── UserRouter.jsx          - User route protection component

2. CONTEXT/ - React Context API files
   └── index.jsx               - User authentication context provider

3. FUNCTIONS/ - Utility functions
   └── index.jsx               - Common utility functions

4. PAGES/ - Next.js pages (route endpoints)
   ├── _app.jsx                - App wrapper with global providers
   ├── index.jsx               - Home page (landing page)
   ├── login.jsx               - User login page
   ├── register.jsx            - User registration page
   ├── about.jsx               - About page
   ├── community.jsx           - Community page with WhatsApp integration
   ├── contribution.jsx        - Contribution/Content feed page (authenticated)
   ├── dashboard.jsx           - User dashboard (my posts and suggestions)
   ├── forgot-password.jsx     - Forgot password initiation
   ├── reset.jsx               - Password reset page
   ├── resetPassword.jsx       - Password reset confirmation
   └── comments/
       ├── comment.jsx         - Comment detail page
       └── postDetail.jsx      - Individual post detail page
   └── user/
       ├── follower.tsx        - User's followers list page
       ├── following.jsx       - User's following list page
       └── post/
           ├── [_id].jsx       - Dynamic post detail page by ID
           └── Post.jsx        - Post display page
       └── profile/
           ├── profilepage.jsx - User profile view page
           └── update.jsx      - User profile update page

5. PUBLIC/ - Static assets
   └── global.css              - Global styles

================================================================================
                    ROUTING & ENDPOINTS DOCUMENTATION
================================================================================

PUBLIC ROUTES (No Authentication Required):
============================================

1. / (index.jsx)
   - Landing page with platform introduction
   - Displays "Join Connx" call-to-action button
   - Navigation to "/contribution"

2. /login (login.jsx)
   - User login form
   - Email & password authentication
   - Stores auth token and user data to localStorage
   - Redirects to "/contribution" on successful login
   - ENDPOINTS USED:
     * POST /login { email, password }
     * Response: { user, token }

3. /register (register.jsx)
   - User registration form
   - Collects: username, email, password, confirmpassword
   - Shows success modal on completion
   - ENDPOINTS USED:
     * POST /register { username, email, password, confirmpassword }
     * Response: { ok: boolean }

4. /about (about.jsx)
   - About page content (placeholder structure)

5. /community (community.jsx)
   - Community page with WhatsApp group link
   - Button redirects to WhatsApp group chat

6. /forgot-password (forgot-password.jsx)
   - Forgot password initiation page

7. /reset (reset.jsx)
   - Password reset page

8. /resetPassword (resetPassword.jsx)
   - Password reset confirmation page


AUTHENTICATED ROUTES (Requires Login):
======================================

1. /contribution (contribution.jsx)
   - Main feed/timeline page for authenticated users
   - Displays posts from followed users
   - Includes create post functionality
   - Shows suggested people to follow
   - ENDPOINTS USED:
     * GET /user-posts
       Response: Array of posts with comments
     * GET /find-people
       Response: Array of suggested people
     * POST /create-post { content, image }
       Response: Created post object
     * POST /upload-image (multipart/form-data with "images" field)
       Response: { url, public_id }
     * PUT /like-post { _id }
     * PUT /unlike-post { _id }
     * PUT /add-comment { postId, comments }
       Response: Updated post with comments
     * DELETE /remove-comment { postId, commentId }
     * PUT /user-follow { _id }
       Response: Updated user object with followers/following

2. /dashboard (dashboard.jsx)
   - User's personal dashboard
   - Shows user's own posts (not all posts)
   - Displays suggested people to follow
   - ENDPOINTS USED:
     * GET /postByCurrentUser
       Response: Array of current user's posts
     * GET /find-people
       Response: Array of suggested people
     * POST /create-post { content, image }
     * POST /upload-image (multipart/form-data)
     * PUT /like-post { _id }
     * PUT /unlike-post { _id }
     * PUT /add-comment { postId, comments }
     * DELETE /remove-comment { postId, commentId }
     * DELETE /delete-post/{post._id}
     * PUT /user-follow { _id }

3. /user/follower (follower.tsx)
   - Displays user's followers list

4. /user/following (following.jsx)
   - Displays user's following list

5. /user/post/[_id] (Dynamic route)
   - Individual post detail page
   - Dynamic routing by post ID

6. /user/post/Post.jsx
   - Post display component/page

7. /user/profile/profilepage (profilepage.jsx)
   - User profile view page
   - Displays profile information

8. /user/profile/update (update.jsx)
   - User profile update page
   - Allows editing profile information

================================================================================
                        API ENDPOINTS SUMMARY
================================================================================

AUTHENTICATION ENDPOINTS:
------------------------
POST   /login                    - User login
POST   /register                 - User registration
POST   /forgot-password          - Request password reset
POST   /reset                    - Reset password

POST ENDPOINTS:
--------------
POST   /create-post              - Create a new post
POST   /upload-image             - Upload image for post
GET    /user-posts               - Get authenticated user's feed posts
GET    /postByCurrentUser        - Get current user's own posts
DELETE /delete-post/{id}         - Delete a specific post

COMMENT ENDPOINTS:
-----------------
PUT    /add-comment              - Add comment to a post
DELETE /remove-comment           - Remove comment from a post

LIKE ENDPOINTS:
--------------
PUT    /like-post                - Like a post
PUT    /unlike-post              - Unlike a post

USER ENDPOINTS:
--------------
GET    /find-people              - Find suggested people to follow
PUT    /user-follow              - Follow a user

================================================================================
                         COMPONENT STRUCTURE
================================================================================

Nav.jsx
-------
- Responsive navigation bar using Material-UI
- Shows logo and navigation links
- Desktop menu: Home, Become Contributor, About, Community
- User menu with Dashboard, Profile, Logout options
- Mobile hamburger menu and drawer navigation
- Authentication state validation

AuthForm.jsx
-----------
- Reusable authentication form for login/register
- Handles form submission and validation
- Loading state management

CreatePostForm.jsx
------------------
- Form for creating new posts
- Image upload capability
- Content textarea
- Submit button with loading state

PostList.jsx
-----------
- Displays list of posts
- Shows post content, images, likes, comments
- Like/Unlike functionality
- Comment modal
- Delete functionality (for own posts)

People.jsx
---------
- Displays suggested people cards
- Follow button
- Profile information display

================================================================================
                       AUTHENTICATION FLOW
================================================================================

1. User registers at /register
   - Submits: username, email, password, confirmpassword
   - API: POST /register
   - Success: Shows modal, user redirects to /login

2. User logs in at /login
   - Submits: email, password
   - API: POST /login
   - Response: { user, token }
   - Stored in localStorage as "auth"
   - Redirects to /contribution

3. User authentication is maintained via:
   - localStorage key: "auth" storing { user, token }
   - UserContext provides global auth state
   - Protected routes check localStorage on mount
   - Redirect to /login if no token found

4. Logout:
   - Clears localStorage
   - Resets context state
   - Redirects to /login

================================================================================
                         STORAGE LOCATION
================================================================================

localStorage Key: "auth"
Format: JSON string containing:
{
  "user": {
    "_id": "user_id",
    "username": "username",
    "email": "email",
    "image": { "url": "...", "public_id": "..." },
    "followers": [],
    "following": [],
    ...other user properties
  },
  "token": "jwt_token_string"
}

================================================================================
                       ENVIRONMENT VARIABLES
================================================================================

The application uses .env files for configuration. Common variables:
- API base URL (if not hardcoded)
- Image upload service credentials
- Other service endpoints

================================================================================
                        STYLING & DESIGN
================================================================================

Styling Libraries Used:
- Tailwind CSS (utility-first CSS framework)
- Material-UI (React component library)
- Bootstrap (CSS framework)
- styled-components (CSS-in-JS)
- Ant Design (UI component library)

Global Styles:
- public/global.css - Global CSS overrides and custom styles

================================================================================
                          DEPENDENCIES
================================================================================

Key npm packages:
- next@14.2.4                   - React framework
- react@18.3.1                  - React library
- axios@1.7.2                   - HTTP client
- antd@5.18.1                   - Ant Design UI library
- @mui/material@5.15.20         - Material-UI components
- react-toastify@10.0.5         - Toast notifications
- moment@2.30.1                 - Date manipulation
- react-highlight-words@0.20.0  - Text highlighting
- draft-js@0.11.7               - Rich text editor
- tailwindcss@3.4.4             - Utility CSS framework

================================================================================
                        NPM SCRIPTS
================================================================================

npm run dev       - Start development server (http://localhost:3000)
npm run build     - Build for production
npm start         - Start production server
npm run lint      - Run ESLint

================================================================================
                          NOTES & TIPS
================================================================================

1. Protected Routes:
   - Use UserRouter.jsx component to protect routes
   - Automatically redirects unauthenticated users to /login

2. Image Uploads:
   - Images are uploaded via /upload-image endpoint
   - Returns { url, public_id } for storing references

3. Real-time Updates:
   - After post/comment operations, fetchUserPost() is called
   - Refreshes the entire post list from server

4. Responsive Design:
   - Uses Tailwind CSS responsive classes
   - Mobile menu drawer for smaller screens
   - Conditional sidebar rendering based on window width

5. Error Handling:
   - Toast notifications for errors and success
   - Error responses from API are displayed to user

6. Token Validation:
   - Nav.jsx validates token expiration on page load
   - Removes expired tokens from localStorage

================================================================================
                       TROUBLESHOOTING
================================================================================

1. Users redirected to /login unexpectedly:
   - Check localStorage "auth" key
   - Verify token is not expired
   - Clear browser cache and try again

2. Images not uploading:
   - Verify /upload-image endpoint is working
   - Check file size limits
   - Ensure formData uses "images" field name

3. Posts not displaying:
   - Check API response from /user-posts or /postByCurrentUser
   - Verify authentication token is valid
   - Check browser console for errors

4. Navigation issues:
   - Clear Next.js cache: rm -rf .next
   - Rebuild: npm run build

================================================================================
                      LAST UPDATED: 2025-11-27
================================================================================
