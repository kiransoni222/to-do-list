import { Todo } from "@shared/interface";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_FILTER, TOGGLE_COMPLETE } from "../constants/todoConstants";

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = (todo: Todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleIsComplete = (id: number) => ({
  type: TOGGLE_COMPLETE,
  payload: id,
});

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  payload: filter,
});