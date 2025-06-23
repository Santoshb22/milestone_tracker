export const validateAuthForm = (data) => {
  const errors = {};

  if (!data.username || data.username.trim() === "") {
    errors.username = "Username is required";
  }

  if ('email' in data) {
    if (!data.email || data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
  }

  if (!data.password || data.password.trim() === "") {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
