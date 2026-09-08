import { type FormEvent, useState } from "react";
import { couple } from "../data/wedding";
import type { Attendance } from "../types";
import { HeartDivider } from "./HeartDivider";

export function RsvpSection() {
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="rsvp"
      className="py-16 px-margin-mobile lg:px-margin-desktop flex flex-col items-center border-t border-primary/10"
    >
      <h3 className="font-calligraphy text-primary text-4xl md:text-5xl font-medium mb-2">
        RSVP
      </h3>
      <HeartDivider className="w-40 mb-10" />
      <div className="max-w-md w-full">
        {submitted ? (
          <p className="text-center text-xs text-primary font-sans font-medium mt-2">
            Thank you for your blessings and RSVP to {couple.groom} with{" "}
            {couple.bride}!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-xs font-sans text-primary font-medium mb-1 text-left"
                htmlFor="attendingSelect"
              >
                Will you be attending?
              </label>
              <select
                className="w-full text-xs md:text-sm font-sans bg-surface-container-lowest border border-primary/30 rounded-md py-2.5 px-3 text-primary focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                id="attendingSelect"
                name="attending"
                required
                value={attendance}
                onChange={(event) =>
                  setAttendance(event.target.value as Attendance | "")
                }
              >
                <option value="">Select...</option>
                <option value="accept">Joyfully Accept</option>
                <option value="decline">Regretfully Decline</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-xs font-sans text-primary font-medium mb-1 text-left"
                htmlFor="messageTextarea"
              >
                Your Message
              </label>
              <textarea
                className="w-full text-xs md:text-sm font-sans bg-surface-container-lowest border border-primary/30 rounded-md py-2 px-3 text-primary placeholder:text-primary/40 focus:ring-1 focus:ring-primary focus:border-primary shadow-sm resize-none"
                id="messageTextarea"
                name="message"
                placeholder="Write your wishes..."
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button
              className="w-full py-2.5 rounded-md bg-primary hover:bg-on-primary-container text-on-primary font-serif text-sm font-medium tracking-wide shadow-md transition-colors"
              type="submit"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
