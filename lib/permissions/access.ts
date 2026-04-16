export function isSuperAdmin(role?: string) {
  return role === "super_admin";
}

export function isAdmin(role?: string) {
  return role === "super_admin" || role === "admin";
}

export function canViewAdmin(role?: string) {
  return isAdmin(role);
}

export function canViewTeamDashboard(role?: string) {
  return (
    role === "super_admin" ||
    role === "admin" ||
    role === "manager" ||
    role === "division_head"
  );
}

export function canManageContentWorkflow(role?: string) {
  return (
    role === "super_admin" ||
    role === "admin" ||
    role === "manager" ||
    role === "division_head"
  );
}

export function canApproveContent(role?: string) {
  return (
    role === "super_admin" ||
    role === "admin" ||
    role === "manager" ||
    role === "division_head"
  );
}

export function canPublishContent(role?: string) {
  return role === "super_admin" || role === "admin";
}