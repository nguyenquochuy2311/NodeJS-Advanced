import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import Twitter from "../img/twitter.png";
import Linkln from "../img/linkln.png";
import Instagram from "../img/instagram.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          {/* <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button> */}
          <div className="loginButton twitter">
            <img src={Twitter} alt="" className="icon" />
            Twitter
          </div>
          <div className="loginButton linkln">
            <img src={Linkln} alt="" className="icon" />
            LinkedIn
          </div>
          <div className="loginButton instagram">
            <img src={Instagram} alt="" className="icon" />
            Instagram
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
