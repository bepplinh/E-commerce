import * as authService from "./auth.service.js";

const register = async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export { register, login };
