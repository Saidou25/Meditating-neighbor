import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../../utils/mutations";
import { QUERY_PROFILES } from "../../../utils/queries";
import { Navigate } from "react-router-dom";
import Auth from "../../../utils/auth";
import Success from "../../../components/Success";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import "./index.css";

const UpdateMyProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myProfile = location.state.myProfile;
  // getting all initial values from useLocation() to display in the update form.
  const profileId = myProfile._id;
  const firstname1 = myProfile.firstname;
  const lastname1 = myProfile.lastname;
  const stage1 = myProfile.stage;
  const teacher1 = myProfile.teacher;
  const years1 = myProfile.years;
  const story1 = myProfile.story;
  const username = myProfile.username;

  // Tese are the new values that will be used to update the user's profile
  const [errorMessage, setErrorMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Using formState object to manage all user's inputs in one place.
  // The form is set with the user's info already in the database so he/she can only update what is needed.
  const [formState, setFormState] = useState({
    id: profileId,
    username: username,
    teacher: teacher1,
    years: years1,
    stage: stage1,
    firstname: firstname1,
    lastname: lastname1,
    story: story1,
  });

  // update cache by refetchingQueries. Fast, efficient and very little code.
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: { id: profileId },
    refetchQueries: [{ query: QUERY_PROFILES }],
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
          id: profileId,
          username: username,
          teacher: teacher1,
          years: years1,
          stage: stage1,
          firstname: firstname1,
          lastname: lastname1,
          story: story1,
        });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setting up errorMessages tailored on if the update concerns a "meditator" or a "teacher" then updating user's profile
    // in MongoDb using updateProfile graphql mutation.
    // Making sure all fields are filled.
    if (formState.teacher === "meditator") {
      if (!formState.teacher || !formState.years || !formState.stage) {
        setErrorMessage("All fields need to befilled");
        return;
      }
      // If no changes have been made then no need to perform updateProfile mutation, let's just let the user know and redirect to Profile.
      if (
        formState.teacher === formState.teacher1 &&
        formState.years === years1 &&
        formState.stage === stage1
      ) {
        setMessage("You haven't made any changes to your profile...");
        setConfirm(true);
        setTimeout(() => {
          navigate("/Profile");
          setConfirm(false);
        }, 3000);
        return;
      }
    } else if (formState.teacher === "teacher") {
      // Making sure all fields are filled.
      if (
        !formState.teacher ||
        !formState.years ||
        !formState.firstname ||
        !formState.lastname ||
        !formState.story
      ) {
        setErrorMessage("All fields need filled");
        return;
      }
      // If no changes have been made then no need to perform updateProfile mutation, let's just let the user know and redirect to Profile.
      if (
        formState.teacher === teacher1 &&
        formState.years === years1 &&
        formState.firstname === firstname1 &&
        formState.lastname === lastname1 &&
        formState.story === story1
      ) {
        setMessage("You haven't made any changes to your profile...");
        setConfirm(true);
        setTimeout(() => {
          navigate("/Profile");
          setConfirm(false);
        }, 3000);
        return;
      }
    }
    try {
      const { data } = await updateProfile({
        variables: { ...formState },
      });
      if (data) {
        console.log("Profile updated", data);
        // setMessage("Your profile has been updated.");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.log(error.message);
      return;
    }
    // setting the "message" to be sent to "Success" component and display Success if everything went well.
    setMessage("Your profile has been updated.");

    // setting "confirm" to true so Success component can be displayed for 3 seconds then redirecting user to "Profile"
    // so user can see the changes.
    setConfirm(true);
    setTimeout(() => {
      navigate("/Profile");
      setConfirm(false);
    }, 3000);
    setLoading(false);
    setErrorMessage("");
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

  if (confirm === true) {
    return <Success message={message} />;
  }
  return (
    <>
      <Navbar />
      <div className="update-profile-form bg-primary">
        <h3 className="profile-title text-light">Update profile form</h3>
        <form className="my-form bg-primary">
          <div className="radio-text text-light">
            <label className="form-label text-light mb-4">status</label>
            <div>
              <input
                className="radio m-2 ms-4"
                type="radio"
                name="teacher"
                value="meditator"
                onChange={(event) => {
                  handleChange(event);
                }}
              />{" "}
              meditator
              <input
                className="radio m-2 ms-4"
                type="radio"
                name="teacher"
                value="teacher"
                onChange={(event) => {
                  handleChange(event);
                }}
              />{" "}
              teacher
            </div>
          </div>
          <div>
            <label className="form-label text-light my-4">years</label>
            <input
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
                  type="text"
                  className="form-control"
                  name="stage"
                  value={formState.stage}
                  placeholder="What stage are you working on?"
                  onChange={handleChange}
                />
              </div>
              {(errorMessage || error) && (
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
            className="btn btn-update-profile rounded-0 text-light"
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
export default UpdateMyProfileForm;
