"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className=" hover:text-red-600 transition-all"
      onClick={() => signOut()}
    >
      Cerrar sesión
    </button>
  );
}
