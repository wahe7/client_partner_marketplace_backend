/*
  Warnings:

  - Added the required column `city` to the `PartnerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."InquiryStatus" AS ENUM ('NEW', 'RESPONDED', 'BOOKED', 'CLOSED');

-- AlterTable
ALTER TABLE "public"."PartnerProfile" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "public"."Inquiry" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "referenceImage" TEXT,
    "status" "public"."InquiryStatus" NOT NULL DEFAULT 'NEW',
    "assignedPartners" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Inquiry" ADD CONSTRAINT "Inquiry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
