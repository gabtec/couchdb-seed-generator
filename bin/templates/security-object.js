/**
 * Creates a couchdb database _security object
 * @param {Array} aNames - Admins names
 * @param {Array} aRoles - Admins roles
 * @param {Array} mNames - Members names
 * @param {Array} mRoles - Members roles
 * @returns
 */
function makeSecurity(aNames, aRoles, mNames, mRoles) {
 
  // danger: 0 must become ['0']
  aNames === null || aNames === undefined ? aNames = [] : aNames;
  aRoles === null || aRoles === undefined ? aRoles = [] : aRoles;
  mNames === null || mNames === undefined ? mNames = [] : mNames;
  mRoles === null || mRoles === undefined ? mRoles = [] : mRoles;

  return {
  admins: {
    names: (aNames) instanceof Array ? aNames : ["" + aNames],
    roles: (aRoles) instanceof Array ? aRoles : ["" + aRoles],
  },
  members: {
    names: (mNames) instanceof Array ? mNames : ["" + mNames],
    roles: (mRoles) instanceof Array ? mRoles : ["" + mRoles],
  },
};
}
module.exports = makeSecurity;
