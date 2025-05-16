import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Homepage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;