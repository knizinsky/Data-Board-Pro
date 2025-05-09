import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🪪 DataBoardPro</Text>
      <View style={styles.card}>
        <Text style={styles.label}>👨‍💻 Autor:</Text>
        <Text style={styles.value}>Konrad Niziński</Text>

        <Text style={styles.label}>🛠 Technologie:</Text>
        <Text style={styles.value}>React Native + Expo</Text>

        <Text style={styles.label}>🌐 Źródło danych:</Text>
        <Text style={styles.value}>jsonplaceholder.typicode.com</Text>

        <Text style={styles.label}>📦 Wersja:</Text>
        <Text style={styles.value}>1.0.0</Text>

        <Text style={styles.label}>📅 Rok:</Text>
        <Text style={styles.value}>2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f0f4f8",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
});
