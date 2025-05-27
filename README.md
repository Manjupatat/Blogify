# Blogify - MERN Blog App 📝

A full-stack Blog Application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can register, login, create, read, update, and delete blog posts. The app supports Markdown, image uploads, and authentication using JWT.


## 🚀 Features

- User Registration & Login with JWT authentication
- Create, Edit, and Delete Blog Posts
- Markdown support for blog content
- Image Upload using `Multer`
- RESTful API using Express.js and MongoDB

## 🛠️ Tech Stack

**Backend**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for Authentication  
- Multer for File Uploads  
- Bcrypt for Password Hashing  

**Others**  
- dotenv for environment variables  
- CORS enabled  
- Markdown parser

## 📁 Project Structure



```
Blogify/
├── controllers/
├── models/
├── routes/
├── uploads/
├── .env
├── server.js
├── README.md
```
## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/Manjupatat/Blogify.git
cd Blogify
```
2. Set up Backend

```bash
npm install
```
# Create a .env file with the following:
```
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
```
```bash
npm start
```

🔐 Environment Variables
Create a .env file in the /backend folder with:

```
PORT=5000
MONGO_URI=your_mongo_connection_uri
JWT_SECRET=your_jwt_secret
```
📸 Screenshots
Add screenshots or GIFs of your app here for better visibility.

🧪 Future Improvements
Rich text editor support (like Quill or TipTap)

Categories and tags

Comments section

Pagination

Admin dashboard

User profile page

🧑‍💻 Author
Manjunatn L Patat

📝 License
This project is licensed under the MIT License.
