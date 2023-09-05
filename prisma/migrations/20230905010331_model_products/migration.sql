/*
  Warnings:

  - You are about to drop the column `titulo` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `titulo`,
    ADD COLUMN `title` VARCHAR(191) NULL;
