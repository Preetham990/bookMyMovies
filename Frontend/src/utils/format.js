export function formatDateTime(value) {
  if (!value) return 'N/A';
  try { return new Date(value).toLocaleString(); } catch { return value; }
}
export function rupee(value) { return `₹${Number(value || 0).toFixed(2)}`; }
export function movieTitle(movie) { return movie?.name || movie?.title || 'Movie'; }
