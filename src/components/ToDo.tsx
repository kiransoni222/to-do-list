import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "@actions/todoActions";
import { FilterEnums } from "@shared/enums";
import AddToDO from "./AddToDo";
import ToDoList from "./ToDoList";
import { TodoState } from "@shared/interface";

const ToDo: React.FC = () => {
  const dispatch = useDispatch();
  const todoItems = useSelector((state: TodoState) => state.todos);
  const filter = useSelector((state: TodoState) => state.filter);

  const handleFilterChange = (selectedFilter: string) => {
    dispatch(setFilter(selectedFilter));
  };

  const filteredTodos = () => {
    switch (filter) {
      case FilterEnums.All:
        return todoItems;
      case FilterEnums.Active:
        return todoItems.filter((todoItems) => !todoItems.done);
      case FilterEnums.Done:
        return todoItems.filter((todoItems) => todoItems.done);
      default:
        return todoItems;
    }
  };

  const totalItems = filteredTodos().length;
  return (
    <>
      <AddToDO />
      <div className="mt-5 max-w-lg rounded border border-gray-400 divide-gray-100">
      <ul className="flex justify-evenly">
        <li
          className={`mr-1 w-full cursor-pointer ${
            filter === FilterEnums.All ? " bg-gray-200" : "border-white"
          }`}
        >
          <a
            className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            onClick={() => handleFilterChange(FilterEnums.All)}
          >
            All
          </a>
        </li>
        <li
          className={`mr-1 w-full cursor-pointer ${
            filter === FilterEnums.Active
              ? "border-r mr-1 bg-gray-200"
              : "border-white"
          }`}
        >
          <a
            className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            onClick={() => handleFilterChange(FilterEnums.Active)}
          >
            Active
          </a>
        </li>
        <li
          className={`mr-1 w-full cursor-pointer  ${
            filter === FilterEnums.Done ? " bg-gray-200" : "border-white"
          }`}
        >
          <a
            className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            onClick={() => handleFilterChange(FilterEnums.Done)}
          >
            Done
          </a>
        </li>
      </ul>
      {totalItems ? (
        <div className="p-4 max-w-lg rounded border border-gray-400 divide-gray-100">
          <div className="text-left mb-3 font-bold">{totalItems} {totalItems === 1 ? 'task' : 'tasks'}</div>
          <ToDoList todoListItems={filteredTodos()} />
        </div>
      ) : (
        <></>
      )}
      </div>
    </>
  );
};

export default ToDo;
