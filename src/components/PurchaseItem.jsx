import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePurchase, updatePurchase } from "../redux/slices/purcheseThunk";
import styled from "styled-components";

const PurchaseItem = ({ _id, name, price, quantity }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({
    name,
    price,
    quantity,
  });
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const dispatch = useDispatch();

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        break;
      case 'price':
        if (value <= 0) {
          return 'Price must be greater than zero';
        }
        break;
      case 'quantity':
        if (value <= 0) {
          return 'Quantity must be greater than zero';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormData({
      ...updatedFormData,
      [name]: value,
    });
    const error = validate(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSaveChanges = () => {
    const newErrors = {
      name: validate('name', updatedFormData.name),
      price: validate('price', updatedFormData.price),
      quantity: validate('quantity', updatedFormData.quantity),
    };
    if (!newErrors.name && !newErrors.price && !newErrors.quantity) {
      dispatch(updatePurchase({ id: _id, data: updatedFormData }));
      setIsEditMode(false);
    } else {
      setErrors(newErrors);
    }
  };

  const deletePurchaseHandler = () => {
    dispatch(deletePurchase(_id));
  };

  return (
    <ItemContainer>
      {isEditMode ? (
        <>
          <InputContainer>
            <Header>Name:</Header>
            <StyledInput
              type="text"
              name="name"
              value={updatedFormData.name}
              onChange={handleInputChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Header>Price:</Header>
            <StyledInput
              type="number"
              name="price"
              value={updatedFormData.price}
              onChange={handleInputChange}
            />
            {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Header>Quantity:</Header>
            <StyledInput
              type="number"
              name="quantity"
              value={updatedFormData.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && <ErrorMessage>{errors.quantity}</ErrorMessage>}
          </InputContainer>
          <ButtonContainer>
            <StyledButton onClick={handleSaveChanges} disabled={errors.name || errors.price || errors.quantity}>
              Save
            </StyledButton>
            <StyledButton onClick={() => setIsEditMode(false)}>Cancel</StyledButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <DataContainer>
            <Header>Name:</Header>
            <StyledValue>{name}</StyledValue>
          </DataContainer>
          <DataContainer>
            <Header>Price:</Header>
            <StyledValue>{price}</StyledValue>
          </DataContainer>
          <DataContainer>
            <Header>Quantity:</Header>
            <StyledValue>{quantity}</StyledValue>
          </DataContainer>
          <ButtonContainer>
            <StyledButton onClick={() => setIsEditMode(true)}>Edit</StyledButton>
            <StyledButton onClick={deletePurchaseHandler}>Delete</StyledButton>
          </ButtonContainer>
        </>
      )}
    </ItemContainer>
  );
};

export default PurchaseItem;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Header = styled.p`
  font-weight: bold;
  margin-right: 8px;
`;

const StyledValue = styled.p`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  background-color: #6013b1;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #420b7c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-left: 8px;
`;
