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

const FilterModal = ({ modalVisible, onClose, todos, authors, states }) => {
  console.log("Authors:", states);
  console.log("Authors:", authors);
  const [searchText, setSearchText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedState, setSelectedState] = useState("");

  function applyFilter() {
    throw new Error("Not implemented yet");
  }

  function resetFilters() {
    throw new Error("Not implemented yet");
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.fullScreenView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filter Options</Text>
          <Text style={styles.textLabels}>Search by text</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search text"
          />
          <Text style={styles.textLabels}>Select todo Author</Text>
          <Picker
            selectedValue={selectedAuthor}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedAuthor(itemValue)
            }
          >
            {authors.map((author) => (
              <Picker.Item
                key={author.id}
                label={author.name}
                value={author.id}
              />
            ))}
          </Picker>
          <Text style={styles.textLabels}>Select todo state</Text>
          <Picker
            selectedValue={selectedState}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedState(itemValue)
            }
          >
            {states.map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              applyFilter(selectedAuthor, selectedState);
            }}
          >
            <Text style={styles.textStyle}>Apply filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              resetFilters();
            }}
          >
            <Text style={styles.textStyle}>Reset filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    padding: 35,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    margin: 12,
  },
  button: {
    width: 100,
    margin: 10,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textLabels: {
    color: "black",
    fontWeight: "bold",
    left: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FilterModal;
