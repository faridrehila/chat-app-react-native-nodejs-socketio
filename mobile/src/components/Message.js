import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Message({ message, username }) {
  return (
    <View
      style={{
        alignSelf: username == message.username ? "flex-end" : "flex-start",
      }}
    >
      <Text
        style={[
          styles.content,
          {
            backgroundColor:
              username == message.username ? "lightgreen" : "lightgrey",
          },
        ]}
      >
        {message.content}
      </Text>
      <Text style={styles.username}>{message.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
