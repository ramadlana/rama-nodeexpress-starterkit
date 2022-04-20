-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('superadmin', 'admin', 'user', 'customer', 'level1', 'level2', 'level3', 'level4');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "roles" "RoleEnum" NOT NULL DEFAULT E'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usernameUnique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "emailUnique" ON "users"("email");
