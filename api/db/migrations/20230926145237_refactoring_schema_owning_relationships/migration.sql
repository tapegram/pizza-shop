/*
  Warnings:

  - You are about to drop the column `orderId` on the `CustomerInfo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerInfoId" INTEGER NOT NULL,
    "deliveryId" INTEGER,
    "pizzaTypeId" INTEGER NOT NULL,
    "pizzaSizeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerInfoId_fkey" FOREIGN KEY ("customerInfoId") REFERENCES "CustomerInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_pizzaTypeId_fkey" FOREIGN KEY ("pizzaTypeId") REFERENCES "PizzaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_pizzaSizeId_fkey" FOREIGN KEY ("pizzaSizeId") REFERENCES "PizzaSize" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerInfoId", "deliveryId", "id", "pizzaSizeId", "pizzaTypeId", "updatedAt") SELECT "createdAt", "customerInfoId", "deliveryId", "id", "pizzaSizeId", "pizzaTypeId", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_customerInfoId_key" ON "Order"("customerInfoId");
CREATE TABLE "new_CustomerInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CustomerInfo" ("createdAt", "email", "id", "name", "phone", "updatedAt") SELECT "createdAt", "email", "id", "name", "phone", "updatedAt" FROM "CustomerInfo";
DROP TABLE "CustomerInfo";
ALTER TABLE "new_CustomerInfo" RENAME TO "CustomerInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
