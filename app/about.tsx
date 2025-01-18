import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="white" />

      <View style={styles.containerTitle}>
        <Text style={styles.text}>About This App</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.paragraph}>
          Hey there! 👋 I’m <Text style={styles.bold}>Saer</Text>, and I just
          want to say thank you for checking out my app! 🎉
        </Text>
        <Text style={styles.paragraph}>
          I build apps as a hobby because I genuinely love it. 💻 It’s such a
          fun way to keep practicing, learning, and creating things that I hope
          can help people with tasks, habits, or just make life a little easier.
          Building apps is something I truly enjoy, but it’s also about the
          journey and everything I learn along the way. 🚀
        </Text>
        <Text style={styles.paragraph}>
          I really hope you enjoy this app and find it useful. 🙌 If you have
          any thoughts, whether it’s feedback, ideas, or suggestions, I’d love
          to hear them. 💡 Your input helps me improve the app, make it more
          user-friendly, and grow as a developer.
        </Text>
        <Text style={styles.paragraph}>
          Thanks again for being here. It really means a lot! ❤️
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  containerTitle: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    padding: 20,
    alignItems: "flex-start",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});
