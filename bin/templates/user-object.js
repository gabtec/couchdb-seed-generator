function makeUser(name, lastName) {
  if(!name) return {};
  const nameLower = name.toLowerCase();
  return {
    _id: `org.couchdb.user:${nameLower}`,
    type: "user",
    name: nameLower,
    roles: [],
    firstName: name,
    lastName: lastName || "",
    password: nameLower
  };
};

module.exports = makeUser;