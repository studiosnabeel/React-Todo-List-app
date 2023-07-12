import './todo.css';
import { BiEdit } from 'react-icons/Bi';
import { AiFillDelete } from 'react-icons/Ai';
import TodoForm from '../todoform/TodoForm';
import { useState } from 'react';

const Todo = ({ todos, delTodo, updateTodo, checkedTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todoContainer checked' : 'todoContainer'}
      key={index}
    >
      <p key={todo.id} onClick={() => checkedTodo(todo.id)}>
        {todo.text}
      </p>
      <div>
        <BiEdit
          onClick={() => {
            setEdit({ id: todo.id, value: todo.text });
          }}
        />
        <AiFillDelete
          onClick={() => {
            delTodo(todo.id);
          }}
        />
      </div>
    </div>
  ));
};

export default Todo;
