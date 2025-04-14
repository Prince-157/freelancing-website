import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { axiosFetch } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import { Loader } from "..";
import "./Navbar.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosFetch.get('/auth/me');
        setUser(data.user);
      }
      catch({ response }) {
        localStorage.removeItem('user');
        console.log(response.data.message);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const isActive = () => {
    window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const menuLinks = [
    { path: "/gigs?category=design", name: "Graphics & Design" },
    { path: "/gigs?category=video", name: "Video & Animation" },
    { path: "/gigs?category=writing&Translation", name: "Writing & Translation" },
    { path: "/gigs?category=ai", name: "AI Services" },
    { path: "/gigs?category=social", name: "Digital Marketing" },
    { path: "/gigs?category=voice", name: "Music & Audio" },
    { path: "/gigs?category=tech", name: "Programming & Tech" },
    {path: "/gigs?category=illustration", name: "Illustration" },
    {path: "/gigs?category=seo", name: "SEO"},
    {path: "/gigs?category=books", name: "Books"},
    {path: "/gigs?category=dataentry", name: "Data Entry"}



  ];

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    prevArrow: <GrFormPrevious />,
    nextArrow: <GrFormNext />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await axiosFetch.post("/auth/logout");
      localStorage.removeItem('user');
      setUser(null);
      navigate("/");
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  return (
    <nav className={showMenu || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">workhive</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <div className="menu-links">
          <Link to="/#workhiveCommunity" className="link" onClick={() => handleScrollTo("workhiveCommunity")}>
              Workhive Community
            </Link>
            <span>
            <Link to="/#explores" className="link" onClick={() => handleScrollTo("explores")}>
              Explore
            </Link>
            </span>
            <span>English</span>
            {!user?.isSeller && <span>Become a Seller</span>}
          </div>
          {isLoading ? (
            <Loader size={35} />
          ) : (
            <>
              {!user && (
                <span>
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </span>
              )}
              {!user && (
                <Link to="/register" className={`link ${showMenu || pathname !== "/" ? "join-active" : ""}`}>
                    <button>
                      Join
                    </button>
                </Link>
              )}
              {user && (
                <div className="user" onClick={() => setShowPanel(!showPanel)}>
                  <img src={user.image || "/media/noavatar.png"} />
                  <span>{user?.username}</span>
                  {showPanel && (
                    <div className="options">
                      {user?.isSeller && (
                        <>
                          <Link className="link" to="/my-gigs">
                            Gigs
                          </Link>
                          <Link className="link" to="/organize">
                            Add New Gig
                          </Link>
                        </>
                      )}
                      <Link className="link" to="/orders">
                        Orders
                      </Link>
                      <Link className="link" to="/messages">
                        Messages
                      </Link>
                      <Link className="link" to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {(showMenu || pathname !== "/") && (
        <>
          <hr />
          <Slider className="menu" {...settings}>
            {menuLinks.map(({ path, name }) => (
              <div key={name} className="menu-item">
                <Link className="link" to={path}>
                  {name}
                </Link>
              </div>
            ))}
          </Slider>
        </>
      )}
    </nav>
  );
};

export default Navbar;
