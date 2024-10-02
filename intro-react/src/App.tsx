
import './App.css'
import Form from './components/Form'
import Navbar from './components/Navbar'
import Todos from './components/Todos';
import Title from './components/Title';
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<{ title: string; content: string }[]>([]);

  const onAdd = (todo: { title: string; content: string }) => {
    setTodos([...todos, todo]);
  };

  const onComplete = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <main>
      <Navbar title="Hiof" text="User user"/>
      <Form onAdd={onAdd}/>
      <Title title="My Todos"/>
      {todos.length > 0 ? (
          <Todos todos={todos} onComplete={onComplete} />
        ) : (
          <p>No todos yet. Add some!</p>
        )}

    </main>
  )
}

export default App
