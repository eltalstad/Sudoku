import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const InstructionsScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t("instructionsTitle")}</Text>
      <Text style={styles.text}>{t("instructionsPlay")}</Text>
      <Text style={styles.text}>{t("instructionsCreate")}</Text>
      <Text style={styles.text}>{t("instructionsChangeLanguage")}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default InstructionsScreen;
