import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  navigateToAuthLogin,
  getToken,
  setToken,
  removeToken,
  backendUrl,
} from "./utils";

// Function to refresh tokens
export const refreshTokens = async () => {
  const refreshToken = getToken("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${backendUrl}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    setToken("access_token", data.access_token);
    // setToken("refresh_token", data.refresh_token);
    return data.access_token;
  } else {
    throw new Error("Failed to refresh token");
  }
};

// Custom fetch function
export const customFetch = async (
  url,
  options = {},
  privateEndpoint = true
) => {
  let accessToken = getToken("access_token");

  const headers = { ...options.headers };
  if (privateEndpoint) {
    // headers.Authorization = `Bearer ${accessToken}`;
    headers.Authorization = ``;

  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!privateEndpoint) {
    return response;
  }

  return;

  if (response.status === 403) {
    try {
      accessToken = await refreshTokens();
    } catch (error) {
      removeToken("access_token");
      removeToken("refresh_token");
      navigateToAuthLogin();
      return;
    }
    const reResponse = await fetch(url, {
      ...options,
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    });

    return reResponse;
  }

  return response;
};

// Example component using customFetch
const ExampleComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/protected-endpoint`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Protected data:", data);
        } else {
          console.error("Failed to fetch protected data");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return <div>Protected Resource</div>;
};

export default ExampleComponent;
