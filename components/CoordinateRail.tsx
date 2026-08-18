/**
 * Quiet Systems style reminder: the coordinate rail is structural orientation,
 * carrying the LP shared-node motif through scenes and reading routes.
 */

export function CoordinateRail({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`coordinate-rail ${dark ? "coordinate-rail--dark" : ""}`}
      aria-hidden="true"
    >
      <span className="coordinate-rail__index">{index}</span>
      <i className="coordinate-rail__node" />
      <b className="coordinate-rail__line" />
      <span className="coordinate-rail__ticks">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <em>{label}</em>
    </div>
  );
}
