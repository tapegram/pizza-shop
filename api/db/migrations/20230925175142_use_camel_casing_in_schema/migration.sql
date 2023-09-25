/*
  Warnings:

  - You are about to drop the column `is_available` on the `PizzaSize` table. All the data in the column will be lost.
  - You are about to drop the column `is_available` on the `PizzaType` table. All the data in the column will be lost.
  - You are about to drop the column `is_available` on the `PizzaTopping` table. All the data in the column will be lost.
  - Added the required column `isAvailable` to the `PizzaSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `PizzaType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `PizzaTopping` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PizzaSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL
);
INSERT INTO "new_PizzaSize" ("id", "name") SELECT "id", "name" FROM "PizzaSize";
DROP TABLE "PizzaSize";
ALTER TABLE "new_PizzaSize" RENAME TO "PizzaSize";
CREATE UNIQUE INDEX "PizzaSize_name_key" ON "PizzaSize"("name");
CREATE TABLE "new_PizzaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL
);
INSERT INTO "new_PizzaType" ("id", "name") SELECT "id", "name" FROM "PizzaType";
DROP TABLE "PizzaType";
ALTER TABLE "new_PizzaType" RENAME TO "PizzaType";
CREATE UNIQUE INDEX "PizzaType_name_key" ON "PizzaType"("name");
CREATE TABLE "new_PizzaTopping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL
);
INSERT INTO "new_PizzaTopping" ("id", "name") SELECT "id", "name" FROM "PizzaTopping";
DROP TABLE "PizzaTopping";
ALTER TABLE "new_PizzaTopping" RENAME TO "PizzaTopping";
CREATE UNIQUE INDEX "PizzaTopping_name_key" ON "PizzaTopping"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
