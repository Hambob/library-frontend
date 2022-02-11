import { useState } from "react";

/**
 *
 * @returns Object with two Method and property
 */

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken, user) => {
    localStorage.setItem("accessToken", userToken);
    localStorage.setItem("fullname", user.fullname);
    localStorage.setItem("id", user.id);
    localStorage.setItem("role", user.role);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
