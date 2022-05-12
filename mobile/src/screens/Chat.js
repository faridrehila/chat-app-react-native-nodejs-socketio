import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Message from "../components/Message";
import NewMessageForm from "../components/NewMessageForm";

// Socket.io config
const socket = io("http://192.168.178.53:4000");

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Room connection
    socket.emit("join_room", "React Académie");
    // Messages => envoie + reception
    socket.on("new_message", (data) => {
      console.log("message recu", data);
      setMessages((current) => {
        return [...current, data];
      });
    });
  }, []);

  const renderItem = ({ item }) => {
    return <Message username={username} message={item} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      scrollEnabled
      style={styles.keyboard}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
      />
      <NewMessageForm username={username} socket={socket} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    paddingBottom: 10,
  },
  flatList: {
    paddingHorizontal: 20,
  },
});
