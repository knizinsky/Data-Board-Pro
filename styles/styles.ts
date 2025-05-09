import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  albumArtist: {
    fontSize: 14,
    color: "#666", // Medium gray for artist text
    marginTop: 4, // Space from the title
    textAlign: "center",
  },
  albumCard: {
    width: "90%", // 90% of the screen width
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff", // Add a white background
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 3, // Elevation for Android
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark grey for better readability // Space from the top
    marginBottom: 4, // Space to the next element
    textAlign: "center", // Center-align text
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 320,
  },
  content: {
    margin: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterIcon: {
    position: "absolute",
    top: -40,
    right: 20,
    backgroundColor: "transparent",
    zIndex: 999,
  },
});

export default styles;
