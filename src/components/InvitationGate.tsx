import envelope from "../assets/image.png";

type InvitationGateProps = {
  onOpen: () => void;
};

export function InvitationGate({ onOpen }: InvitationGateProps) {
  return (
    <button
      type="button"
      aria-label="Tap to open invitation"
      className="fixed inset-0 z-50 block h-screen w-screen cursor-pointer border-0 bg-surface p-0"
      onClick={onOpen}
    >
      <img
        src={envelope}
        alt="You are invited. Tap to open."
        className="h-full w-full object-cover object-center"
      />
    </button>
  );
}
