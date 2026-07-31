import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CraftCard } from '@/components/crafts/CraftCard';
import type { CraftPiece } from '@/types';

const sample: CraftPiece = {
  _id: 'abc123',
  title: 'Cascade Live-Edge Dining Table',
  shortDescription: 'Solid American walnut slab with steel trestle base.',
  fullDescription: 'Full description here for testing.',
  artisanName: 'Mara Ellison',
  price: 4800,
  material: 'Walnut',
  category: 'Tables',
  dimensions: '96" L',
  leadTime: '6–8 weeks',
  imageUrls: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'],
  customOrderAvailable: true,
  averageRating: 4.5,
  reviewCount: 2,
  createdBy: 'user1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('CraftCard', () => {
  it('renders title, price meta, and view details link', () => {
    render(<CraftCard craft={sample} />);
    expect(screen.getByText('Cascade Live-Edge Dining Table')).toBeInTheDocument();
    expect(screen.getByText('$4,800')).toBeInTheDocument();
    expect(screen.getByText('Walnut')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute(
      'href',
      '/crafts/abc123'
    );
  });
});
