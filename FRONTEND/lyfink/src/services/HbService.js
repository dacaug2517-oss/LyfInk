import authService from "./authService";

export const registerHospitalDirect = (data) => {
  // Redirect to authService since hospital registration is now handled by User Service
  return authService.register(data);
};
