"use client";

import { useCountUp } from "@/hooks/useCountUp";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: StatItem[] = [
  { value: 700, suffix: "+", label: "Alunos formados" },
  { value: 4,   suffix: "",  label: "Turmas" },
  { value: 98,  suffix: "%", label: "Satisfação" },
];

function StatCounter({ value, suffix, label }: StatItem) {
  const { display, ref } = useCountUp({ value, suffix, duration: 1400 });

  return (
    <div ref={ref}>
      <span
        className="font-titulo font-black block"
        style={{ fontSize: "38px", color: "#FDF8F0", letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {display}
      </span>
      <span
        className="font-corpo block"
        style={{
          fontSize: "11px",
          color: "rgba(253,248,240,0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginTop: "6px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function InstructorStats() {
  return (
    <div
      className="flex gap-12 flex-wrap"
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}
    >
      {STATS.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
