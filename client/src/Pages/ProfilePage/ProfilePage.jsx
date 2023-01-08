
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import FlexBetween from 'Components/FlexBetween'
import FlexEvenly from 'Components/FlexEvenly';
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
  // console.log(`${process.env.REACT_APP_SERVER}/${user?.picPath}`)  
  return (
    <>
      <Navbar />
      <FlexEvenly sx={{ padding: "0.5rem" }}>
        <Box
          border={"2px solid red"}
        >
          <img width={100}
            style={{ borderRadius: "100%", margin: "0.5rem" }}
            src={`${process.env.REACT_APP_SERVER}/${user?.picPath}`} />
        </Box>
        <Typography border={"2px solid red"} >{user.firstName + " " + user.lastName}</Typography>
        <Box border={"2px solid red"} width={100} height={100}></Box>
        <Box border={"2px solid red"} width={100} height={100}></Box>
      </FlexEvenly>
    </>
  )
}
