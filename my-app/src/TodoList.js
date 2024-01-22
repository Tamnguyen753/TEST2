
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, setTasks }) => {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todo-item-container ${
                      task.completed ? "done" : ""
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
  );
};

export default TodoList;
