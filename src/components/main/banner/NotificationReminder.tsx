import Bell from "../../../assets/svg/bell-svgrepo-com 1.svg";
function NotificationReminder() {
  // value is hard coded for now to make it inline w/ reference.
  return (
    <div className="flex gap-1 mt-1">
      <img src={Bell} alt="Bell" />
      <span className="text-blue-400">
        ¡FELICIDADES artxxxxipa! GANADOR DESTACADO
      </span>
    </div>
  );
}

export default NotificationReminder;
