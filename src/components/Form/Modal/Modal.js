import "./Modal.css"

const Modal = ({ onClose }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Дякуємо за замовлення</h3>
        <p>Наш оператор скоро з вами зв'яжеться</p>
        <button className="modal-button" onClick={onClose}>На головну</button>
      </div>
    </div>
  );
};

export default Modal;
