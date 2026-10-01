"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: Partial<Record<Field, string>>; values: Partial<Record<Field, string>> }
  | { status: "success"; name: string };

type Field = "name" | "phone" | "email" | "vehicle" | "service" | "message";

const LIMITS: Record<Field, number> = {
  name: 80,
  phone: 30,
  email: 120,
  vehicle: 80,
  service: 60,
  message: 2000,
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", name: "" };
  }

  const values = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    values[key] = String(formData.get(key) ?? "").trim().slice(0, LIMITS[key]);
  }

  const errors: Partial<Record<Field, string>> = {};
  if (!values.name) errors.name = "Let us know who to ask for.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "That email doesn't look right.";
  if (!values.message) errors.message = "Describe what you're noticing, even roughly.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "A couple of details need a look.", errors, values };
  }

  // TODO: deliver via email (e.g. Resend) or a CRM. Logged for now.
  console.log("[contact] new inspection request", { ...values, receivedAt: new Date().toISOString() });

  return { status: "success", name: values.name.split(" ")[0] };
}
