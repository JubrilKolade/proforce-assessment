type UserCardProps = {
  name: string;
  email: string;
  image: string;
  accent: string;
};

export function UserCard({ name, email, image, accent }: UserCardProps) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-[#171d24] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
      <div className="mb-4 flex items-center justify-center">
        <div className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${accent} p-[3px]`}>
          <img src={image} alt={name} className="h-full w-full rounded-full object-cover" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-[1.15rem] font-semibold text-white">{name}</h2>
        <p className="mt-1 text-xs text-zinc-400">{email}</p>
      </div>
    </article>
  );
}
