"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, isFetched } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/posts");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newTodo: { title: string; body: string }) => {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify({
          title: newTodo.title,
          body: newTodo.body,
          id: data.length + 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  console.log("Loading: ", isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetched) console.log("fetched");

  return (
    <main className="mt-6 mx-10">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
        officia quia, excepturi voluptatum hic, veritatis minus odio error
        libero dolor magnam pariatur saepe officiis repellendus? Ipsa quaerat
        aliquid consequuntur harum.
      </div>
      <hr />
      <ol className="list-decimal">
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
      <button
        className="bg-orange-300 px-4 py-2 rounded-sm text-white mt-2"
        onClick={() => mutation.mutate({ title: "foo", body: "bar" })}
      >
        Add todo
      </button>
    </main>
  );
}
