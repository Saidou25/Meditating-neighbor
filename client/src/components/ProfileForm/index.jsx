import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_PROFILES, QUERY_ME } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import Spinner from "../Spinner";
import Success from "../Success";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const ProfileForm = () => {
  const [teacher, setTeacher] = useState("meditator");
  const [years, setYears] = useState("");
  const [stage, setStage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [story, setStory] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // const handleKeyPress = (event) => {
  //   if(event.key === 'Enter'){
  //     console.log('enter press here! ')
  //   }
  // }

  const { data: meData, meDataLoading } = useQuery(QUERY_ME);
  const me = meData?.me || [];

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

  const handleFormSubmit = async (e) => {
    if (teacher === "meditator") {
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
      if (!teacher || !years || !firstname || !lastname || !story) {
        setErrorMessage("all fields need filled");
        return;
      } else if (/^[0-9]+$/.test(years) === false) {
        setErrorMessage("years must be a number");
        return;
      }
    }
    try {
      const { data } = await addProfile({
        variables: {
          username: me.username,
          teacher: teacher,
          years: years,
          stage: stage,
          firstname: firstname,
          lastname: lastname,
          story: story,
        },
      });
      if (data) {
        console.log("profile updated");
      }
    } catch (e) {
      console.log(e);
    }
    setMessage("Your profile has been created");
    setTimeout(() => {
      setMessage("");
      navigate("/Profile");
    }, 3000);
    setTeacher("meditator");
    setErrorMessage("");
    setYears("");
    setStage("");
    setFirstname("");
    setLastname("");
    setStory("");
  };
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (meDataLoading) {
    return <Spinner />;
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
              />
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
            className="btn btn-profile-form rounded-0 text-light"
            type="button"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default ProfileForm;
