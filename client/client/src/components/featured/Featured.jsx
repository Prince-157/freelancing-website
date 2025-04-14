import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Featured.scss';

const Featured = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if(search) {
      navigate(`/gigs?search=${search}`);
    }
  }

  return (
    <div className='featured'>
      <div className="container">

        <div className="left">
          <h1>Find the perfect <span>freelance</span> services for your business</h1>
          <div className="search">
            <div className="searchInput">
              <img src="./media/search.png" alt="search" />
              <input type="search" placeholder='Try "building website"' onChange={(({ target: { value } }) => setSearch(value))} />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
         <span>Popular:</span>
          
            <button>
            <Link to="/gigs?category=social" className="link">
                  Digital Marketing
                  </Link>
            </button>

            <button>
            <Link to="/gigs?category=wordpress" className="link">
                  WordPress
                  </Link>
            </button>

            <button>
            <Link to="/gigs?category=design" className="link">
                  Logo Design
                  </Link>
            </button>
            
            <button>
            <Link to="/gigs?category=ai" className="link">
            AI Services
                  </Link>
                  </button>
          </div>
        </div>

        <div className="right">
          <img src="./media/hero.png" alt="hero" />
        </div>
        
      </div>
    </div>
  )
}

export default Featured