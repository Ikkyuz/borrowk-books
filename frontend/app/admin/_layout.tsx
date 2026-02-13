import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AdminSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#1e293b',
        drawerActiveTintColor: '#3b82f6',
        drawerInactiveTintColor: '#94a3b8',
        // 1. ขนาด Sidebar
        drawerStyle: {
          width: 280,
          backgroundColor: '#0f172a',
        },
        // 2. ปรับแต่งรายการเมนู (ชิดซ้ายปกติ)
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 4,
          marginHorizontal: 8,
          paddingHorizontal: 12,
        },
        // 3. ปรับตัวหนังสือและระยะห่างไอคอน
        drawerLabelStyle: {
          marginLeft: 10,
          fontSize: 15,
          fontWeight: '600',
        },
      }}>
      <Drawer.Screen
        name="members"
        options={{
          title: 'รายชื่อสมาชิก',
          drawerLabel: 'จัดการสมาชิก',
          drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="add-book"
        options={{
          title: 'เพิ่มหนังสือใหม่',
          drawerLabel: 'เพิ่มหนังสือ',
          drawerIcon: ({ color }) => <Ionicons name="add-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="borrowed-list"
        options={{
          title: 'รายการยืมปัจจุบัน',
          drawerLabel: 'หนังสือที่ถูกยืม',
          drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} />,
        }}
      />
    </Drawer>
  );
}
