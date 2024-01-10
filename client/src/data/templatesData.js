let loginTemplate = {
  title: "Login",
  buttonText: "login",
  fields: [
    {
      title: "Email",
      type: "email",
      name: "loginEmail",
      placeholder: "enter email...",
      validationProps: {
        required: "Email is required",
      },
    },
    {
      title: "Password",
      type: "password",
      name: "password",
      placeholder: "******",
      validationProps: {
        required: "A minimum of 6 characters password is required",
      },
    },
  ],
};
let resetPasswordTemplate = {
  title: "Reset your password",
  buttonText: "Reset",
  fields: [
    {
      title: "Password",
      type: "password",
      name: "password1",
      placeholder: "******",
      validationProps: {
        required: "A minimum of 6 characters password is required",
      },
    },
    {
      title: "Confirm",
      type: "password",
      name: "password2",
      placeholder: "Confirm new password...",
      validationProps: {
        required: "A minimum of 6 characters password is required",
        identical: "Passwords must be identical."
      },
    },
  ],
};
let verifyEmailTemplate = {
  title: "Verify your email",
  buttonText: "submit",
  fields: [
    {
      title: "Email",
      type: "email",
      name: "verifyEmail",
      placeholder: "enter email...",
      validationProps: {
        required: "Email is required",
      },
    },
  ],
};
let signupTemplate = {
  title: "Signup",
  buttonText: "submit",
  fields: [
    {
      title: "Username",
      type: "text",
      name: "Username",
      placeholder: "choose a username...",
      validationProps: {
        required: "Username is required",
      },
    },
    {
      title: "Email",
      type: "email",
      name: "signupEmail",
      placeholder: "enter email...",
      validationProps: {
        required: "Email is required",
      },
    },
    {
      title: "Password",
      type: "password",
      name: "signupPassword",
      placeholder: "******",
      validationProps: {
        required: "A minimum of 6 characters password is required",
      },
    },
  ],
};
export { loginTemplate, resetPasswordTemplate, verifyEmailTemplate, signupTemplate };
