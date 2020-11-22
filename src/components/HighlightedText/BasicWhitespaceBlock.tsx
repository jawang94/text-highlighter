import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.highlightColor};
`;

interface BasicWhitespaceBlockProps {
  state: { highlightColor: string; textColor: string; key: number | string };
}

export default function BasicWhitespaceBlock({
  state: { highlightColor, textColor, key },
}: BasicWhitespaceBlockProps): JSX.Element {
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
