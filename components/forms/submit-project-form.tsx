/** biome-ignore-all lint/correctness/noChildrenProp: External component */
"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/server/projects";
import { SubmitSuccessCard } from "../submit-success-card";

const URL_PROTOCOL_REGEX = /^https?:\/\//i;
const MIN_PROJECT_NAME_LENGTH = 3;
const MAX_PROJECT_NAME_LENGTH = 50;

const formSchema = z.object({
  projectName: z
    .string()
    .min(
      MIN_PROJECT_NAME_LENGTH,
      `Project name must be at least ${MIN_PROJECT_NAME_LENGTH} characters.`
    )
    .max(
      MAX_PROJECT_NAME_LENGTH,
      `Project name must be less than ${MAX_PROJECT_NAME_LENGTH} characters.`
    ),
  gitHubRepoUrl: z
    .string()
    .min(1, "GitHub repository URL is required.")
    .refine(
      (val) => {
        // Add https:// if no protocol is present for validation
        const urlWithProtocol = URL_PROTOCOL_REGEX.test(val)
          ? val
          : `https://${val}`;
        try {
          const urlObj = new URL(urlWithProtocol);
          return urlObj.hostname === "github.com";
        } catch {
          return false;
        }
      },
      {
        message: "URL must be from github.com domain.",
      }
    ),
  projectDescription: z.string(),
});

export function SubmitProjectForm() {
  const [isSubmited, setIsSubmited] = useState(false);

  const form = useForm({
    defaultValues: {
      projectName: "",
      gitHubRepoUrl: "",
      projectDescription: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const newProject = await createProject({
          name: value.projectName,
          githubRepoUrl: value.gitHubRepoUrl,
          description: value.projectDescription,
        });

        if (typeof newProject === "string") {
          toast.error(newProject);
          return;
        }

        toast.success("Project submitted successfully. Good luck! ⚔️");
        form.reset();
      } catch {
        throw new Error("Failed to create project");
      }
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  if (isSubmited) {
    return <SubmitSuccessCard />;
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Submit Project</CardTitle>
        <CardDescription>
          Submit your open source project for review.
        </CardDescription>
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
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-github-repo-url">
                      GitHub Repository URL
                    </FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="url"
                      id="form-tanstack-input-github-repo-url"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="github.com/username/repo"
                      type="text"
                      value={field.state.value}
                    />
                    <FieldDescription>
                      The URL of your GitHub repository.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="gitHubRepoUrl"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-project-description">
                      Project Description
                    </FieldLabel>
                    <Textarea
                      aria-invalid={isInvalid}
                      id="form-tanstack-input-project-description"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="A brief description of your project..."
                      value={field.state.value}
                    />
                    <FieldDescription>
                      Provide a detailed description of your project.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="projectDescription"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button
            disabled={isSubmitting}
            form="submit-project-form"
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
