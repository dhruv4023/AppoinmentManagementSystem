import { Box } from "@mui/system";

const UserImg = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ padding: "0.2rem", objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="userImage"
        src={`${process.env.REACT_APP_SERVER}/${image}`}
      />
    </Box>
  );
};

export default UserImg;
