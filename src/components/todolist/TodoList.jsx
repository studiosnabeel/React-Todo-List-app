import Todo from '../todo/Todo';
import TodoForm from '../todoform/TodoForm';
import './todoList.css';
import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  //Function to store data in localstorage
  const updateLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to Add Todo item
  const addTodo = (todo) => {
    const newTodo = [todo, ...todos];
    setTodos(newTodo);
    updateLocalStorage(newTodo);
  };
  console.log(...todos);

  //Function to update our todo item
  const updateTodo = (todoId, newVal) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newVal : item))
    );
  };
  updateLocalStorage(todos);

  // Function to Delete Todo item
  const delTodo = (id) => {
    const removeArray = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArray);
    updateLocalStorage(removeArray);
  };

  //Function to check the todo
  const checkedTodo = (id) => {
    let updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodo);
    updateLocalStorage(updatedTodo);
  };

  const delAll = () => {
    setTodos([]);
    updateLocalStorage([]);
  };

  return (
    <div className="mainContainer">
      <h1 className="listH1">Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        delTodo={delTodo}
        updateTodo={updateTodo}
        checkedTodo={checkedTodo}
      />
      <button className="formButton" onClick={delAll}>
        Delete All
      </button>
    </div>
  );
};

export default TodoList;
