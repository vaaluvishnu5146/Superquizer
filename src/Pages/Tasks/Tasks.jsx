import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../../Redux/Reducers/tasks.reducer";
import { useRef } from "react";

export default function Tasks() {
  const taskInputRef = useRef(null);
  const dispatcher = useDispatch();
  const { tasks = [] } = useSelector((store) => store.tasks);

  function saveTask(e) {
    e.preventDefault();
    const task = taskInputRef.current.value;
    if (task) {
      dispatcher(addTodo(task));
    }
  }

  function handleDelete(task = "") {
    if (task) {
      dispatcher(deleteTodo(task));
    }
  }

  return (
    <div className="container h-full d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: 350 }}>
        <div className="card-body">
          <div className="inputContainer mb-4">
            <label htmlFor="task">Enter Task</label>
            <input ref={taskInputRef} id="task" placeholder="Enter your Task" />
          </div>
          <div className="d-grid">
            <Button variant="primary" size="md" onClick={saveTask}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <ul key={`${task}-${index}`}>
            {task}
            <button onClick={() => handleDelete(task)}>Delete</button>
          </ul>
        ))}
      </ul>
    </div>
  );
}
