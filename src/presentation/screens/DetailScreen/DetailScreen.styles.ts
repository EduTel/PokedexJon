import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
    marginVertical: 8,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
    position: 'relative',
  },
  arrowButton: {
    position: 'absolute',
    zIndex: 10,
    top: 86,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  leftArrow: {
    left: 4,
  },
  rightArrow: {
    right: 4,
  },
  arrowText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    lineHeight: 24,
    textAlign: 'center',
  },
  slideItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 18,
  },
  inactiveDot: {
    backgroundColor: colors.border,
  },
  id: {
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: '800',
    color: colors.text,
    marginTop: 4,
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  typeChip: {
    borderRadius: 16,
    paddingHorizontal: 6,
  },
  typeChipText: {
    color: colors.white,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  measurementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  measurementItem: {
    alignItems: 'center',
  },
  measurementLabel: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  measurementValue: {
    fontWeight: 'bold',
    color: colors.text,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
  },
  hiddenAbilityChip: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warning,
  },
  divider: { width: 1, height: '80%' },
});
