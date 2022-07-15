/*
  Warnings:

  - The values [Credito,Debito,Ambos] on the enum `CardTypes` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `number` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardTypes_new" AS ENUM ('credito', 'debito', 'ambos');
ALTER TABLE "cards" ALTER COLUMN "type" TYPE "CardTypes_new" USING ("type"::text::"CardTypes_new");
ALTER TYPE "CardTypes" RENAME TO "CardTypes_old";
ALTER TYPE "CardTypes_new" RENAME TO "CardTypes";
DROP TYPE "CardTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "number" TEXT NOT NULL,
ALTER COLUMN "securityCode" SET DATA TYPE TEXT;
