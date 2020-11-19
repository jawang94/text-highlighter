import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.highlightColor};
`;

interface IProps {
  state: { highlightColor: string; textColor: string; content: string; key: number };
}

export default function HighlightedTextBlock({
  state: { highlightColor, textColor, content, key },
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
      {content}{' '}
    </StyledSpan>
  );
}
