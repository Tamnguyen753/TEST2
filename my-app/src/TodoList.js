
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, setTasks }) => {
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  useEffect(() => {
    // Check the URL parameter to determine whether to show only not finished tasks
    const urlParams = new URLSearchParams(window.location.search);
    const withDoneParam = urlParams.get("withDone");
    setShowNotFinishedOnly(withDoneParam !== "1");
  }, []);

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const filteredTasks = showNotFinishedOnly
    ? tasks.filter((task) => !task.completed)
    : tasks;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showNotFinishedOnly}
          onChange={() => setShowNotFinishedOnly(!showNotFinishedOnly)}
        />
        Not finished only
      </label>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`todo-item-container ${task.completed ? "done" : ""
                        }`}
                    >
                      {task.completed ? (
                        <FaRegCheckCircle
                          className="item-done-button"
                          color="#9a9a9a"
                          onClick={() => toggleTaskStatus(task.id)}
                        />
                      ) : (
                        <FaRegCircle
                          className="item-done-button"
                          color="#9a9a9a"
                          onClick={() => toggleTaskStatus(task.id)}
                        />
                      )}
                      <div className="item-title">{task.text}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
