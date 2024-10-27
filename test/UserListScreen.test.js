import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'mobx-react';
import UserListScreen from '../app/screens/UserListScreen';
import store from '../app/models/RootStore';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      users: [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', company: { name: 'Company A' } },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', company: { name: 'Company B' } },
      ],
    },
  })),
}));

describe('UserListScreen', () => {
  beforeEach(() => {
    store.userStore.reset();
  });

  it('renders loading indicator initially', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserListScreen />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();

    await waitFor(() => expect(store.userStore.users.length).toBeGreaterThan(0));
  });

  it('displays a list of users', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserListScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Doe')).toBeTruthy();
    });
  });

  it('navigates to UserPostsScreen on user press', async () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <UserListScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByText('John Doe'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('Posts', { userId: 1 });
  });
});
