export const validateEmailAddress = (emailAddress: string): Error | true => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const regexResult = regex.test(emailAddress);

  if (regexResult == false) {
    return new Error("Please use a correct email format");
  }
  return regexResult;
};

export const validatePassword = (password: string): Error | true => {
  // Corrected regex pattern
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,16}$/;

  // Test the password against the regex
  const regexResult = regex.test(password);

  if (!regexResult) {
    return new Error(
      "Password must contain one digit (0-9), one lowercase letter, one uppercase letter, one special character, no spaces, and be 8-16 characters long."
    );
  }

  return true;
};
