import { FilterEnums } from "@shared/enums";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER,
  TOGGLE_COMPLETE,
} from "../constants/todoConstants";
import { TodoState } from "@shared/interface";

const initialState: TodoState = {
  todos: [],
  filter: FilterEnums.All,
};

const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case EDIT_TODO:
      const { index, text } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === index ? { ...todo, text } : todo
        ),
      };

    case TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
