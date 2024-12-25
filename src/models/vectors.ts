export interface Vector {
  _id: string;
  name: string;
  svg: string; // The SVG string representation
  tags: string[];
  size: number; // Size in bytes or any other relevant metric
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type AssetVisibility = 'admin' | 'public' | 'private' | 'paid';

export interface UpdateVectorDTO {
  visibility?: AssetVisibility;
  tags?: string[];
  isTrashed?: boolean;
}

export interface CreateVectorDTO {
  name: string;
  svg: string;
}
