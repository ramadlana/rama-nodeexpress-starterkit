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

 Date: 22/04/2022 21:49:33
*/


-- ----------------------------
-- Table structure for app_dummy_country
-- ----------------------------
DROP TABLE IF EXISTS "public"."app_dummy_country";
CREATE TABLE "public"."app_dummy_country" (
  "id" int4 NOT NULL DEFAULT nextval('county_id_seq'::regclass),
  "country" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of app_dummy_country
-- ----------------------------
INSERT INTO "public"."app_dummy_country" VALUES (1, 'Indonesia');
INSERT INTO "public"."app_dummy_country" VALUES (2, 'Singapore');
INSERT INTO "public"."app_dummy_country" VALUES (3, 'Australia');
INSERT INTO "public"."app_dummy_country" VALUES (4, 'China');
INSERT INTO "public"."app_dummy_country" VALUES (5, 'Siberia');
INSERT INTO "public"."app_dummy_country" VALUES (6, 'Japan');
INSERT INTO "public"."app_dummy_country" VALUES (7, 'Malaysia');

-- ----------------------------
-- Primary Key structure for table app_dummy_country
-- ----------------------------
ALTER TABLE "public"."app_dummy_country" ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
