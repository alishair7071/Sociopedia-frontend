import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import UserWidget from "../widgets/UserWidget.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`https://sociopedia-backend-six.vercel.app/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            imageUrl={user.imageUrl}
          ></UserWidget>
          <Box m="2rem 0" />
          <FriendListWidget userId={user._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile= {true}></PostsWidget>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
