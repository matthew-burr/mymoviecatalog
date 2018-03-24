import React from 'react';
import styled from 'styled-components';

export const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ScrollableHorizontalLayout = HorizontalLayout.extend`
  overflow: auto;
`;

export const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScrollableVerticalLayout = VerticalLayout.extend`
  overflow: auto;
`;

export const WrappingLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ScrollableWrappingLayout = WrappingLayout.extend`
  overflow: auto;
`;

export const Label = styled.label`
  display: block;
`;

export const ShadowPanel = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const Overlay = ShadowPanel.extend`
  z-order: 1000;
  position: fixed;
  top: ${props => (props.top ? props.top : '25%')};
  left: ${props => (props.top ? props.top : '25%')};
  background-color: white;
  width: ${props => (props.width ? props.width : '50%')};
  height: ${props => (props.height ? props.height : '50%')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  display: flex;
`;

export const LabeledInput = props => (
  <div>
    <Label htmlFor={props.id}>{props.label}</Label>
    <input {...props} />
  </div>
);
