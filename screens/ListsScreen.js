import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { getMoviesByGenre, getGenres } from '../services/tmdb';
import { useNavigation } from '@react-navigation/native';


const ListsScreen = () => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('favorites');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (activeTab === 'categories') {
      getGenres().then(setGenres);
      setSelectedGenre(null); 
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedGenre) {
      getMoviesByGenre(selectedGenre).then(setGenreMovies);
    } else {
      setGenreMovies([]);
    }
  }, [selectedGenre]);

  const renderFavorites = () => {
    if (!favorites || favorites.length === 0) {
      return <Text style={styles.empty}>Hiç favori film yok.</Text>;
    }

    return (
      <FlatList
        data={favorites}
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            style={{ marginRight: 12, marginBottom: 20 }}
            onPress={() => navigation.navigate('Detail', { movie: item })}
          />
        )}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        showsVerticalScrollIndicator={false}
        key="favorites-list"
      />
    );
  };

  const renderCategorySelection = () => (
    <FlatList
      data={genres}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.genreCard}
          onPress={() => setSelectedGenre(item.id)}
        >
          <Text style={styles.genreIcon}>🎬</Text>
          <Text style={styles.genreCardText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      key="genre-list"
    />
  );


  const renderCategoryMovies = () => (
    <View>
      <TouchableOpacity onPress={() => setSelectedGenre(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <FlatList
        data={genreMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            style={{ marginRight: 12, marginBottom: 20 }}
            onPress={() => navigation.navigate('Detail', { movie: item })}
          />
        )}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        showsVerticalScrollIndicator={false}
        key="category-movies-list"
      />
    </View>
  );

  const renderCategories = () => {
    return selectedGenre ? renderCategoryMovies() : renderCategorySelection();
  };

  return (
    <View style={styles.container}>
      {/* Sekme Butonları */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'favorites' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={styles.tabText}>❤️ Favori Filmler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'categories' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('categories')}
        >
          <Text style={styles.tabText}>🎬 Kategoriler</Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {activeTab === 'favorites' ? renderFavorites() : renderCategories()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#e50914',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  verticalGenreButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  genreText: {
    color: 'white',
    fontSize: 14,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: '#e50914',
    fontSize: 16,
  },
  empty: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  genreCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 12,
  },
  genreIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  genreCardText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },

});

export default ListsScreen;
