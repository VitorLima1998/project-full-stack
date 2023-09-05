/*
  Warnings:

  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `title`,
    ADD COLUMN `titulo` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `images` VARCHAR(191) NULL;
