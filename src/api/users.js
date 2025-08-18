import { BASE_URL } from "../config";

/**
 * Signup new user
 * @param {Object} user - { username, email, password }
 * @returns {Object} API response
 */
const signup = async (user) => {
  try {
    console.log("🧾 Sending user payload:", user);

    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log("📩 Signup Response:", data);
    return data;
  } catch (err) {
    console.error("❌ Signup Error:", err);
    throw err;
  }
};

/**
 * Login existing user
 * @param {Object} user - { email, password }
 * @returns {Object} API response
 */
const login = async (user) => {
  try {
    console.log("🧾 Sending login payload:", user);

    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log("📩 Login Response:", data);
    return data;
  } catch (err) {
    console.error("❌ Login Error:", err);
    throw err;
  }
};

/**
 * Get user by ID
 * @param {Object} params - { id: string }
 * @returns {Object} User data
 */
const getUser = async (params) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${params.id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Get User Error:", err);
    throw err;
  }
};

/**
 * Get random users (for suggestions)
 * @param {Object} query - query params
 * @returns {Array} List of users
 */
const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/users/random?${new URLSearchParams(query)}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Get Random Users Error:", err);
    throw err;
  }
};

/**
 * Update user
 * @param {Object} user - current user with token
 * @param {Object} updateData - data to update
 * @returns {Object} Updated user data
 */
const updateUser = async (user, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${user._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Update User Error:", err);
    throw err;
  }
};

export { signup, login, getUser, getRandomUsers, updateUser };
