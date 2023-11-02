import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import "./index.css";

const FormReuse = ({
  template,
  onSubmit,
  getFromChild,
  resetPasswordMessage,
  signupMessage,
  verifyEmailMessage,
  validatedPassword1,
  validatedPassword2,
  validatedPassword,
  validatedSignupPassword,
  validateIdentical,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const { title, fields } = template;

  // const [validated, setValidated] = useState(false);
  // when message comes backe from signup, reset password or verify email hook useEffect is
  // triggering the reset function so fields can cleared.
  useEffect(() => {
    if (signupMessage) {
      reset();
    }
    if (resetPasswordMessage) {
      reset();
    }
    if (verifyEmailMessage) {
      reset();
    }

    if (template.title === "cancel") {
      reset();
    }
  }, [
    resetPasswordMessage,
    signupMessage,
    verifyEmailMessage,
    reset,
    template,
  ]);

  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name}>
        <Form.Label htmlFor={field.name} className="text-light my-4">
          {field.title}
        </Form.Label>
        <Form.Control
          required
          className="form-input email-login-input my2"
          style={{ fontStyle: "oblique" }}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          id={field.name}
          {...register(`${field.name}`, { required: true })}
        />{" "}
        {validatedPassword1 && field.name === "password1" && (
          <p className="text-danger mt-3">{validatedPassword1}</p>
        )}
        {validatedPassword2 && field.name === "password2" && (
          <p className="text-danger mt-3">{validatedPassword2}</p>
        )}
        {validatedPassword && field.name === "password" && (
          <p className="text-danger mt-3">{validatedPassword}</p>
        )}
        {validatedSignupPassword && field.name === "signupPassword" && (
          <p className="text-danger mt-3">{validatedSignupPassword}</p>
        )}
        {validateIdentical && field.name === "password2" && (
          <p className="text-danger mt-3">{validateIdentical}heloo</p>
        )}
      </div>
    ));
  };
  return (
    <div>
      <div className="card signup-card g-0">
        <div className="card-header text-light">
          <h3 className="signup-header pt-3">{title}</h3>
        </div>
        <div className="card-body">
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              {renderFields(fields)}
              <br />
              <div className="btn-position">
                <div className="row row-signup-buttons g-0">
                  <div className="col-6 g-0">
                    <button
                      className="btn btn-submit text-light rounded-0 mt-5"
                      type="submit"
                      style={{ cursor: "pointer" }}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="col-6 g-0">
                    {title === "Login" ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn-submit text-light rounded-0 mt-5"
                        type="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          reset();
                          getFromChild("cancel");
                        }}
                      >
                        cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="card-footer">
          <p className="login-question mt-4">
            Don't have an account yet?
            <button
              className="btn btn-text-signup rounded-0 text-info py-0"
              onClick={() => {
                reset();
                getFromChild("signup");
              }}
            >
              Signup.
            </button>
            If you forgot your password,
            <button
              className="btn btn-text-signup rounded-0 text-info py-0"
              onClick={() => {
                reset();
                getFromChild("verify");
              }}
            >
              verify
            </button>
            your email, then
            <button
              className="btn btn-text-reset rounded-0 text-info py-0"
              onClick={() => {
                reset();
                getFromChild("reset");
              }}
            >
              reset
            </button>
            your password.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FormReuse;
