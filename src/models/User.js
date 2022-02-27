/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.loggedIn = null;
    Object.assign(this, data);
  }
}
export default User;
