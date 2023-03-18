import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/chat' element={<ChatPage/>} />
    </Routes>
  );
}

export default App;
