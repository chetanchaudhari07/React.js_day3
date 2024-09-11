import './App.css'
import { useState } from 'react';

function App() {
  const [task, setTasks] = useState([])
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...task, { text: newTask, completed: false }])
    setNewTask('')

  };

  const toggleTaskCompletion = (index) => {
    const updateTask = task.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task)
    setTasks(updateTask)
  };

  const removeTask = (index) => {
    const updatedTask = task.filter((_, i) => i !== index)
    setTasks(updatedTask)
  };

  const filteredTask = task.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;

  });

  return (
    <div className='box'>
      <h3>Todo List</h3>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className='addtask' onClick={addTask}>AddTask</button>
      <div className="tasks">
        {filteredTask.map((task, index) => (
          <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active' : ''}>
          Active
        </button>
        <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>
          Completed
        </button>
      </div>
    </div>
  )
}

export default App
