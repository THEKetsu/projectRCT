import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Page1 from './Page1';

interface MyAppProps {}

const MyApp: React.FC<MyAppProps> = () => {
  const [currentPage, setCurrentPage] = useState<string>('page1');
  const [pageCount, setPageCount] = useState<number>(1);
  const scrollViewRef = useRef<ScrollView>(null);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  const createNewPage = () => {
    const newPage = `page${pageCount + 1}`;
    setPageCount(pageCount + 1);
    setCurrentPage(newPage);
  };

  const pageButtons = Array.from({ length: pageCount - 1 }, (_, index) => (
    <Button
      key={`pageButton${index + 2}`}
      title={`Page ${index + 2}`}
      onPress={() => navigateToPage(`page${index + 2}`)}
    />
  ));

  useEffect(() => {
    const handleOrientationChange = () => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    };

    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Button title="Page 1" onPress={() => navigateToPage('page1')} />
        {pageButtons}
        <Button title="Nouvelle Page" onPress={createNewPage} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.pageContainer}>
          <View style={styles.pageContent}>
            {currentPage === 'page1' && pageCount === 1 && <Page1 />}
            {currentPage !== 'page1' && (
              <View>
                <Text>Contenu de la {currentPage}</Text>
              </View>
            )}
          </View>
        </View>
        {/* Additional pages go here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    width: Dimensions.get('window').width,
  },
  pageContent: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default MyApp;
