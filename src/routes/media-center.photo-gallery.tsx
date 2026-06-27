import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/media-center/photo-gallery")({
  component: () => <Outlet />,
});
