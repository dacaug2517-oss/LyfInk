import authService from "./authService";

// Register a new user (uses JWT authentication)
export const registerUser = async (userData) => {
  return await authService.register(userData);
};
