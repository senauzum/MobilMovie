import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';

const DetailScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggle = () => {
    toggleFavorite(movie);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />

      {/* Başlık + Kalp */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity onPress={handleToggle} style={styles.heart}>
          <Ionicons
            name={isFavorite(movie) ? 'heart' : 'heart-outline'}
            size={40}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Puan: {movie.vote_average}</Text>
      <Text style={styles.subtitle}>Çıkış Tarihi: {movie.release_date}</Text>
      <Text style={styles.overview}>
        {movie.overview ? movie.overview : 'Açıklama bulunamadı.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 16,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 10,
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 20,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 70,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ← kalp sağa hizalanır
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 12,
  },
  heart: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  overview: {
    color: 'white',
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
});

export default DetailScreen;
