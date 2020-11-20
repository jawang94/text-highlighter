import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.highlightColor};
`;

interface IProps {
  state: { highlightColor: string; textColor: string; key: number };
}

export default function BasicWhitespaceBlock({
  state: { highlightColor, textColor, key },
}: IProps): JSX.Element {
  return (
    <StyledSpan
      data-myid={key}
      className={`${highlightColor} ${textColor}`}
      theme={{
        highlightColor: `${highlightColor}`,
        textColor: `${textColor}`,
      }}
    >
      {' '}
    </StyledSpan>
  );
}
