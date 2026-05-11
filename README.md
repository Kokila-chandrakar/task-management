# Task Management App

A full-stack Task Management Application built using the MERN stack. This project helps users manage daily tasks efficiently with features like task creation, authentication, real-time updates, and task tracking.

---

## 🚀 Features

* User Authentication (JWT)
* Create, Update, Delete Tasks
* Real-Time Updates using Socket.IO
* Responsive Frontend
* REST API Integration
* Secure Password Hashing with bcrypt
* MongoDB Database Support

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast
* Date-fns

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Socket.IO
* dotenv

---

## 📂 Project Structure

```bash
Task-Management-App/
│
├── Backend/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── Server.js
│   └── Package.json
│
├── Frontend/
│   ├── Contexts/
│   ├── App.js
│   └── Package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

---

### 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| POST   | /register  | Register User |
| POST   | /login     | Login User    |
| GET    | /tasks     | Get All Tasks |
| POST   | /tasks     | Create Task   |
| PUT    | /tasks/:id | Update Task   |
| DELETE | /tasks/:id | Delete Task   |

---

## 📸 Screenshots

Add your project screenshots here.

---

## 🎯 Future Improvements

* Task Priority Levels
* Dark Mode
* Team Collaboration
* Notifications & Reminders
* Drag & Drop Tasks

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

Kokila Chandrakar

* B.Tech CSE (AI & ML)
* Passionate about Web Development & Cloud Computing
