import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <UserProfile></UserProfile>
    </div>
  );
}

export default App;
