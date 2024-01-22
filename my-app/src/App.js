import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  const getStoredTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };
  const [tasks, setTasks] = useState(getStoredTasks);
  const saveTasksToLocalStorage = (newTask) => {
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks([...tasks, newTask]);
    saveTasksToLocalStorage(updatedTasks);
  };

  const totalIncompleteTasks = tasks.filter((task) => !task.completed).length;


  return (
    <div className="App">
      <div className="container">
        <TodoListHeader totalIncompleteTasks={totalIncompleteTasks} />
        <TodoList tasks={tasks} setTasks={setTasks} />
        <Form addTask={addTask} />
      </div>
      <Footer />
    </div>
  );
};
