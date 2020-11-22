import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.highlightColor};
`;

interface HighlightedTextBlockProps {
  state: { highlightColor: string; textColor: string; content: string; key: number };
}

export default function HighlightedTextBlock({
  state: { highlightColor, textColor, content, key },
}: HighlightedTextBlockProps): JSX.Element {
  return (
    <StyledSpan
      data-myid={key}
      className={`${highlightColor} ${textColor}`}
      theme={{
        highlightColor: `${highlightColor}`,
        textColor: `${textColor}`,
      }}
    >
      {content}
    </StyledSpan>
  );
}
