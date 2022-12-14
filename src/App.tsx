import { useState } from "react";
import "./App.css";

type Todo = {
  details: string;
  status: "incomplete" | "completed" | "deleted";
  priority: "low" | "med" | "high";
};

const fakeReduxTodos: Todo[] = [
  { details: "get milk", status: "incomplete", priority: "low" },
  { details: "get eggs", status: "completed", priority: "med" },
  { details: "get apples", status: "incomplete", priority: "high" },
  { details: "get apples", status: "deleted", priority: "high" },
];

function App() {
  const globalTodos = fakeReduxTodos;
  const [filterByStatus, setFilterByStatus] = useState<Todo["status"] | null>(
    null
  );
  const [filterByPriority, setFilterByPriority] = useState<
    Todo["priority"] | null
  >(null);
  const [showDeleted, setShowDeleted] = useState(false);

  type FilterByOptions = {
    status: Todo["status"] | null;
    priority: Todo["priority"] | null;
    showDeleted: boolean;
  };

  function filterTodos(todos: Todo[], filterBy: FilterByOptions) {
    const todoFilter = (todo: Todo) => {
      const { status, priority } = todo;

      const isDeleted = status === "deleted";
      if (isDeleted && !filterBy.showDeleted) return false;

      const skipFilter = true;

      const statusMatch = filterBy.status
        ? filterBy.status === status
        : skipFilter;

      const priorityMatch = filterBy.priority
        ? filterBy.priority === priority && filterBy.priority
        : skipFilter;

      const isMatch = statusMatch && priorityMatch;

      return isMatch;
    };

    return todos.filter(todoFilter);
  }

  const allTodos = filterTodos(globalTodos, {
    status: filterByStatus,
    priority: filterByPriority,
    showDeleted: showDeleted,
  });

  return (
    <div className="box">
      <h1>Todos</h1>

      <div>
        <button
          onClick={() =>
            setFilterByStatus((prev) =>
              prev === "completed" ? null : "completed"
            )
          }
          style={{
            backgroundColor:
              filterByStatus === "completed" ? "gray" : undefined,
          }}
          className="button"
        >
          completed
        </button>
        <button
          onClick={() =>
            setFilterByStatus((prev) =>
              prev === "incomplete" ? null : "incomplete"
            )
          }
          style={{
            backgroundColor:
              filterByStatus === "incomplete" ? "gray" : undefined,
          }}
          className="button"
        >
          incomplete
        </button>
        <button onClick={() => setShowDeleted((prev) => !prev)}>
          {showDeleted ? "Hide" : "Show"} deleted
        </button>
      </div>
      <div>
        Priority
        <button
          onClick={() =>
            setFilterByPriority((prev) => (prev === "low" ? null : "low"))
          }
          style={{
            backgroundColor: filterByPriority === "low" ? "gray" : undefined,
          }}
        >
          Low
        </button>
        <button
          onClick={() =>
            setFilterByPriority((prev) => (prev === "med" ? null : "med"))
          }
          style={{
            backgroundColor: filterByPriority === "med" ? "gray" : undefined,
          }}
        >
          Medium
        </button>
        <button
          onClick={() =>
            setFilterByPriority((prev) => (prev === "high" ? null : "high"))
          }
          style={{
            backgroundColor: filterByPriority === "high" ? "gray" : undefined,
          }}
        >
          High
        </button>
      </div>
      {allTodos.map((todo) => (
        <div
          style={{
            textAlign: "left",
            backgroundColor: "#f4f4f4",
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <div>details: {todo.details}</div>
          <div>completed: {todo.status}</div>
          <div>priority: {todo.priority}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
