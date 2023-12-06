# 📝 React + Firebase Notes App

Welcome to the React + Firebase Notes App! 🚀

![App Preview](/assets/1.png)

## Features

✨ Create, edit, and delete notes with ease
🔄 Real-time updates with Firebase Firestore
🌐 Responsive design for a seamless experience on all devices

## Screenshots

### Preview

![Preview](/assets/1.png)
![Preview](/assets/2.png)
![Preview](/assets/3.png)
![Preview](/assets/4.png)

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/notes-app.git`
2. Install dependencies: `npm install`
3. Configure Firebase:
   - Create a Firebase project and set up Firestore
   - Enable Firebase Authentication with email/password
   - Add Firebase configuration in `/src/firebaseConfig.js`

```javascript
// /src/config/firebase.js

export const config = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
}
```
