/*
  Warnings:

  - You are about to alter the column `datacreate` on the `home` table. The data in that column could be lost. The data in that column will be cast from `DateTime(2)` to `DateTime(1)`.

*/
-- AlterTable
ALTER TABLE `home` MODIFY `datacreate` DATETIME(1) NOT NULL;
