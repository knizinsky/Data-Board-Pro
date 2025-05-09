import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchPhotosForAlbum, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";

function PhotosScreen() {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { albumId, userId } = route.params as {
    albumId: number;
    userId: number;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (albumId) {
          const [photoData, userData] = await Promise.all([
            fetchPhotosForAlbum(albumId),
            fetchUsers(),
          ]);
          setPhotos(photoData);
          setUsers(userData);
          setLoading(false);
        } else {
          Alert.alert("Brak albumu", "Wybierz album, aby zobaczyć zdjęcia.", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu zdjęć:", error);
      }
    };

    fetchData();
  }, []);

  const numColumns = 2;
  const imageSize = Dimensions.get("window").width / numColumns - 24;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#03a9f4" />
        <Text style={{ marginTop: 12, fontSize: 16 }}>Ładowanie zdjęć...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {photos.map((photo) => (
        <View key={photo.id} style={styles.card}>
          <Image
            source={{ uri: `https://picsum.photos/seed/${photo.id}/300` }}
            style={[styles.image, { width: imageSize, height: imageSize }]}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {photo.title}
            </Text>
            <Text style={styles.meta}>Autor: {mapUserToId(userId, users)}</Text>
            <Text style={styles.albumId}>Album #{photo.albumId}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f6f8fa",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f6f8fa",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    width: "48%",
    elevation: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  albumId: {
    fontSize: 11,
    color: "#999",
    fontStyle: "italic",
  },
});

export default PhotosScreen;
