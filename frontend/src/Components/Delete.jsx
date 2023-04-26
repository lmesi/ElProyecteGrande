export default function Delete(props) {
    const { isOpen, content, onConfirm, onClose } = props;
    return (<>
        {isOpen ?
            <div>
                <h3>{content}</h3>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div> : ""}</>
    );
}