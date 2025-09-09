import "../styles/popup.css";

export default function Popup({ title, message, isOpen, onClose }) {
  if (!isOpen) return null; // no renderiza si está cerrado

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}