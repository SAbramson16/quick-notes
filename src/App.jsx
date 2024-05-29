import Header from "./components/Header";
import Note from "./components/Notes";
// import { Outlet } from 'react-router-dom';
// import { useState } from 'react'

function App() {

  return (
    <>
      <Header />
      <main className="main">
        <h2>"Let me just jot this down..."</h2>
       <Note />
      </main>
     </>
  );
};

export default App;
