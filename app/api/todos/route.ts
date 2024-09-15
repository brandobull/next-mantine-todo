import { NextResponse } from "next/server";
import { todoData, TodoItem, TodoRequest } from "../../../data/todo-data";

const calcTodoId = () => {
  if (todoData.length === 0) return 1;
  else {
    todoData.sort((a: TodoItem, b: TodoItem) => a.id - b.id);
    return todoData[todoData.length - 1].id + 1;
  }
};

export async function GET() {
  return NextResponse.json(todoData);
}

export async function POST(request: Request) {
  const todoRequest: TodoRequest = await request.json();
  if (!todoRequest.title)
    return NextResponse.json({ message: "A Todo must have a title." });

  todoData.sort((a: TodoItem, b: TodoItem) => a.id - b.id);

  todoData.push({
    id: calcTodoId(),
    title: todoRequest.title,
    description: todoRequest.description,
    complete: false
  });

  return NextResponse.json(todoData);
}
