import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Navabar from "../../components/Navbar";
import LandingFooter from "../../components/LandingFooter";
import "./index.css";

const LandingPage = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };

  return (
    <>
      <div className="landing-nav">
        <Navabar />
      </div>
      <main className="container-main">
        <div className="parallax">
          <div className="login-signup">
            {!Auth.loggedIn() ? (
              <Link to="/LoginSignup" className="signup-link">
                <button className="btn btn-text signup rounded-0">
                  login/ signup
                </button>
              </Link>
            ) : (
              <div to="/" className="signup-link">
                <button
                  className="btn btn-text signup rounded-0"
                  onClick={logout}
                >
                  logout
                </button>
              </div>
            )}
            {Auth.loggedIn() && (
              <Link to="/USA" className="site-link">
                <button className="btn site rounded-0">site</button>
              </Link>
            )}
          </div>
          <div className="row landing-tmiworld g-0">
            <div className="col-6 landing-tmi g-0">TMI</div>
            <div className="col-6 landing-world g-0">WORLD</div>
          </div>
        </div>
        <div className="container-landing">
          <div className="text-title fs-4">
            <h3 className="first-title text-secondary mb-5">
              Where is the nearest TMI meditator?
            </h3>
            <p>
              This appliction is designed for you to see if there is any TMI
              meditator in your town or may be even next door. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Deserunt neque
              corporis et voluptate ut repellat vitae, dolores consectetur eaque
              quo voluptatem aspernatur officia delectus nisi animi sit
              laboriosam, quas quod. . Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sit, ipsam quae atque necessitatibus natus quas
              quis dolores? Architecto quidem eum perferendis eligendi sed
              debitis velit cum labore, reiciendis porro molestiae? Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Laudantium eveniet
              at velit debitis, nisi saepe aliquid aliquam laborum voluptatum
              necessitatibus! Alias rerum, voluptatem exercitationem atque
              officiis voluptates veritatis accusantium ducimus!
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
              meditator in your town or may be even next door. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Deserunt neque
              corporis et voluptate ut repellat vitae, dolores consectetur eaque
              quo voluptatem aspernatur officia delectus nisi animi sit
              laboriosam, quas quod. . Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sit, ipsam quae atque necessitatibus natus quas
              quis dolores? Architecto quidem eum perferendis eligendi sed
              debitis velit cum labore, reiciendis porro molestiae? Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Laudantium eveniet
              at velit debitis, nisi saepe aliquid aliquam laborum voluptatum
              necessitatibus! Alias rerum, voluptatem exercitationem atque
              officiis voluptates veritatis accusantium ducimus!
            </p>
          </div>
        </div>
        <div className="third"></div>
        <div className="landing-footer">
          <LandingFooter />
        </div>
      </main>
    </>
  );
};
export default LandingPage;
