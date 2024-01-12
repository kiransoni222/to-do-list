export interface Todo {
  text: string;
  done: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: string;
}
