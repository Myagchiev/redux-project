export const weights = ['200 г', '400 г', '800 г', '1 кг'];

export const weightMultipliers = {
  '200 г': 1,
  '400 г': 2,
  '800 г': 4,
  '1 кг': 5,
};

export const calculateTotalPrice = (basePrice, weight, quantity = 1) => {
  if (!basePrice || !weightMultipliers[weight]) return 0;
  return basePrice * weightMultipliers[weight] * quantity;
};
