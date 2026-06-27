import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/stadiums-arenas")({
  component: () => <Outlet />,
});
