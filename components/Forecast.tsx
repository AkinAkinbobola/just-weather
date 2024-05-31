import moment from "moment";

type ForecastProps = {
  temp: number;
  time: string;
  icon: string;
  text: string;
};

const Forecast = ({ temp, time, icon, text }: ForecastProps) => {
  const timeFormatted = moment(time).format("h:mm A");
  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-2 bg-white/[0.32] py-2 px-3 rounded-2xl min-w-[100px]"
      }
    >
      <p className={"body-2 text-gray-900/60"}>{timeFormatted}</p>

      <img src={`${icon}`} alt={`${text}`} />

      <p className={"body-3 text-gray-900"}>{temp}</p>
    </div>
  );
};

export default Forecast;
