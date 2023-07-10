import { useEffect, useState } from 'react';
import './TodoList.css';
import { BiBookAdd } from 'react-icons/Bi';
import { FiEdit } from 'react-icons/Fi';
import { MdDelete } from 'react-icons/Md';

const TodoList = () => {
  const [tasks, setTasks] = useState('');
  const [array, setArray] = useState([]);
  //create editIndex state to keep track of the index of the item being edited.
  const [editIndex, setEditIndex] = useState(null);
  //create edittext state to store the edited value for the item.
  const [edittext, setEditText] = useState('');
  // create state to change appearance of checked items
  const [checkedItems, setCheckedItems] = useState([]);

  // Helper functions

  //change todo list input value
  const handleChange = (e) => {
    setTasks(e.target.value);
  };

  //Add Todo list item
  const addItem = () => {
    if (!tasks) {
      alert('Please add a Task');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 10000),
      value: tasks,
    };
    setArray((oldArray) => [...oldArray, item]);
    setTasks('');
  };

  // Delete Todo list item
  const deleteTask = (id) => {
    setArray((oldArray) => oldArray.filter((item) => item.id !== id));
  };

  //Delete all todo items
  const clearAllItem = () => {
    setArray([]);
  };

  //Edit todo item
  const editItem = (index) => {
    const itemToEdit = array[index];
    setEditIndex(index);
    setEditText(itemToEdit.value);
  };

  //handle change in edit input
  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  //save the edited item and set edit index and edit text states back to default
  const handleEditSave = (index) => {
    if (edittext.trim() !== '') {
      const newArray = [...array];
      newArray[index].value = edittext;
      setArray(newArray);
    }
    setEditIndex(null);
    setEditText('');
  };

  //create a function to toggle class on checked
  const handleCheckToggle = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  useEffect(() => {
    console.log(array);
  }, [array]);

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="TodoInput">
        <input
          className="addtask"
          type="text"
          placeholder="Add Task"
          value={tasks}
          onChange={handleChange}
        />
        <p onClick={addItem}>
          <BiBookAdd className="addicon" />
        </p>
      </div>

      <ul className="task-ul">
        {array.map((item, index) => {
          return (
            <>
              <div className="task-container" key={item.id}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={edittext}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSave(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditSave(index);
                      }
                    }}
                  />
                ) : (
                  <>
                    <li onClick={()=> handleCheckToggle(index)} className={checkedItems[index] ?'taskLi checked':"taskLi"} key={item.id}>
                      {item.value}
                    </li>
                    <div>
                      <FiEdit
                        onClick={() => editItem(index)}
                        className="icon"
                      />
                      <MdDelete
                        onClick={() => deleteTask(item.id)}
                        className="icon"
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
      </ul>
      {array.length >= 1 && (
        <button onClick={clearAllItem} className="clearAll">
          Clear All
        </button>
      )}
    </div>
  );
};

export default TodoList;
