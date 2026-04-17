Ontario Tech Student Marketplace (OTSM)

Project Overview:
OTSM is a campus marketplace where Ontario Tech University students can list, browse, save, and purchase items 
sold by fellow students, including used items and products offered by student sellers. It was developed as a 
full-stack web application using Vue.js, Node.js, Express.js, Bulma CSS, jQuery, AJAX, and D3.js.

How to Run the Application:

Prerequisites:
- Node.js installed
- npm installed

After extracting the project ZIP, open the project folder in your terminal or code editor.
Two terminals must be running simultaneously: one for the backend server and one for the frontend client.

1. BACKEND SERVER
- Open the first terminal
- Enter:
   cd server
   npm install
   node server.js
- The backend API will run on: http://localhost:3000

2. FRONTEND CLIENT
- Open the second terminal
- Enter:
   cd client
   npm install
   npm run dev
- The frontend application will run on: http://localhost:5173/

3. OPEN THE APPLICATION
- Open the frontend URL in your browser: http://localhost:5173/
- The frontend communicates with the backend API automatically.

Important Notes:
- Both terminals must remain running while using the application.
- If npm install has already been completed, it does not need to be repeated.
- If port 3000 or 5173 is already in use, close other applications using those ports and restart.

Resources:
The visual design of this project took inspiration from the official Ontario Tech University website: https://ontariotechu.ca
