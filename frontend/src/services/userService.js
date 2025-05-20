const BASE_URL = "https://findr-spring-sea-9539.fly.dev/api/users";

// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to register");
  }

  return await res.json(); // should return user object
};

// Login
export const loginUser = async (email, password) => {
  const res = await fetch(`https://findr-spring-sea-9539.fly.dev/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return await res.json(); // should return token + user
};

// Get user info with token
export const getUserInfo = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  // Fetch user info using the token
  // console.log(token)
  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

 const data = await res.json();
  console.log(data);
  return data;
};
