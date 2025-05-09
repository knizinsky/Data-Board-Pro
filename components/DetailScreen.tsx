import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const route = useRoute();
  const { data } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Szczegóły</Text>
      {Object.entries(data || {}).map(([key, value]) => (
        <Text key={key} style={styles.item}>
          <Text style={styles.label}>{key}:</Text> {JSON.stringify(value)}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: { fontSize: 16, marginBottom: 8 },
  label: { fontWeight: "bold" },
});
