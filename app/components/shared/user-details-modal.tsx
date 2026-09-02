"use client";

import { Modal } from "@/app/components/shared/modal";
import { Avatar } from "@/app/components/shared/avatar";
import type { User } from "@/lib/types/user";

type UserDetailsModalProps = {
  user: User | null;
  onClose: () => void;
};

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  return (
    <Modal open={Boolean(user)} onClose={onClose} title="User Details" widthClassName="max-w-[380px]">
      {user && (
        <div className="flex flex-col items-center text-center">
          <Avatar name={user.name} src={user.avatar} size={104} ringWidth={0} className="ring-4 ring-white/10" />

          <span className="mt-4 inline-flex items-center bg-gradient-to-r from-[#3b82f6] to-[#9333ea] px-4 py-1.5 text-sm font-semibold text-white">
            {user.name}
          </span>

          {user.email && <p className="mt-2 text-sm text-zinc-400">{user.email}</p>}

          <dl className="mt-6 w-full space-y-5 text-left">
            <DetailRow
              icon="/phone.svg"
              iconClassName="bg-blue-500/15 text-blue-400"
              label="Phone"
              value={user.phone ?? "Not provided"}
            />
            <DetailRow
              icon="/location.svg"
              iconClassName="bg-violet-500/15 text-violet-400"
              label="Location"
              value={user.location ?? "Not provided"}
            />
            <DetailRow
              icon="/dob.svg"
              iconClassName="bg-pink-500/15 text-pink-400"
              label="DOB"
              value={user.dob ?? "Not provided"}
            />
          </dl>
        </div>
      )}
    </Modal>
  );
}

function DetailRow({
  icon,
  iconClassName,
  label,
  value,
}: {
  icon: string;
  iconClassName: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${iconClassName}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" aria-hidden="true" className="h-4 w-4" />
      </span>
      <div>
        <dt className="text-xs text-zinc-500">{label}</dt>
        <dd className="text-sm font-medium text-white">{value}</dd>
      </div>
    </div>
  );
}
