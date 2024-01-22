import { useState } from "react";

const Form = ({addTask}) => {
  const [taskText, setTaskText] = useState("");
  const handleTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== "") {
      console.log("Adding task:", { title: taskText, completed: false, id: Date.now() });
      addTask({ text: taskText, completed: false, id: Date.now() });
      setTaskText("");
    }
    // console.log(taskText);
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={taskText}
        onChange={handleTaskTextChange}
        placeholder="Enter task ..."
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;
