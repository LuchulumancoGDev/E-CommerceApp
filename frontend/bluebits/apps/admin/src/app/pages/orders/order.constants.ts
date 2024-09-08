export const ORDER_STATUS: { [key: number]: { label: string; color: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' } } = {
  0: { label: 'Pending', color: 'info' },
  1: { label: 'Processed', color: 'warning' },
  2: { label: 'Shipped', color: 'warning' },
  3: { label: 'Delivered', color: 'success' },
  4: { label: 'Failed', color: 'danger' }
};
