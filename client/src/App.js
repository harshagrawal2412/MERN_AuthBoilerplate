import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import ForgotPassword from "./Components/auth/ForgotPassword";
import ResetPassword from "./Components/auth/ResetPassword";
import Navbar from "./Components/Navbar";
import Private from "./Private";
import NotFound from "./Components/NotFound";
import Error from "./Components/Error";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Private path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route
          path="/resetpassword/:resetToken"
          exact
          component={ResetPassword}
        />
        {/* <Route path="/login" exact element={<Login />} /> */}
        <Route path="*" exact component={NotFound} />
        {/* <Route path="*" exact component={Error} /> */}
      </Switch>
    </Router>
  );
}

export default App;
