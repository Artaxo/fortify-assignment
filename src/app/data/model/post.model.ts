export interface Post {
  id: number | null;
  userId: number | null;
  title: string;
  body: string;
}

export interface PostWithUserData extends Post {
  userName: string;
  company: string;
  userWebsite: string;
}

export function postInit(): Post {
  return {id: null, userId: null, body: '', title: ''}
}

export function isPostGuard(obj: any): obj is Post {
  return obj && typeof obj === "object" && 'id' in obj &&
    'userId' in obj && 'title' in obj && 'body' in obj;
}
