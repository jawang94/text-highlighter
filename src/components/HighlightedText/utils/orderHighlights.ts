const orderPhrases = (
  highlights: { startOffset: number; endOffset: number; color: string; priority: number }[],
): { startOffset: number; endOffset: number; color: string; priority: number }[] => {
  const orderedHighlights = highlights.sort((a, b) => b.priority - a.priority);

  return orderedHighlights;
};

export default orderPhrases;
