import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const FilterModal = ({
  modalVisible,
  onClose,
  authors,
  states,
  onApplyFilter,
  onResetFilter,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const applyFilter = () => {
    onApplyFilter({ searchText, selectedAuthor, selectedState });
    onClose();
  };

  const resetFilters = () => {
    setSearchText("");
    setSelectedAuthor("");
    setSelectedState("");
    onResetFilter();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>🔍 Filtruj zadania</Text>

          <Text style={styles.label}>Szukaj po tytule</Text>
          <TextInput
            style={styles.input}
            placeholder="Wpisz fragment tytułu..."
            value={searchText}
            onChangeText={setSearchText}
          />

          <Text style={styles.label}>Wybierz autora</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedAuthor}
              onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
              style={styles.picker}
            >
              {authors.map((author) => (
                <Picker.Item
                  key={author.id}
                  label={author.name || "Wszyscy"}
                  value={author.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Stan zadania</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => setSelectedState(itemValue)}
              style={styles.picker}
            >
              {states.map((state) => (
                <Picker.Item key={state} label={state || "Wszystkie"} value={state} />
              ))}
            </Picker>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={applyFilter}>
              <Text style={styles.buttonText}>Zastosuj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetFilters}>
              <Text style={styles.buttonText}>Wyczyść</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 6,
  },
  picker: {
    height: 44,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FilterModal;
