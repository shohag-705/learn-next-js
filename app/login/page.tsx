"use client";
import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="p-4">
      <form action={dispatch}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <LoginButton />
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-400 px-4 py-2 rounded-lg text-white disabled:bg-gray-300 disabled:px-4 disabled:py-2 disabled:rounded-lg"
      type="submit"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
