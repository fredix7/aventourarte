import { parsePhoneContact } from './phone-contact';

describe('Phone contact parsing', () => {
  const entries = (value: unknown) => parsePhoneContact(value).flatMap(group => group.entries);
  const links = (value: unknown) => entries(value).map(entry => entry.href).filter(Boolean);

  it('returns no contacts for absent or non-text values', () => {
    for (const value of [null, undefined, '', '  \n ', 956123456, {}, []]) {
      expect(parsePhoneContact(value)).withContext(String(value)).toEqual([]);
    }
  });

  it('keeps readable formatting while normalizing domestic and international destinations', () => {
    expect(entries('956 123 456')[0]).toEqual({ number: '956 123 456', href: 'tel:956123456', note: '' });
    expect(links('+34 (956) 123-456 / 0044 20 7946 0958 / +46 40 34 44 00'))
      .toEqual(['tel:+34956123456', 'tel:+442079460958', 'tel:+4640344400']);
    expect(links('(020) 7946 0958')).toEqual(['tel:02079460958']);
  });

  it('keeps each entity associated with its own numbers in the user example', () => {
    const groups = parsePhoneContact('Grupo Estévez: +34 956 321 004 / +34 608 492 097. Reservas Valdespino: +34 660 842 590');
    expect(groups.map(group => group.label)).toEqual(['Grupo Estévez', 'Reservas Valdespino']);
    expect(groups.map(group => group.entries.map(entry => entry.href))).toEqual([
      ['tel:+34956321004', 'tel:+34608492097'], ['tel:+34660842590']
    ]);
    expect(groups[0].entries[1].number).toBe('+34 608 492 097');
  });

  it('supports newline-separated departments and labels containing punctuation', () => {
    const groups = parsePhoneContact('Palacio Bertemati · Obispado: +34 956 338 800.\nTaquilla: +34 956 149 686');
    expect(groups.map(group => group.label)).toEqual(['Palacio Bertemati · Obispado', 'Taquilla']);
    expect(groups.map(group => group.entries[0].href)).toEqual(['tel:+34956338800', 'tel:+34956149686']);
  });

  it('preserves WhatsApp and extension notes without adding them to the telephone URI', () => {
    const groups = parsePhoneContact('Despacho parroquial: +34 956 341 897 / +34 615 433 192 (WhatsApp)');
    expect(groups[0].entries[1]).toEqual({ number: '+34 615 433 192', href: 'tel:+34615433192', note: '(WhatsApp)' });
    expect(entries('+34 956 39 50 28 (Cultura: ext. 592)')[0]).toEqual({
      number: '+34 956 39 50 28', href: 'tel:+34956395028', note: '(Cultura: ext. 592)'
    });
    expect(entries('+34 627 912 091 (visitas guiadas / grupos) / +34 956 881 918')).toHaveSize(2);
  });

  it('supports a labelled WhatsApp contact following an unlabelled telephone', () => {
    const groups = parsePhoneContact('+34 955 65 69 90 / WhatsApp: +34 699 62 85 24');
    expect(groups.map(group => group.label)).toEqual(['', 'WhatsApp']);
    expect(groups[1].entries[0].href).toBe('tel:+34699628524');
  });

  it('keeps non-callable information visible between valid numbers', () => {
    const contacts = entries('+34 956 123 456 / consultar disponibilidad / 123 / +34 608 492 097');
    expect(contacts.map(entry => entry.href)).toEqual(['tel:+34956123456', null, null, 'tel:+34608492097']);
    expect(contacts[1].number).toBe('consultar disponibilidad');
    expect(contacts[2].number).toBe('123');
  });

  it('does not turn dates, malformed numbers, URLs or attached text into calls', () => {
    for (const value of [
      'Consultar', '123456', '+34 956123456 +34 608492097', '956123456abc',
      '+34 956123456|608492097', '000000000', '+00 956 123 456',
      '1234567890123456', '2026-11-03', '03.11.2026', '(956123456',
      '956..123..456', 'https://example.test/956123456', 'javascript:956123456'
    ]) {
      expect(links(value)).withContext(value).toEqual([]);
      expect(entries(value).length).withContext(value).toBeGreaterThan(0);
    }
  });
});
