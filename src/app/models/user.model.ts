export interface User {
  login: string;
  id: string;
  avatar_url: string;
  name?: string | null;
  company?: string | null;
  blog?: string | null;
  location?: string | null;
}
