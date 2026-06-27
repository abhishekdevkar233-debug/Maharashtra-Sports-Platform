import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/register")({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});
