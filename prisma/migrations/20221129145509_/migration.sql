/*
  Warnings:

  - You are about to alter the column `datacreate` on the `home` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(2)`.

*/
-- AlterTable
ALTER TABLE `home` MODIFY `datacreate` DATETIME(2) NOT NULL;
