import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[228px] w-full flex-col justify-between rounded-[14px] bg-white text-black shadow-md px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <img src={icon} alt="meeting icon" width={28} height={29} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            <p className="text-base font-normal text-black">{date}</p>
          </div>
        </div>
      </article>

      <article className="flex justify-center relative">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <img
              key={index}
              style={{
                top: 0,
                left: index * 28,
                width: "50px",
                height: "50px",
              }}
              src={img}
              alt="attendee"
              className={`rounded-full "absolute"} `}
            />
          ))}
          <div className="flex items-center justify-center absolute left-[236px] size-10 rounded-full bg-white text-black shadow">
            <span>+5</span>
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2 items-end">
            <Button onClick={handleClick} variant="contained">
              {buttonIcon1 && <img src={buttonIcon1} alt="feature icon" />}
              {buttonText}
            </Button>

            <button
              style={{ height: "37px" }}
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.info("Link Copied");
              }}
              className="btn btn-outline"
            >
              <img src="/icons/copy.svg" alt="" />
              copy
            </button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
