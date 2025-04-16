import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box height={size} width={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://sociopedia-backend-six.vercel.app//assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
