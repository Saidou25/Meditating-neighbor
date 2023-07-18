import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Footer from "../../components/Footer";
import "./index.css";

const LandingPage = () => {
  return (
    <main className="container-main">
      <div className="parallax">
        <div className="login-signup">
          <Link to="/LoginSignup" className="signup-link">
            <button className="btn btn-text  signup rounded-0">login/ signup</button>
          </Link>

          {/* {Auth.loggedIn ? (
               <li className="nav-item">
               <button className="btn-logout" onClick={logout}>
                 <div className="logout text-light">logout</div>
               </button>
           </li>
            ) : (
              <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/LoginSignup">
                login/signup
              </Link>
              </li>
            )} */}
          <Link to="/USA" className="site-link">
            <button className="btn site rounded-0">site</button>
          </Link>
        </div>
        <div className="cont">
          <span className="welcome">Welcome to TMI</span>
        </div>
      </div>
      <div className="container-landing">
        <div className="text-title fs-4">
          <h3 className="first-title text-secondary mb-5">
            Where is the nearest TMI meditator?
          </h3>
          <p>
            This appliction is designed for you to see if there is any TMI
            meditator in your town or may be even next door. Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Deserunt neque corporis et
            voluptate ut repellat vitae, dolores consectetur eaque quo
            voluptatem aspernatur officia delectus nisi animi sit laboriosam,
            quas quod. . Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sit, ipsam quae atque necessitatibus natus quas quis dolores?
            Architecto quidem eum perferendis eligendi sed debitis velit cum
            labore, reiciendis porro molestiae? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Laudantium eveniet at velit debitis,
            nisi saepe aliquid aliquam laborum voluptatum necessitatibus! Alias
            rerum, voluptatem exercitationem atque officiis voluptates veritatis
            accusantium ducimus!
          </p>
        </div>
      </div>
      <div className="second"></div>
      <div className="container-landing">
        <div className="text-title fs-4">
          <h3 className="first-title text-secondary mb-5">
            Where is the nearest TMI meditator?
          </h3>
          <p>
            This appliction is designed for you to see if there is any TMI
            meditator in your town or may be even next door. Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Deserunt neque corporis et
            voluptate ut repellat vitae, dolores consectetur eaque quo
            voluptatem aspernatur officia delectus nisi animi sit laboriosam,
            quas quod. . Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sit, ipsam quae atque necessitatibus natus quas quis dolores?
            Architecto quidem eum perferendis eligendi sed debitis velit cum
            labore, reiciendis porro molestiae? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Laudantium eveniet at velit debitis,
            nisi saepe aliquid aliquam laborum voluptatum necessitatibus! Alias
            rerum, voluptatem exercitationem atque officiis voluptates veritatis
            accusantium ducimus!
          </p>
        </div>
      </div>
      <div className="third"></div>
      <Footer />
    </main>
  );
};
export default LandingPage;
