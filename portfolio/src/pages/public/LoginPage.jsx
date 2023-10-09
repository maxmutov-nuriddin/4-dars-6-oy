import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { AuthContext } from "../../context/AuthContext";
import { TOKEN, ROLE } from "../../constants";

import request from "../../server/Server";


import { message } from 'antd'


import './login.scss'

const LoginPage = () => {
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.username.trim() === '') {
      setError('Please enter a username.');
      return false;
    }
    if (formData.password.trim() === '') {
      setError('Please enter a password.');
      return false;
    }
    setError('');
    return true;
  };

  const login = async () => {
    if (validateForm()) {
      try {
        let { data } = await request.post('auth/login', formData);
        console.log(data);
        let token = data.token
        let role = data.user.role
        if (role === "user") {
          navigate("/");
          setIsLoading(false)
        } else if (role === "admin") {
          navigate("/dashboards");
          setIsLoading(false)
        }
        setIsAuthenticated(true);
        setRole(role);
        Cookies.set(TOKEN, token)
        Cookies.set(ROLE, role);
        setIsAuthenticated(true);
        setFormData({
          username: '',
          password: '',
        });
        location.reload()
      } catch (error) {
        message.error("Error");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    setIsLoading(true)
  };

  if (isLoading) {
    return <div className='loading'>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>;
    </div>
  }

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="login__input"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="login__input"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="login__error">{error}</p>}
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;