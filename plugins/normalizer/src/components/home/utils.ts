export const getColorKey = ({
  r,
  g,
  b,
  a = 1,
  variable,
}: {
  r: number;
  g: number;
  b: number;
  a?: number;
  variable?: {
    id: string;
    type: string;
  };
}) => {
  return variable
    ? `${variable?.id}-${Math.round(r)}-${Math.round(g)}-${Math.round(b)}-${a}`
    : `${Math.round(r)}-${Math.round(g)}-${Math.round(b)}-${a}`;
};
