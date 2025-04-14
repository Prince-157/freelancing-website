import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    for (let key in formInput) {
      if (formInput[key] === "") {
        toast.error(`Please fill all input fields: ${key}`);
        return;
      } else if (key === "phone" && formInput[key].length < 9) {
        toast.error("Enter a valid phone number!");
        return;
      }
    }

    setLoading(true);
    try {
      let imageUrl = "";

      // If an image is uploaded, generate its URL
      if (image) {
        const imageResponse = await generateImageURL(image);
        imageUrl = imageResponse?.url || "";
      }

      const response = await axiosFetch.post("/auth/register", {
        ...formInput,
        image: imageUrl,
      });

      console.log("Full API Response:", response);

      // Validate response
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      toast.success("Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response || error);

      // Handle error message properly
      toast.error(error.response?.data?.message || "Something went wrong");
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
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} required />
          <label>Profile Picture</label>
          <input type="file" onChange={(event) => setImage(event.target.files[0])} />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <div className="right">
          <p>
            Already have an account? <Link to="/login">Signin</Link>
          </p>
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" name="isSeller" onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 1234 567 890"
            onChange={handleChange}
            required
          />
          <label>Description</label>
          <textarea
            placeholder="A short description of yourself"
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
