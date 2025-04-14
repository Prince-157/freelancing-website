import { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Footer.scss';

const Footer = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h1>Categories</h1>
            <span>
            <Link to="/gigs?category=design" className="link">
                  Graphic & Design
                  </Link>
            </span>

            <span>
            <Link to="/gigs?category=social" className="link">
                 Digital Marketing
                  </Link>
            </span>

            <span>
            <Link to="/gigs?category=books" className="link">
                Writing & Translation
                  </Link>
            </span>
            <span>
            <Link to="/gigs?category=video" className="link">
                 Video & Animation
                  </Link>
           </span>

            <span>
            <Link to="/gigs?category=voice" className="link">
                    Music & Audio
                  </Link>
           </span>

            <span>
            <Link to="/gigs?category=tech" className="link">
            Programming & Tech
                  </Link>
           </span>

            <span>
            <Link to="/gigs?category=wordpress" className="link">
           WordPress</Link>
           </span>

            <span>
            <Link to="/gigs?category=ai" className="link">
            AI artists</Link>
           </span>

            <span>
            <Link to="/gigs?category=seo" className="link">
            SEO</Link>
          </span>

            <span>
            <Link to="/gigs?category=illustration" className="link">
            Illustration</Link>
          </span>

          <span>
            <Link to="/gigs?category=dataentry" className="link">
            Data Entry</Link>
          </span>


          </div>
          <div className="item">
            <h1>About</h1>
            <span>Careers</span>
            <span>Press & News</span>
            <span>Partnership</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            {/* <span>Intellectual Property Claims</span>
            <span>Investor Relations</span> */}
          </div>
          <div className="item">
            <h1>Support</h1>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on WorkHive</span>
            <span>Buying on WorkHive</span>
          </div>
          <div className="item">
            <h1>Community</h1>
            <span>Events</span>
            <span>Blog</span>
            <span>Forum</span>
            <span>Community Standards</span>
            {/* <span>Podcast</span>
            <span>Affiliats</span>
            <span>Invite a Friend</span> */}
          </div>
          <div className="item">
            <h1>More From WorkHive</h1>
            <span>WorkHive Community</span>
            <span>WorkHive Pro</span>
            <span>WorkHive Studios</span>
            <span>Get Inspired</span>

            {/* <span>WorkHive Guild</span>
            <span>WorkHive Logo Maker</span>
            <span>WorkHive Select</span>
            <span>Clear Voice</span>
            <span>WorkHive Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span> */}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>workhive</h2>
            <span>© WorkHive Private Ltd. {new Date().getFullYear()}</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="./media/twitter.png" alt="" />
              <img src="./media/facebook.png" alt="" />
              <img src="./media/linkedin.png" alt="" />
              <img src="./media/pinterest.png" alt="" />
              <img src="./media/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="./media/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="./media/coin.png" alt="" />
              <span>INR</span>
            </div>
            <div className="link">
              <img src="./media/accessibility.png" alt="" />
              {/* <span>USD</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer