import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Featured, Slide, TrustedBy } from '../../components';
import { CategoryCard, ProjectCard } from '../../components';
import { cards, projects } from '../../data';

import './Home.scss';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5}>
        {
          cards.map((card) => (
            <CategoryCard key={card.id} data={card} />
          ))
        }
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>The best for every budget</h6>
            </div>
            <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Quality work done quickly</h6>
            </div>
            <p>Find the right freelancer to begin working on your project within minutes.</p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Protected payments, every time</h6>
            </div>
            <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>24/7 support</h6>
            </div>
            <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
          </div>
          <div className="item">
            <video src="./media/video.mp4" controls></video>
          </div>
        </div>
      </div>

      <div className="explore" id = "explores">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=design" className="link">
              Graphics & Design
                  </Link></span>
            </div>
            <div className="item">
            
              <img 
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>
              <Link to="/gigs?category=social" className="link">
                  Digital Marketing
                  </Link>
              </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=writing&Translation" className="link">
              Writing & Translation
                  </Link>
              </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=video" className="link">
              Video & Animation
                  </Link></span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=voice" className="link">
              Music & Audio
                  </Link>
             </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=tech" className="link">
              Programming & Tech
                  </Link>
              </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=seo" className="link">
              SEO
                  </Link>
                  </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=books" className="link">
              books
                  </Link>
                  </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=dataentry" className="link">
              Data Entry
                  </Link>
                  </span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>
              <Link to="/gigs?category=photography" className="link">
              Photography
                  </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    
      {/* WorkHive community Component */}
      <div className="features dark" id = "workhiveCommunity">
        <div className="container">
          <div className="item">
            <h2>workhive community</h2>
            <h1>Connect, Collaborate & Create <span>future</span></h1>
            <p>Upgrade to a curated experience packed with tools and benefits, dedicated to community</p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Connect to freelancers with shared passion and ignite innovation</h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Get matched with the perfect talent by a customer success manager</h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Manage teamwork and boost productivity with one powerful workspace</h6>
            </div>
            <button>Explore WorkHive Community</button>
          </div>
          <div className="item">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" alt="" />
          </div>
        </div>
      </div>
     
      <Slide slidesToShow={4}>
        {
          projects.map((card) => (
            <ProjectCard key={card.id} data={card} />
          ))
        }
      </Slide>
    </div>
  )
}

export default Home