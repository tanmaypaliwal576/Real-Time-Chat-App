<h1 align="center">Huddle – Real-Time Chat Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Real--Time-Chat%20App-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Socket.IO-Working-lightgrey?style=for-the-badge&logo=socketdotio" />
  <img src="https://img.shields.io/badge/Full--Stack-MERN%20Style-green?style=for-the-badge" />
</p>

---

## 🚀 Live Demo  
https://huddle-orgg.netlify.app/

---

## 💬 About the Project

**Huddle** is a **full-stack real-time chat application** built with:

- **Frontend:** React + Vite  
- **Styling:** Tailwind  
- **Backend:** Node.js, Express.js  
- **Real-time Engine:** Socket.IO  

The app supports seamless real-time communication, multiple users, and live message broadcasting with a modern UI powered by React.

---

## ⭐ Features

### ⚡ Real-Time Messaging  
- Instant message delivery using Socket.IO  
- WebSocket-based bi-directional event communication  
- Auto-updating UI without page reloads  

### 🧩 Frontend Features (React + Vite)  
- Component-based UI  
- Fast refresh using Vite  
- Smooth message list rendering  
- Join/Leave notifications  
- Auto-scroll chat window  

### 🛠 Backend Features  
- Express server handling connections  
- Socket.IO event broadcasting  
- Modular server architecture  
- Ready to scale with authentication or rooms  

### 🧱 Scalable Architecture  
- Frontend & backend separated  
- Easy to deploy independently  
- Room for future enhancements  

---

## 🛠️ Tech Stack

### **Frontend (React + Vite)**  
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
</p>

### **Backend**
<p>
  <img src="https://img.shields.io/badge/Node.js-68A063?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-000000?style=for-the-badge&logo=socketdotio&logoColor=white" />
</p>

---

## 📂 Project Structure

```
├── backend/
│   ├── server.js            # Express + Socket.IO server
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Chat UI components
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

---

## 🧩 How It Works

### **1. User connects to server**
React app connects to backend via Socket.IO client.

### **2. User sends a message**
```javascript
socket.emit("send-message", message);
```

### **3. Server receives & broadcasts**
```javascript
io.emit("receive-message", message);
```

### **4. Frontend updates UI immediately**
Messages appear instantly for all connected users.

---

## 🔮 Future Enhancements

- Private chat rooms  
- Admin dashboard  

---

## 🤝 Contributing  
Contributions are welcome!  
Open an issue or submit a pull request.

---

## 📚 License  
MIT License.
