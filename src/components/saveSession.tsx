import React from 'react'
import { getServerSession } from "next-auth/next";

export default async function saveSession() {
    const session = await getServerSession();

  return session
  
}
