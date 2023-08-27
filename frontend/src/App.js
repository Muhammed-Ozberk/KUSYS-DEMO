// Import the CSS file
import './App.css';

// Import React and useState component
import React, { useState } from 'react';

// Import Login and Home components
import Login from './components/login/Login';
import Home from './components/home/Home';

// Main application component
function App() {
  // Use loggedIn state to track whether the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('authToken') ? true : false);

  // Function to handle the login process
  const handleLogin = (status) => {
    setLoggedIn(status);
  }

  return (
    <div className="App">
      {/* Show Login or Home component to the user based on the loggedIn state */}
      {loggedIn ? <Home /> : <Login isLogin={handleLogin} />}
    </div>
  );
}

// Export the App component
export default App;
