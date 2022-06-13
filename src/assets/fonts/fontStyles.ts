import { cssGenerator, CssGeneratorProps, IFontSize } from 'utils';

const RegularPropsGenerator = (fontSize: IFontSize): CssGeneratorProps => ({
  fontSize,
  letterSpacing: 0.75,
  lineHeight: fontSize,
  weight: 400,
});

const defaultRegular14Props = RegularPropsGenerator(14);
export const Regular14Styles = cssGenerator(defaultRegular14Props);
export const Medium14Styles = cssGenerator({
  ...defaultRegular14Props,
  weight: 500,
});
export const Bold14Styles = cssGenerator({
  ...defaultRegular14Props,
  weight: 700,
});

const defaultRegular16Props = RegularPropsGenerator(16);
export const Regular16Styles = cssGenerator(defaultRegular16Props);
export const Medium16Styles = cssGenerator({
  ...defaultRegular16Props,
  weight: 500,
});
export const Bold16Styles = cssGenerator({
  ...defaultRegular16Props,
  weight: 700,
});

export const Bold18Styles = cssGenerator({
  fontSize: 18,
  lineHeight: 18,
  letterSpacing: 0.75,
  weight: 700,
});

export const Regular24Styles = cssGenerator(RegularPropsGenerator(24));
export const Bold32Styles = cssGenerator({
  fontSize: 32,
  letterSpacing: 1,
  lineHeight: 32,
  weight: 700,
});
