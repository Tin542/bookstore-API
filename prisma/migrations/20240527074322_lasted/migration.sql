/*
  Warnings:

  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "refreshToken" SET NOT NULL;
