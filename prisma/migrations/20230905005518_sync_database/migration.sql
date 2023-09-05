-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `discountPercentage` DOUBLE NULL,
    `rating` DOUBLE NULL,
    `stock` INTEGER NULL,
    `brand` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `images` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
