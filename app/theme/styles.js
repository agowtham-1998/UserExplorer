import { StyleSheet } from 'react-native';

const colors = {
  background: '#f5f5f5',
  white: '#fff',
  primary: '#007bff',
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  error: '#ff4d4d',
};

const fontSizes = {
  large: 18,
  medium: 16,
  small: 14,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 10,
    marginHorizontal:5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  text: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.medium,
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
});
