import { SubmitProjectForm } from "@/components/forms/submit-project-form";

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 py-6">
      <h1 className="font-bold text-2xl">OrcDev Project Review</h1>
      <p className="text-center text-muted-foreground text-xs">
        Want your open source project reviewed live on stream? Drop it here and
        join the spotlight.
      </p>
      <SubmitProjectForm />
    </main>
  );
}
