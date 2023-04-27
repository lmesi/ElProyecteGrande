export default function Delete(props) {
    const { isOpen, content, onConfirm, onClose } = props;
    return (<>
        {isOpen ?
            <div className="blackout">
                <div className="popup">
                    <h3>{content}</h3>
                    <button className="deleteButtonForPopUp" onClick={onConfirm}>Yes</button>
                    <button className="cancelButtonForPopUp" onClick={onClose}>No</button>
                </div>
            </div> : ""}</>
    );
}