/*
  Warnings:

  - Added the required column `ISRC` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackArtist` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackPreviewUrl` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackTitle` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackUrl` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "ISRC" TEXT NOT NULL,
ADD COLUMN     "trackArtist" TEXT NOT NULL,
ADD COLUMN     "trackPreviewUrl" TEXT NOT NULL,
ADD COLUMN     "trackTitle" TEXT NOT NULL,
ADD COLUMN     "trackUrl" TEXT NOT NULL;
