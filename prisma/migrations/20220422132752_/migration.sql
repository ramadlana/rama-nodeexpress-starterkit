/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_countryId_fkey";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "app_users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "roles" "RoleEnum" NOT NULL DEFAULT E'user',

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_dummy_person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "app_dummy_person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_dummy_country" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "app_dummy_country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usernameUnique" ON "app_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "emailUnique" ON "app_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "app_dummy_person_name_key" ON "app_dummy_person"("name");

-- AddForeignKey
ALTER TABLE "app_dummy_person" ADD CONSTRAINT "app_dummy_person_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "app_dummy_country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
