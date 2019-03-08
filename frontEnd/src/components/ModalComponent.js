import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50,
    overflow: "visible"
}

const modalStyle = {

    backgroundColor: '#fff',
    borderRadius: 5,
    margin: '0 auto',
    padding: 30,
    position: "relative",
    overflow: 'hidden', overflowY: 'auto',
    width: 750,
    height: 650,

};

const footerStyle = {
    position: "absolute",
    bottom: 20
};

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }


    onKeyUp = (e) => {
        // Lookout for ESC key (27)
        if (e.which === 27 && this.props.show) {
            this.onClose(e);
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
        modalRoot.removeChild(this.el);
    }

    render() {



        const modalUI = (
            <div style={backdropStyle}  >
                <div style={modalStyle}>
                    {this.props.children}
                    <div style={footerStyle}>

                    </div>
                </div>
            </div>
        );
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal(
            modalUI,
            this.el,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}