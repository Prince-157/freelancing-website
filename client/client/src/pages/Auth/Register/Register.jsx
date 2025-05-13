import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    description: "",
    isSeller: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    for (let key in formInput) {
      if (formInput[key] === "" && key !== "isSeller") {
        toast.error(`Please fill all input fields: ${key}`);
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 10);
        return;
      } else if (key === "phone" && formInput[key].length < 9) {
        toast.error("Enter a valid phone number!");
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 10);
        return;
      }
    }

    setLoading(true);
    try {
      let imageUrl = "";

      if (image) {
        const imageResponse = await generateImageURL(image);
        imageUrl = imageResponse?.url || "";
      }

      const response = await axiosFetch.post("/auth/register", {
        ...formInput,
        image: imageUrl,
      });

      if (!response?.data) {
        throw new Error("Invalid response from server");
      }

      toast.success("Registration successful! Please login.");
      setIsAnimating(false);
      setTimeout(() => navigate("/login"), 500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 10);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormInput({
      ...formInput,
      [name]: inputValue,
    });
  };

  return (
    <div className={`register ${isAnimating ? 'active' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            name="password" 
            type="password" 
            placeholder="••••••••" 
            onChange={handleChange} 
            required 
          />
          <label htmlFor="profile-pic">Profile Picture</label>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Profile preview" />
            </div>
          )}
          <input 
            id="profile-pic"
            type="file" 
            accept="image/*"
            onChange={handleImageChange} 
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>
        <div className="right">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate seller account</label>
            <label className="switch">
              <input 
                type="checkbox" 
                name="isSeller" 
                checked={formInput.isSeller}
                onChange={handleChange} 
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Tell us about yourself..."
            name="description"
            cols="30"
            rows="10"
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;