import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import styles from '../theme/styles';

const UserListScreen = inject('store')(observer(({ store, navigation }) => {
  const { userStore } = store;

  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  const fetchMoreUsers = () => {
    if (!userStore.isLoading) {
      userStore.fetchUsers();
    }
  };

  return (
    <View style={styles.container}>
      {userStore.isLoading && userStore.users.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator" />
      ) : (
        <FlatList
          data={userStore.users}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity   testID={`user-card-${item.id}`}
              style={styles.card} 
              onPress={() => navigation.navigate('Posts', { userId: item.id })}>
              <Text style={styles.heading}>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={styles.text}>{item.company.name}</Text>
              <Text style={styles.text}>{item.email}</Text>
            </TouchableOpacity>
          )}
          onEndReached={fetchMoreUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={userStore.isLoading ? <ActivityIndicator testID="loading-indicator"  size="small" color="#0000ff" /> : null}
        />
      )}
    </View>
  );
}));

export default UserListScreen;
