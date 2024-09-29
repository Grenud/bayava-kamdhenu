import React, { useState, useEffect } from "react";
import ayurveda from "../../assets/cowcover3.png";
import bgx from '../../assets/bgx.jpg'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { SetUser } from "../../redux/AuthSlice";
import GoogleLogin from "./GoogleLogin";
import Button from "../../component/Button"; // Assuming you have a Button component

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [show,setShow] = useState('password')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post('/api/auth/login', {
      email: userData.email,
      password: userData.password
    });
    if (data.success) {
      toast.success(data.message);
      dispatch(SetUser({
        user: data.user
      }));
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (user && user._id) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-light" style={{
      backgroundImage: `url(${bgx})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex flex-col md:flex-row  max-w-4xl  rounded-lg shadow-lg h-auto mt-20 mb-10 w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <div
          className="w-full md:w-1/2 min-h-[250px] md:h-auto bg-cover bg-center rounded-ts-lg md:rounded-l-lg"
          style={{
            backgroundImage: `url(${ayurveda})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-semibold tracking-wider text-black">
                  Enter your email
                </label>
                <input
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  name="email"
                  type="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold tracking-wider text-black">
                  Enter your password
                </label>
                <input
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  name="password"
                  type={show}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                >
                </input>
                  <span onClick={()=>setShow(show=='text'?'password':'text')} className="cursor-pointer absolute right-3 bottom-[0.6rem] z-50">{show=='text'?'hide':'show'}</span>
              </div>

              <Button btnText={"Login"} />

              <div className="flex justify-between items-center mt-4">
                <Link className="text-sm text-primary hover:underline" to="/signup">
                  Create Account
                </Link>
                <Link className="text-sm text-primary hover:underline" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <div className="mt-6">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
