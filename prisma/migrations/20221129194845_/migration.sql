/*
  Warnings:

  - Added the required column `name_lights` to the `lights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_socket` to the `sockets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lights` ADD COLUMN `name_lights` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `sockets` ADD COLUMN `name_socket` VARCHAR(255) NOT NULL;
