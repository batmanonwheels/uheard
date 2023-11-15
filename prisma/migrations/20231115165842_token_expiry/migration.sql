-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenExpiresAt" TIMESTAMP(6) NOT NULL DEFAULT NOW() + interval '1 hour';
