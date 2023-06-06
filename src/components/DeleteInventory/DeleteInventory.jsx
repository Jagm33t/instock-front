import closeIcon from "../../assets/Icons/close-24px.svg";
import "./DeleteInventory.scss";

function DeleteInventory() {
  return (
    <div className="deleteInventory">
      <div className="deleteInventory__closeIconContainer">
        <img src={closeIcon} alt="" />
      </div>
      <div className="deleteInventory__titleContainer">
        Delete Television inventory item?
      </div>
      <div className="deleteInventory__messageContainer">
        Please confirm that you’d like to delete Television from the inventory
        list. You won’t be able to undo this action.
      </div>
      <div className="deleteInventory__buttonContainer">
        <button className="deleteInventory__cancelButton">
          <p>Cancel</p>
        </button>
        <button className="deleteInventory__deleteButton">
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
}

export default DeleteInventory;
