/*
  Warnings:

  - Added the required column `salt` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vault" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vault" ("id", "userId") SELECT "id", "userId" FROM "Vault";
DROP TABLE "Vault";
ALTER TABLE "new_Vault" RENAME TO "Vault";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
