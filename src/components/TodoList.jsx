/* eslint-disable react/prop-types */
import { useState } from "react";

const TodoList = ({ todos, editTodo, deleteTodo, clearTodosByDate }) => {
  const [expandedDates, setExpandedDates] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const handleEditSubmit = (date, id) => {
    editTodo(date, id, editData);
    setEditMode(null);
    setEditData({ title: "", description: "" });
  };

  return (
    <div>
      {Object.keys(todos)
        .sort()
        .map((date) => (
          <div key={date} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h5 mb-0" onClick={() => toggleExpand(date)}>
                {date}
              </h2>
              <button
                onClick={() => clearTodosByDate(date)}
                className="btn btn-danger btn-sm"
              >
                Clear All
              </button>
            </div>
            {expandedDates[date] && (
              <ul className="list-group mt-2">
                {todos[date].map((todo) => (
                  <li
                    key={todo.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {editMode === todo.id ? (
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Title"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Description"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                        />
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleEditSubmit(date, todo.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditMode(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h6 className="mb-0">{todo.title}</h6>
                        <small>{todo.description}</small>
                      </div>
                    )}
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2  "
                        onClick={() => {
                          setEditMode(todo.id);
                          setEditData({
                            title: todo.title,
                            description: todo.description,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTodo(date, todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
};

export default TodoList;
