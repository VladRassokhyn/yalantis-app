import { TOrderPiece } from '../types';

export const useOrderTotals = (pieces: TOrderPiece[]) => {
  let orderTotalCount = 0;
  let orderTotalPrice = 0;
  pieces.forEach((piece) => {
    orderTotalCount += piece.count;
    orderTotalPrice += piece.product.price * piece.count;
  });
  return [orderTotalCount, orderTotalPrice];
};
