import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsComplete, deleteTodo, editTodo } from "@actions/todoActions";
import { Todo, TodoState } from "@reducers/todoReducer";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

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
    <ul>
      {props.todoListItems &&
        props.todoListItems.map((todo, index) => {
          const actionsStyle = todo.done
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100";
          return (
            <li key={index} className="flex mb-4 bg-gray-100">
              <div className="w-3/4 h-12 text-left flex items-center">
                <input
                  type="checkbox"
                  className="accent-slate-400 w-1/5"
                  id={`${index}-todoCheck`}
                  checked={todo.done}
                  onChange={() => handleToggleComplete(index)}
                />
                {editableIndex === index ? (
                  <span className="w-2/3">
                    <input
                      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${actionsStyle}`}
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  </span>
                ) : (
                  <label htmlFor={`${index}-todoCheck`}>{todo.text}</label>
                )}
              </div>
              <div className="w-1/4 h-12 flex items-center">
                {editableIndex === index && (
                  <>
                    <button
                      className="w-1/4 p-0 focus:outline-none"
                      onClick={() => handleSaveEdit(index)}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button className="w-1/4 p-0 focus:outline-none" onClick={handleCancelEdit}>
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  className={`w-1/4 ${actionsStyle} p-0 focus:outline-none`}
                  onClick={() => handleEdit(index)}
                  disabled={todo.done}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className={`w-1/4 ${actionsStyle} p-0 focus:outline-none`}
                  onClick={() => handleDeleteTodo(index)}
                  disabled={todo.done}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ToDoList;
