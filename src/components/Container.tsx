import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-md w-full max-w-7xl">
    {children}
  </div>
);
