import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import profileImg from '../assets/profile.jpg';

const ProfileScreen = () => {
  const user = {
    name: 'SENA ÜZÜM',
    email: 'sena.uzum@std.yildiz.edu.tr',
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={profileImg} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,

  },
  profile: {
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
    width: 300,
    height: 600,
    alignItems:"center",
    

  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#e50914',
    marginTop:"60",
  },
    name: {
    fontSize: 30,
    color: 'white',
    marginTop:"60",
  },
    email: {
    fontSize: 20,
    color: 'white',
    marginTop:"60",
  },

});

export default ProfileScreen;
