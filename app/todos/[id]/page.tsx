"use client";

import { useEffect, useState } from "react";
import { TodoItem } from "../../../data/todo-data";
import { getTodo } from "../../../services/todo-service";
import ToDoForm from "../_components/ToDoForm";

interface TodoProps {
  params: { id: number };
}

export default function Todo({ params: { id } }: TodoProps) {
  const [selectedTodo, setSelectedTodo] = useState<TodoItem>();

  const fetchCurrentTodo = async () => {
    const data = await getTodo(id);
    setSelectedTodo(data);
  };

  useEffect(() => {
    fetchCurrentTodo();
  }, []);

  if (selectedTodo) {
    return <ToDoForm initialTodo={selectedTodo} todoId={id} />;
  }
}
