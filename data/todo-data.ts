export interface TodoItem {
  id: number;
  title?: string;
  description?: string;
  complete: boolean;
}

export type TodoRequest = Omit<TodoItem, "id" | "complete">;

export let todoData: TodoItem[] = [];

export const deleteTodoById = (id: number) => {
  todoData = todoData.filter((todo: TodoItem) => id != todo.id);
};

export const getTodoById = (id: number) => {
  return todoData.find((todo: TodoItem) => id == todo.id);
};

export const updateTodo = (id: number, updatedTodo: TodoRequest) => {
  const index = todoData.findIndex((todo) => todo.id == id);
  todoData[index].title = updatedTodo.title;
  todoData[index].description = updatedTodo.description;
};
