import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Board from "../components/Board";
import { getPuzzle } from "../AsyncStorageFunctions";
import { formatPuzzle } from "../sudokuUtils";
import sudoku from "../sudoku";
import { useTranslation } from "react-i18next";

const PlayScreen = () => {
  const [board, setBoard] = useState([]);
  const [puzzle, setPuzzle] = useState("");
  const [highlightedCells, setHighlightedCells] = useState([]);
  const { t } = useTranslation();

  const handleDifficultySelect = async (difficulty) => {
    const fetchedPuzzle = await getPuzzle(difficulty);
    if (fetchedPuzzle) {
      setPuzzle(fetchedPuzzle);
      const formattedBoard = formatPuzzle(fetchedPuzzle);
      setBoard(formattedBoard);
    } else {
      console.error("No puzzle found for difficulty:", difficulty);
    }
  };

  const handleCellChange = (row, col, newValue) => {
    const newBoard = [...board];
    if (newBoard[row] && newBoard[row][col]) {
      newBoard[row][col] = { ...newBoard[row][col], value: newValue };
      setBoard(newBoard);
    }

    const rows = puzzle.match(/.{1,9}/g);
    if (rows) {
      rows[row] =
        rows[row].substring(0, col) + newValue + rows[row].substring(col + 1);
      setPuzzle(rows.join(""));
    }
  };

  const handleCellLongPress = (row, col) => {
    setHighlightedCells((prevHighlightedCells) => {
      const isAlreadyHighlighted = prevHighlightedCells.some(
        (cell) => cell.row === row && cell.col === col,
      );

      if (isAlreadyHighlighted) {
        return prevHighlightedCells.filter(
          (cell) => cell.row !== row || cell.col !== col,
        );
      } else {
        return [...prevHighlightedCells, { row, col }];
      }
    });
  };

  const isBoardSolved = () => {
    const currentPuzzleString = board
      .map((row) => row.map((cell) => cell.value || sudoku.BLANK_CHAR).join(""))
      .join("");

    if (currentPuzzleString.includes(sudoku.BLANK_CHAR)) {
      return false;
    }

    const solution = sudoku.solve(currentPuzzleString);
    return solution === currentPuzzleString;
  };

  return (
    <View style={styles.container}>
      <View style={styles.difficultyButtons}>
        <Button
          title={t("easy")}
          onPress={() => handleDifficultySelect("easy")}
        />
        <Button
          title={t("medium")}
          onPress={() => handleDifficultySelect("medium")}
        />
        <Button
          title={t("hard")}
          onPress={() => handleDifficultySelect("hard")}
        />
      </View>
      {puzzle && (
        <Board
          board={board}
          onCellChange={handleCellChange}
          isEditable={false}
          highlightedCells={highlightedCells}
          onCellLongPress={handleCellLongPress}
        />
      )}
      <Button
        title={t("checkSolution")}
        onPress={() => {
          if (isBoardSolved()) {
            alert(t("solved"));
          } else {
            alert(t("notSolved"));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  difficultyButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default PlayScreen;
