-- CreateTable
CREATE TABLE "Retrospective" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "workSummary" JSONB NOT NULL,
    "keyResultImpact" JSONB NOT NULL,
    "blockers" TEXT,
    "insights" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Retrospective_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Retrospective_userId_idx" ON "Retrospective"("userId");

-- CreateIndex
CREATE INDEX "Retrospective_teamId_idx" ON "Retrospective"("teamId");

-- CreateIndex
CREATE INDEX "Retrospective_weekStart_idx" ON "Retrospective"("weekStart");

-- AddForeignKey
ALTER TABLE "Retrospective" ADD CONSTRAINT "Retrospective_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retrospective" ADD CONSTRAINT "Retrospective_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
