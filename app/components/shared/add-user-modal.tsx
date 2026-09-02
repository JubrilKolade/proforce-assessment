"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/app/components/shared/modal";
import { useCreateUserMutation } from "@/lib/store/api/usersApi";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  location: string;
  dob: string;
};

const EMPTY_FORM: FormState = { name: "", location: "", dob: "" };

export function AddUserModal({ open, onClose }: AddUserModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState(false);
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const dobValid = form.dob === "" || !Number.isNaN(Date.parse(form.dob));
  const isComplete = form.name.trim() !== "" && form.location.trim() !== "" && form.dob.trim() !== "";
  const canSubmit = isComplete && dobValid && !isLoading;

  function handleClose() {
    setForm(EMPTY_FORM);
    setTouched(false);
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    try {
      await createUser({
        name: form.name.trim(),
        location: form.location.trim(),
        dob: form.dob.trim(),
      }).unwrap();
      handleClose();
    } catch {
    
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title="Enter User Details" widthClassName="max-w-[400px]">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Name" htmlFor="user-name">
          <input
            id="user-name"
            name="name"
            type="text"
            placeholder="E.g John"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-xl bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </Field>

        <Field label="Location" htmlFor="user-location">
          <input
            id="user-location"
            name="location"
            type="text"
            placeholder="E.g Boston, USA"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            className="w-full rounded-xl bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </Field>

        <Field
          label="Date of Birth"
          htmlFor="user-dob"
          error={touched && form.dob && !dobValid ? "Please choose a valid date." : undefined}
        >
          <input
            id="user-dob"
            name="dob"
            type="date"
            placeholder="Select date"
            value={form.dob}
            onChange={(event) => setForm((prev) => ({ ...prev, dob: event.target.value }))}
            className="w-full rounded-xl bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </Field>

        {error && (
          <p role="alert" className="text-sm text-rose-400">
            Couldn&apos;t save this user. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
            canSubmit
              ? "bg-white text-[#0d1117] hover:bg-zinc-200"
              : "cursor-not-allowed bg-[#2a2a2a] text-zinc-500",
          ].join(" ")}
        >
          {isLoading ? "Saving…" : "Save"}
        </button>
      </form>
    </Modal>
  );
}

function Field({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-zinc-300">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
