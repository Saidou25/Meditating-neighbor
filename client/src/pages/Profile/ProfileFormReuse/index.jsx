import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";  
import Button from "../../../components/Button";
import ButtonSpinner from "../../../components/ButtonSpinner";
import {
  meditatorTemplate,
  teacherTemplate,
} from "../../../data/templatesProfile";
import "./index.css";

const ProfilFormReuse = ({
  getFromChild,
  addProfileMessage,
  addProfileErrorMessage, 
  updateProfileMessage,
  updateProfileErrorMessage,
  myProfile,
  newProfile,
  updateMeditatorTemplate,
  updateTeacherTemplate,
}) => {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hookErrorMessage, setHookErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    fieldName: "",
    fieldErrorMessage: "",
  });
  const [checkedStatus, setCheckedStatus] = useState("meditator");
  const [formState, setFormState] = useState({
    username: "",
    teacher: "meditator",
    years: "",
    stage: "",
    firstname: "",
    lastname: "",
    story: "",
  });

  const { title, fields } = template;

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "teacher":
        setFormState({ ...formState, [name]: value });
        break;

      case "stage":
        if (isNaN(value) === true) {
          setLoading(false);
          setErrorMessage({
            fieldName: "stage",
            fieldErrorMessage: "Stage must be a number",
          });
          return;
        }
        setErrorMessage({ fieldName: "", fieldErrorMessage: "" });
        setFormState({ ...formState, [name]: value });
        break;

      case "story":
        setFormState({ ...formState, [name]: value });
        break;

      case "lastname":
        setFormState({ ...formState, [name]: value });
        break;

      case "firstname":
        setFormState({ ...formState, [name]: value });
        break;

      case "years":
        if (isNaN(value) === true) {
          setLoading(false);
          setErrorMessage({
            fieldName: "years",
            fieldErrorMessage: "Stage must be a number",
          });
          return;
        }
        setErrorMessage({ fieldName: "", fieldErrorMessage: "" });
        setFormState({ ...formState, [name]: value });
        break;

      default:
        setFormState({
          username: "",
          teacher: "meditator",
          years: "",
          stage: "",
          firstname: "",
          lastname: "",
          story: "",
        });
    }
  };

  const handleSubmit = () => {
    // Making sure all fields are filled before submitting. If not we "setSubmitErrorMessage".
    switch (formState.teacher) {
      case "meditator":
        if (!formState.stage || !formState.years) {
          setSubmitError("All field are required");
          setLoading(false);
          return;
        } else {
          setSubmitError("");
          setLoading(true);
          setTimeout(() => {
            getFromChild(formState);
          }, 1000);
        }
        break;
      case "teacher":
        if (
          !formState.firstname ||
          !formState.lastname ||
          !formState.years ||
          !formState.story
        ) {
          setSubmitError("All field are required");
          setLoading(false);
          return;
        } else {
          setSubmitError("");
          setLoading(true);
          setTimeout(() => {
            getFromChild(formState);
          }, 1000);
        }
        break;
      default:
        setSubmitError("");
        setLoading(false);
    }
  };

  const chooseTemplate = (data) => {
    switch (data) {
      case "teacher":
        if (updateTeacherTemplate?.title) {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setTemplate(updateTeacherTemplate);
          setCheckedStatus("teacher");
        }
        if (myProfile?.teacher === "meditator") {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setCheckedStatus("teacher");
          setTemplate(teacherTemplate);
          setFormState({
            username: "",
            teacher: "teacher",
            years: "",
            stage: "",
            firstname: "",
            lastname: "",
            story: "",
          });
        }
        if (!myProfile) {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setCheckedStatus("teacher");
          setTemplate(teacherTemplate);
        }
        break;
      case "meditator":
        if (updateMeditatorTemplate?.title) {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setTemplate(updateMeditatorTemplate);
          setCheckedStatus("meditator");
        }
        if (myProfile?.teacher === "teacher") {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setCheckedStatus("meditator");
          setFormState({
            username: "",
            teacher: "meditator",
            years: "",
            stage: "",
            firstname: "",
            lastname: "",
            story: "",
          });
          setTemplate(meditatorTemplate);
        }
        if (!myProfile) {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setCheckedStatus("meditator");
          setTemplate(meditatorTemplate);
        }
        break;
      default:
        setCheckedStatus("meditator");
    }
  };

  useEffect(() => {
    if (
      addProfileMessage ||
      addProfileErrorMessage ||
      updateProfileErrorMessage ||
      updateProfileMessage
    ) {
      setLoading(false);
    }
    if (addProfileErrorMessage || updateProfileErrorMessage) {
      setHookErrorMessage(addProfileErrorMessage || updateProfileErrorMessage);
    }
    let initialState;
    if (newProfile) {
      initialState = meditatorTemplate;
      setTemplate(initialState);
    }
    if (updateMeditatorTemplate?.title) {
      initialState = updateMeditatorTemplate;
      setTemplate(initialState);
      setCheckedStatus("meditator");
      setFormState(myProfile);
    }
    if (updateTeacherTemplate?.title) {
      initialState = updateTeacherTemplate;
      setTemplate(initialState);
      setCheckedStatus("teacher");
      setFormState(myProfile);
    } else if (
      !updateMeditatorTemplate?.title &&
      !updateTeacherTemplate?.title
    ) {
      initialState = meditatorTemplate;
    }
  }, [
    updateTeacherTemplate,
    updateMeditatorTemplate,
    addProfileErrorMessage,
    updateProfileErrorMessage,
    addProfileMessage,
    updateProfileMessage,
    myProfile,
    newProfile,
  ]);

  const renderFields = (fields) => {
    return (
      fields &&
      fields.map((field) => {
        switch (field.type) {
          case "radio":
            return (
              <div className="col-4" key={field.name}>
                <Form.Label
                  htmlFor={field.name}
                  className="reuse text-light mb-4"
                >
                  {field.name}{" "}
                </Form.Label>
                <div className="col d-flex align-items-center">
                  <Form.Check
                    className="form-check check-input mt-2"
                    type={field.type}
                    name={field.name}
                    value={field.name}
                    id={field.name}
                    checked={field.name === checkedStatus}
                    onChange={(event) => {
                      handleChange(event);
                      chooseTemplate(field.name);
                    }}
                  />
                </div>
              </div>
            );

          case "text":
            return (
              <div className="col-12" key={field.name}>
                <Form.Label
                  htmlFor={field.name}
                  className="reuse text-light my-4"
                >
                  {field.name}{" "}
                </Form.Label>
                <Form.Control
                  required
                  className="form-control texts-input mt-2"
                  style={{ fontStyle: "oblique" }}
                  type={field.type}
                  name={field.name}
                  placeholder={field.value ? field.value : field.placeholder}
                  id={field.name}
                  value={formState[field.name]}
                  // value={formState.name}
                  onChange={handleChange}
                />
                {errorMessage && field.name === errorMessage.fieldName && (
                  <p className="text-danger mt-5">
                    {errorMessage.fieldErrorMessage}
                  </p>
                )}
              </div>
            );

          case "textarea":
            return (
              <div className="col-12" key={field.name}>
                <Form.Label
                  htmlFor={field.name}
                  className="reuse text-light my-4"
                >
                  {field.name}
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  className="form-control textarea-input"
                  style={{ fontStyle: "oblique" }}
                  type={field.type}
                  name={field.name}
                  placeholder={field.value ? field.value : field.placeholder}
                  id={field.name}
                  value={formState[field.name]}
                  // value={formState.name}
                  onChange={handleChange}
                />
                {errorMessage && field.name === errorMessage.fieldName && (
                  <p className="text-danger mt-5">
                    {errorMessage.fieldErrorMessage}
                  </p>
                )}
              </div>
            );
          default:
            return <></>;
        }
      })
    );
  };

  return (
    <main className="container-fluid bg-primary">
      <Form className="profile-form-reuse bg-primary">
      <h3 className="profile-title text-light mb-5">{title}</h3>
        <Form.Group>
          <div className="row test-row text-light">{renderFields(fields)}</div>
          <br />
          {(submitError || hookErrorMessage) && (
            <div className="error-messages bg-danger  mt-5">
              <p className="text-light py-2" style={{ textAlign: "center" }}>
                {submitError || hookErrorMessage.message}
              </p>
            </div>
          )}
          <Button
            className="btn my-button mt-5"
            type="button"
            onClick={() => {
              handleSubmit(formState);
            }}
          >
            {loading === true ? <ButtonSpinner /> : <>submit</>}
          </Button>
        </Form.Group>
      </Form>
    </main>
  );
};
export default ProfilFormReuse;
