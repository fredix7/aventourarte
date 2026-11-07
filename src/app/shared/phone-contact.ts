export interface PhoneContactEntry {
  number: string;
  href: string | null;
  note: string;
  channel: 'phone' | 'whatsapp';
}

export interface PhoneContactGroup {
  label: string;
  entries: PhoneContactEntry[];
}

// Separators inside notes, such as «(Cultura: ext. 592)», belong to the contact.
function contactSegments(value: string): string[] {
  const segments: string[] = [];
  let start = 0;
  let depth = 0;
  for (let index = 0; index < value.length; index++) {
    const character = value[index];
    if (character === '(') depth++;
    if (character === ')') depth = Math.max(0, depth - 1);
    const separatesLabel = character === '.' && /^\.\s+(?=[^:\n\d]+:)/u.test(value.slice(index));
    if (depth === 0 && (/[\/;,\n\r]/u.test(character) || separatesLabel)) {
      segments.push(value.slice(start, index));
      start = index + 1;
    }
  }
  segments.push(value.slice(start));
  return segments.map(segment => segment.trim()).filter(Boolean);
}

function phoneEntry(value: string, label: string): PhoneContactEntry {
  const explicitLabel = /^whatsapp$/iu.test(label);
  const unlinked: PhoneContactEntry = { number: value, href: null, note: '', channel: explicitLabel ? 'whatsapp' : 'phone' };
  const match = value.match(/^((?:\+\s*)?(?:\(\d+\)|\d)[\d\t \u00a0().-]*\d\)?)(.*)$/u);
  if (!match) return unlinked;

  const number = match[1].trim().replace(/[.\s]+$/u, '');
  const suffix = match[2];
  const denied = /\b(?:sin|no)\s+(?:admite\s+)?whatsapp\b/iu.test(label + ' ' + suffix);
  const channel = !denied && (explicitLabel || /^\(\s*whatsapp\s*\)$/iu.test(suffix.trim())) ? 'whatsapp' : 'phone';
  unlinked.channel = channel;
  // A word attached to the digits or a second, unseparated number is ambiguous.
  if (suffix && !/^[\s(.,]/u.test(suffix)) return unlinked;
  if ((suffix.match(/\d/g) ?? []).length >= 7) return unlinked;
  if (/\.{2}|-{2}/u.test(number)) return unlinked;
  if (/^(?:\d{4}[-.]\d{1,2}[-.]\d{1,2}|\d{1,2}[-.]\d{1,2}[-.]\d{2,4})$/u.test(number)) {
    return unlinked;
  }
  const opening = (number.match(/\(/g) ?? []).length;
  const closing = (number.match(/\)/g) ?? []).length;
  if (opening !== closing) return unlinked;

  let normalized = number.replace(/[^\d+]/g, '');
  if (normalized.startsWith('00')) normalized = '+' + normalized.slice(2);
  const digits = normalized.replace(/^\+/, '');
  if (!/^\d{7,15}$/.test(digits) || /^0+$/.test(digits)) return unlinked;
  if (normalized.startsWith('+') && digits.startsWith('0')) return unlinked;

  // A messaging link requires an explicit international prefix; never infer a country.
  const href = channel === 'whatsapp'
    ? normalized.startsWith('+') ? `https://wa.me/${digits}` : null
    : `tel:${normalized}`;
  return { number, href, note: suffix.trim(), channel };
}

/** Interpret presentation only: the original editorial field remains untouched. */
export function parsePhoneContact(value: unknown): PhoneContactGroup[] {
  if (typeof value !== 'string' || !value.trim()) return [];
  if (/\b(?:https?|javascript|data|mailto):/iu.test(value)) {
    return [{ label: '', entries: [{ number: value.trim(), href: null, note: '', channel: 'phone' }] }];
  }
  const groups: PhoneContactGroup[] = [];
  for (const segment of contactSegments(value)) {
    const labelled = segment.match(/^([^:\n]+):\s*(.*)$/u);
    // A colon in a trailing note is not a new entity label.
    const hasLabel = labelled && !/^[+\d(]/u.test(segment);
    const label = hasLabel ? labelled[1].trim() : '';
    const content = hasLabel ? labelled[2].trim() : segment;
    let group = groups[groups.length - 1];
    if (!group || hasLabel) {
      group = { label, entries: [] };
      groups.push(group);
    }
    // Only the explicitly labelled segment inherits its label, not subsequent numbers.
    if (content) group.entries.push(phoneEntry(content, label));
  }
  return groups;
}
