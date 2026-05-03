const BASE = "https://authenticate-2i3j.onrender.com";

let token = null;

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(`${BASE}/dev/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  });
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE}/dev/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  token = data.token;
}

async function createApp() {
  const name = document.getElementById("appName").value;

  const res = await fetch(`${BASE}/app/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  const li = document.createElement("li");
  li.innerText = `App: ${data.name} | clientId: ${data.clientId}`;
  localStorage.setItem("clientId", data.clientId);
  document.getElementById("apps").appendChild(li);
}