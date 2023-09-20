/*
  Warnings:

  - You are about to drop the `Track` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_trackId_fkey";

-- DropTable
DROP TABLE "Track";
