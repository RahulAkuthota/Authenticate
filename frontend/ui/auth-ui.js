import AuthSDK from "https://cdn.jsdelivr.net/npm/rahul-auth-sdk/index.js";

// 🔥 GLOBAL AUTH INSTANCE
const auth = new AuthSDK({
  baseURL: "https://authenticate-2i3j.onrender.com",
  clientId: "e026b8d5fcb549013e39fcd195632958",
});

// make globally accessible
window.auth = auth;


// 🔐 SIGN IN COMPONENT
class AuthSignIn extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <input id="email" placeholder="Email" />
      <input id="password" type="password" placeholder="Password" />
      <button id="loginBtn">Login</button>
      <p id="message"></p>
    `;

    const msg = this.querySelector("#message");

    this.querySelector("#loginBtn").onclick = async () => {
      try {
        msg.innerText = "Logging in...";
        msg.style.color = "blue";

        const email = this.querySelector("#email").value;
        const password = this.querySelector("#password").value;

        const res = await auth.login(email, password);

        msg.innerText = res.msg || "Login successful";
        msg.style.color = "green";
      } catch (err) {
        msg.innerText = "Login failed";
        msg.style.color = "red";
      }
    };
  }
}

customElements.define("auth-signin", AuthSignIn);


// 📝 SIGN UP COMPONENT
class AuthSignUp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <input id="email" placeholder="Email" />
      <input id="password" type="password" placeholder="Password" />
      <button id="signupBtn">Signup</button>
      <p id="message"></p>
    `;

    const msg = this.querySelector("#message");

    this.querySelector("#signupBtn").onclick = async () => {
      try {
        msg.innerText = "Creating account...";
        msg.style.color = "blue";

        const email = this.querySelector("#email").value;
        const password = this.querySelector("#password").value;

        const res = await auth.signup(email, password);

        msg.innerText = res.msg || "Signup successful";
        msg.style.color = "green";
      } catch (err) {
        msg.innerText = "Signup failed";
        msg.style.color = "red";
      }
    };
  }
}

customElements.define("auth-signup", AuthSignUp);