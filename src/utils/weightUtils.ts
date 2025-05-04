export const weights: string[] = ['200 г', '400 г', '800 г', '1 кг'] as const;

export const weightMultipliers: Record<string, number> = {
  '200 г': 1,
  '400 г': 2,
  '800 г': 4,
  '1 кг': 5,
};

export const calculateTotalPrice = (basePrice: number, weight: string, quantity: number = 1): number => {
  if (!basePrice || !weightMultipliers[weight]) return 0;
  return basePrice * weightMultipliers[weight] * quantity;
};