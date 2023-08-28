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
  const stage1 = myProfile.stage;
  const teacher1 = myProfile.teacher;
  const years1 = myProfile.years;
  const story1 = myProfile.story;

  const [stage, setStage] = useState(stage1);
  const [teacher, setTeacher] = useState(teacher1);
  const [years, setYears] = useState(years1);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [story, setStory] = useState("");
  const [message, setMessage] = useState("");

  // const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: { id: profileId },
    update(cache, { data: { updateProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: {
            profiles: [updateProfile, ...profiles],
          },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("success updating cache with deleteProfile", profileId);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stage || !teacher || !years) {
      setError("All fields need filled");
      return;
    }
    if (teacher === "teacher" || teacher === "meditator") {
      console.log("good to go");
    } else {
      setError("Please choose between 'teacher' and 'meditator'");
      return;
    }
    try {
      const { data } = await updateProfile({
        variables: {
          id: profileId,
          username: myProfile.username,
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
      navigate("/Profile1");
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control pt-5 pb-4"
                id="floatingteacher"
                value={teacher}
                autoComplete="off"
                onChange={(e) => setTeacher(e.target.value)}
              />
              <label htmlFor="floatingInput">
                {myProfile.teacher === "teacher" ? (
                  <>teacher</>
                ) : (
                  <>meditator</>
                )}
              </label>
            </div>
            {teacher === "teacher" && (
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
