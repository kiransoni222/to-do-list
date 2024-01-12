import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsComplete, deleteTodo, editTodo } from "@actions/todoActions";
import { Todo, TodoState } from "@reducers/todoReducer";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

interface ToDoListProps {
  todoListItems: Todo[];
}

const ToDoList = (props: ToDoListProps) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: TodoState) => state.todos);

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleToggleComplete = (index: number) => {
    dispatch(toggleIsComplete(index));
    setEditableIndex(null);
  };

  const handleDeleteTodo = (index: number) => {
    dispatch(deleteTodo(index));
    setEditableIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditableIndex(index);
    setEditedText(todos[index].text);
  };

  const handleSaveEdit = (index: number) => {
    dispatch(editTodo(index, editedText));
    setEditableIndex(null);
  };

  const handleCancelEdit = () => {
    setEditableIndex(null);
  };

  return (
    <ul className="p-4 m-4 max-w-md rounded border border-gray-400 divide-gray-100">
      {props.todoListItems &&
        props.todoListItems.map((todo, index) => {
          const actionsStyle = todo.completed
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100";
          return (
            <li key={index} className="flex mb-4">
              <div className="w-3/4 h-12 text-left">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                />
                {editableIndex === index ? (
                  <span>
                    <input
                      className={`mb-5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${actionsStyle}`}
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </span>
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>
              <div className="w-1/4 h-12">
                <div className="flex mb-4">
                  <button
                    className={`w-1/2 font-bold py-2 px-4 rounded ${actionsStyle}`}
                    onClick={() => handleEdit(index)}
                    disabled={todo.completed}
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                  <button
                    className={`w-1/2 font-bold py-2 px-4 rounded ${actionsStyle}`}
                    onClick={() => handleDeleteTodo(index)}
                    disabled={todo.completed}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ToDoList;
