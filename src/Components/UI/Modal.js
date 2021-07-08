import "./Modal.css";

const Modal = (props) => {
    return (
        <div
            className="modal-wrapper"
            style={{
                color: props.color,
                backgroundColor: props.bgColor,
                borderColor: props.color,
            }}
        >
            {props.children}
        </div>
    );
};

export default Modal;
