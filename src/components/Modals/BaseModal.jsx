import "./Modal.css";

export const BaseModal = ({ children }) => {
  return (
    <div
      className="animate-in bg-modal fixed top-0 left-0 z-[60] flex h-full w-full flex-col items-center justify-center overflow-auto"
      id="modal"
    >
      <section
        className={`relative z-10 flex flex-col items-start justify-start rounded-2xl md:w-[90%] p-10 bg-white shadow-lg max-w-2xl`}
      >
        {children}
      </section>
    </div>
  );
};
