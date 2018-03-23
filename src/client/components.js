import React from 'react';
import styled from 'styled-components';

export const Label = styled.label`
  display: block;
`;
export const Overlay = styled.div`
  z-order: 1000;
  position: fixed;
  top: 25%;
  left: 25%;
  background-color: white;
  width: 50%;
  height: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
`;
export const LabeledInput = props => (
  <div>
    <Label htmlFor={props.id}>{props.label}</Label>
    <input {...props} />
  </div>
);
