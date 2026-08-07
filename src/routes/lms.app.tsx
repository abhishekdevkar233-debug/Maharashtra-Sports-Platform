import { createFileRoute } from "@tanstack/react-router";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsAppView } from "@/components/lms/LmsAppView";

export const Route = createFileRoute("/lms/app")({
  head: () => ({ meta: [{ title: "App View — Athlete Learning Hub" }] }),
  component: Page,
});

function Page() {
  return (
    <LmsShell title="App View" subtitle="A live mobile preview of the Athlete Learning Hub">
      <LmsAppView />
    </LmsShell>
  );
}
