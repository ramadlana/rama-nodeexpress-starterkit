/*
 Navicat Premium Data Transfer

 Source Server         : Postgresql Local Radius
 Source Server Type    : PostgreSQL
 Source Server Version : 140002
 Source Host           : 192.168.16.99:5432
 Source Catalog        : radius
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140002
 File Encoding         : 65001

 Date: 22/04/2022 21:50:04
*/


-- ----------------------------
-- Table structure for app_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."app_users";
CREATE TABLE "public"."app_users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "roles" "public"."RoleEnum" NOT NULL DEFAULT 'user'::"RoleEnum",
  "isActive" bool DEFAULT false
)
;

-- ----------------------------
-- Records of app_users
-- ----------------------------
INSERT INTO "public"."app_users" VALUES (32, 'test', '$2b$10$5EXLl3fniY5D5COEjTTbk.Knx1gdpJVh9s9TI8InPmU6l/IqeRB9C', 'baba2@baba.com', 'user', 't');

-- ----------------------------
-- Uniques structure for table app_users
-- ----------------------------
ALTER TABLE "public"."app_users" ADD CONSTRAINT "usernameUnique" UNIQUE ("username");
ALTER TABLE "public"."app_users" ADD CONSTRAINT "emailUnique" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table app_users
-- ----------------------------
ALTER TABLE "public"."app_users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
