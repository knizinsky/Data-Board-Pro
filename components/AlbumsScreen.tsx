import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { fetchAlbums, fetchUsers } from "../api/api";
import { mapUserToId } from "../utilities/utils";
import styles from "../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AlbumsScreen() {
  const navigation = useNavigation();

  const openPhotos = (albumId: any, userId: any) => {
    navigation.navigate("Photos", { albumId, userId });
  };

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {albums.map((album) => (
            <TouchableOpacity
              style={styles.albumCard}
              key={album.id}
              onPress={() => openPhotos(album.id, album.userId)}
            >
              <View>
                <Text style={styles.albumTitle}>{album.id}</Text>
                <Text
                  style={[
                    styles.albumTitle,
                    {
                      fontWeight: "600",
                      color: "#007bff",
                    },
                  ]}
                >
                  {album.title}
                </Text>
                <Text style={styles.albumArtist}>
                  {mapUserToId(album.userId, users)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default AlbumsScreen;
