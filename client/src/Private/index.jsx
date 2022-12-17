import { Route, Redirect } from "react-router-dom";

const Private = ({ component: Component, ...rest }) => {
  // let navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Private;
