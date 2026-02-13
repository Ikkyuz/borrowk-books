import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import "../global.css";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerShadowVisible: false,
          headerTintColor: '#1e293b',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#f8fafc' } // Light gray background
        }}
      >
        <Stack.Screen name="index" options={{ title: 'หน้าแรก' }} />
        <Stack.Screen name="auth/login" options={{ title: 'เข้าสู่ระบบ' }} />
        <Stack.Screen name="auth/register" options={{ title: 'สมัครสมาชิก' }} />
        <Stack.Screen name="auth/admin-login" options={{ title: 'ผู้ดูแลระบบ' }} />
        <Stack.Screen name="user" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
