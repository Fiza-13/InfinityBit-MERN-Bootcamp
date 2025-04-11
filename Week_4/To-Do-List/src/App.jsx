import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const doAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const doDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const doToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form onSubmit={doAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter Tasks Dear..."
          className="todo-input"
        />
        <button type="submit" className="todo-btn">
          Add Baby....
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => doToggleComplete(index)}>
              {task.text}
              {task.completed ? ' ✅👍' : ' ⬜'}
            </span>
            <button onClick={() => doDeleteTask(index)}>❎</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;