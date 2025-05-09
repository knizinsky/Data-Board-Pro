import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const route = useRoute();
  const { data } = route.params || {};

  const renderValue = (value: any) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item, index) => (
          <Text key={index} style={styles.nestedItem}>
            • {JSON.stringify(item)}
          </Text>
        ));
      } else {
        return Object.entries(value).map(([k, v]) => (
          <View key={k} style={styles.nestedContainer}>
            <Text style={styles.nestedLabel}>{k}:</Text>
            <Text style={styles.nestedValue}>
              {typeof v === "object" ? JSON.stringify(v) : String(v)}
            </Text>
          </View>
        ));
      }
    }
    return <Text style={styles.valueText}>{String(value)}</Text>;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Szczegóły rekordu</Text>
      {Object.entries(data || {}).map(([key, value]) => (
        <View key={key} style={styles.itemBox}>
          <Text style={styles.label}>{key}</Text>
          {renderValue(value)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f6f8fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  itemBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#4a90e2",
  },
  valueText: {
    fontSize: 15,
    color: "#444",
  },
  nestedContainer: {
    marginLeft: 8,
    marginBottom: 4,
  },
  nestedLabel: {
    fontWeight: "600",
    color: "#777",
  },
  nestedValue: {
    fontSize: 14,
    color: "#333",
  },
  nestedItem: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
});
