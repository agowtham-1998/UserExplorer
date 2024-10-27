import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'mobx-react';
import UserPostsScreen from '../app/screens/UserPostsScreen';
import store from '../app/models/RootStore';

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('/posts')) {
      return Promise.resolve({
        data: {
          posts: [
            { id: 1, title: 'Post 1', body: 'This is the first post.' },
            { id: 2, title: 'Post 2', body: 'This is the second post.' },
          ],
        },
      });
    }
    return Promise.reject(new Error('Not Found'));
  }),
}));

describe('UserPostsScreen', () => {
  beforeEach(() => {
    store.postStore.reset();
  });

  it('renders loading indicator initially', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserPostsScreen route={{ params: { userId: 1 } }} />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays a list of posts', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserPostsScreen route={{ params: { userId: 1 } }} />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Post 1')).toBeTruthy();
      expect(getByText('This is the first post.')).toBeTruthy();
      expect(getByText('Post 2')).toBeTruthy();
      expect(getByText('This is the second post.')).toBeTruthy();
    });
  });
});
