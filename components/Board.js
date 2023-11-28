import React from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";
import { formatPuzzle } from "../sudokuUtils";

const Board = ({
  puzzle,
  board,
  onCellChange,
  isEditable,
  highlightedCells = [],
  onCellLongPress = (row, col) => {},
}) => {
  const formattedBoard = puzzle ? formatPuzzle(puzzle) : board;

  return (
    <View style={styles.board}>
      {formattedBoard.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            const isHighlighted = highlightedCells.some(
              (highlightedCell) =>
                highlightedCell.row === rowIndex &&
                highlightedCell.col === colIndex,
            );

            const borderStyle = {};
            if (colIndex === 2 || colIndex === 5) {
              borderStyle.borderRightWidth = 2;
              borderStyle.borderRightColor = "black";
            }
            if (rowIndex === 2 || rowIndex === 5) {
              borderStyle.borderBottomWidth = 2;
              borderStyle.borderBottomColor = "black";
            }

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value}
                onValueChange={(newValue) =>
                  onCellChange(rowIndex, colIndex, newValue)
                }
                editable={isEditable ? true : cell.originalEmpty}
                isHighlighted={isHighlighted}
                onLongPress={() => onCellLongPress(rowIndex, colIndex)}
                borderStyle={borderStyle}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  thickBorderRight: {
    borderRightWidth: 3,
    borderRightColor: "black",
  },
  thickBorderBottom: {
    borderBottomWidth: 3,
    borderBottomColor: "black",
  },
});

export default Board;
