import React from "react";
import ReactJson from 'react-json-view'
import './style.css';
import Modal from 'react-modal';


export default class ReqResViewer extends React.Component {

    render() {
        const { data, visible, handleOnClose} = this.props
        return (
            <Modal
                isOpen={ visible }
                onRequestClose={ handleOnClose }
                contentLabel="Request Response Viewer"
            >
                <button onClick={handleOnClose}>close</button>
                <div className="main-container">
                    <div className="left-container">
                        <ReactJson src={data.requestMessage}
                            name={false}
                            theme={"ocean"}
                            enableClipboard={false}
                            displayDataTypes={false}
                        />
                    </div>
                    <div className="right-container">
                        <ReactJson src={data.replyMessage}
                            name={false}
                            theme={"ocean"}
                            enableClipboard={false}
                            displayDataTypes={false}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}