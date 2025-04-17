import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box height={size} width={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://1bd5-139-135-43-211.ngrok-free.app/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
