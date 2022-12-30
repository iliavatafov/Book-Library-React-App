import "../Modal/Modal.css";

export const Modal = ({ modalHidden, setModalHidden, message }) => {
  const onCloseHandler = () => {
    setModalHidden(!modalHidden);
  };

  return (
    <div
      onClick={onCloseHandler}
      className={modalHidden ? "modal-container-hidden" : "modal-container"}
    >
      <div className="modal">
        <p className="modal-message">{message}</p>
        <input
          onClick={onCloseHandler}
          type="submit"
          className="modal-btn"
          value="OK"
        />
      </div>
    </div>
  );
};
