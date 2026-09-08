import { useState } from "react";
import { initialBlessings } from "../data/wedding";
import type { Blessing } from "../types";

export function Guestbook() {
  const [blessings, setBlessings] = useState<Blessing[]>(initialBlessings);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  function postBlessing() {
    const trimmed = message.trim();
    if (trimmed === "") {
      return;
    }

    const next: Blessing = {
      id: `${Date.now()}`,
      author: author.trim() === "" ? "Honored Guest" : author.trim(),
      timeLabel: "Just now",
      message: trimmed,
    };

    setBlessings((current) => [next, ...current]);
    setMessage("");
    setAuthor("");
  }

  return (
    <div className="lg:col-span-5 flex flex-col">
      <div className="mb-space-md">
        <h3 className="font-script text-primary text-3xl md:text-4xl">
          Blessings &amp; Well Wishes
        </h3>
        <p className="font-elegant italic text-sm text-on-surface-variant mt-space-3xs">
          Leave your warm words for the couple to treasure forever.
        </p>
      </div>

      <div className="p-space-sm rounded-xl bg-surface-container-high/60 backdrop-blur-md shadow-sm mb-space-md">
        <textarea
          className="w-full p-space-2xs bg-surface-container-lowest rounded-lg text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none resize-none focus:ring-2 focus:ring-primary-container"
          placeholder="Write a blessing or warm memory for Fatima & Taimoor..."
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="flex items-center justify-between mt-space-2xs">
          <input
            className="px-space-2xs py-1 rounded bg-surface-container-lowest text-on-surface text-body-sm outline-none w-44"
            placeholder="Your name"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <button
            className="px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-subtle text-label-subtle hover:bg-primary-container hover:text-on-primary-container transition-colors"
            type="button"
            onClick={postBlessing}
          >
            Post Blessing
          </button>
        </div>
      </div>

      <div className="space-y-space-sm max-h-[380px] overflow-y-auto pr-space-2xs">
        {blessings.map((blessing, index) => (
          <article
            key={blessing.id}
            className={
              index === 0 && blessing.timeLabel === "Just now"
                ? "p-space-sm rounded-lg bg-secondary-container/40 shadow-sm transition-all duration-500 animate-fade-in"
                : "p-space-sm rounded-lg bg-surface-container-low shadow-sm"
            }
          >
            <div className="flex items-center justify-between mb-space-3xs">
              <span className="font-title-md text-title-md text-on-surface font-semibold text-[15px]">
                {blessing.author}
              </span>
              <span
                className={
                  blessing.timeLabel === "Just now"
                    ? "font-label-caps text-label-caps text-primary"
                    : "font-label-caps text-label-caps text-secondary"
                }
              >
                {blessing.timeLabel}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant italic">
              “{blessing.message}”
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
