import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
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

const EndCallButton = () => {
  const call = useCall();

  const navigate = useNavigate();

  const { useLocalParticipant } = useCallStateHooks();

  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }
  return (
    <Stack spacing={2} direction="row">
      <Tooltip title="End call for everyone" placement="top">
        <BootstrapButton
          onClick={async () => {
            await call.endCall();
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

export default EndCallButton;
