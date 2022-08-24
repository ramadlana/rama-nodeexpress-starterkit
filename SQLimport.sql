/*
 Navicat Premium Data Transfer

 Source Server         : Postgresql Local Radisu
 Source Server Type    : PostgreSQL
 Source Server Version : 140002
 Source Host           : 192.168.16.99:5432
 Source Catalog        : expressstarter
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140002
 File Encoding         : 65001

 Date: 20/04/2022 14:43:41
*/


-- ----------------------------
-- Type structure for RoleEnum
-- ----------------------------
DROP TYPE IF EXISTS "public"."RoleEnum";
CREATE TYPE "public"."RoleEnum" AS ENUM (
  'superadmin',
  'admin',
  'user',
  'customer',
  'level1',
  'level2',
  'level3',
  'level4'
);
ALTER TYPE "public"."RoleEnum" OWNER TO "user_test";

-- ----------------------------
-- Sequence structure for Country_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Country_id_seq";
CREATE SEQUENCE "public"."Country_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Person_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Person_id_seq";
CREATE SEQUENCE "public"."Person_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Country
-- ----------------------------
DROP TABLE IF EXISTS "public"."Country";
CREATE TABLE "public"."Country" (
  "id" int4 NOT NULL DEFAULT nextval('"Country_id_seq"'::regclass),
  "country" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of Country
-- ----------------------------
INSERT INTO "public"."Country" VALUES (1, 'Indonesia');
INSERT INTO "public"."Country" VALUES (2, 'Singapore');
INSERT INTO "public"."Country" VALUES (3, 'Australia');
INSERT INTO "public"."Country" VALUES (4, 'China');
INSERT INTO "public"."Country" VALUES (5, 'Siberia');
INSERT INTO "public"."Country" VALUES (6, 'Japan');

-- ----------------------------
-- Table structure for Person
-- ----------------------------
DROP TABLE IF EXISTS "public"."Person";
CREATE TABLE "public"."Person" (
  "id" int4 NOT NULL DEFAULT nextval('"Person_id_seq"'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "address" text COLLATE "pg_catalog"."default" NOT NULL,
  "countryId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of Person
-- ----------------------------
INSERT INTO "public"."Person" VALUES (1, 'user_test', 'prajekan', 1);
INSERT INTO "public"."Person" VALUES (2, 'bambang1', 'street 1', 2);
INSERT INTO "public"."Person" VALUES (118, 'user112', 'address 112', 5);
INSERT INTO "public"."Person" VALUES (4, 'bambang3', 'street 1', 2);
INSERT INTO "public"."Person" VALUES (119, 'user113', 'address 113', 2);
INSERT INTO "public"."Person" VALUES (6, 'bambang5', 'street 1', 2);
INSERT INTO "public"."Person" VALUES (5, 'bambang4', 'street 1', 3);
INSERT INTO "public"."Person" VALUES (3, 'bambang2', 'street 1', 3);
INSERT INTO "public"."Person" VALUES (7, 'user1', 'address 1', 1);
INSERT INTO "public"."Person" VALUES (8, 'user2', 'address 2', 2);
INSERT INTO "public"."Person" VALUES (9, 'user3', 'address 3', 3);
INSERT INTO "public"."Person" VALUES (10, 'user4', 'address 4', 1);
INSERT INTO "public"."Person" VALUES (11, 'user5', 'address 5', 2);
INSERT INTO "public"."Person" VALUES (12, 'user6', 'address 6', 3);
INSERT INTO "public"."Person" VALUES (13, 'user7', 'address 7', 6);
INSERT INTO "public"."Person" VALUES (14, 'user8', 'address 8', 2);
INSERT INTO "public"."Person" VALUES (15, 'user9', 'address 9', 3);
INSERT INTO "public"."Person" VALUES (16, 'user10', 'address 10', 1);
INSERT INTO "public"."Person" VALUES (17, 'user11', 'address 11', 2);
INSERT INTO "public"."Person" VALUES (18, 'user12', 'address 12', 3);
INSERT INTO "public"."Person" VALUES (19, 'user13', 'address 13', 1);
INSERT INTO "public"."Person" VALUES (20, 'user14', 'address 14', 2);
INSERT INTO "public"."Person" VALUES (21, 'user15', 'address 15', 3);
INSERT INTO "public"."Person" VALUES (22, 'user16', 'address 16', 1);
INSERT INTO "public"."Person" VALUES (23, 'user17', 'address 17', 2);
INSERT INTO "public"."Person" VALUES (24, 'user18', 'address 18', 3);
INSERT INTO "public"."Person" VALUES (25, 'user19', 'address 19', 1);
INSERT INTO "public"."Person" VALUES (26, 'user20', 'address 20', 2);
INSERT INTO "public"."Person" VALUES (27, 'user21', 'address 21', 3);
INSERT INTO "public"."Person" VALUES (28, 'user22', 'address 22', 4);
INSERT INTO "public"."Person" VALUES (29, 'user23', 'address 23', 3);
INSERT INTO "public"."Person" VALUES (30, 'user24', 'address 24', 5);
INSERT INTO "public"."Person" VALUES (31, 'user25', 'address 25', 2);
INSERT INTO "public"."Person" VALUES (32, 'user26', 'address 26', 6);
INSERT INTO "public"."Person" VALUES (33, 'user27', 'address 27', 1);
INSERT INTO "public"."Person" VALUES (34, 'user28', 'address 28', 2);
INSERT INTO "public"."Person" VALUES (35, 'user29', 'address 29', 3);
INSERT INTO "public"."Person" VALUES (36, 'user30', 'address 30', 4);
INSERT INTO "public"."Person" VALUES (37, 'user31', 'address 31', 5);
INSERT INTO "public"."Person" VALUES (38, 'user32', 'address 32', 1);
INSERT INTO "public"."Person" VALUES (39, 'user33', 'address 33', 2);
INSERT INTO "public"."Person" VALUES (40, 'user34', 'address 34', 3);
INSERT INTO "public"."Person" VALUES (41, 'user35', 'address 35', 1);
INSERT INTO "public"."Person" VALUES (42, 'user36', 'address 36', 2);
INSERT INTO "public"."Person" VALUES (43, 'user37', 'address 37', 3);
INSERT INTO "public"."Person" VALUES (44, 'user38', 'address 38', 1);
INSERT INTO "public"."Person" VALUES (45, 'user39', 'address 39', 2);
INSERT INTO "public"."Person" VALUES (46, 'user40', 'address 40', 3);
INSERT INTO "public"."Person" VALUES (47, 'user41', 'address 41', 1);
INSERT INTO "public"."Person" VALUES (48, 'user42', 'address 42', 2);
INSERT INTO "public"."Person" VALUES (49, 'user43', 'address 43', 3);
INSERT INTO "public"."Person" VALUES (50, 'user44', 'address 44', 4);
INSERT INTO "public"."Person" VALUES (51, 'user45', 'address 45', 3);
INSERT INTO "public"."Person" VALUES (52, 'user46', 'address 46', 5);
INSERT INTO "public"."Person" VALUES (53, 'user47', 'address 47', 2);
INSERT INTO "public"."Person" VALUES (54, 'user48', 'address 48', 6);
INSERT INTO "public"."Person" VALUES (55, 'user49', 'address 49', 1);
INSERT INTO "public"."Person" VALUES (56, 'user50', 'address 50', 2);
INSERT INTO "public"."Person" VALUES (57, 'user51', 'address 51', 3);
INSERT INTO "public"."Person" VALUES (58, 'user52', 'address 52', 4);
INSERT INTO "public"."Person" VALUES (59, 'user53', 'address 53', 5);
INSERT INTO "public"."Person" VALUES (60, 'user54', 'address 54', 1);
INSERT INTO "public"."Person" VALUES (61, 'user55', 'address 55', 2);
INSERT INTO "public"."Person" VALUES (62, 'user56', 'address 56', 3);
INSERT INTO "public"."Person" VALUES (63, 'user57', 'address 57', 1);
INSERT INTO "public"."Person" VALUES (64, 'user58', 'address 58', 2);
INSERT INTO "public"."Person" VALUES (65, 'user59', 'address 59', 3);
INSERT INTO "public"."Person" VALUES (66, 'user60', 'address 60', 1);
INSERT INTO "public"."Person" VALUES (67, 'user61', 'address 61', 2);
INSERT INTO "public"."Person" VALUES (68, 'user62', 'address 62', 3);
INSERT INTO "public"."Person" VALUES (69, 'user63', 'address 63', 1);
INSERT INTO "public"."Person" VALUES (70, 'user64', 'address 64', 2);
INSERT INTO "public"."Person" VALUES (71, 'user65', 'address 65', 3);
INSERT INTO "public"."Person" VALUES (72, 'user66', 'address 66', 4);
INSERT INTO "public"."Person" VALUES (73, 'user67', 'address 67', 3);
INSERT INTO "public"."Person" VALUES (74, 'user68', 'address 68', 5);
INSERT INTO "public"."Person" VALUES (75, 'user69', 'address 69', 2);
INSERT INTO "public"."Person" VALUES (76, 'user70', 'address 70', 6);
INSERT INTO "public"."Person" VALUES (77, 'user71', 'address 71', 1);
INSERT INTO "public"."Person" VALUES (78, 'user72', 'address 72', 2);
INSERT INTO "public"."Person" VALUES (79, 'user73', 'address 73', 3);
INSERT INTO "public"."Person" VALUES (80, 'user74', 'address 74', 4);
INSERT INTO "public"."Person" VALUES (81, 'user75', 'address 75', 5);
INSERT INTO "public"."Person" VALUES (82, 'user76', 'address 76', 1);
INSERT INTO "public"."Person" VALUES (83, 'user77', 'address 77', 2);
INSERT INTO "public"."Person" VALUES (84, 'user78', 'address 78', 3);
INSERT INTO "public"."Person" VALUES (85, 'user79', 'address 79', 1);
INSERT INTO "public"."Person" VALUES (86, 'user80', 'address 80', 2);
INSERT INTO "public"."Person" VALUES (87, 'user81', 'address 81', 3);
INSERT INTO "public"."Person" VALUES (88, 'user82', 'address 82', 1);
INSERT INTO "public"."Person" VALUES (89, 'user83', 'address 83', 2);
INSERT INTO "public"."Person" VALUES (90, 'user84', 'address 84', 3);
INSERT INTO "public"."Person" VALUES (91, 'user85', 'address 85', 1);
INSERT INTO "public"."Person" VALUES (92, 'user86', 'address 86', 2);
INSERT INTO "public"."Person" VALUES (93, 'user87', 'address 87', 3);
INSERT INTO "public"."Person" VALUES (94, 'user88', 'address 88', 4);
INSERT INTO "public"."Person" VALUES (95, 'user89', 'address 89', 3);
INSERT INTO "public"."Person" VALUES (96, 'user90', 'address 90', 5);
INSERT INTO "public"."Person" VALUES (97, 'user91', 'address 91', 2);
INSERT INTO "public"."Person" VALUES (98, 'user92', 'address 92', 6);
INSERT INTO "public"."Person" VALUES (99, 'user93', 'address 93', 1);
INSERT INTO "public"."Person" VALUES (100, 'user94', 'address 94', 2);
INSERT INTO "public"."Person" VALUES (101, 'user95', 'address 95', 3);
INSERT INTO "public"."Person" VALUES (102, 'user96', 'address 96', 4);
INSERT INTO "public"."Person" VALUES (103, 'user97', 'address 97', 5);
INSERT INTO "public"."Person" VALUES (104, 'user98', 'address 98', 1);
INSERT INTO "public"."Person" VALUES (105, 'user99', 'address 99', 2);
INSERT INTO "public"."Person" VALUES (106, 'user100', 'address 100', 3);
INSERT INTO "public"."Person" VALUES (107, 'user101', 'address 101', 1);
INSERT INTO "public"."Person" VALUES (108, 'user102', 'address 102', 2);
INSERT INTO "public"."Person" VALUES (109, 'user103', 'address 103', 3);
INSERT INTO "public"."Person" VALUES (110, 'user104', 'address 104', 1);
INSERT INTO "public"."Person" VALUES (111, 'user105', 'address 105', 2);
INSERT INTO "public"."Person" VALUES (112, 'user106', 'address 106', 3);
INSERT INTO "public"."Person" VALUES (113, 'user107', 'address 107', 1);
INSERT INTO "public"."Person" VALUES (114, 'user108', 'address 108', 2);
INSERT INTO "public"."Person" VALUES (115, 'user109', 'address 109', 3);
INSERT INTO "public"."Person" VALUES (116, 'user110', 'address 110', 4);
INSERT INTO "public"."Person" VALUES (117, 'user111', 'address 111', 3);

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO "public"."_prisma_migrations" VALUES ('f6226225-e440-4b6b-b813-a7dddecfb542', '343cc1d2fff495bfa144038428626d2b0920b949b1fcd2b12d500652bdfdcc75', '2022-04-14 01:04:23.615635+00', '20220414010423_', NULL, NULL, '2022-04-14 01:04:23.566954+00', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('32ba2d11-4e38-4ce9-a3cc-3ea621e42866', 'b88e62b207020fa1dda722a888ae70e5741e0fa6952fc46b44364c882aa8a335', '2022-04-15 01:49:03.07518+00', '20220415014902_', NULL, NULL, '2022-04-15 01:49:03.007136+00', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('b76a2d55-2889-4b52-861b-afe139df1045', 'c8c9a6ed0b1be9f5e4bb2f977b985a14d87a076a19a6598d5448e8994f2b51f1', '2022-04-15 01:57:06.354058+00', '20220415015705_', NULL, NULL, '2022-04-15 01:57:06.329934+00', 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "roles" "public"."RoleEnum" NOT NULL DEFAULT 'user'::"RoleEnum"
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'asa', '$2b$10$BgCHlTBKPz5YLS.gxN9x4Ouzw2MPeQSay.8Qw2XBCa.Sum27mzbNa', 'sa', 'user');
INSERT INTO "public"."users" VALUES (2, '1', '$2b$10$3f4ZHR.io.kE3oYAk9OcrepsR5J8rEAmD.JSpyKwiXz.a.BErsYjm', '1', 'user');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Country_id_seq"
OWNED BY "public"."Country"."id";
SELECT setval('"public"."Country_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Person_id_seq"
OWNED BY "public"."Person"."id";
SELECT setval('"public"."Person_id_seq"', 122, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table Country
-- ----------------------------
ALTER TABLE "public"."Country" ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table Person
-- ----------------------------
CREATE UNIQUE INDEX "Person_name_key" ON "public"."Person" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Person
-- ----------------------------
ALTER TABLE "public"."Person" ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "public"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE UNIQUE INDEX "emailUnique" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "usernameUnique" ON "public"."users" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Person
-- ----------------------------
ALTER TABLE "public"."Person" ADD CONSTRAINT "Person_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
