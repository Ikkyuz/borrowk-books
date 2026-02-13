import React, { useState } from 'react'; // 1. เพิ่ม useState
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'; // 2. เพิ่ม Alert
import { Ionicons } from '@expo/vector-icons';

// ข้อมูลตั้งต้น
const initialBooks = [
  { book_id: 'B001', title: 'React Native Guide', author: 'John Doe', status: 'borrowed' },
  { book_id: 'B002', title: 'TypeScript Mastery', author: 'Jane Smith', status: 'available' },
  { book_id: 'B003', title: 'Expo Router Basics', author: 'Bob Builder', status: 'available' },
];

export default function BookListScreen() {
  // 3. ใช้ State เพื่อให้เวลากดยืมแล้วสถานะเปลี่ยนทันที
  const [books, setBooks] = useState(initialBooks);

  // 4. ฟังก์ชันจัดการการยืม
  const handleBorrow = (item) => {
    // เช็คก่อนว่ายืมได้ไหม
    if (item.status === 'borrowed') {
      Alert.alert('ไม่สามารถยืมได้', `หนังสือ "${item.title}" ถูกยืมไปแล้ว`);
      return;
    }

    // แสดง Popup ยืนยัน (คล้าย SweetAlert)
    Alert.alert('ยืนยันการยืม', `คุณต้องการยืมหนังสือ "${item.title}" ใช่หรือไม่?`, [
      {
        text: 'ยกเลิก',
        style: 'cancel',
      },
      {
        text: 'ยืนยัน',
        onPress: () => processBorrow(item.book_id), // ถ้ากดตกลง ให้ไปทำงานต่อ
      },
    ]);
  };

  // 5. ฟังก์ชันอัปเดตข้อมูลเมื่อยืนยัน
  const processBorrow = (id) => {
    // อัปเดตสถานะใน State
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.book_id === id ? { ...book, status: 'borrowed' } : book))
    );

    // แจ้งเตือนว่าสำเร็จ
    Alert.alert('สำเร็จ', 'ทำรายการยืมเรียบร้อยแล้ว');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-12 sm:px-6 lg:px-8">
        {/* หัวข้อหน้า */}
        <View className="mb-8 px-2">
          <Text className="text-3xl font-black tracking-tighter text-gray-900">หนังสือทั้งหมด</Text>
          <View className="mt-2 h-1.5 w-16 rounded-full bg-blue-600" />
        </View>

        {/* ช่องค้นหา */}
        <View className="mb-8 px-2">
          <View className="h-12 w-full flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              className="h-full flex-1 px-4 text-base text-gray-800 outline-none"
              placeholder="ค้นหาชื่อหนังสือ หรือผู้แต่ง..."
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* ตารางรายการหนังสือ */}
        <View className="w-full flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
          <View className="w-full flex-row items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
            <View className="flex-[4]">
              <Text className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                ข้อมูลหนังสือ
              </Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                ผู้แต่ง
              </Text>
            </View>
            <View className="flex-[3]">
              <Text className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                สถานะ
              </Text>
            </View>
            <View className="flex-[2]">
              <Text className="text-right text-xs font-bold uppercase tracking-widest text-gray-400">
                จัดการ
              </Text>
            </View>
          </View>

          <FlatList
            data={books} // ใช้ข้อมูลจาก State
            keyExtractor={(item) => item.book_id}
            renderItem={({ item }) => (
              <View className="w-full flex-row items-center border-b border-gray-100 px-6 py-4 hover:bg-gray-50">
                {/* 1. ชื่อหนังสือ */}
                <View className="flex-[4] pr-4">
                  <Text
                    className="text-base font-bold leading-tight text-gray-900"
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-left text-xs font-medium text-gray-400">
                    #{item.book_id}
                  </Text>
                </View>

                {/* 2. ผู้แต่ง */}
                <View className="flex-[3] pr-2">
                  <Text className="text-left text-sm font-medium text-gray-600" numberOfLines={1}>
                    {item.author}
                  </Text>
                </View>

                {/* 3. สถานะ */}
                <View className="flex-[3] items-center justify-center">
                  <View
                    className={`rounded-full px-3 py-1 ${item.status === 'available' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Text
                      className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'available' ? 'text-green-700' : 'text-orange-700'}`}>
                      {item.status === 'available' ? 'ว่าง' : 'ถูกยืม'}
                    </Text>
                  </View>
                </View>

                {/* 4. ปุ่มจัดการ */}
                <View className="flex-[2] items-end justify-center">
                  <TouchableOpacity
                    // ถ้าถูกยืมไปแล้ว ให้ปุ่มเป็นสีเทาและกดไม่ได้
                    disabled={item.status === 'borrowed'}
                    onPress={() => handleBorrow(item)} // เรียกฟังก์ชันเมื่อกด
                    className={`rounded-lg px-4 py-2 shadow-sm ${
                      item.status === 'available'
                        ? 'bg-blue-600 active:bg-blue-700' // สีปกติ
                        : 'bg-gray-300' // สีตอนถูกยืมแล้ว
                    }`}>
                    <Text className="text-xs font-bold text-white">
                      {item.status === 'available' ? 'ยืม' : 'ไม่ว่าง'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
