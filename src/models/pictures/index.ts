export interface Picture {
  fileId: string;
  name: string;
  url: string;
  filePath: string;
  fileType: string;
  size: number;
  height: number;
  width: number;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  _id: string;
}

export type AssetVisibility = 'admin' | 'public' | 'private' | 'paid';

export interface UpdatePictureDTO {
  visibility?: AssetVisibility;
  tags?: string[];
  isTrashed?: boolean;
}
