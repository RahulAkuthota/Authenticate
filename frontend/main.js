import AuthSDK from "./sdk/index.js";

const auth = new AuthSDK({
    baseURL: "http://localhost:5000",
    clientId: "35458b9e1828c3d9a0823d2d01899b15",
  });

// get elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const getUserBtn = document.getElementById("getUserBtn");

// events
signupBtn.addEventListener("click", async () => {
  const res = await auth.signup(emailInput.value, passwordInput.value);
  console.log("Signup:", res);
});

loginBtn.addEventListener("click", async () => {
  const res = await auth.login(emailInput.value, passwordInput.value);
  console.log("Login:", res);
});

getUserBtn.addEventListener("click", async () => {
  const res = await auth.getUser();
  console.log("User:", res);
});