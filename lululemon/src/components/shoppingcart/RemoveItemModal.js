import "./RemoveItemModal.scss";

export const RemoveItemModal = ({ closeModal, item, handleRemoveProduct }) => {
  return (
    <div className="removeModalWrapper" onClick={closeModal}>
      <div className="removeModalContainer">
        <button className="closeModal" onClick={closeModal}>
          X
        </button>
        <h1 className="removeWord">
          Are you sure you want to remove this item from your bag?
        </h1>
        <button
          className="removeYes"
          onClick={() =>
            handleRemoveProduct(
              item.productId,
              item.id,
              item.size || null,
              item.colorId,
            )
          }
        >
          YES, REMOVE THIS ITEM
        </button>
        <button className="removeNo" onClick={closeModal}>
          No, keep this item
        </button>
      </div>
    </div>
  );
};
