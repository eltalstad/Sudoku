import AsyncStorage from "@react-native-async-storage/async-storage";

const initialPuzzles = {
  easy: [
    "9.621.7.3..173.86.7.39..142..918632.3.257948.8.5.23917..439..7.19.65.2.46......91",
  ],
  medium: [
    "5.3.67298...9.5.34.9.....151.9..25.76.5179.427326541.9......4......4.95...4...8..",
  ],
  hard: [
    "...7.9......6.17.83.7...94.4...7....8.2.9....7..3....917...359..2.9..87.9.8..7...",
  ],
};

export const initializePuzzles = async () => {
  try {
    for (const difficulty in initialPuzzles) {
      const storedPuzzles = await AsyncStorage.getItem(difficulty);
      if (!storedPuzzles) {
        await AsyncStorage.setItem(
          difficulty,
          JSON.stringify(initialPuzzles[difficulty]),
        );
      }
    }
  } catch (error) {
    console.error("Error initializing puzzles:", error);
  }
};

export const addPuzzle = async (difficulty, puzzle) => {
  try {
    const existingPuzzles =
      JSON.parse(await AsyncStorage.getItem(difficulty)) || [];
    existingPuzzles.push(puzzle);
    await AsyncStorage.setItem(difficulty, JSON.stringify(existingPuzzles));
  } catch (error) {
    console.error("Error adding puzzle:", error);
  }
};

export const getPuzzle = async (difficulty) => {
  try {
    const puzzles = JSON.parse(await AsyncStorage.getItem(difficulty)) || [];
    if (puzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * puzzles.length);
      return puzzles[randomIndex];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    return null;
  }
};

export const clearUserSavedPuzzles = async () => {
  try {
    for (const difficulty in initialPuzzles) {
      await AsyncStorage.setItem(
        difficulty,
        JSON.stringify(initialPuzzles[difficulty]),
      );
    }
    console.log("User-saved puzzles cleared, initial puzzles restored.");
  } catch (error) {
    console.error("Error clearing user-saved puzzles:", error);
  }
};
