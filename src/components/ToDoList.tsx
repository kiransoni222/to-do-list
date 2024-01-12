import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsComplete, deleteTodo, editTodo } from "@actions/todoActions";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Todo, TodoState } from "@shared/interface";
import { FilterEnums } from "@shared/enums";

interface ToDoListProps {
  todoListItems: Todo[];
}

const ToDoList = (props: ToDoListProps) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: TodoState) => state.todos);
  const filter = useSelector((state: TodoState) => state.filter);
  const [editableId, setEditableId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleToggleComplete = (id: number) => {
    dispatch(toggleIsComplete(id));
    setEditableId(null);
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
    setEditableId(null);
  };

  const handleEdit = (id: number) => {
    const editableIndex = todos.findIndex((todo) => todo.id === id);
    if (editableIndex !== -1) {
      setEditableId(id);
      setEditedText(todos[editableIndex].text);
    }
  };

  const handleSaveEdit = (todo: Todo) => {
    todo.text = editedText;
    dispatch(editTodo(todo));
    setEditableId(null);
  };

  const handleCancelEdit = () => {
    setEditableId(null);
  };

  return (
      <ul>
        {props.todoListItems &&
          props.todoListItems.map((todo) => {
            return (
              <li key={todo.id} className="flex mb-4 bg-gray-100">
                <div className="w-3/4 h-12 text-left flex items-center">
                  <input
                    type="checkbox"
                    className="accent-slate-400 w-1/5"
                    id={`${todo.id}-todoCheck`}
                    checked={todo.done}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  {editableId === todo.id ? (
                    <span className="w-2/3">
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    </span>
                  ) : (
                    <label htmlFor={`${todo.id}-todoCheck`}>{todo.text}</label>
                  )}
                </div>
                <div className="w-1/4 h-12 flex items-center">
                  {editableId === todo.id && (
                    <>
                      <button
                        className="w-1/4 p-0 focus:outline-none"
                        onClick={() => handleSaveEdit(todo)}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="w-1/4 p-0 focus:outline-none"
                        onClick={handleCancelEdit}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {filter !== FilterEnums.Done && (
                    <button
                      className={`w-1/4 p-0 focus:outline-none`}
                      onClick={() => handleEdit(todo.id)}
                      disabled={todo.done}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    className={`w-1/4 p-0 focus:outline-none`}
                    onClick={() => handleDeleteTodo(todo.id)}
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
