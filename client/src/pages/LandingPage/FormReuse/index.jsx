import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import ButtonSpinner from "../../../components/ButtonSpinner";
import HookErrorMessage from "../../../components/HookErrorMessage";
import "./index.css";

const FormReuse = ({
  children,
  template,
  onSubmit,
  dynamicError,
  loading,
  hookErrorMessage,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { title, fields } = template;

  

  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name}>
        <Form.Label htmlFor={field.name} className="text-light my-4">
          {field.title}
        </Form.Label>
        <Form.Control
          required
          className="form-input email-login-input"
          style={{ fontStyle: "oblique" }}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          autoComplete={field.name === "email" ? "email" : "password"}
          id={field.name}
          {...register(`${field.name}`, { required: true })}
        />
        {dynamicError?.message && field.name === dynamicError?.fieldName && (
          <p className="text-danger mt-3">{dynamicError.message}</p>
        )}
      </div>
    ));
  };
  return (
    <main className="container-fluid no-blur"
    // style={{ width: "30%", height: "auto"}}
    >
      <div className="card signup-card g-0">
        <div className="card-header text-light">
          <h3 className="signup-header pt-3">{title}</h3>
        </div>
        <div className="card-body">
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              {renderFields(fields)}
              <br />

              {hookErrorMessage && (
                <HookErrorMessage hookErrorMessage={hookErrorMessage} />
              )}
              <div className="btn-position">
                <div className="row row-signup-buttons g-0">
                  <div className="col-6 g-0">
                    <Button
                      className="btn my-button text-light rounded-0 mt-5"
                      type="submit"
                    >
                      {loading === true ? <ButtonSpinner /> : <>submit</>}
                    </Button>
                  </div>
                  <div className="col-6 g-0">
                    <Button
                      className="btn my-button text-light rounded-0 mt-5 ms-1"
                      type="button"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        reset();
                        title === "Login" ? navigate("/") : navigate("/Login");
                      }}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="card-footer">
          <div className="login-question mt-4">{children}</div>
        </div>
      </div>
    </main>
  );
};
export default FormReuse;
