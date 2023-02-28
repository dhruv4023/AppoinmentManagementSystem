const Loading = ({ image }) => {
  return (
    <img
      style={{ padding: "0.2rem", objectFit: "cover", borderRadius: "50%" }}
      // width={size}
      // height={size}
      alt="userImage"
      src={"/assets/Loading.gif"}
    />
  );
};

export default Loading;
// client\public\assets\Loading.gif
