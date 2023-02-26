import styled from "styled-components";

export const Typography = styled.h3.attrs(props => ({
  // we can define static props,
  type: "number",
  size: props.size || "16px"

  // or we can define dynamic ones
}))`

height: 14px;
left: 459px;
top: 85px;

font-family: 'Montserrat';
font-style: normal;
font-weight: 700;
font-size: ${props => props.size};
line-height: 14px;
color: #F5F5F5;
`
