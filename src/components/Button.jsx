export default function Button({
  text = null,
  handledClick,
  deleted = false,
  customClasses = "",
  icon = null,
}) {
  return (
    <button
      onClick={handledClick}
      className={`text-white font-bold py-2 px-4 rounded ${customClasses} ${
        deleted
          ? "bg-red-700 hover:bg-red-900"
          : "bg-blue-950 hover:bg-blue-700"
      }`}
    >
      {icon ? <img src={icon} alt="icon" className="w-6 h6" /> : text}
    </button>
  );
}
