// "superadmin"
// "admin"
// "user"
// "customer"
// "level1"
// "level2"
// "level3"
// "level4"
const mappingUrlToRule = [
  { url: "/dashboard", group: ["superadmin", "admin"] },
];

module.exports = mappingUrlToRule;
