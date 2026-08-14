import { useCountUp } from '../hooks/useCountUp';

export default function StatCounter({ value, suffix = '', label }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl sm:text-5xl text-gold-gradient font-semibold">
        {current.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="eyebrow text-ivory-dim mt-2">{label}</p>
    </div>
  );
}
