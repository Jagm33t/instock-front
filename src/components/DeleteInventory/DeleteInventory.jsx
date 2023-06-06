function DeleteInventory() {
  return (
    <div>
      <div>
        {" "}
        <img src="../../assets/Icons/close-24px.svg" alt="" /> X{" "}
      </div>
      <div>
        <h1>Delete Television inventory item?</h1>
      </div>
      <div>
        Please confirm that you’d like to delete Television from the inventory
        list. You won’t be able to undo this action.
      </div>
      <div>
        <button>
          <p>Cancel</p>
        </button>
        <button>
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
}
