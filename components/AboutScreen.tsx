import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🪪 Magazyn danych 🪪</Text>
      <Text style={styles.text}>Autor: Konrad Niziński</Text>
      <Text style={styles.text}>Technologie: React Native + Expo</Text>
      <Text style={styles.text}>
        Źródło danych: jsonplaceholder.typicode.com
      </Text>
      <Text style={styles.text}>Wersja: 1.0.0</Text>
      <Text style={styles.text}>Rok: 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
});
