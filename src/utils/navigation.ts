export type AuthLevel = 'ADMIN' | 'USER' | 'PUBLIC' | 'ONLY_AUTH';

export interface NavLink {
  href: string;
  label: string;
  authLevel: AuthLevel;
}

export const isLinkVisible = (
  authLevel: AuthLevel,
  isAuthenticated: boolean,
  userRole?: string,
): boolean => {
  switch (authLevel) {
    case 'ADMIN':
      return userRole === 'ADMIN';
    case 'USER':
      return isAuthenticated;
    case 'PUBLIC':
      return true;
    default:
      return false;
  }
};

export const getVisibleLinks = (
  links: NavLink[],
  isAuthenticated: boolean,
  userRole?: string,
): NavLink[] => {
  return links.filter((link) => {
    if (userRole === 'ADMIN') {
      return (
        link.authLevel === 'USER' ||
        link.authLevel === 'PUBLIC' ||
        link.authLevel === 'ADMIN'
      );
    }
    if (isAuthenticated) {
      return link.authLevel === 'USER' || link.authLevel === 'PUBLIC';
    }
    return link.authLevel === 'PUBLIC' || link.authLevel === 'ONLY_AUTH';
  });
};
