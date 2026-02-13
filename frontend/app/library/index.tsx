import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { bookApi, borrowingApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchBooks = async () => {
    try {
      const response = await bookApi.getAll();
      setBooks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId: number) => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to borrow books');
      return;
    }
    try {
      await borrowingApi.borrow({ memberId: user.id, bookId });
      Alert.alert('Success', 'Book borrowed successfully');
      fetchBooks();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Borrowing failed');
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-gray-600">Author: {item.author || 'N/A'}</Text>
            <Text className={`mt-2 font-medium ${item.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {item.status}
            </Text>
            
            {item.status === 'available' && (
              <TouchableOpacity 
                className="bg-blue-500 mt-3 p-2 rounded"
                onPress={() => handleBorrow(item.id)}
              >
                <Text className="text-white text-center">Borrow</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
