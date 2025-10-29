import { SubmitProjectForm } from "@/components/forms/submit-project-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 py-12">
      <h1 className="font-bold text-2xl">OrcDev Project Review</h1>
      <p className="text-muted-foreground text-sm">
        Want your open source project reviewed live on stream? Drop it here and
        join the spotlight.
      </p>
      <SubmitProjectForm />
    </main>
  );
}
