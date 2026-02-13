import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import UserSidebar from '../../components/UserSidebar';

export default function UserLayout() {
  return (
    <Drawer
      drawerContent={(props) => <UserSidebar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: '#eff6ff',
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#64748b',
        // 1. ขนาด Sidebar
        drawerStyle: {
          width: 280,
          backgroundColor: 'white',
        },
        // 2. ปรับแต่งรายการเมนูให้สวยงาม (ชิดซ้ายปกติ)
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
        name="books"
        options={{
          title: 'รายการหนังสือ',
          drawerLabel: 'หน้าหลัก',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="borrow"
        options={{
          title: 'ทำรายการยืม',
          drawerLabel: 'ยืมหนังสือ',
          drawerIcon: ({ color }) => <Ionicons name="add-circle-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="return"
        options={{
          title: 'ทำรายการคืน',
          drawerLabel: 'คืนหนังสือ',
          drawerIcon: ({ color }) => (
            <Ionicons name="return-up-back-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          title: 'ประวัติการใช้งาน',
          drawerLabel: 'ประวัติ',
          drawerIcon: ({ color }) => <Ionicons name="time-outline" size={22} color={color} />,
        }}
      />
    </Drawer>
  );
}
