export function formatAccountNumber(v=''){
  const digits = (v || '').replace(/[^\d]/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 4) return `${digits.slice(0,3)}-${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0,3)}-${digits.slice(3,4)}-${digits.slice(4)}`;
  return `${digits.slice(0,3)}-${digits.slice(3,4)}-${digits.slice(4,9)}-${digits.slice(9)}`;
}

export function sanitizeText(s=''){
  return String(s).replace(/[\u0000-\u001F\u007F]/g,'').trim();
}
