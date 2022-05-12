import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function NewMessageForm({ username, socket }) {
  const [content, setContent] = useState("");

  const onSend = () => {
    if (content.trim() === "") {
      return;
    }

    const message = {
      room: "React Académie",
      username,
      content: content.trim(),
      time: new Date().getTime(),
    };

    socket.emit("send_message", message);
    setContent("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Pressable style={styles.btn} disabled={content === ""} onPress={onSend}>
        <Ionicons
          name="send"
          size={24}
          color={content === "" ? "lightgrey" : "black"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
});
