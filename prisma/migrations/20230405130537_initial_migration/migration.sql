-- CreateTable
CREATE TABLE "RegisteredEmail" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegisteredEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredEmail_value_key" ON "RegisteredEmail"("value");
