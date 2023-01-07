
import { Box } from '@mui/system';
import FlexBetween from 'Components/FlexBetween'
import { Navbar } from 'Pages/Navbar/Navbar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/", { state: null });
  });

  
  const user = useSelector((s) => s.user);
  console.log(`${process.env.REACT_APP_SERVER}/${user?.picPath}`)  
  return (
    <>
      <Navbar />
      <FlexBetween>
        <Box border={"2px solid red"} width={100} height={100}>
          <img src={`${process.env.REACT_APP_SERVER}/${user?.picPath}`} />
        </Box>
        <Box border={"2px solid red"} width={100} height={100}></Box>
        <Box border={"2px solid red"} width={100} height={100}></Box>
        <Box border={"2px solid red"} width={100} height={100}></Box>
      </FlexBetween>
    </>
  )
}
