-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionExperience" (
    "experienceId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionExperience_pkey" PRIMARY KEY ("experienceId","subscriptionId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionInterest" (
    "interestId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionInterest_pkey" PRIMARY KEY ("interestId","subscriptionId")
);

-- CreateTable
CREATE TABLE "_ExperienceToSubscription" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestToSubscription" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "Subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_value_key" ON "Experience"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_value_key" ON "Interest"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_ExperienceToSubscription_AB_unique" ON "_ExperienceToSubscription"("A", "B");

-- CreateIndex
CREATE INDEX "_ExperienceToSubscription_B_index" ON "_ExperienceToSubscription"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToSubscription_AB_unique" ON "_InterestToSubscription"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToSubscription_B_index" ON "_InterestToSubscription"("B");

-- AddForeignKey
ALTER TABLE "_ExperienceToSubscription" ADD CONSTRAINT "_ExperienceToSubscription_A_fkey" FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToSubscription" ADD CONSTRAINT "_ExperienceToSubscription_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToSubscription" ADD CONSTRAINT "_InterestToSubscription_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToSubscription" ADD CONSTRAINT "_InterestToSubscription_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
