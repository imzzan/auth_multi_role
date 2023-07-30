import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Layout from './Layout';
import UserList from '../component/UserList';

const UserPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if(user && user.role  !== 'admin') {
      navigate('/dashboard')
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <UserList/>
    </Layout>
  )
}

export default UserPages