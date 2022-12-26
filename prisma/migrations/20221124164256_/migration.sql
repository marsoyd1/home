/*
  Warnings:

  - Added the required column `datacreate` to the `home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `home` ADD COLUMN `datacreate` DATETIME(3) NOT NULL;
