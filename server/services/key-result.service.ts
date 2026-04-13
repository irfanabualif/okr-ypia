import { findAllKeyResults } from "@/server/repositories/key-result.repository";

export async function getKeyResults() {
  return findAllKeyResults();
}