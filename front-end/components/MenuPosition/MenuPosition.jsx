import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import PositionJoueur from './PositionJoueur.jsx';
import { styles } from './style.js';

export default function MenuPosition() {
  const [currentPage, setCurrentPage] = useState('page1');
  const [pageCount, setPageCount] = useState(1);
  const scrollViewRef = useRef();
  const window = useWindowDimensions();

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const createNewPage = () => {
    const newPage = `page${pageCount + 1}`;
    setPageCount(pageCount + 1);
    setCurrentPage(newPage);
  };

  const pageButtons = Array.from({ length: pageCount - 1 }, (_, index) => (
    <Button key={`pageButton${index + 2}`} title={`Page ${index + 2}`} onPress={() => navigateToPage(`page${index + 2}`)} />
  ));

  useEffect(() => {
    console.log("SALUT");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navigation}>
        <Button title="Page 1" onPress={() => navigateToPage('page1')} />
        {pageButtons}
        <Button title="Nouvelle Page" onPress={createNewPage} />
      </ScrollView>

      {/* <View style={styles.pageContainer}>
        <View style={styles.pageContent}>
          {currentPage === 'page1' && pageCount === 1 && <PositionJoueur />}
          {currentPage !== 'page1' && (
            <View>
              <Text>Contenu de la {currentPage}</Text>
            </View>
          )}
        </View>
      </View> */}
    </View>
  );
};
