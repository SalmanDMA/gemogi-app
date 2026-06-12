export function formatVoucherCode(code: string | null | undefined): string {
  if (!code) return '-';
  const clean = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (clean.length === 16) {
    return clean.match(/.{1,4}/g)?.join('-') ?? clean;
  }
  return code;
}
