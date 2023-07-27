import { MainLayout } from "@/components";
import { Clock } from "@/components";
import { Todo } from "@/types";
import { Typography } from "@mui/material";
import Link from "next/link";

interface IndexProps {
  todos: Array<Todo>;
}

export default function Home(props: IndexProps) {
  const { todos } = props;
  return (
    <MainLayout>
      <Typography component="h1" variant="h2">
        Focus APP
      </Typography>
      <Typography component="h3" variant="h4">
        Alarma Productiva seteada a las 5:30AM
      </Typography>
      <Clock />

      <div>
        <h1>My Todo List</h1>
        <h2>Click On Todo to see it individually</h2>
        <Link href="/todos/create">
          <button>Create a New Todo</button>
        </Link>
        {/* MAPPING OVER THE TODOS */}
        {todos.map((t) => (
          <div key={t._id}>
            <Link href={`/todos/${t._id}`}>
              <h3 style={{ cursor: "pointer" }}>
                {t.item} - {t.completed ? "completed" : "incomplete"}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch("http://localhost:3000/api/todos");
  const todos = await res.json();

  // return props
  return {
    props: { todos },
  };
}
