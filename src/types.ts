export type NavPath =
  | "our-story"
  | "events-timeline"
  | "venue-directions"
  | "dress-code"
  | "rsvp-guestbook";

export type NavItem = {
  path: NavPath;
  label: string;
};

export type CountdownValue = {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
};

export type TimelineEvent = {
  id: string;
  badge: string;
  badgeTone: "muted" | "primary";
  icon: string;
  datetime: string;
  title: string;
  description: string;
  attire: string;
  featured?: boolean;
};

export type PaletteSwatch = {
  name: string;
  hex: string;
};

export type Blessing = {
  id: string;
  author: string;
  timeLabel: string;
  message: string;
};

export type Attendance = "accept" | "decline";

export type RsvpFormData = {
  fullName: string;
  email: string;
  attendance: Attendance;
  partySize: string;
  entree: string;
  songRequest: string;
};
