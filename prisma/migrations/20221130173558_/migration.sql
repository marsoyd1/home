/*
  Warnings:

  - You are about to drop the column `name_socket` on the `sockets` table. All the data in the column will be lost.
  - Added the required column `name_sockets` to the `sockets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sockets` DROP COLUMN `name_socket`,
    ADD COLUMN `name_sockets` VARCHAR(255) NOT NULL;
