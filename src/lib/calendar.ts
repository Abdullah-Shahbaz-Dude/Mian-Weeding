const CEREMONY_START_UTC = "20261024T153000Z";
const CEREMONY_END_UTC = "20261024T183000Z";

const CALENDAR_EVENT = {
  title: "Fatima & Taimoor Wedding — The Holy Ceremony",
  details:
    "Nikkah ceremony at Bahawalpur Royal Marquee, Multan road, near PSO Petrol Pump.",
  location:
    "Bahawalpur Royal Marquee, Multan road, near PSO Petrol Pump, Bahawalpur, Punjab, Pakistan",
};

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CALENDAR_EVENT.title,
    dates: `${CEREMONY_START_UTC}/${CEREMONY_END_UTC}`,
    details: CALENDAR_EVENT.details,
    location: CALENDAR_EVENT.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function appleCalendarUrl(): string {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fatima Taimoor Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:ceremony@fatima-and-taimoor.wedding",
    "DTSTAMP:20260101T000000Z",
    `DTSTART:${CEREMONY_START_UTC}`,
    `DTEND:${CEREMONY_END_UTC}`,
    `SUMMARY:${CALENDAR_EVENT.title}`,
    `LOCATION:${CALENDAR_EVENT.location}`,
    `DESCRIPTION:${CALENDAR_EVENT.details}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
