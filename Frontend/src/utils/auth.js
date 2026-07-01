export function getToken() {
  return localStorage.getItem("jwtToken");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function getUsername() {
  return localStorage.getItem("username") || "";
}

export function getUserId() {
  return localStorage.getItem("userId") || "";
}

export function getRole() {
  return localStorage.getItem("role") || "";
}

export function isAdmin() {
  return getRole() === "ROLE_ADMIN";
}

export function setUserId(userId) {
  if (userId) {
    localStorage.setItem("userId", String(userId));
  }
}

export function saveLogin(data) {
  console.log("LOGIN RESPONSE:", data);

  if (data?.jwtToken) {
    localStorage.setItem("jwtToken", data.jwtToken);
  }

  if (data?.token) {
    localStorage.setItem("jwtToken", data.token);
  }

  if (data?.username) {
    localStorage.setItem("username", data.username);
  }

  if (data?.id) {
    localStorage.setItem("userId", String(data.id));
  }

  let role = "";

  if (Array.isArray(data?.role)) {
    role = data.role[0];
  } else if (data?.role) {
    role = data.role;
  }

  if (Array.isArray(data?.authorities) && data.authorities.length > 0) {
    role = data.authorities[0].authority;
  }

  // Add your real admin usernames here
  const adminUsernames = ["admin", "Admin", "ADMIN", "Preethu"];

  if (data?.username && adminUsernames.includes(data.username)) {
    role = "ROLE_ADMIN";
  }

  if (!role) {
    role = "ROLE_USER";
  }

  localStorage.setItem("role", role);
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
}