import React, { useState } from "react";
import { View, Button, Modal, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const HomeScreen = ({ navigation }) => {
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <View>
      <Button title={t("play")} onPress={() => navigation.navigate("Play")} />
      <Button
        title={t("create")}
        onPress={() => navigation.navigate("CreateBoard")}
      />
      <Button
        title={t("instructionsTitle")}
        onPress={() => navigation.navigate("Instructions")}
      />
      <Button
        title={t("changeLanguage")}
        onPress={() => setLanguageModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Button
            title={t("english")}
            onPress={() => {
              i18n.changeLanguage("en");
              setLanguageModalVisible(false);
            }}
          />
          <Button
            title={t("norwegian")}
            onPress={() => {
              i18n.changeLanguage("no");
              setLanguageModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;
