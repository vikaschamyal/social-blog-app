import { BASE_URL } from "../config";

// Signup
const signup = async (user) => {
  try {
    console.log("🧾 Sending user payload:", user);

    const res = await fetch(BASE_URL + "/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json(); // ✅ declare data
    console.log("📩 Signup Response:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Login
const login = async (user) => {
  try {
    console.log("🧾 Sending login payload:", user);

    const res = await fetch(BASE_URL + "/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json(); // ✅ declare data
    console.log("📩 Login Response:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get user
const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "/api/users/" + params.id);
    const data = await res.json(); // ✅ declare data
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get random users
const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "/api/users/random?" + new URLSearchParams(query)
    );
    const data = await res.json(); // ✅ declare data
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Update user
const updateUser = async (user, updateData) => {
  try {
    const res = await fetch(BASE_URL + "/api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json(); // ✅ declare data
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { signup, login, getUser, getRandomUsers, updateUser };
