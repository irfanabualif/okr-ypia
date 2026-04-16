-- CreateEnum
CREATE TYPE "EffortLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'DEEP_WORK');

-- CreateEnum
CREATE TYPE "TaskComplexity" AS ENUM ('ROUTINE', 'MODERATE', 'STRATEGIC');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('CREATIVE', 'OPERATIONAL', 'STRATEGIC', 'ADMINISTRATIVE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "activityScore" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "complexity" "TaskComplexity" NOT NULL DEFAULT 'ROUTINE',
ADD COLUMN     "contributionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "effortLevel" "EffortLevel" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "isDeepWork" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "taskCategory" "TaskCategory";
