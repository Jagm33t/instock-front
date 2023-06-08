import closeIcon from "../../assets/icons/close-24px.svg";
import "./DeleteInventory.scss";

function DeleteInventory(props) {
  return (
    <div className="popUp">
      <div className="deleteInventory">
        <div className="deleteInventory__closeIconContainer">
          <img src={closeIcon} alt="" onClick={props.closeModal} />
        </div>
        <div className="deleteInventory__titleContainer">
          Delete {props.selectedInventory && props.selectedInventory.item_name}{" "}
          inventory item?
        </div>
        <div className="deleteInventory__messageContainer">
          Please confirm that you’d like to delete{" "}
          {props.selectedInventory && props.selectedInventory.item_name} from
          the inventory list. <br id="hideLineBreak"></br>
          You won’t be able to undo this action.
        </div>
        <div className="deleteInventory__buttonContainer">
          <button
            className="deleteInventory__cancelButton"
            onClick={props.closeModal}
          >
            Cancel
          </button>
          <button
            className="deleteInventory__deleteButton"
            onClick={props.confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteInventory;
