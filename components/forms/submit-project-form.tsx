"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  projectName: z.string(),
  gitHubRepoUrl: z.url("GitHub repository URL is required."),
  projectDescription: z.string(),
});

export function SubmitProjectForm() {
  const form = useForm({
    defaultValues: {
      projectName: "",
      gitHubRepoUrl: "",
      projectDescription: "",
    },
    validators: {
      onSubmit: (values) => formSchema.parse(values),
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Submit Project</CardTitle>
        <CardDescription>Submit your project for review.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="submit-project-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-project-name">
                      Project Name
                    </FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="project-name"
                      id="form-tanstack-input-project-name"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="shadcn"
                      value={field.state.value}
                    />
                    <FieldDescription>
                      This is your public display name. Must be between 3 and 10
                      characters. Must only contain letters, numbers, and
                      underscores.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="projectName"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-tanstack-input" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
