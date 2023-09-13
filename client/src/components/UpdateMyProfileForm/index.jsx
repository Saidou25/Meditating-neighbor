import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { QUERY_PROFILES } from "../../utils/queries";
import Success from "../Success";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./index.css";
const UpdateMyProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myProfile = location.state.myProfile;

  const profileId = myProfile._id;
  const firstname1 = myProfile.firstname;
  const lastname1 = myProfile.lastname;
  const stage1 = myProfile.stage;
  const teacher1 = myProfile.teacher;
  const years1 = myProfile.years;
  const story1 = myProfile.story;

  const [firstname, setFirstname] = useState(firstname1);
  const [lastname, setLastname] = useState(lastname1);
  const [stage, setStage] = useState(stage1);
  const [teacher, setTeacher] = useState(teacher1);
  const [years, setYears] = useState(years1);
  const [story, setStory] = useState(story1);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
const [state, setState] = useState("");

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: { id: profileId },
    refetchQueries: [{ query: QUERY_PROFILES }],
  });
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('Enter key was pressed. Run your function.')
      setState(event.key);
    }
    // console.log(story)
  }
console.log("you have pressed a ", state);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (teacher === "meditator") {
      // if (teacher1 === "teacher" && teacher === "meditator") {
      //   setFirstname("");
      //   setLastname("");
      //   setStory("");
      //   console.log("was a teacher");
      // } else 
      if (teacher === teacher1 && years === years1 && stage === stage1) {
        setMessage("you haven't change anything to your profile...");
      }
      if (!teacher || !years || !stage) {
        setErrorMessage("all fields need filled");
        return;
      } else if (
        teacher === "meditator" &&
        (/^[0-9]+$/.test(years) === false || /^[0-9]+$/.test(stage) === false)
      ) {
        setErrorMessage("years and stage must be numbers");
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
        setMessage("you haven't change anything to your profile...");
      }
      if (!teacher || !years || !firstname || !lastname || !story) {
        setErrorMessage("all fields need filled");
        return;
      } else if (/^[0-9]+$/.test(years) === false) {
        setErrorMessage("years must be a number");
        console.log("years must be a number");
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
    if (
      firstname === firstname1 &&
      lastname === lastname1 &&
      stage === stage1 &&
      teacher === teacher1 &&
      years === years1 &&
      story === story1
    ) {
      setMessage("You didn't make any changes to your profile...");
    } else {
      setMessage("Your profile has been updated.");
    }
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

  if (confirm === true) {
    return <Success message={message} />;
  }
  return (
    <>
      <Navbar />
      <div className="profile-form bg-primary">
        <h3 className="profile-title text-light py-5">Profile form</h3>
        <form className="my-form bg-primary">
          <div>
            <div>
              <label className="form-label text-light my-4">status</label>
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
                  onKeyDown={handleKeyPress}
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
            className="btn btn-profile rounded-0 my-5"
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
