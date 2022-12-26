/*
  Warnings:

  - You are about to drop the column `name` on the `home` table. All the data in the column will be lost.
  - Added the required column `name_home` to the `home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `home` DROP COLUMN `name`,
    ADD COLUMN `name_home` VARCHAR(255) NOT NULL;
