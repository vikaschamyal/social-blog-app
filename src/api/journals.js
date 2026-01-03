import axios from "axios";
import { BASE_URL } from "../config";
import { isLoggedIn } from "../helpers/authHelper";

// get token (DON'T change auth system)
const getToken = () => {
  const user = isLoggedIn();
  return user?.token;
};

// CREATE journal
export const createJournal = async (content) => {
  const res = await axios.post(
    `${BASE_URL}/api/journals`,
    { content },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );
  return res.data;
};

// GET my journals
export const getMyJournals = async () => {
  const res = await axios.get(`${BASE_URL}/api/journals/mine`, {
    headers: {
      "x-access-token": getToken(),
    },
  });
  return res.data;
};
