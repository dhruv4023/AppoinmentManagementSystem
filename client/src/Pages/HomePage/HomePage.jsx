import FlexBetween from 'Components/FlexBetween'
import React from 'react'
import { Navbar } from 'Pages/Navbar/Navbar'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import FlexEvenly from 'Components/FlexEvenly'
const HomePage = () => {
  const theme = useTheme();
  return (
    <>
      <Navbar />
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background}
      >
        <Typography fontWeight={"bold"} fontSize={"1.5rem"} color={theme.palette.neutral.main}>
          All Appointments Category
        </Typography>
      </Box>
      <FlexEvenly margin={"0 0.5rem"} border={"2px solid yellow"} flexWrap={"wrap"}>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
        <Box height={200} width={200} m={"0.2rem"} sx={{ "border": "1px solid red" }}>        </Box>
      </FlexEvenly>
    </>
  )
}

export default HomePage