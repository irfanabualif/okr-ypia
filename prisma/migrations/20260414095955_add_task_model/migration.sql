-- CreateEnum
CREATE TYPE "TaskSourceType" AS ENUM ('OKR', 'OPERATIONAL', 'SUPPORT', 'AD_HOC');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('ROUTINE', 'INITIATIVE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'DONE', 'BLOCKED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "objectiveId" TEXT,
    "keyResultId" TEXT,
    "sourceType" "TaskSourceType" NOT NULL,
    "taskType" "TaskType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "taskDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- CreateIndex
CREATE INDEX "Task_teamId_idx" ON "Task"("teamId");

-- CreateIndex
CREATE INDEX "Task_objectiveId_idx" ON "Task"("objectiveId");

-- CreateIndex
CREATE INDEX "Task_keyResultId_idx" ON "Task"("keyResultId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_taskDate_idx" ON "Task"("taskDate");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_keyResultId_fkey" FOREIGN KEY ("keyResultId") REFERENCES "KeyResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
