import React from 'react';
import { View, Text } from 'react-native';
import { Member } from '../types/library';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
          <Text className="text-blue-600 font-bold text-lg">
            {member.full_name.charAt(0)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{member.full_name}</Text>
          <Text className="text-gray-600">Username: {member.username}</Text>
          <View className="flex-row mt-1">
            <View className={`px-2 py-0.5 rounded ${member.role === 'admin' ? 'bg-purple-100' : 'bg-gray-100'}`}>
              <Text className={`text-xs font-medium ${member.role === 'admin' ? 'text-purple-700' : 'text-gray-700'}`}>
                {member.role.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-gray-400 text-xs">ID: {member.member_id}</Text>
      </View>
    </View>
  );
}
