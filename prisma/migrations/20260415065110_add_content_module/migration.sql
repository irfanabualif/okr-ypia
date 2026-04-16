-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'SINGLE_POST', 'CAROUSEL', 'ARTICLE', 'THUMBNAIL');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('IDEA', 'PENDING', 'PRODUCTION', 'REVIEW', 'REVISION', 'APPROVED', 'PUBLISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "contentType" "ContentType" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'IDEA',
    "requestorId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "teamId" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "publishDate" TIMESTAMP(3),
    "productionLink" TEXT,
    "revisionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Content_status_idx" ON "Content"("status");

-- CreateIndex
CREATE INDEX "Content_teamId_idx" ON "Content"("teamId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
