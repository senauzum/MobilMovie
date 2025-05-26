import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTopRatedMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getTopRatedMovies().then((data) => {
      setMovies(data);
      setFilteredMovies(data);
    });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      {/* SearchBar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Film Ara"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  row: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start', 
    gap: 15,
  },
});

export default HomeScreen;
