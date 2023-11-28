export const formatPuzzle = (puzzleString) => {
  return puzzleString.match(/.{1,9}/g).map((row) =>
    row.split("").map((value) => ({
      value: value === "." ? "" : value,
      originalEmpty: value === ".",
    })),
  );
};
