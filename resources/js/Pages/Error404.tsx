import React from "react";
import { NotFoundPage } from "@/Components/ui/not-found-page";

export default function Error404() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-zinc-950 font-sans">
      <NotFoundPage />
    </div>
  );
}
