export default function Button({
  text = null,
  handledClick,
  customClasses = "",
  icon = null,
  disabled = false,
  typeButton = "NORMAL",
}) {
  const typeStyles = {
    PRIMARY:
      "flex items-center gap-3 text-on-primary px-4 py-2 rounded-xl text-sm bg-linear-to-br from-primary to-primary-dim font-headline font-bold shadow-[0_8px_24px_rgba(77,86,176,0.15)] hover:scale-95 transition-transform",
    SECONDARY:
      "px-4 py-2 bg-surface-container-highest text-primary font-bold border border-surface-variant text-sm rounded-lg flex items-center gap-2 hover:bg-surface-variant transition-all",
    TERTIARY:
      "w-full px-4 py-2 bg-secondary-container text-secondary font-bold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-secondary-dim hover:text-on-secondary transition-color",
    NORMAL:
      "w-12 h-12 rounded-2xl cursor-pointer bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-all hover:bg-white hover:text-blue-600",
  };
  const currentTypeStyles = typeStyles[typeButton] || typeStyles["NORMAL"];

  return (
    <button
      onClick={handledClick}
      className={`${currentTypeStyles} disabled:opacity-50 cursor-pointer text-center ${customClasses}`}
      disabled={disabled}
    >
      {icon ? <img src={icon} alt="icon" className="w-6 h-6" /> : text}
    </button>
  );
}
