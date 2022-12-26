-- DropForeignKey
ALTER TABLE `home` DROP FOREIGN KEY `home_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `lights` DROP FOREIGN KEY `lights_home_id_fkey`;

-- DropForeignKey
ALTER TABLE `sockets` DROP FOREIGN KEY `sockets_home_id_fkey`;

-- AddForeignKey
ALTER TABLE `home` ADD CONSTRAINT `home_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lights` ADD CONSTRAINT `lights_home_id_fkey` FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sockets` ADD CONSTRAINT `sockets_home_id_fkey` FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
