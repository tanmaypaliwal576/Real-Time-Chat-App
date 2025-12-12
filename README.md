<h1 align="center">Huddle – Real-Time Chat Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Real--Time-Chat%20App-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Socket.IO-Working-lightgrey?style=for-the-badge&logo=socketdotio" />
  <img src="https://img.shields.io/badge/Full--Stack-Project-green?style=for-the-badge" />
</p>

---

## 🚀 Live Demo  
https://huddle-tgykr.sevalla.app/

---

## 💬 About the Project

**Huddle** is a **full-stack real-time chat application** built using:

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Real-time Engine:** Socket.IO  

The app enables fast, interactive messaging between multiple connected users, with a clean UI and seamless real-time updates.

---

## ⭐ Features

### **Real-Time Communication**
- Messages delivered instantly to all connected users  
- WebSocket-based event communication  

### **Full-Stack Architecture**
- Backend handles message routing  
- Frontend manages UI rendering & interactions  

### **User Experience**
- Auto-scroll chat window  
- Join/Leave notifications  
- Unique user identity  
- Smooth animations  

### **Scalable Architecture**
- Can be extended for authentication  
- Modular folder structure  
- Ready for production deployment  

---

## 🛠️ Tech Stack

### **Frontend**
<p>
  <img src="https://img.shields.io/badge/HTML-005FED?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-264DE4?style=for-the-badge&logo=css3&logoColor=white" />
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
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js          # Socket.IO + Express server
│   └── package.json
│
├── frontend/
│   ├── index.html         # Chat UI
│   ├── style.css          # UI Styling
│   ├── app.js             # Client-side Socket.IO logic
│   └── assets/
│
├── package.json           # Root configuration (optional)
├── package-lock.json
└── README.md
```

---

## 🧩 How It Works

### **1. Client Connects to Server**
Socket.IO establishes a persistent WebSocket connection.

### **2. Client Sends a Message**
```javascript
socket.emit("send-message", message);
```

### **3. Server Receives & Broadcasts**
```javascript
io.emit("receive-message", message);
```

### **4. All Connected Users Receive Message**
Chat updates in real-time, instantly.

---

## 🧪 Future Enhancements

- Private chat rooms  
- User authentication system  
- Typing indicators  
- Online user list  
- Message persistence via database  

---

## 🤝 Contributing  
Contributions are welcome!  
Feel free to open an issue or submit a pull request.

---

## 📚 License  
This project is open-source under the MIT License.
