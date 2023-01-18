export const getUser = async (setUser, UID, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/user/get/${UID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  setUser(data);
};

// export const handlePost = async (
//   _id,
//   post,
//   image,
//   setPost,
//   dispatch,
//   setImage,
//   token
// ) => {
//   console.log(_id, post, image, token);
//   const formData = new FormData();
//   formData.append("userId", _id);
//   formData.append("description", post);
//   if (image) {
//     formData.append("file", image);
//     formData.append("picturePath", image.name);
//     // console.log(formData.values())
//   }
//   const res = await fetch(`${process.env.REACT_APP_SERVER}/posts/post`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });
//   const posts = await res.json();
//   dispatch(setPosts({ posts }));
//   // setImage(null);
//   setPost("");
// };

// export const getPosts = async (token, dispatch) => {
//   const res = await fetch(`${process.env.REACT_APP_SERVER}/posts/get`, {
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await res.json();
//   dispatch(setPosts({ posts: data }));
// };

// export const getUserPosts = async (userId, token, dispatch) => {
//   const res = await fetch(
//     `${process.env.REACT_APP_SERVER}/posts/get/${userId}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   const data = await res.json();
//   dispatch(setPosts({ posts: data }));
// };

// export
// const patchLike = async (loggedInUserId,token,dispatch,postId) => {
//   const response = await fetch(
//     `${process.env.REACT_APP_SERVER}/posts/${postId}/like`,
//     {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
//     }
//   );
//   const updatedPost = await response.json();
//   dispatch(setPost({ post: updatedPost }));
// };
