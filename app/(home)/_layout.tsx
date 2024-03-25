import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../context/Context";

import { Octicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const {user} = useData()
  return (
    <>
    {user &&
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.colorPink,
          headerShown: false,
        }}
      >
        
      
        <Tabs.Screen
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
          name="index"
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color }) => (
              <Octicons name="plus" size={28} color={color} />
            ),
          }}
        />
       
        <Tabs.Screen
          name="completed"
          options={{
            title: "Completed",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="done" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen name="bookmarked" options={{ href: null }} /> 
      </Tabs>
}
    </>
  );
}
