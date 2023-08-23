import { useEffect } from "react";
import ContentComponent from "../components/contentComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const ContentPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');

    }
  }, [])


  return <ContentComponent />
};

export default ContentPage;