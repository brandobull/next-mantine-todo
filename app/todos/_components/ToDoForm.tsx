import { Button, Center, Input, Stack, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TodoRequest } from "../../../data/todo-data";
import { postTodo, putTodo } from "../../../services/todo-service";

interface ToDoFormProps {
  initialTodo?: TodoRequest;
  todoId?: number;
}

export default function ToDoForm({ todoId, initialTodo }: ToDoFormProps) {
  const [selectedTodo, setSelectedTodo] = useState<TodoRequest>(
    initialTodo ?? {}
  );
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoId) {
      putTodo(todoId, selectedTodo);
    } else {
      postTodo(selectedTodo);
    }
    router.push("/");
  };

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <Stack align="initial" p={20} w={500}>
          <Input
            size="lg"
            placeholder="Title"
            value={selectedTodo?.title ?? ""}
            onChange={(event) =>
              setSelectedTodo({ ...selectedTodo, title: event.target.value })
            }
          />
          <Textarea
            size="lg"
            placeholder="Description"
            value={selectedTodo?.description ?? ""}
            onChange={(event) =>
              setSelectedTodo({
                ...selectedTodo,
                description: event.target.value
              })
            }
          />
          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Center>
  );
}
