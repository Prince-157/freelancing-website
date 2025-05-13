import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../../utils';
import { useRecoilState } from 'recoil';
import { userState } from '../../../atoms';
import './Login.scss';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger initial animation after mount
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    for(let key in formInput) {
      if(formInput[key] === '') {
        toast.error('Please fill all input fields: ' + key);
        // Add error animation
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 10);
        return;
      }
    }

    setLoading(true);
    try {
      const { data } = await axiosFetch.post('/auth/login', formInput);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃"
      });
      // Add success transition
      setIsAnimating(false);
      setTimeout(() => navigate('/'), 500);
    }
    catch ({ response: { data } }) {
      setError(data.message);
      toast.error(data.message, {
        duration: 3000,
      });
      // Trigger error animation
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 10);
    }
    finally {
      setLoading(false);
      setError(null);
    }
  }

  return (
    <div className={`login ${isAnimating ? 'active' : ''}`}>
      <form action="" onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          name='username' 
          placeholder='johndoe' 
          onChange={handleFormInput} 
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          name='password' 
          type='password' 
          placeholder='password' 
          onChange={handleFormInput} 
          autoComplete="current-password"
        />
        <button disabled={loading} type='submit'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <span>{error && error}</span>
      </form>
    </div>
  )
}

export default Login;