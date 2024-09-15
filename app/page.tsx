"use client";

import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TodoItem } from "../data/todo-data";
import { getTodos } from "../services/todo-service";

export default function HomePage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const router = useRouter();

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data ?? []);
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`api/todos/${id}`, {
        method: "DELETE"
      });
      await response;
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Stack align="center">
      <h1>Your Todo List</h1>
      <Button onClick={() => router.push("/todos/new")}>Add</Button>
      <Stack align="stretch" justify="center">
        {todos.map((todo: TodoItem) => (
          <Card key={todo.id} padding="md">
            <Text size="lg" fw={700}>
              {todo.title}
            </Text>
            <Text>{todo.description}</Text>
            <Group justify="space-between" mt="md">
              <Button size="xs" onClick={() => deleteTodo(todo.id)}>
                Done
              </Button>
              <Button
                size="xs"
                onClick={() => router.push(`/todos/${todo.id}`)}
              >
                Edit
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
