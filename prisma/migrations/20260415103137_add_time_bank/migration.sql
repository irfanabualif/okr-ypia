-- CreateEnum
CREATE TYPE "TimeBankStatus" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "TimeBankEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "notes" TEXT,
    "approvedById" TEXT,
    "status" "TimeBankStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeBankEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimeBankEntry_userId_idx" ON "TimeBankEntry"("userId");

-- CreateIndex
CREATE INDEX "TimeBankEntry_teamId_idx" ON "TimeBankEntry"("teamId");

-- CreateIndex
CREATE INDEX "TimeBankEntry_entryDate_idx" ON "TimeBankEntry"("entryDate");

-- CreateIndex
CREATE INDEX "TimeBankEntry_status_idx" ON "TimeBankEntry"("status");

-- AddForeignKey
ALTER TABLE "TimeBankEntry" ADD CONSTRAINT "TimeBankEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBankEntry" ADD CONSTRAINT "TimeBankEntry_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBankEntry" ADD CONSTRAINT "TimeBankEntry_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
