import { describe, expect, it } from 'vitest';
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('formats USD without cents', () => {
    expect(formatPrice(2100)).toBe('$2,100');
  });
});
