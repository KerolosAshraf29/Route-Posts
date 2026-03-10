import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import ProfileCard from "../ProfileCard/ProfileCard";
import Loader from "../Loader/Loader";

export default function Profile() {
  const { userData } = useContext(authContext);

  if (!userData) {
    return <Loader />;
  }

  return (
    //  <ProfileCard user={userData}/>
    <ProfileCard user={userData} />
  );
}
