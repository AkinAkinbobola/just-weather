const Detail = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: string | number | undefined;
  icon: string;
}) => {
  return (
    <div
      className={
        "bg-white/[0.32] rounded-2xl py-5 px-5 flex gap-10 items-center justify-between"
      }
    >
      <div className={"flex flex-col gap-2"}>
        <p className={"body text-gray-900/60"}>{name}</p>

        <p className={"headline-md text-gray-900"}>{value}</p>
      </div>

      <img src={icon} width={32} height={32} alt={"weather icon text"} />
    </div>
  );
};

export default Detail;
