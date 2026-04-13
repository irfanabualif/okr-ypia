export function canViewAdmin(role?: string) {
  return role === "super_admin" || role === "admin";
}

export function canViewTeam(role?: string) {
  return (
    role === "super_admin" ||
    role === "admin" ||
    role === "manager" ||
    role === "division_head"
  );
}