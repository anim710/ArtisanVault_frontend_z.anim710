import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CraftFilters, type CraftFilterState } from '@/components/crafts/CraftFilters';

const base: CraftFilterState = {
  search: '',
  material: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  customOrder: '',
  sort: 'newest',
};

describe('CraftFilters', () => {
  it('calls onChange when material filter changes', () => {
    const onChange = vi.fn();
    render(
      <CraftFilters value={base} onChange={onChange} onReset={vi.fn()} />
    );
    const select = screen.getByLabelText('Material');
    fireEvent.change(select, { target: { value: 'Steel' } });
    expect(onChange).toHaveBeenCalledWith({ ...base, material: 'Steel' });
  });
});
