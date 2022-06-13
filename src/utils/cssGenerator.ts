export type IFontSize = 14 | 16 | 18 | 24 | 32;

export interface CssGeneratorProps {
  weight: 400 | 500 | 700;
  fontSize: IFontSize;
  letterSpacing: 0.75 | 1;
  lineHeight: IFontSize;
}

export const cssGenerator = ({
  weight,
  fontSize,
  letterSpacing,
  lineHeight,
}: CssGeneratorProps): string => {
  const styles = [
    `font-weight: ${weight};`,
    `font-size: ${fontSize}px;`,
    `letter-spacing: ${letterSpacing}px;`,
    `line-height: ${lineHeight}px;`,
  ];

  return styles.join('');
};
