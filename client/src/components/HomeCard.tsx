interface HomeCardProps {
  className: string;
  imgSrc: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  imgSrc,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[240px] rounded-[14px] cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center glassmorphism size-12 rounded-[10px]">
        <img src={imgSrc} width={27} height={27} alt="new meeting" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-md font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
