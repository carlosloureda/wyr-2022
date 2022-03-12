import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "@/redux/usersSlice";

const useFetchUsers = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

  return { users, loading, error };
};
export default useFetchUsers;
