import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

interface UseLengthProps {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
}

const useLength = ({ xs, s, m, l, xl }: UseLengthProps): number => {
  const [len, setLen] = React.useState<number>(28);
  const themeVar = useTheme();

  const onlyExtraSmall = useMediaQuery(themeVar.breakpoints.only('xs')); // 0px - 1000px
  const onlySmallScreen = useMediaQuery(themeVar.breakpoints.only('sm')); // 1000px-1420px
  const onlyMediumScreen = useMediaQuery(themeVar.breakpoints.only('md')); // 1420px - 1500px
  const onlyLargeScreen = useMediaQuery(themeVar.breakpoints.only('lg')); // 1500px - 1800px

  React.useLayoutEffect(() => {
    if (onlyExtraSmall) {
      setLen(xs);
    } else if (onlySmallScreen) {
      setLen(s);
    } else if (onlyMediumScreen) {
      setLen(m);
    } else if (onlyLargeScreen) {
      setLen(l);
    } else {
      setLen(xl);
    }
  }, [onlyExtraSmall, onlySmallScreen, onlyMediumScreen, onlyLargeScreen, xs, s, m, l, xl]);

  return len;
};

export default useLength;
