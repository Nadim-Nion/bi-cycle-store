export const ORDER_STATUS_ARR = [
  'pending',
  'paid',
  'shipped',
  'completed',
  'cancelled',
] as const;

export const orderSearchableFields = ['quantity', 'totalPrice', 'status'];
