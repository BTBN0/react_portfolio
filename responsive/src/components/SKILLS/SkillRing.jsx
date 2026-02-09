export default function SkillRing({ label, value }) {
  const size = 90;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="cursor-target relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={stroke}
            fill="none"
          />
          {/* progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#ef4444"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* percent */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
          {value}%
        </div>
      </div>

      <div className="text-[11px] tracking-[0.22em] uppercase opacity-80">
        {label}
      </div>
    </div>
  );
}
