import { useTheme, Typography, IconButton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween.jsx";
import UserImage from "./UserImage.jsx";
import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import { setFriends } from "../state/index.js";

const Friend = ({ friendId, name, subtitle, imageUrl }) => {
  console.log("Friend is called url of image: " + imageUrl);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id == friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://sociopedia-backend-six.vercel.app/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={imageUrl} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId != _id && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
