import AuthSDK from "./sdk/index.js";

const clientId = localStorage.getItem("clientId");

const auth = new AuthSDK({
  baseURL: "https://authenticate-2i3j.onrender.com/",
  clientId,
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