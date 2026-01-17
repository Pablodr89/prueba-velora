export default function Button({
  text = null,
  handledClick,
  deleted = false,
  customClasses = "",
  icon = null,
  disabled = false,
}) {
  return (
    <button
      onClick={handledClick}
      className={`text-white font-bold py-2 px-4 rounded disabled:opacity-50 ${customClasses} ${
        deleted
          ? "bg-red-700 hover:bg-red-900"
          : "bg-blue-950 hover:bg-blue-900"
      }`}
      disabled={disabled}
    >
      {icon ? <img src={icon} alt="icon" className="w-6 h-6" /> : text}
    </button>
  );
}
