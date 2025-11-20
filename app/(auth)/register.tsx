import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1 justify-center px-6'
      >
        <View className='bg-gray-900 rounded-2xl p-8 shadow-lg'>
          <Text className='text-3xl font-bold text-white mb-6 text-center'>
            Create Account
          </Text>

          <Text className='text-gray-400 mb-2'>Full Name</Text>
          <TextInput
            placeholder='Enter your full name'
            placeholderTextColor='#888'
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
          />

          <Text className='text-gray-400 mb-2'>Email</Text>
          <TextInput
            placeholder='Enter your email'
            placeholderTextColor='#888'
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Text className='text-gray-400 mb-2'>Password</Text>
          <TextInput
            placeholder='Enter your password'
            placeholderTextColor='#888'
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
            secureTextEntry
          />

          <Text className='text-gray-400 mb-2'>Confirm Password</Text>
          <TextInput
            placeholder='Confirm your password'
            placeholderTextColor='#888'
            className='bg-gray-800 text-white rounded-lg px-4 py-3 mb-4'
            secureTextEntry
          />

          <TouchableOpacity className='bg-blue-500 rounded-xl py-3 mt-3 mb-4'>
            <Text className='text-white font-semibold text-center text-lg'>Register</Text>
          </TouchableOpacity>

          {/* Already have an account link */}
          <View className='flex-row justify-center'>
            <Text className='text-gray-400'>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className='text-blue-500 font-semibold'>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
