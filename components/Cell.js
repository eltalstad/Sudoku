import React, { useState } from "react";
import { Text, TouchableOpacity, Modal, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const Cell = ({
  value,
  onValueChange,
  editable,
  onLongPress,
  isHighlighted,
  borderStyle,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const cellStyle = editable ? styles.editableCell : styles.prefilledCell;

  const { t } = useTranslation();

  const handlePress = () => {
    if (editable) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={() => onLongPress(isHighlighted)}
      style={[
        styles.cell,
        cellStyle,
        isHighlighted ? styles.highlightedCell : {},
        borderStyle,
      ]}
    >
      <Text style={styles.cellText}>{value}</Text>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonGrid}>
              {Array.from({ length: 9 }, (_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.button, styles.numberButton]}
                  onPress={() => {
                    onValueChange(`${i + 1}`);
                    closeModal();
                  }}
                >
                  <Text style={styles.buttonLabel}>{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => {
                onValueChange("");
                closeModal();
              }}
            >
              <Text style={styles.buttonLabel}>{t("clear")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 20,
  },
  editableCell: {
    backgroundColor: "#fff",
  },
  prefilledCell: {
    backgroundColor: "#ddd",
  },
  highlightedCell: {
    backgroundColor: "#aaf",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 18,
  },
  numberButton: {
    backgroundColor: "#f0f0f0",
  },
  actionButton: {
    backgroundColor: "#e0e0e0",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  clearButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "blue",
  },
});

export default Cell;
