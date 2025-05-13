import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Featured.scss';

const Featured = () => {
  const [search, setSearch] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if(search) {
      navigate(`/gigs?search=${search}`);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') handleSearch();
  }

  const renderParticles = () => {
    return Array.from({ length: 30 }).map((_, i) => (
      <span 
        key={i}
        style={{
          '--size': `${Math.random() * 3 + 1}px`,
          '--delay': `${Math.random() * 10}s`,
          '--duration': `${Math.random() * 30 + 20}s`,
          '--opacity': Math.random(),
          '--startX': `${Math.random() * 100}%`,
          '--startY': `${Math.random() * 100}%`
        }}
      />
    ));
  };

  const popularCategories = [
    { name: "Digital Marketing", slug: "social" },
    { name: "WordPress", slug: "wordpress" },
    { name: "Logo Design", slug: "design" },
    { name: "AI Services", slug: "ai" }
  ];

  return (
    <div className='featured'>
      <div className="particles">{renderParticles()}</div>
      
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          
          <div 
            className="search"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="searchInput">
              <img 
                src="./media/search.png" 
                alt="search" 
                className={isHovering ? 'hover' : ''} 
              />
              <input 
                type="search" 
                placeholder='Try "building website"' 
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button onClick={handleSearch}>
              <span>Search</span>
            </button>
          </div>
          
          <div className="popular">
            <span>Trending now:</span>
            {popularCategories.map((category, index) => (
              <button key={index}>
                <Link 
                  to={`/gigs?category=${category.slug}`} 
                  className="link"
                >
                  {category.name}
                </Link>
              </button>
            ))}
          </div>
        </div>

        <div className="right">
          <div className="image-wrapper">
            <img 
              src="./media/hero.jpg" 
              alt="Freelance services illustration" 
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured;