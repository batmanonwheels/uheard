/*
  Warnings:

  - You are about to drop the column `ISRC` on the `Recommendation` table. All the data in the column will be lost.
  - The `trackArtist` column on the `Recommendation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `trackAlbum` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackISRC` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackImage` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "ISRC",
ADD COLUMN     "trackAlbum" TEXT NOT NULL,
ADD COLUMN     "trackISRC" TEXT NOT NULL,
ADD COLUMN     "trackImage" TEXT NOT NULL,
DROP COLUMN "trackArtist",
ADD COLUMN     "trackArtist" TEXT[];
