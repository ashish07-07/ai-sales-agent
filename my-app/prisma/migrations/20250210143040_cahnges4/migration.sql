-- CreateTable
CREATE TABLE "quote" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "customization" TEXT NOT NULL,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);
