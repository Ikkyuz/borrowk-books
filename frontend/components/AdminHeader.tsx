import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  variant?: 'dark' | 'primary';
  rightElement?: React.ReactNode;
}

export default function AdminHeader({
  title,
  subtitle,
  iconName = 'book',
  variant = 'dark',
  rightElement,
}: AdminHeaderProps) {
  const navigation = useNavigation();

  const bgClass = variant === 'primary' ? 'bg-blue-600' : 'bg-slate-900';
  const iconBgClass = variant === 'primary' ? 'bg-blue-500' : 'bg-slate-800';
  const menuBtnClass =
    variant === 'primary' ? 'bg-blue-500/50' : 'bg-slate-800 border border-slate-700';

  return (
    <View className={`${bgClass} rounded-b-[40px] px-6 pb-16 pt-14 shadow-2xl`}>
      <View className="mx-auto w-full max-w-5xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className={`${menuBtnClass} mr-4 rounded-xl p-2`}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
            <View>
              <Text className="text-2xl font-bold text-white">{title}</Text>
              <Text className="text-xs font-medium uppercase tracking-wider text-slate-300/80">
                {subtitle}
              </Text>
            </View>
          </View>

          {rightElement ? (
            rightElement
          ) : (
            <View
              className={`${iconBgClass} rounded-2xl p-3 ${variant === 'primary' ? 'shadow-inner' : 'border border-slate-700'}`}>
              <Ionicons name={iconName} size={24} color="white" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
