/**
 * Standard "preview" notice shown across the Platform area, making it clear the
 * screens are UI/navigation scaffolding with placeholder data — no live
 * accounts, data or actions behind them yet.
 */
export function PreviewBanner() {
  return (
    <div
      role="note"
      className="mb-6 rounded-xl border border-hivis-500/50 bg-hivis-400/15 px-4 py-3 text-sm text-ink"
    >
      <strong className="font-semibold">Preview.</strong> Placeholder content for
      layout and navigation testing — no live accounts, data or actions yet.
    </div>
  );
}
