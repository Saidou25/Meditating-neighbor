import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ButtonSpinner from "../ButtonSpinner";
import {
  meditatorTemplate,
  teacherTemplate,
} from "../../data/templatesProfile";
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
        if (myProfile.teacher === "meditator") {
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
        break;
      case "meditator":
        if (updateMeditatorTemplate?.title) {
          setSubmitError("");
          setErrorMessage("");
          setHookErrorMessage("");
          setTemplate(updateMeditatorTemplate);
          setCheckedStatus("meditator");
        }
        if (myProfile.teacher === "teacher") {
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
    // if (myProfile.teacher === "teacher" && checkedStatus === "meditator") {
    //   console.log("teacher");
    //   setTemplate(meditatorTemplate);
    //   // setFormState(meditatorTemplate);
    // }
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
      // let initialFormState = {};
      // for (let field of updateTeacherTemplate.fields) {
      //   if (field.value) {
      //     initialFormState[field.name] = field.value;
      //   }
      // }
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
                <Form.Label htmlFor={field.name} className="text-light my-4">
                  {field.name}
                </Form.Label>
                <div className="col d-flex align-items-center">
                  <Form.Check
                    className="form-input"
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
                <Form.Label htmlFor={field.name} className="text-light my-4">
                  {field.value ? field.name : ""}
                </Form.Label>
                <Form.Control
                  required
                  className="form-input email-login-input"
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
    <div className="add-profile-container bg-primary">
      <h3 className="profile-title text-light">{title}</h3>
      <Form className="my-form bg-primary">
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
          <div className="btn-position">
            <div className="row row-signup-buttons g-0">
              <div className="col-6 g-0">
                <button
                  className="btn btn-profile-form rounded-0 text-light"
                  type="button"
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmit}
                >
                  {loading === true ? <ButtonSpinner /> : <>submit</>}
                </button>
              </div>
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};
export default ProfilFormReuse;
