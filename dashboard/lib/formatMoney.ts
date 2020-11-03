function formatMoney(
  candidate: number | string | null | undefined,
  decimalPoint = true
): string {
  if (!candidate && candidate !== 0) return '-';
  if (Number.isNaN(Number(candidate))) return '-';
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const result = numberFormat
    .format(Number(candidate) / 100)
    .replace('$', '')
    .replace(/( )/g, '')
    .trim();
  if (decimalPoint) {
    return result;
  }
  const [integer, decimal] = result.split('.');
  return `${integer.replace(/(,)/g, '.')},${decimal}`;
}

export default formatMoney;
