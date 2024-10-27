import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
import styles from '../theme/styles';

const UserPostsScreen = inject('store')(observer(({ store, route }) => {
  const { userId } = route.params;
  const { postStore } = store;

  useEffect(() => {
    postStore.reset();
    postStore.fetchPosts(userId);
  }, [userId]);

  const fetchMorePosts = () => {
    if (!postStore.isLoading) {
      postStore.fetchPosts(userId);
    }
  };

  return (
    <View style={styles.container}>
      {postStore.isLoading && postStore.posts.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator" />
      ) : (
        <FlatList
          data={postStore.posts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text testID={`post-title-${item.id}`} style={styles.heading}>{item.title}</Text>
              <Text testID={`post-body-${item.id}`}style={styles.text}>{item.body}</Text>
            </View>
          )}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={postStore.isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}
    </View>
  );
}));

export default UserPostsScreen;
