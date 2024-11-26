import { useNavigate, useParams } from "react-router-dom";

const withRoute = (Component) => {
  
  const RouteHoc = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    
    return <Component {...props} navigate={navigate} params={params} />;
  };
  return RouteHoc;

};

export default withRoute;
