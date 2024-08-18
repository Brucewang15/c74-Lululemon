import "./ShippingAddressList.css";
import { EditAddressModal } from "./EditAddressModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressList,
  selectAnAddress,
} from "../../redux/actions/authAction";
import { useState } from "react";

export const ShippingAddressList = ({ addressList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");
  const selectedAddress = useSelector(
    (state) => state.authReducer.selectedAddress,
  );

  const handleSelectAddress = (addressId) => {
    dispatch(selectAnAddress(addressId));
    dispatch(fetchAddressList(userId));
  };

  // handle open edit modal
  const handleOpenEditModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shippingAddressContainer">
      {addressList &&
        addressList.length !== 0 &&
        addressList.map((address, index) => {
          return (
            <div key={index} className="midContainer">
              <label className="addressOption">
                <input
                  type="radio"
                  name="shippingAddress"
                  value={address.id}
                  className="radioInput"
                  onChange={() => handleSelectAddress(address.id)}
                />
                <div className="addressDetails">
                  <div className="name">
                    {address.firstName} {address.lastName}
                  </div>
                  <div>{address.address}</div>
                  <div>
                    {address.city}, {address.province} {address.postalCode}
                  </div>
                  <div>{`${address.phoneNumber.slice(0, 3)}-${address.phoneNumber.slice(3 - 6)}-${address.phoneNumber.slice(-4)}`}</div>
                </div>
              </label>
              <div
                onClick={() => {
                  handleOpenEditModal();
                  handleSelectAddress(address.id);
                }}
                className="edit"
              >
                Edit
              </div>
              {/*<div>{selectedAddress && JSON.stringify(selectedAddress)}</div>*/}
            </div>
          );
        })}
      {isModalOpen && (
        <EditAddressModal
          selectedAddress={selectedAddress}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </div>
  );
};
