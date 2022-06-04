export const reColor = (average: number): string => {
  if (average >= 0 && average < 40) {
    return "#F23200";
  }
  if (average >= 40 && average < 50) {
    return "#F2A800";
  }
  if (average >= 50 && average < 70) {
    return "#10BB48";
  }
  return "#1090BB";
};
