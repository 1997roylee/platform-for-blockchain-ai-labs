import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex flex-col flex-1">{children}</div>;
}
