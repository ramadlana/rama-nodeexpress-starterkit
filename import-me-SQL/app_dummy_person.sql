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

 Date: 22/04/2022 21:49:41
*/


-- ----------------------------
-- Table structure for app_dummy_person
-- ----------------------------
DROP TABLE IF EXISTS "public"."app_dummy_person";
CREATE TABLE "public"."app_dummy_person" (
  "id" int4 NOT NULL DEFAULT nextval('persons_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "countryId" int4
)
;

-- ----------------------------
-- Records of app_dummy_person
-- ----------------------------
INSERT INTO "public"."app_dummy_person" VALUES (1, 'hidayah', 'prajekan', 1);
INSERT INTO "public"."app_dummy_person" VALUES (2, 'bambang1', 'street 1', 2);
INSERT INTO "public"."app_dummy_person" VALUES (118, 'user112', 'address 112', 5);
INSERT INTO "public"."app_dummy_person" VALUES (4, 'bambang3', 'street 1', 2);
INSERT INTO "public"."app_dummy_person" VALUES (119, 'user113', 'address 113', 2);
INSERT INTO "public"."app_dummy_person" VALUES (6, 'bambang5', 'street 1', 2);
INSERT INTO "public"."app_dummy_person" VALUES (5, 'bambang4', 'street 1', 3);
INSERT INTO "public"."app_dummy_person" VALUES (3, 'bambang2', 'street 1', 3);
INSERT INTO "public"."app_dummy_person" VALUES (7, 'user1', 'address 1', 1);
INSERT INTO "public"."app_dummy_person" VALUES (8, 'user2', 'address 2', 2);
INSERT INTO "public"."app_dummy_person" VALUES (9, 'user3', 'address 3', 3);
INSERT INTO "public"."app_dummy_person" VALUES (10, 'user4', 'address 4', 1);
INSERT INTO "public"."app_dummy_person" VALUES (11, 'user5', 'address 5', 2);
INSERT INTO "public"."app_dummy_person" VALUES (12, 'user6', 'address 6', 3);
INSERT INTO "public"."app_dummy_person" VALUES (13, 'user7', 'address 7', 6);
INSERT INTO "public"."app_dummy_person" VALUES (14, 'user8', 'address 8', 2);
INSERT INTO "public"."app_dummy_person" VALUES (15, 'user9', 'address 9', 3);
INSERT INTO "public"."app_dummy_person" VALUES (16, 'user10', 'address 10', 1);
INSERT INTO "public"."app_dummy_person" VALUES (17, 'user11', 'address 11', 2);
INSERT INTO "public"."app_dummy_person" VALUES (18, 'user12', 'address 12', 3);
INSERT INTO "public"."app_dummy_person" VALUES (19, 'user13', 'address 13', 1);
INSERT INTO "public"."app_dummy_person" VALUES (20, 'user14', 'address 14', 2);
INSERT INTO "public"."app_dummy_person" VALUES (21, 'user15', 'address 15', 3);
INSERT INTO "public"."app_dummy_person" VALUES (22, 'user16', 'address 16', 1);
INSERT INTO "public"."app_dummy_person" VALUES (23, 'user17', 'address 17', 2);
INSERT INTO "public"."app_dummy_person" VALUES (24, 'user18', 'address 18', 3);
INSERT INTO "public"."app_dummy_person" VALUES (25, 'user19', 'address 19', 1);
INSERT INTO "public"."app_dummy_person" VALUES (26, 'user20', 'address 20', 2);
INSERT INTO "public"."app_dummy_person" VALUES (27, 'user21', 'address 21', 3);
INSERT INTO "public"."app_dummy_person" VALUES (28, 'user22', 'address 22', 4);
INSERT INTO "public"."app_dummy_person" VALUES (29, 'user23', 'address 23', 3);
INSERT INTO "public"."app_dummy_person" VALUES (30, 'user24', 'address 24', 5);
INSERT INTO "public"."app_dummy_person" VALUES (31, 'user25', 'address 25', 2);
INSERT INTO "public"."app_dummy_person" VALUES (32, 'user26', 'address 26', 6);
INSERT INTO "public"."app_dummy_person" VALUES (33, 'user27', 'address 27', 1);
INSERT INTO "public"."app_dummy_person" VALUES (34, 'user28', 'address 28', 2);
INSERT INTO "public"."app_dummy_person" VALUES (35, 'user29', 'address 29', 3);
INSERT INTO "public"."app_dummy_person" VALUES (36, 'user30', 'address 30', 4);
INSERT INTO "public"."app_dummy_person" VALUES (37, 'user31', 'address 31', 5);
INSERT INTO "public"."app_dummy_person" VALUES (38, 'user32', 'address 32', 1);
INSERT INTO "public"."app_dummy_person" VALUES (39, 'user33', 'address 33', 2);
INSERT INTO "public"."app_dummy_person" VALUES (40, 'user34', 'address 34', 3);
INSERT INTO "public"."app_dummy_person" VALUES (41, 'user35', 'address 35', 1);
INSERT INTO "public"."app_dummy_person" VALUES (42, 'user36', 'address 36', 2);
INSERT INTO "public"."app_dummy_person" VALUES (43, 'user37', 'address 37', 3);
INSERT INTO "public"."app_dummy_person" VALUES (44, 'user38', 'address 38', 1);
INSERT INTO "public"."app_dummy_person" VALUES (45, 'user39', 'address 39', 2);
INSERT INTO "public"."app_dummy_person" VALUES (46, 'user40', 'address 40', 3);
INSERT INTO "public"."app_dummy_person" VALUES (47, 'user41', 'address 41', 1);
INSERT INTO "public"."app_dummy_person" VALUES (48, 'user42', 'address 42', 2);
INSERT INTO "public"."app_dummy_person" VALUES (49, 'user43', 'address 43', 3);
INSERT INTO "public"."app_dummy_person" VALUES (50, 'user44', 'address 44', 4);
INSERT INTO "public"."app_dummy_person" VALUES (51, 'user45', 'address 45', 3);
INSERT INTO "public"."app_dummy_person" VALUES (52, 'user46', 'address 46', 5);
INSERT INTO "public"."app_dummy_person" VALUES (53, 'user47', 'address 47', 2);
INSERT INTO "public"."app_dummy_person" VALUES (54, 'user48', 'address 48', 6);
INSERT INTO "public"."app_dummy_person" VALUES (55, 'user49', 'address 49', 1);
INSERT INTO "public"."app_dummy_person" VALUES (56, 'user50', 'address 50', 2);
INSERT INTO "public"."app_dummy_person" VALUES (57, 'user51', 'address 51', 3);
INSERT INTO "public"."app_dummy_person" VALUES (58, 'user52', 'address 52', 4);
INSERT INTO "public"."app_dummy_person" VALUES (59, 'user53', 'address 53', 5);
INSERT INTO "public"."app_dummy_person" VALUES (60, 'user54', 'address 54', 1);
INSERT INTO "public"."app_dummy_person" VALUES (61, 'user55', 'address 55', 2);
INSERT INTO "public"."app_dummy_person" VALUES (62, 'user56', 'address 56', 3);
INSERT INTO "public"."app_dummy_person" VALUES (63, 'user57', 'address 57', 1);
INSERT INTO "public"."app_dummy_person" VALUES (64, 'user58', 'address 58', 2);
INSERT INTO "public"."app_dummy_person" VALUES (65, 'user59', 'address 59', 3);
INSERT INTO "public"."app_dummy_person" VALUES (66, 'user60', 'address 60', 1);
INSERT INTO "public"."app_dummy_person" VALUES (67, 'user61', 'address 61', 2);
INSERT INTO "public"."app_dummy_person" VALUES (68, 'user62', 'address 62', 3);
INSERT INTO "public"."app_dummy_person" VALUES (69, 'user63', 'address 63', 1);
INSERT INTO "public"."app_dummy_person" VALUES (70, 'user64', 'address 64', 2);
INSERT INTO "public"."app_dummy_person" VALUES (71, 'user65', 'address 65', 3);
INSERT INTO "public"."app_dummy_person" VALUES (72, 'user66', 'address 66', 4);
INSERT INTO "public"."app_dummy_person" VALUES (73, 'user67', 'address 67', 3);
INSERT INTO "public"."app_dummy_person" VALUES (74, 'user68', 'address 68', 5);
INSERT INTO "public"."app_dummy_person" VALUES (75, 'user69', 'address 69', 2);
INSERT INTO "public"."app_dummy_person" VALUES (76, 'user70', 'address 70', 6);
INSERT INTO "public"."app_dummy_person" VALUES (77, 'user71', 'address 71', 1);
INSERT INTO "public"."app_dummy_person" VALUES (78, 'user72', 'address 72', 2);
INSERT INTO "public"."app_dummy_person" VALUES (79, 'user73', 'address 73', 3);
INSERT INTO "public"."app_dummy_person" VALUES (80, 'user74', 'address 74', 4);
INSERT INTO "public"."app_dummy_person" VALUES (81, 'user75', 'address 75', 5);
INSERT INTO "public"."app_dummy_person" VALUES (82, 'user76', 'address 76', 1);
INSERT INTO "public"."app_dummy_person" VALUES (83, 'user77', 'address 77', 2);
INSERT INTO "public"."app_dummy_person" VALUES (84, 'user78', 'address 78', 3);
INSERT INTO "public"."app_dummy_person" VALUES (85, 'user79', 'address 79', 1);
INSERT INTO "public"."app_dummy_person" VALUES (86, 'user80', 'address 80', 2);
INSERT INTO "public"."app_dummy_person" VALUES (87, 'user81', 'address 81', 3);
INSERT INTO "public"."app_dummy_person" VALUES (88, 'user82', 'address 82', 1);
INSERT INTO "public"."app_dummy_person" VALUES (89, 'user83', 'address 83', 2);
INSERT INTO "public"."app_dummy_person" VALUES (90, 'user84', 'address 84', 3);
INSERT INTO "public"."app_dummy_person" VALUES (91, 'user85', 'address 85', 1);
INSERT INTO "public"."app_dummy_person" VALUES (92, 'user86', 'address 86', 2);
INSERT INTO "public"."app_dummy_person" VALUES (93, 'user87', 'address 87', 3);
INSERT INTO "public"."app_dummy_person" VALUES (94, 'user88', 'address 88', 4);
INSERT INTO "public"."app_dummy_person" VALUES (95, 'user89', 'address 89', 3);
INSERT INTO "public"."app_dummy_person" VALUES (96, 'user90', 'address 90', 5);
INSERT INTO "public"."app_dummy_person" VALUES (97, 'user91', 'address 91', 2);
INSERT INTO "public"."app_dummy_person" VALUES (98, 'user92', 'address 92', 6);
INSERT INTO "public"."app_dummy_person" VALUES (99, 'user93', 'address 93', 1);
INSERT INTO "public"."app_dummy_person" VALUES (100, 'user94', 'address 94', 2);
INSERT INTO "public"."app_dummy_person" VALUES (101, 'user95', 'address 95', 3);
INSERT INTO "public"."app_dummy_person" VALUES (102, 'user96', 'address 96', 4);
INSERT INTO "public"."app_dummy_person" VALUES (103, 'user97', 'address 97', 5);
INSERT INTO "public"."app_dummy_person" VALUES (104, 'user98', 'address 98', 1);
INSERT INTO "public"."app_dummy_person" VALUES (105, 'user99', 'address 99', 2);
INSERT INTO "public"."app_dummy_person" VALUES (106, 'user100', 'address 100', 3);
INSERT INTO "public"."app_dummy_person" VALUES (107, 'user101', 'address 101', 1);
INSERT INTO "public"."app_dummy_person" VALUES (108, 'user102', 'address 102', 2);
INSERT INTO "public"."app_dummy_person" VALUES (109, 'user103', 'address 103', 3);
INSERT INTO "public"."app_dummy_person" VALUES (110, 'user104', 'address 104', 1);
INSERT INTO "public"."app_dummy_person" VALUES (111, 'user105', 'address 105', 2);
INSERT INTO "public"."app_dummy_person" VALUES (112, 'user106', 'address 106', 3);
INSERT INTO "public"."app_dummy_person" VALUES (113, 'user107', 'address 107', 1);
INSERT INTO "public"."app_dummy_person" VALUES (114, 'user108', 'address 108', 2);
INSERT INTO "public"."app_dummy_person" VALUES (115, 'user109', 'address 109', 3);
INSERT INTO "public"."app_dummy_person" VALUES (116, 'user110', 'address 110', 4);
INSERT INTO "public"."app_dummy_person" VALUES (117, 'user111', 'address 111', 3);
INSERT INTO "public"."app_dummy_person" VALUES (200, 'bambang gentolet', 'address 10111', 2);

-- ----------------------------
-- Primary Key structure for table app_dummy_person
-- ----------------------------
ALTER TABLE "public"."app_dummy_person" ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table app_dummy_person
-- ----------------------------
ALTER TABLE "public"."app_dummy_person" ADD CONSTRAINT "country" FOREIGN KEY ("countryId") REFERENCES "public"."app_dummy_country" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
