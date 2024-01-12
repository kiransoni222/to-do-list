import { Todo } from "@shared/interface";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_FILTER, TOGGLE_COMPLETE } from "../constants/todoConstants";

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = (index: number, text: string) => ({
  type: EDIT_TODO,
  payload: { index, text },
});

export const deleteTodo = (index: number) => ({
  type: DELETE_TODO,
  payload: index,
});

export const toggleIsComplete = (index: number) => ({
  type: TOGGLE_COMPLETE,
  payload: index,
});

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  payload: filter,
});