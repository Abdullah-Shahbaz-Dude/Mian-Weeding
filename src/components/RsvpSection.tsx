import { type FormEvent, useState } from "react";
import { entrees, partySizes } from "../data/wedding";
import type { Attendance, RsvpFormData } from "../types";
import { Icon } from "./Icon";

const initialForm: RsvpFormData = {
  fullName: "",
  email: "",
  attendance: "accept",
  partySize: "1",
  entree: entrees[0],
  songRequest: "",
};

export function RsvpSection() {
  const [form, setForm] = useState<RsvpFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="lg:col-span-7 p-space-lg sm:p-space-xl rounded-xl bg-surface-container-lowest shadow-xl">
      <div className="mb-space-md">
        <span className="font-label-caps text-label-caps text-primary uppercase">
          Répondez S'il Vous Plaît
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
          Grace Us With Your Presence
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Kindly respond on or before August 15, 2026. We eagerly look forward to
          embracing you.
        </p>
      </div>

      <form
        className={`space-y-space-md ${
          submitted ? "opacity-50 pointer-events-none" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface mb-space-3xs uppercase">
              Full Name
            </label>
            <input
              className="w-full px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="Lord / Lady..."
              required
              type="text"
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface mb-space-3xs uppercase">
              Email Address
            </label>
            <input
              className="w-full px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="contact@domain.com"
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block font-label-caps text-label-caps text-on-surface mb-space-2xs uppercase">
            Your Attendance
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
            {(
              [
                { value: "accept", label: "Joyfully Accepts" },
                { value: "decline", label: "Regretfully Declines" },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <input
                  checked={form.attendance === option.value}
                  className="w-4 h-4 accent-primary text-primary"
                  name="attendance"
                  type="radio"
                  value={option.value}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      attendance: option.value as Attendance,
                    }))
                  }
                />
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface mb-space-3xs uppercase">
              Party Size
            </label>
            <select
              className="w-full px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container transition-all"
              value={form.partySize}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  partySize: event.target.value,
                }))
              }
            >
              {partySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface mb-space-3xs uppercase">
              Dinner Entrée
            </label>
            <select
              className="w-full px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container transition-all"
              value={form.entree}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  entree: event.target.value,
                }))
              }
            >
              {entrees.map((entree) => (
                <option key={entree} value={entree}>
                  {entree}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-label-caps text-label-caps text-on-surface mb-space-3xs uppercase">
            Dance Floor Song Request
          </label>
          <input
            className="w-full px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container transition-all"
            placeholder="Artist — Track title that will get you moving..."
            type="text"
            value={form.songRequest}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                songRequest: event.target.value,
              }))
            }
          />
        </div>

        <button
          className="w-full py-space-sm rounded-full bg-primary text-on-primary font-title-md text-title-md font-semibold tracking-wide hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg flex items-center justify-center gap-space-2xs"
          type="submit"
        >
          <Icon name="mark_email_read" className="text-[20px]" />
          Confirm Formal RSVP
        </button>
      </form>

      {submitted ? (
        <div className="mt-space-md p-space-sm rounded-lg bg-secondary-container text-on-secondary-container text-center font-body-md text-body-md">
          Heartfelt thanks! Your response has been joyfully recorded in Fatima
          &amp; Taimoor's guest ledger.
        </div>
      ) : null}
    </div>
  );
}
