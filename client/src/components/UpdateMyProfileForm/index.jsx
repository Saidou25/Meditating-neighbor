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
  const navigate = useNavigate();
  const location = useLocation();

  const myProfile = location.state.myProfile;
  const profileId = myProfile._id;
  const stage1 = myProfile.stage;
  const teacher1 = myProfile.teacher;
  const years1 = myProfile.years;

  const [stage, setStage] = useState(stage1);
  const [teacher, setTeacher] = useState(teacher1);
  const [years, setYears] = useState(years1);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [changes, setChanges] = useState("");
  const [noChanges, setNoChanges] = useState("");

  // const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    // variables: { id: profileId },
    update(cache, { data: { updateProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: {
            profiles: [...profiles, updateProfile],
          },
          variables: {
            id: profileId,
            username: myProfile.username,
            stage: stage,
            years: years,
            teacher: teacher,
          },
        });
        console.log("success updating cache with updateProfile");
      } catch (e) {
        console.error(e);
      }
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
        },
      });
      if (data) {
        // setError("");
        console.log("profile updated");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("profile updated");
    if (stage === stage1 && teacher === teacher1 && years === years1) {
      setNoChanges("You didn't make any changes to your profile...");
      // setConfirm(true);
    } else {
      setChanges("Your profile has been updated.");
    }
    setConfirm(true);
    setTimeout(() => {
      navigate("/Profile1");
      setConfirm(false);
    }, 4000);
    setStage("");
    setYears("");
    setTeacher("");
  };

  if (confirm === true) {
    return <Success changes={changes} noChanges={noChanges} />;
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
                type="number"
                className="form-control pt-5 pb-4"
                id="floatingInput"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
              <label htmlFor="floatingInput">years meditating</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control pt-5 pb-4"
                id="floatingstage"
                value={stage}
                autoComplete="off"
                onChange={(e) => setStage(parseInt(e.target.value))}
              />
              <label htmlFor="floatingInput">stage</label>
            </div>
            <div className="form-floating">
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
