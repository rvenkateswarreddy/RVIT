// Utility function for consistent date formatting
export function formatData(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  // Format: YYYY-MM-DD, deterministic for SSR/CSR
  return date.toISOString().split('T')[0];
}