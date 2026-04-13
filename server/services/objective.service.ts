import {
  findAllObjectives,
  findObjectiveById,
} from "@/server/repositories/objective.repository";

export async function getObjectives() {
  return findAllObjectives();
}

export async function getObjectiveDetail(id: string) {
  return findObjectiveById(id);
}