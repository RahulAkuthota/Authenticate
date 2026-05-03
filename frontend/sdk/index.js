class AuthSDK {
  constructor({ baseURL, clientId }) {
    this.baseURL = baseURL;

    // 🔥 Auto fallback to localStorage
    this.clientId = clientId || localStorage.getItem("clientId");

    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  // ================= SIGNUP =================
  async signup(email, password) {
    const res = await fetch(`${this.baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        clientId: this.clientId,
      }),
    });

    return res.json();
  }

  // ================= LOGIN =================
  async login(email, password) {
    const res = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        clientId: this.clientId,
      }),
    });

    const data = await res.json();

    if (data.accessToken && data.refreshToken) {
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;

      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);
    }

    return data;
  }

  // ================= REFRESH TOKEN =================
  async refreshAccessToken() {
    const res = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    const data = await res.json();

    if (data.accessToken) {
      this.accessToken = data.accessToken;
      localStorage.setItem("accessToken", this.accessToken);
    }

    return data;
  }

  // ================= GET USER =================
  async getUser() {
    let res = await fetch(`${this.baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    // 🔥 If token expired → refresh automatically
    if (res.status === 401) {
      await this.refreshAccessToken();

      res = await fetch(`${this.baseURL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    }

    return res.json();
  }

  // ================= LOGOUT =================
  logout() {
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default AuthSDK;