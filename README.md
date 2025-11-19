📚 Book Haven

Book Haven is a full-stack web application where users can explore, add, update, and manage books in a digital library. Authenticated users can maintain their personal collection, while visitors can browse all available books with filtering and sorting options.

This project demonstrates seamless integration of React, Firebase Authentication, MongoDB Atlas, and a Node.js + Express.js backend, with a modern and responsive UI.

🔑 Key Features

- **Secure Authentication:** Login, registration, and Google sign-in powered by Firebase.  
- **Full CRUD Operations:** Add, view, update, and delete books with real-time updates.  
- **Personalized Dashboard:** “My Books” section for logged-in users to manage their added books.  
- **Modern UI/UX:** Clean and responsive design using Tailwind CSS and DaisyUI.  
- **Interactive Experience:** Real-time comments, tooltips, toast notifications, and theme toggle.  
- **Dark/Light Mode:** Dynamic theme switching between dark and light modes.  
- **Advanced Sorting:** Sort books by rating on the All Books page.  

🛠 Tech Stack

*Frontend:**

- React.js  
- React Router DOM  
- Firebase Authentication  
- Axios  
- Tailwind CSS & DaisyUI  
- React Hot Toast  
- React Tooltip  

**Backend:**

- Node.js  
- Express.js  
- MongoDB Atlas  

**Hosting:**

- Client: Netlify  
- Server: Vercel  
- Database: MongoDB Atlas  



🚀 Live Demo

View Live Project
 https://beamish-cajeta-3a106c.netlify.app/



📂 Folder Structure
Book-Haven/
├── client/        # React frontend
├── server/        # Node.js + Express backend
├── README.md
└── ...

🔗 Installation & Setup

Clone the repository:

git clone https://github.com/sethi353/book-haven-client.git


Install dependencies:

cd client
npm install

cd ../server
npm install


Configure environment variables (.env) for Firebase, MongoDB, and backend server.

Run the project:

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

⚡ Contributions

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.
