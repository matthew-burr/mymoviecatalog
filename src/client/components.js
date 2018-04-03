import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const STANDARD_BOX_SHADOW =
  '0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.24)';

const STANDARD_TEXT_SHADOW = '2px 2px 4px #000000';

const STANDARD_RED = 'rgb(200, 0, 0)';

export const Layout = styled.div`
  display: flex;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  overflow: ${props => (props.scrollable ? 'auto' : 'hidden')};
  flex-wrap: ${props => (props.wrapping ? 'wrap' : 'nowrap')};
  flex-grow: 1;
`;

export const Label = styled.label`
  display: block;
  margin-top: 1em;
`;

export const ShadowPanel = styled.div`
  box-shadow: ${STANDARD_BOX_SHADOW};
`;

export const Overlay = ShadowPanel.extend`
  z-order: 1000;
  position: fixed;
  top: ${props => (props.top ? props.top : '25%')};
  left: ${props => (props.top ? props.top : '25%')};
  background-color: white;
  width: ${props => (props.width ? props.width : '50%')};
  height: ${props => (props.height ? props.height : '50%')};
  padding: 20px;
  display: flex;
  border: 1px solid rgb(20, 20, 20);
`;

export const StyledLink = styled(Link)`
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  font-size: ${props => props.size || '100px'};
  color: ${props => props.color || 'black'};
  text-shadow: ${props => (props.hasShadow ? STANDARD_TEXT_SHADOW : '')};
`;

export const Input = styled.input`
  border: 1px solid ${props => (props.borderColor ? props.borderColor : 'gray')};
  border-radius: 5px;
  height: 2.5em;
  width: ${props => (props.inputWidth ? props.inputWidth : '100%')};
  padding-left: 0.5em;
`;

export const Button = styled.input.attrs({
  type: 'button',
})`
  border: 1px solid ${props => (props.borderColor ? props.borderColor : 'gray')};
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  background-color: ${STANDARD_RED};
  color: white;
  font-size: 1em;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonLink = styled(Link)`
  border: 1px solid ${props => (props.borderColor ? props.borderColor : 'gray')};
  display: inline-block;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  background-color: ${STANDARD_RED};
  color: white;
  text-decoration: none;
  padding: 5px;
  box-shadow: ${STANDARD_BOX_SHADOW};
`;

export const LabeledInput = props => (
  <div>
    <Label htmlFor={props.id}>{props.label}</Label>
    <Input {...props} />
  </div>
);
