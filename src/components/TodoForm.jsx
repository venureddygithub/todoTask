/* eslint-disable react/prop-types */
import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) return;
    addTodo(title, description, date);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
