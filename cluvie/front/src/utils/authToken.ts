class AuthToken {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  getToken() {
    return this.accessToken;
  }

  setToken(newToken: string) {
    this.accessToken = newToken;
  }
}

const authToken = new AuthToken();

export default authToken;
