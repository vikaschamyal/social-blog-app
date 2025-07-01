import { BASE_URL } from "../config";

const signup = async (user) => {
  try {

    console.log("🧾 Sending user payload:", user);// Log the user object to see what is being sent


    const res = await fetch(BASE_URL+"/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    return await res.json();

    console.log("📩 Response:", data); // 👈 Add this
    return data;
    
    
  } catch (err) {
    console.log(err);
  }
};


const login = async (user) => {
  try {
    console.log("🧾 Sending login payload:", user); // 👈

    const res = await fetch(BASE_URL + "/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();

    console.log("📩 Response:", data); // 👈
    return data;

  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "/api/users/" + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "/api/users/random?" + new URLSearchParams(query)
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  try {
    const res = await fetch(BASE_URL + "/api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export { signup, login, getUser, getRandomUsers, updateUser };
