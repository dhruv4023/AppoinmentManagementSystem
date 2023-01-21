import React from "react";
import DisplayServicesWidget from "../Admin/DisplayServicesWidget";

const ServiceUserSide = ({ user }) => {
  // const dispatch = useDispatch();
  // const { serviceData } = useSelector((s) => s.services);
  // useEffect(() => {
  //   const username = user.username;
  //   getAllServices(dispatch, username);
  // }, []);
  return <>{<DisplayServicesWidget user={user} />}</>;
};

export default ServiceUserSide;
