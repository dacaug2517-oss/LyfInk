import authService from "./authService";

// Legacy wrapper for backward compatibility
// Use authService directly in new code

// Register
export const registerUser = async (userData) => {
  return await authService.register(userData);
};

// Login
export const loginUser = async (loginData) => {
  const { email, password } = loginData;
  const response = await authService.login(email, password);
  // Return in the old format for backward compatibility
  return { data: response };
};
