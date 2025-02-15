import {
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  ReactionsButton,
  RecordCallButton,
} from "@stream-io/video-react-sdk";

export const CallControls = () => {
  return (
    <div className="str-video__call-controls">
      <SpeakingWhileMutedNotification>
        <ToggleAudioPublishingButton />
      </SpeakingWhileMutedNotification>
      <ToggleVideoPublishingButton />
      <ScreenShareButton />
      <ReactionsButton />
      <RecordCallButton />
    </div>
  );
};
