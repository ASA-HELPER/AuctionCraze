import { useAppDispatch } from "../../hooks/storeHooks";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import "./login-styles.scss";
import CustomButton from "../../components/button/CustomButton";
import { login } from "../../store/slices/userSlice";
import loginCopy from "./login.copy";
import { ROUTES } from "../../constants/route-constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <div className="login__container">
      <h1 className="login__title">Login</h1>
      <CustomInput
        value={email}
        placeholder={loginCopy.email}
        preset={InputPresets.Email}
        handleChange={(e) => setEmail(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
      />
      <CustomInput
        value={password}
        placeholder={loginCopy.password}
        preset={InputPresets.Password}
        handleChange={(e) => setPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
      />
      <CustomButton onClick={handleLogin} title={loginCopy.buttonTitle} />
      {/* <Link to="/password/forgot" className="login__forgotPassword">
        Forgot your password?
      </Link> */}
    </div>
  );
};

export default Login;
