import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchTodos, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { useNavigation } from "@react-navigation/native";

function TodosScreen() {
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => setModalVisible(!modalVisible);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todosData, usersData] = await Promise.all([
          fetchTodos(),
          fetchUsers(),
        ]);
        setTodos(todosData);
        setFilteredTodos(todosData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleApplyFilter = ({ searchText, selectedAuthor, selectedState }) => {
    let filtered = todos;

    if (searchText.trim()) {
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedAuthor && selectedAuthor !== -1) {
      filtered = filtered.filter((todo) => todo.userId === selectedAuthor);
    }

    if (selectedState && selectedState !== " ") {
      const isDone = selectedState === "Done";
      filtered = filtered.filter((todo) => todo.completed === isDone);
    }

    setFilteredTodos(filtered);
  };

  const handleResetFilter = () => {
    setFilteredTodos(todos);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f8fa" }}>
      <TouchableOpacity style={styles.filterIcon} onPress={toggleModal}>
        <Ionicons name="filter" size={28} color="#444" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredTodos.map((todo) => (
          <TouchableOpacity
            key={todo.id}
            style={[
              styles.todoCard,
              { borderLeftColor: todo.completed ? "#4caf50" : "#2196f3" },
            ]}
            onPress={() => navigation.navigate("Details", { data: todo })}
          >
            <View style={styles.todoHeader}>
              <Ionicons
                name={todo.completed ? "checkmark-done-circle" : "time"}
                size={24}
                color={todo.completed ? "#4caf50" : "#ff9800"}
              />
              <Text style={styles.statusText}>
                {todo.completed ? "Zakończone" : "W trakcie"}
              </Text>
            </View>
            <Text style={styles.todoTitle}>{todo.title}</Text>
            <Text style={styles.todoAuthor}>
              Autor: {mapUserToId(todo.userId, users)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FilterModal
        modalVisible={modalVisible}
        onClose={toggleModal}
        authors={[{ id: -1, name: "Wszyscy" }, ...users.map((u) => ({ id: u.id, name: u.name }))]}
        states={[" ", "Done", "In Progress"]}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  filterIcon: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  todoCard: {
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  todoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    color: "#555",
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  todoAuthor: {
    fontSize: 14,
    color: "#777",
  },
});

export default TodosScreen;
