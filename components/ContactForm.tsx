"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { business, serviceGroups } from "@/lib/business";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pt-6 pb-2.5 text-[15px] text-white placeholder-transparent transition-colors outline-none hover:border-white/20 focus:border-amber focus:bg-white/[0.05] aria-invalid:border-rose-400/70";
const labelClass =
  "pointer-events-none absolute top-2 left-4 text-[11px] tracking-wide text-white/45 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-amber";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="flex min-h-[520px] flex-col justify-center rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-amber text-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-8 font-serif text-5xl text-white">
          Thanks{state.name ? `, ${state.name}` : ""}.
        </h3>
        <p className="mt-4 max-w-sm text-mist">
          We&rsquo;ve got your request and will call you back during shop hours. In a hurry? Call us at{" "}
          <a href={business.phoneHref} className="text-white underline decoration-amber underline-offset-4">
            {business.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form
      action={formAction}
      noValidate
      className="relative rounded-[28px] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-sm sm:p-8 lg:p-10"
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow text-white/55">Request an inspection</p>
        <p className="eyebrow text-white/35">Free quote</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" autoComplete="name" error={errors.name} defaultValue={values.name} required />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} defaultValue={values.phone} required />
        <Field name="email" label="Email (optional)" type="email" autoComplete="email" error={errors.email} defaultValue={values.email} />
        <Field name="vehicle" label="Year, make & model" error={errors.vehicle} defaultValue={values.vehicle} />
        <div className="relative sm:col-span-2">
          <select
            id="service"
            name="service"
            defaultValue={values.service ?? ""}
            className={`${inputClass} appearance-none [&:has(option[value='']:checked)]:text-white/45`}
          >
            <option value="">Not sure, diagnose it</option>
            {serviceGroups.map((g) => (
              <option key={g.id} value={g.title}>
                {g.title}
              </option>
            ))}
          </select>
          <label htmlFor="service" className="pointer-events-none absolute top-2 left-4 text-[11px] tracking-wide text-white/45">
            Service
          </label>
          <svg className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/40" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="relative sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="What's it doing?"
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass} resize-none`}
            required
          />
          <label htmlFor="message" className={labelClass}>
            What&rsquo;s it doing? Noises, smells, lights, feel&hellip;
          </label>
          {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-white/40" aria-live="polite">
          {state.status === "error" ? <span className="text-rose-300">{state.message}</span> : "We reply during shop hours, usually same day."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2 rounded-full bg-amber px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send request"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M1 7h11m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  type = "text",
  ...rest
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...rest}
      />
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 pl-1 text-xs text-rose-300">
      {children}
    </p>
  );
}
