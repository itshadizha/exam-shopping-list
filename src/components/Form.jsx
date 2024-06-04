import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPurchase } from "../redux/slices/purcheseThunk";
import styled from "styled-components";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    quantity: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

   
    let hasErrors = false;
    if (!formData.name) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasErrors = true;
    }
    if (formData.price <= 0) {
      setErrors((prev) => ({ ...prev, price: true }));
      hasErrors = true;
    }
    if (formData.quantity <= 0) {
      setErrors((prev) => ({ ...prev, quantity: true }));
      hasErrors = true;
    }

    if (!hasErrors) {
      dispatch(addPurchase(formData));
      setFormData({
        name: "",
        price: 0,
        quantity: 0,
      });
    }
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
          isInvalid={errors.name}
        />
        {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          value={formData.price}
          name="price"
          onChange={handleChange}
          isInvalid={errors.price}
        />
        {errors.price && <ErrorMessage>Price must be greater than 0</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          isInvalid={errors.quantity}
        />
        {errors.quantity && <ErrorMessage>Quantity must be greater than 0</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit">Add</SubmitButton>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.isInvalid ? "#dc3545" : "#ccc")};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #5710a3;
  }
`;

const ErrorMessage = styled.p`
  color: #8635dc;
  font-size: 14px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  background-color: #8635dc;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #8c00b3;
  }
`;