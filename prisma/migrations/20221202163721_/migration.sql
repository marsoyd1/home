/*
  Warnings:

  - Added the required column `Role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `Role` INTEGER NOT NULL;
