import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_PROFILES } from "../../utils/queries";
import { useNavigate, useLocation } from "react-router-dom";
import Success from "../Success";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const me = location.state.me;

  const [stage, setStage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [years, setYears] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const [addProfile] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: { profiles: [addProfile, ...profiles] },
          variables: {
            username: me.username,
            stage: stage,
            years: years,
            teacher: teacher,
          },
        });
        console.log("success updating cache with addProfile");
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
      setError("Please answer 'teacher' or 'meditator'");
      return;
    }
    try {
      const { data } = await addProfile({
        variables: {
          username: me.username,
          stage: stage,
          years: years,
          teacher: teacher,
        },
      });
      if (data) {
        setError("");
        console.log("profile created");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("profile created");
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
    return <Success />;
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid profile-form bg-primary">
        <div className="main-form">
          <div className="form-group">
            <label className="form-label text-light fs-4 mt-4 mb-5">
              Detail your profile
            </label>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control pt-5 pb-4"
                id="floatingInput"
                placeholder="enter number of years"
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
              <label htmlFor="floatingInput">years meditating</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control pt-5 pb-4"
                id="floatingstage"
                placeholder="stage"
                autoComplete="off"
                onChange={(e) => setStage(parseInt(e.target.value))}
              />
              <label htmlFor="floatingPassword">what stage are you</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control pt-5 pb-4"
                id="floatingteacher"
                placeholder="teacher"
                autoComplete="off"
                onChange={(e) => setTeacher(e.target.value)}
              />
              <label htmlFor="floatingPassword">
                are you a teacher or meditator?
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
            submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfileForm;
