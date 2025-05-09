import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchPhotosForAlbum, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";
import { useNavigation } from "@react-navigation/native";

function PhotosScreen() {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const route = useRoute();
  const { albumId, userId } = route.params as {
    albumId: number;
    userId: number;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (albumId) {
          fetchPhotosForAlbum(albumId).then((data) => setPhotos(data));
          fetchUsers().then((usersData) => setUsers(usersData));
        } else {
          Alert.alert(
            "Error",
            "Please select specific album to view photos.",
            [
              {
                text: "Cancel",
                onPress: () => navigation.navigate("Albums"),
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              onDismiss: () => navigation.navigate("Albums"),
            }
          );
        }
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {photos.map((photo) => (
            <View style={styles.photoContainer} key={photo.id}>
              <Text
                style={[
                  styles.photoTitle,
                  {
                    color: "black",
                    marginTop: 0,
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                ]}
              >
                Album {photo.albumId}
              </Text>
              <Image
                source={{ uri: `https://picsum.photos/seed/${photo.id}/150` }}
                style={styles.photoThumbnail}
              />

              <Text style={styles.photoTitle}>{photo.title}</Text>
              <Text style={styles.photoUser}>{mapUserToId(userId, users)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    width: "90%",
    flexDirection: "column",
    padding: 12,
    margin: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoThumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  photoTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#007bff",
  },
  photoUser: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },
});

export default PhotosScreen;
