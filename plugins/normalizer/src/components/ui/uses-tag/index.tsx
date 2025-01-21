export default function UsesTag({
  uses,
  timesSmall,
}: {
  uses: number;
  timesSmall: boolean;
}) {
  return (
    uses > 0 && (
      <span className="text-[10px] leading-none uppercase min-w-fit py-0.5 px-1 border border-gray-400/20 rounded bg-gray-200 text-gray-700 tracking-tight">
        {timesSmall ? (uses > 99 ? `99+` : uses) : uses + " times"}
      </span>
    )
  );
}
