export const stringReducer = (string: string | undefined, count?: number): string => {
    const maxLength = count ?? 14;
  
    let truncatedText = string?.slice(0, maxLength) || '';
  
    if (string && truncatedText.length < string.length) {
      truncatedText += '...';
    }
  
    return truncatedText;
  };
  