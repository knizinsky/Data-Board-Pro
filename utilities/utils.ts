export function mapUserToId(id: number, users: any[]) {
  return users.find((user) => user.id === id)?.name ?? "Unknown";
}
