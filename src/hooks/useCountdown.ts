import { useEffect, useState } from "react";
import type { CountdownValue } from "../types";

function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

function computeCountdown(targetMs: number, now: number): CountdownValue {
  const difference = targetMs - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: "00",
      minutes: "00",
      seconds: "00",
      expired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    expired: false,
  };
}

export function useCountdown(targetMs: number): CountdownValue {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return computeCountdown(targetMs, now);
}
