import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchPosts, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function PostsScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.card}
          onPress={() => navigation.navigate("Details", { data: post })}
        >
          <View style={styles.header}>
            <Ionicons name="document-text-outline" size={24} color="#4a90e2" />
            <Text style={styles.user}>{mapUserToId(post.userId, users)}</Text>
          </View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#4a90e2",
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
  user: {
    fontSize: 14,
    color: "#777",
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default PostsScreen;
