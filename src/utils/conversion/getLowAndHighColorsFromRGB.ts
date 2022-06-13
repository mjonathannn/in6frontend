export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export const getLowAndHighColorsFromRGB = ({
  r,
  g,
  b,
}: RGBColor): { low: string; high: string } => {
  const low = `rgba(${r}, ${g}, ${b}, 0.1)`;
  const high = `rgb(${r}, ${g}, ${b})`;

  return {
    low,
    high,
  };
};
