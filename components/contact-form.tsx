"use client";

import { ArrowRightIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "./ui/button";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
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
      setMessage(result?.message || "Form gönderilemedi. Tekrar deneyin.");
      return;
    }

    setState("success");
    setMessage(result?.message || "Demo talebiniz alındı.");
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
          Ad Soyad
          <input
            name="name"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder="Adınız Soyadınız"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Telefon
          <input
            name="phone"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder="05xx xxx xx xx"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          İşletme Türü
          <select
            name="businessType"
            required
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            defaultValue=""
          >
            <option value="" disabled>
              Seçiniz
            </option>
            <option>Berber / Kuaför</option>
            <option>Güzellik Merkezi</option>
            <option>Psikolog / Klinik</option>
            <option>Diyetisyen</option>
            <option>Diğer</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          İşletme Adı
          <input
            name="businessName"
            className="h-11 rounded-md border bg-background px-3 outline-hidden focus:ring-1 focus:ring-ring"
            placeholder="İşletmenizin adı"
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium">
        Kısa Not
        <textarea
          name="note"
          rows={4}
          className="rounded-md border bg-background px-3 py-3 outline-hidden focus:ring-1 focus:ring-ring"
          placeholder="Kaç personeliniz var, hangi hizmetleri veriyorsunuz?"
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
            Gönderiliyor
          </>
        ) : state === "success" ? (
          <>
            <CheckCircle2Icon className="mr-1 size-4" />
            Talep Alındı
          </>
        ) : (
          <>
            Demo Talebi Gönder
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
