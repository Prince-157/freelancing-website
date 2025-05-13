import { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Footer.scss';

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { name: "Graphic & Design", path: "/gigs?category=design" },
    { name: "Digital Marketing", path: "/gigs?category=social" },
    { name: "Writing & Translation", path: "/gigs?category=books" },
    { name: "Video & Animation", path: "/gigs?category=video" },
    { name: "Music & Audio", path: "/gigs?category=voice" },
    { name: "Programming & Tech", path: "/gigs?category=tech" },
    { name: "WordPress", path: "/gigs?category=wordpress" },
    { name: "AI Artists", path: "/gigs?category=ai" },
    { name: "SEO", path: "/gigs?category=seo" },
    { name: "Illustration", path: "/gigs?category=illustration" },
    { name: "Data Entry", path: "/gigs?category=dataentry" }
  ];

  const aboutLinks = [
    "Careers", "Press & News", "Partnership", 
    "Privacy Policy", "Terms of Service"
  ];

  const supportLinks = [
    "Help & Support", "Trust & Safety", 
    "Selling on FreeLynx", "Buying on FreeLynx"
  ];

  const communityLinks = [
    "Events", "Blog", "Forum", "Community Standards"
  ];

  const moreLinks = [
    "FreeLynx Community", "FreeLynx Pro", 
    "FreeLynx Studios", "Get Inspired"
  ];

  const socialIcons = [
    { src: "./media/twitter.png", alt: "Twitter" },
    { src: "./media/facebook.png", alt: "Facebook" },
    { src: "./media/linkedin.png", alt: "LinkedIn" },
    { src: "./media/pinterest.png", alt: "Pinterest" },
    { src: "./media/instagram.png", alt: "Instagram" }
  ];

  return (
    <footer className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={category.path} className="link">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="item">
            <h2>About</h2>
            <ul>
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="item">
            <h2>Support</h2>
            <ul>
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="item">
            <h2>Community</h2>
            <ul>
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="item">
            <h2>More From FreeLynx</h2>
            <ul>
              {moreLinks.map((link, index) => (
                <li key={index}>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <hr />
        
        <div className="bottom">
          <div className="left">
            <h2 className="logo">FreeLynx</h2>
            <span>© FreeLynx Private Ltd. {new Date().getFullYear()}</span>
          </div>
          
          <div className="right">
            <div className="social">
              {socialIcons.map((icon, index) => (
                <img 
                  key={index} 
                  src={icon.src} 
                  alt={icon.alt} 
                  className="social-icon"
                />
              ))}
            </div>
            
            <div className="link">
              <img src="./media/language.png" alt="Language" />
              <span>English</span>
            </div>
            
            <div className="link">
              <img src="./media/coin.png" alt="Currency" />
              <span>INR</span>
            </div>
            
            <div className="link">
              <img src="./media/accessibility.png" alt="Accessibility" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;