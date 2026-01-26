NoteHub 📝
NoteHub is a full-stack web application designed for managing personal notes. It features a robust user authentication system, allowing users to securely register, log in, and manage their private collection of notes.

🚀 Features
User Authentication: Secure Registration, Login, and Logout functionality.

Private Routes: User notes are protected and accessible only after successful authentication.

CRUD Operations: Create, Read, and Delete notes in real-time.

State Persistence: User session is maintained across page refreshes.

Responsive Design: A clean and intuitive interface that works across all devices.

Loading States: Integrated loaders for a smooth user experience during API calls.

🛠 Tech Stack
React: For building the component-based user interface.

Redux Toolkit: For centralized state management (auth, notes, and loading states).

React Router: For navigation and implementing protected/public routes.

Axios: For handling asynchronous HTTP requests to the backend API.

CSS Modules / Styled Components: For modular and maintainable styling.

Vercel: For automated deployment and hosting.

📦 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/valeriia2707/ваш-репозиторій.git
Install dependencies:

Bash
npm install
Create a .env file (if applicable) and add your API base URL:

Фрагмент коду
REACT_APP_API_URL=https://connections-api.herokuapp.com
Start the development server:

Bash
npm run dev
🔐 Key Concepts Demonstrated
Handling JWT Tokens for persistent authentication.

Implementing Async Thunks in Redux for side effects.

Conditional rendering based on authentication status.
