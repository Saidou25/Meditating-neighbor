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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [stage, setStage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [years, setYears] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [story, setStory] = useState("");

  const [addProfile] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: { profiles: [...profiles, addProfile] },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("profile successfully added to the cache");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacher || !years) {
      setError("All fields need filled");
      return;
    }
    if (
      teacher === "teacher" ||
      teacher === "meditator" ||
      teacher === "Teacher" ||
      teacher === "Meditator"
    ) {
    } else {
      setError("Please answer 'teacher' or 'meditator'");
      return;
    }
    if (
      (teacher === "meditator" || teacher === "Meditator") &&
      (/^[0-9]*$/.test(stage) === false || /^[0-9]*$/.test(years) === false)
    ) {
      setError("years meditating and stage must be numbers");
      return;
    }
    if ((teacher === "teacher" || teacher === "Teacher") && /^[0-9]*$/.test(years) === false) {
      setError("years meditating must be a number");
      return;
    }
    try {
      const { data } = await addProfile({
        variables: {
          username: me.username,
          firstname: firstname,
          lastname: lastname,
          stage: stage,
          years: years,
          teacher: teacher,
          story: story,
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control pt-5 pb-4"
                id="floatingInput"
                placeholder="enter number of years"
                onChange={(e) => setYears(e.target.value)}
              />
              <label htmlFor="floatingInput">years meditating</label>
            </div>
            {teacher === "teacher" || teacher === "Teacher" ? (
              <>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingInput"
                    placeholder="fitst name"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="floatingInput">first name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control pt-5 pb-4"
                    id="floatingInput"
                    placeholder="last name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label htmlFor="floatingInput">last name</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    type="text"
                    className="form-control pt-5 pb-4"
                    style={{ height: "200px" }}
                    id="floatingteacher"
                    autoComplete="off"
                    placeholder="about yourself"
                    onChange={(e) => setStory(e.target.value)}
                  />
                  <label htmlFor="floatingInput">
                    Please write about yourself...
                  </label>
                </div>
              </>
            ) : (
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control pt-5 pb-4"
                  id="floatingstage"
                  placeholder="stage"
                  autoComplete="off"
                  onChange={(e) => setStage(e.target.value)}
                />
                <label htmlFor="floatingPassword">
                  what stage are you currently working on?
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
            submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfileForm;
