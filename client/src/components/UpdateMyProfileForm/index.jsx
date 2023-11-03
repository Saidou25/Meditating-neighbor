import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { QUERY_PROFILES } from "../../utils/queries";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import Success from "../Success";
import Navbar from "../Navbar";
import Footer from "../Footer";

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

  // Tese are the new values that will be used to update the user's profile
  const [firstname, setFirstname] = useState(firstname1);
  const [lastname, setLastname] = useState(lastname1);
  const [stage, setStage] = useState(stage1);
  const [teacher, setTeacher] = useState(teacher1);
  const [years, setYears] = useState(years1);
  const [story, setStory] = useState(story1);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  // const [state, setState] = useState("");

  // update cache by refetchingQueries. Fast, efficient and very little code
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: { id: profileId },
    refetchQueries: [{ query: QUERY_PROFILES }],
  });


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setting up errorMessages tailored on if the update concerns a "meditator" or a "teacher" then updating user's profile
    // in MongoDb using updateProfile graphql mutation.
    if (teacher === "meditator") {
      if (teacher === teacher1 && years === years1 && stage === stage1) {
        setMessage("You haven't made any changes to your profile...");
      }
      if (!teacher || !years || !stage) {
        setErrorMessage("All fields need to befilled");
        return;
      } else if (
        teacher === "meditator" &&
        (/^[0-9]+$/.test(years) === false || /^[0-9]+$/.test(stage) === false)
      ) {
        setErrorMessage("Years and stage must be numbers");
        return;
      }
    } else if (teacher === "teacher") {
      if (
        teacher === teacher1 &&
        years === years1 &&
        firstname === firstname1 &&
        lastname === lastname1 &&
        story === story1
      ) {
        setMessage("You haven't made any changes to your profile...");
      }
      if (!teacher || !years || !firstname || !lastname || !story) {
        setErrorMessage("All fields need filled");
        return;
      } else if (/^[0-9]+$/.test(years) === false) {
        setErrorMessage("Years must be a number");
        return;
      }
    }

    try {
      const { data } = await updateProfile({
        variables: {
          id: profileId,
          username: myProfile.username,
          firstname: firstname,
          lastname: lastname,
          stage: stage,
          years: years,
          teacher: teacher,
          story: story,
        },
      });
      if (data) {
        console.log("profile updated");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("profile updated");
    // setting the "message" to be sent to "Success" component and display Success if everything went well.
    if (
      firstname === firstname1 &&
      lastname === lastname1 &&
      stage === stage1 &&
      teacher === teacher1 &&
      years === years1 &&
      story === story1
    ) {
      setMessage("You haven't made any changes to your profile...");
    } else {
      setMessage("Your profile has been updated.");
    }
    // setting "confirm" to true so Success component can be displayed for 3 seconds then redirecting user to "Profile"
    // so user can see the changes.
    setConfirm(true);
    setTimeout(() => {
      navigate("/Profile");
      setConfirm(false);
    }, 3000);
    setStage("");
    setYears("");
    setTeacher("");
    setStory("");
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
                checked={teacher === "meditator"}
                onChange={(e) => setTeacher(e.target.value)}
              />{" "}
              meditator
              <input
                className="radio m-2 ms-4"
                type="radio"
                name="teacher"
                value="teacher"
                checked={teacher === "teacher"}
                onChange={(e) => setTeacher(e.target.value)}
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
              value={years}
              placeholder="How many years have you been meditating?"
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          {teacher === "meditator" ? (
            <>
              <div>
                <label className="form-label text-light my-4">stage</label>
                <input
                  type="text"
                  className="form-control"
                  name="stage"
                  value={stage}
                  placeholder="What stage are you working on?"
                  onChange={(e) => setStage(e.target.value)}
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
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  placeholder="first name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label text-light my-4">last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  placeholder="last name"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label text-light my-4">story</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="story"
                  value={story}
                  placeholder="write about yourself"
                  onChange={(e) => setStory(e.target.value)}
                  // onKeyDown={handleKeyPress}
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
            Submmit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default UpdateMyProfileForm;
