import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#3b82f6',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'หนังสือ',
          tabBarLabel: 'Books',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: 'สมาชิก',
          tabBarLabel: 'Members',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="borrowings"
        options={{
          title: 'การยืม-คืน',
          tabBarLabel: 'Borrowing',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
