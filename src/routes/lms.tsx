import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lms")({
  head: () => ({ meta: [{ title: "Athlete LMS — Sports & Youth Services" }] }),
  component: () => <Outlet />,
});
