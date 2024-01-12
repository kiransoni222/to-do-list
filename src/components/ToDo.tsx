import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '@actions/todoActions';
import { TodoState } from '@reducers/todoReducer';
import { FilterEnums } from '@shared/enums';
import AddToDO from './AddToDo';
import ToDoList from './ToDoList';

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
        return todoItems.filter((todoItems) => !todoItems.completed);
      case FilterEnums.Completed:
        return todoItems.filter((todoItems) => todoItems.completed);
      default:
        return todoItems;
    }
  };

  const totalItems = filteredTodos().length;
  return (
    <div>
     <AddToDO />
      <div>
        <button onClick={() => handleFilterChange(FilterEnums.All)}>All</button>
        <button onClick={() => handleFilterChange(FilterEnums.Active)}>Active</button>
        <button onClick={() => handleFilterChange(FilterEnums.Completed)}>Completed</button>
      </div>
      <div>Total Items: {totalItems}</div>
      {totalItems && <ToDoList todoListItems={filteredTodos()} />}
    </div>
  );
};

export default ToDo;