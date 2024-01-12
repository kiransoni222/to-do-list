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
    <div>
      <AddToDO />
      <ul className="flex border-b justify-evenly mt-5 mb-5">
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
      <div>Total Items: {totalItems}</div>
      {totalItems ? <ToDoList todoListItems={filteredTodos()} /> : <></>}
    </div>
  );
};

export default ToDo;
