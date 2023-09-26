/*
  Warnings:

  - You are about to drop the column `street_address_1` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street_address_2` on the `Address` table. All the data in the column will be lost.
  - Added the required column `streetAddress1` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress2` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress1" TEXT NOT NULL,
    "streetAddress2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL
);
INSERT INTO "new_Address" ("city", "id", "state", "zip") SELECT "city", "id", "state", "zip" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
