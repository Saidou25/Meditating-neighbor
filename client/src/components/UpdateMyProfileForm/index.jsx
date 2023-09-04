import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { QUERY_PROFILES, QUERY_ME } from "../../utils/queries";
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
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: { id: profileId },
    refetchQueries: [{ query: QUERY_PROFILES }],
  });
  console.log(story, firstname, lastname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacher || !years) {
      setError("All fields need filled");
      return;
    }
    if (
      teacher !== "teacher" ||
      teacher !== "meditator" ||
      teacher !== "Teacher" ||
      teacher !== "Meditator"
    ) {
      setError("Please answer 'teacher' or 'meditator'");
      return;
    } else if (
      (teacher === "meditator" || teacher === "Meditator") &&
      (/^[0-9]*$/.test(stage) === false || /^[0-9]*$/.test(years) === false)
    ) {
      setError("years meditating and stage must be numbers");
      return;
    }
    if (
      (teacher === "teacher" || teacher === "Teacher") &&
      /^[0-9]*$/.test(years) === false
    ) {
      setError("years meditating must be a number");
      return;
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
        console.log("profile updated", data);
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
      <div className="container-fluid profile-form bg-primary">
        <div className="main-form">
          <div className="form-group">
            <label className="form-label text-light fs-4 mt-4 mb-5">
              Please change the fields you would like to update
            </label>
            {teacher === "teacher" || teacher === "Teacher" ? (
              <>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingsteacher"
                    value={teacher}
                    autoComplete="off"
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                  <label htmlFor="floatingInput">status</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingstfirstname"
                    value={firstname}
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="floatingInput">first name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingslastname"
                    value={lastname}
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label htmlFor="floatingInput">last name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingInput"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                  <label htmlFor="floatingInput">years meditating</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    type="text"
                    className="form-control pt-5 pb-4"
                    style={{ height: "200px" }}
                    id="floatingteacher"
                    value={story}
                    autoComplete="off"
                    onChange={(e) => setStory(e.target.value)}
                  />
                  <label htmlFor="floatingInput">
                    Please write about yourself...
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingsteacher"
                    value={teacher}
                    autoComplete="off"
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                  <label htmlFor="floatingInput">status</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingInput"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                  <label htmlFor="floatingInput">years meditating</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingstage"
                    value={stage}
                    autoComplete="off"
                    onChange={(e) => setStage(e.target.value)}
                  />
                  <label htmlFor="floatingInput">stage</label>
                </div>
              </>
            )}
          </div>
          {error && (
            <div className="profile-form-error bg-danger mt-3 text-light p-3">
              {error}
            </div>
          )}
          {confirm && (
            <div className="profile-form-error bg-success mt-3 text-light p-3">
              {confirm}
            </div>
          )}
          <button
            className="btn btn-profile-form rounded-0 p-3 mt-5 fs-5"
            onClick={handleSubmit}
          >
            update
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UpdateMyProfileForm;
