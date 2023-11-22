import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../../utils/mutations";
import { QUERY_ME } from "../../../utils/queries";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Auth from "../../../utils/auth";
import useMyInfo from "../../../Hooks/UseMyInfo";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Success from "../../../components/Success";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "./index.css";

const ProfileForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    teacher: "meditator",
    years: "",
    stage: "",
    firstname: "",
    lastname: "",
    story: "",
  });
  // user context using useMyInfo hook
  const { me } = useMyInfo();
  const navigate = useNavigate();

  // updating cache with newly created profile
  const [addProfile] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, profile: { ...me.profile, ...addProfile } } },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("Profile successfully added to the cache");
    },
  });

  // Setting form fields with user's inputs using switch case.
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "teacher":
        if (value) {
          console.log(value);
          setFormState({ ...formState, [name]: value });
        }
        break;

      case "stage":
        if (isNaN(value) === true) {
          setErrorMessage("Stage must be a number");
          return;
        }
        setErrorMessage("");
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
          setErrorMessage("Stage must be a number");
          return;
        }
        setErrorMessage("");
        setFormState({ ...formState, [name]: value });
        break;

      default:
        setFormState({
          username: "",
          teacher: "",
          years: "",
          stage: "",
          firstname: "",
          lastname: "",
          story: "",
        });
    }
  };

  // adding profile to MongoDb database using graphql addProfile mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      formState.teacher === "meditator" &&
      (!formState.teacher || !formState.years || !formState.stage)
    ) {
      setErrorMessage("All fields need to be filled.");
      return;
    }
    if (
      formState.teacher === "teacher" &&
      (!formState.teacher ||
        !formState.years ||
        !formState.firstname ||
        !formState.lastname ||
        !formState.story)
    ) {
      setErrorMessage("All fields need to be filled.");
      return;
    }
    try {
      const { data } = await addProfile({
        variables: { ...formState, username: me.username },
      });
      if (data) {
        console.log("profile added");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      return;
    }
    setMessage("Your profile has been created");
    setTimeout(() => {
      setMessage("");
      navigate("/Profile");
    }, 3000);
    // Resetting all states
    setErrorMessage("");
    setLoading(false);
    setFormState({
      teacher: "",
      years: "",
      stage: "",
      firstname: "",
      lastname: "",
      story: "",
    });
  };
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (message) {
    return <Success message={"Your profile has been created"} />;
  }
  return (
    <>
      <Navbar />
      <div className="profile-form bg-primary">
        <h3 className="profile-title text-light">Profile form</h3>
        <form className="my-form bg-primary">
          <div className="radio-text text-light">
            <label className="form-label text-light mb-4">status</label>
            <div>
              <input
                className="radio m-2 ms-4 text-light"
                type="radio"
                name="teacher"
                value="meditator"
                // checked="meditator"
                onChange={(event) => {
                  handleChange(event);
                  setErrorMessage("");
                }}
              />{" "}
              meditator
              <input
                className="radio m-2 ms-4 text-light"
                type="radio"
                name="teacher"
                value="teacher"
                // checked="teacher"
                onChange={(event) => {
                  handleChange(event);
                  setErrorMessage("");
                }}
              />
              teacher
            </div>
          </div>
          <div>
            <label className="form-label text-light my-4">years</label>
            <input
              required
              type="text"
              className="form-control"
              name="years"
              value={formState.years}
              placeholder="How many years have you been meditating?"
              onChange={handleChange}
            />
          </div>
          {formState.teacher === "meditator" ? (
            <>
              <div>
                <label className="form-label text-light my-4">stage</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="stage"
                  value={formState.stage}
                  placeholder="What stage are you working on?"
                  onChange={handleChange}
                />
              </div>
              {errorMessage && (
                <div className="error-message bg-danger text-light my-5">
                  <p className="p-error p-3">{errorMessage}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="form-label text-light my-4">first name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={formState.firstname}
                  placeholder="first name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label text-light my-4">last name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={formState.lastname}
                  placeholder="last name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label text-light my-4">story</label>
                <textarea
                  required
                  type="text"
                  className="form-control"
                  name="story"
                  value={formState.story}
                  placeholder="write about yourself"
                  onChange={handleChange}
                />
              </div>
              {errorMessage && (
                <div className="error-message bg-danger text-light my-5">
                  <p className="p-error p-3">{errorMessage}</p>
                </div>
              )}
            </>
          )}
          <button
            className="btn btn-profile-form rounded-0 text-light"
            type="button"
            onClick={handleFormSubmit}
          >
            {loading === true ? <ButtonSpinner /> : <>Submit</>}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default ProfileForm;
