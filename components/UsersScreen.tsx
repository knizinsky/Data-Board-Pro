import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchUsers } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.card}
          onPress={() => navigation.navigate("Details", { data: user })}
        >
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={24} color="#7e57c2" />
            <Text style={styles.username}>@{user.username}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.address}>
            <Text style={styles.addressText}>
              {user.address.street}, {user.address.suite}
            </Text>
            <Text style={styles.addressText}>
              {user.address.city}, {user.address.zipcode}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: "#f6f8fa",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#7e57c2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  username: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  address: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 13,
    color: "#444",
  },
});

export default UsersScreen;
