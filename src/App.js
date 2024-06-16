import React from 'react';
import TodoForm from './components/TodoForm';
import Footer from './components/Footer';
import './style.css';

export default function App() {

  return (
    <div>
      <div className="App">
        <h1>Get Things Done!</h1>
        <TodoForm />
      </div>
      <Footer />
    </div>
  );
}