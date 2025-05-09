import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchAlbums, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function AlbumsScreen() {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumData, usersData] = await Promise.all([
          fetchAlbums(),
          fetchUsers(),
        ]);
        setAlbums(albumData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const openPhotos = (albumId: number, userId: number) => {
    navigation.navigate("Photos", { albumId, userId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {albums.map((album) => (
        <TouchableOpacity
          key={album.id}
          style={styles.card}
          onPress={() => openPhotos(album.id, album.userId)}
        >
          <View style={styles.header}>
            <Ionicons name="albums-outline" size={22} color="#03a9f4" />
            <Text style={styles.user}>{mapUserToId(album.userId, users)}</Text>
          </View>
          <Text style={styles.albumId}>📀 Album #{album.id}</Text>
          <Text style={styles.albumTitle}>{album.title}</Text>
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
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#03a9f4",
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
    marginLeft: 8,
    color: "#555",
    fontSize: 14,
  },
  albumId: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#444",
    marginBottom: 4,
  },
  albumTitle: {
    fontSize: 16,
    color: "#333",
  },
});

export default AlbumsScreen;
