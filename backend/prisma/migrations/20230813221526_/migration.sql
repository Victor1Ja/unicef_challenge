/*
  Warnings:

  - The primary key for the `entity_data_quality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `entity_data_quality` table. All the data in the column will be lost.
  - The primary key for the `school_info_cleaned` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `geolocationPos` on the `school_info_cleaned` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `school_info_cleaned` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation` on the `school_info_from_entity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entityId]` on the table `entity_data_quality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schoolId]` on the table `school_info_cleaned` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schoolId,entityId]` on the table `school_info_from_entity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "school_info_cleaned" DROP CONSTRAINT "school_info_cleaned_schoolId_fkey";

-- AlterTable
ALTER TABLE "entity_data_quality" DROP CONSTRAINT "entity_data_quality_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "entity_data_quality_pkey" PRIMARY KEY ("entityId");

-- AlterTable
ALTER TABLE "school_info_cleaned" DROP CONSTRAINT "school_info_cleaned_pkey",
DROP COLUMN "geolocationPos",
DROP COLUMN "id",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD CONSTRAINT "school_info_cleaned_pkey" PRIMARY KEY ("schoolId");

-- AlterTable
ALTER TABLE "school_info_from_entity" DROP COLUMN "geolocation",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "entity_data_quality_entityId_key" ON "entity_data_quality"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "school_info_cleaned_schoolId_key" ON "school_info_cleaned"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "school_info_from_entity_schoolId_entityId_key" ON "school_info_from_entity"("schoolId", "entityId");

-- AddForeignKey
ALTER TABLE "school_info_cleaned" ADD CONSTRAINT "school_info_cleaned_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
