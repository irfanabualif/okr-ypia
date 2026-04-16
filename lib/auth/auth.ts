export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function getCurrentUser(): Promise<AppUser | null> {
  return {
    id: "demo-user",
    name: "Demo Super Admin",
    email: "admin@ypia.or.id",
    role: "super_admin",
  };
}