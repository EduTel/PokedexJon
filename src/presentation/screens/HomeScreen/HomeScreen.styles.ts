import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '800',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 32,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  footerText: {
    color: colors.textSecondary,
  },
  endMessage: {
    textAlign: 'center',
    color: colors.textSecondary,
    paddingVertical: 24,
  },
});
