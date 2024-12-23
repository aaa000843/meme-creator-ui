export interface Tag {
  _id: string;
  name: string;
  slug: string;
}

export interface CreateTag {
  name: string;
}

export interface EditingTag {
  _id: string;
  name: string;
}
