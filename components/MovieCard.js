import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 3;

const MovieCard = ({ movie, style }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate('Detail', { movie }); // 🎯 filme tıklayınca gönderiyoruz
  };

  return (
    <TouchableOpacity onPress={goToDetail} style={[styles.card, style]}>
      <TouchableOpacity
        onPress={() => toggleFavorite(movie)}
        style={styles.heartIcon}
      >
        <Ionicons
          name={isFavorite(movie) ? 'heart' : 'heart-outline'}
          size={26}
          color="red"
        />
      </TouchableOpacity>

      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    position: 'relative',
    marginBottom: 28,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
  },
});

export default MovieCard;
