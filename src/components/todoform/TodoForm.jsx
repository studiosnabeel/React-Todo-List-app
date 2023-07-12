import { useState, useEffect, useRef } from 'react';
import './todoform.css';

const TodoForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  //helper functions
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput('');
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <input
        type="text"
        className="inputForm"
        value={input}
        onChange={handleChange}
        ref={inputRef}
      />
      <button className='formButton'>Submit</button>
    </form>
  );
};

export default TodoForm;
