import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalElement = (props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = () =>
            setTimeout(() => {
                console.log(setTimeout);
                setVisible(false);
            }, [props.timer || 3000]);
        console.log("useEffect!");
        timer();

        return () => clearTimeout(timer);
    }, [props.timer]);

    return (
        visible && (
            <div
                className="modal-wrapper"
                style={{
                    color: props.color || "#8026d9",
                    backgroundColor: props.bgColor || "#e8d4fb",
                    border: `1px solid ${props.color || "#b58cde"}`,
                }}
            >
                {props.children}
            </div>
        )
    );
};

const Modal = (props) => {
    return ReactDOM.createPortal(
        <ModalElement {...props} />,
        document.getElementById("modal-container")
    );
};

export default Modal;
