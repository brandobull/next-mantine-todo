import { TodoRequest } from "../data/todo-data";

export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todos");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTodo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const postTodo = async (todoRequest: TodoRequest) => {
  try {
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(todoRequest)
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const putTodo = async (id: number, todoRequest: TodoRequest) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todoRequest)
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
