import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Board from "../components/Board";
import sudoku from "../sudoku";
import { addPuzzle, clearUserSavedPuzzles } from "../AsyncStorageFunctions";
import { formatPuzzle } from "../sudokuUtils";
import { useTranslation } from "react-i18next";

const CreateBoardScreen = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentDifficulty, setCurrentDifficulty] = useState("medium");
  const { t } = useTranslation();

  const handleCellChange = (row, col, newValue) => {
    const newBoard = [...board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = { ...newBoard[row][col], value: newValue };
    setBoard(newBoard);
  };

  const generatePuzzle = (difficulty) => {
    setCurrentDifficulty(difficulty);
    const generatedPuzzle = sudoku.generate(difficulty);
    console.log(generatedPuzzle);
    setBoard(formatPuzzle(generatedPuzzle));
  };

  const isBoardSolvable = () => {
    const currentPuzzleString = board
      .map((row) => row.map((cell) => cell.value || sudoku.BLANK_CHAR).join(""))
      .join("");

    return Boolean(sudoku.solve(currentPuzzleString));
  };

  const savePuzzle = async () => {
    if (!isBoardSolvable()) {
      alert(t("noSolution"));
      return;
    }

    const puzzleString = board
      .map((row) => row.map((cell) => cell.value || ".").join(""))
      .join("");
    await addPuzzle(currentDifficulty, puzzleString);
    alert(t("puzzleSaved"));
  };

  const handleClearUserSavedPuzzles = async () => {
    await clearUserSavedPuzzles();
    alert(t("clearSaved"));
  };

  return (
    <View style={styles.container}>
      <Board board={board} onCellChange={handleCellChange} isEditable={true} />
      <Button title={t("easy")} onPress={() => generatePuzzle("easy")} />
      <Button title={t("medium")} onPress={() => generatePuzzle("medium")} />
      <Button title={t("hard")} onPress={() => generatePuzzle("hard")} />
      <Button title={t("save")} onPress={savePuzzle} />
      <Button
        title={t("clearBoards")}
        onPress={handleClearUserSavedPuzzles}
        color="red"
      />
    </View>
  );
};

const createEmptyBoard = () =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({ value: "", originalEmpty: true })),
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateBoardScreen;
