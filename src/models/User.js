/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.username = '';
    this.password = '';
    this.birthday = undefined;
    Object.assign(this, data);
  }
}
export default User;
