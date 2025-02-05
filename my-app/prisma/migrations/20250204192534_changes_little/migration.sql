-- CreateTable
CREATE TABLE "itemdetails" (
    "id" SERIAL NOT NULL,
    "itemname" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagelink" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "itemdetails_pkey" PRIMARY KEY ("id")
);
