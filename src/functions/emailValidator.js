export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

export const isValidPassword = (password) => {
  if (!password) {
    return { valid: false, error: "Password is required." };
  }

  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters long." };
  }

  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, error: "Password must include at least one letter." };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: "Password must include at least one uppercase letter." };
  }

  if (!/\d/.test(password)) {
    return { valid: false, error: "Password must include at least one number." };
  }

  if (!/[@$!%*#?&]/.test(password)) {
    return { valid: false, error: "Password must include at least one special character." };
  }

  return { valid: true };
};

