import { NextResponse } from "next/server";
import {
  deleteTodoById,
  getTodoById,
  TodoRequest,
  updateTodo
} from "../../../../data/todo-data";

interface ParamsProps {
  params: { id: number };
}

export async function GET(request: Request, { params: { id } }: ParamsProps) {
  await request;
  return NextResponse.json(
    getTodoById(id) ?? { message: `ToDo with id ${id} does not exist` }
  );
}

export async function DELETE(
  request: Request,
  { params: { id } }: ParamsProps
) {
  await request;
  deleteTodoById(id);
  return NextResponse.json({
    message: `ToDo with id ${id} successfully deleted`
  });
}

export async function PUT(request: Request, { params: { id } }: ParamsProps) {
  const todoRequest: TodoRequest = await request.json();
  if (!todoRequest.title)
    return NextResponse.json({ message: "A Todo must have a title." });

  updateTodo(id, todoRequest);

  return NextResponse.json({
    message: `ToDo with id ${id} successfully updated`
  });
}
