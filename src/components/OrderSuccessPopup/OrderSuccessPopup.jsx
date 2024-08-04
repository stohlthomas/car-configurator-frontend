import './OrderSuccessPopup.css';

const OrderSuccessPopup = (props) => {
    return (
        <div className="background">
        <div className="popup">
            <h2>Bestellung abgeschlossen!</h2>
            <p>
                Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
            </p>
            <button
                className="button"
                onClick={props.onReset}
            >Neu starten
            </button>
        </div>
        </div>
    );
}

export default OrderSuccessPopup;