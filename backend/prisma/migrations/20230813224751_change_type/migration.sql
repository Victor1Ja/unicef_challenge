/*
  Warnings:

  - The `geolocationAccuracy` column on the `school_info_cleaned` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "school_info_cleaned" DROP COLUMN "geolocationAccuracy",
ADD COLUMN     "geolocationAccuracy" INTEGER;
