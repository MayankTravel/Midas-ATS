import Recruiter from "Components/Recruit";
import { fetchAllUser } from "Components/slices/user/thunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch: any = useDispatch();
  const [userCurrent, setUserCurrent] = useState<any>([]);
  const { userdata } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUserCurrent(obj);
    }
    fetchAllUser(dispatch);
    // AmParent();
  }, []);
  console.log(userCurrent);
  console.log(userdata);
  return (
    <div>
      <Recruiter
        userdata={userdata}
        userCurrent={userCurrent.length === 0 ? [] : userCurrent}
      />
    </div>
  );
};

export default index;
