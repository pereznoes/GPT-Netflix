export const validate = (
  email: string,
  password: string,
  isSignUp: boolean,
  username?: string,
  confirmPassword?: string
): string | null => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email) {
    return "Email is required";
  } else if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (password.length > 40) {
    return "Password cannot be more than 40 characters long";
  } else {
    if (!isEmailValid.test(email)) {
      return "Email is not valid";
    }

    if (!isPasswordValid.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }
  }

  if (isSignUp) {
    if (!username) {
      return "Username is required";
    } else if (username.length < 3) {
      return "Username must be at least 3 characters long";
    } else if (username.length > 10) {
      return "Username cannot be more than 10 characters long";
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return "Username must only contain letters and numbers";
    }

    if (!confirmPassword) {
      return "Confirm password is required";
    } else if (password !== confirmPassword) {
      return "Passwords do not match";
    } else {
      return null;
    }
  }

  return null;
};
