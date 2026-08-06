"use client";

import { ArrowRightIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "./ui/button";

type SubmitState = "idle" | "loading" | "success" | "error";

export interface ContactFormText {
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  businessType: string;
  businessTypePlaceholder: string;
  businessOptions: string[];
  businessName: string;
  businessNamePlaceholder: string;
  note: string;
  notePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  successMessage: string;
  errorMessage: string;
}

export default function ContactForm({ text }: { text: ContactFormText }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        phone: formData.get("phone"),
        businessType: formData.get("businessType"),
        businessName: formData.get("businessName"),
        note: formData.get("note"),
        company: formData.get("company"),
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setState("error");
      setMessage(result?.message || text.errorMessage);
      return;
    }

    setState("success");
    setMessage(result?.message || text.successMessage);
    form.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border bg-card/70 p-5 shadow-2xl sm:p-6"
    >
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          {text.name}
          <input
            name="name"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder={text.namePlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {text.phone}
          <input
            name="phone"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder={text.phonePlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {text.businessType}
          <select
            name="businessType"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            defaultValue=""
          >
            <option value="" disabled>
              {text.businessTypePlaceholder}
            </option>
            {text.businessOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {text.businessName}
          <input
            name="businessName"
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder={text.businessNamePlaceholder}
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium">
        {text.note}
        <textarea
          name="note"
          rows={4}
          className="rounded-md border bg-background px-3 py-3 outline-hidden focus:ring-1 focus:ring-ring"
          placeholder={text.notePlaceholder}
        />
      </label>
      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <>
            <Loader2Icon className="mr-1 size-4 animate-spin" />
            {text.sending}
          </>
        ) : state === "success" ? (
          <>
            <CheckCircle2Icon className="mr-1 size-4" />
            {text.success}
          </>
        ) : (
          <>
            {text.submit}
            <ArrowRightIcon className="ml-1 size-4" />
          </>
        )}
      </Button>
      {message && (
        <p
          className={
            state === "error"
              ? "mt-4 text-sm text-destructive-foreground"
              : "mt-4 text-sm text-muted-foreground"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
