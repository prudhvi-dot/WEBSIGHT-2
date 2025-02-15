import { useCall } from "@stream-io/video-react-sdk";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import CallEndIcon from "@mui/icons-material/CallEnd";

import { useNavigate } from "react-router-dom";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#dc2626",
  borderRadius: "100%",
  borderColor: "#dc2626",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "f56565",
    borderColor: "f56565",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const CancleCall = () => {
  const call = useCall();

  const navigate = useNavigate();

  return (
    <Stack spacing={2} direction="row">
      <Tooltip title="Leave Call" placement="top">
        <BootstrapButton
          onClick={async () => {
            await call?.camera.disable();
            await call?.microphone.disable();
            await call?.leave();
            navigate("/");
          }}
          variant="contained"
          disableRipple
        >
          <CallEndIcon />
        </BootstrapButton>
      </Tooltip>
    </Stack>
  );
};

export default CancleCall;
