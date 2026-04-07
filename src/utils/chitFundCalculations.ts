/**
 * Utility functions for chit fund calculations
 */

/**
 * Calculate the monthly contribution amount
 * @param totalAmount Total chit fund amount
 * @param durationMonths Total duration in months
 * @returns Monthly contribution amount
 */
export const calculateMonthlyContribution = (
  totalAmount: number,
  durationMonths: number
): number => {
  return Math.round(totalAmount / durationMonths);
};

/**
 * Calculate the foreman's commission
 * @param totalAmount Total chit fund amount
 * @param commissionRate Commission rate (default: 5%)
 * @returns Foreman's commission amount
 */
export const calculateForemanCommission = (
  totalAmount: number,
  commissionRate: number = 5
): number => {
  return (totalAmount * commissionRate) / 100;
};

/**
 * Calculate the net chit amount (after deducting foreman's commission)
 * @param totalAmount Total chit fund amount
 * @param commissionRate Commission rate (default: 5%)
 * @returns Net chit amount
 */
export const calculateNetChitAmount = (
  totalAmount: number,
  commissionRate: number = 5
): number => {
  const commission = calculateForemanCommission(totalAmount, commissionRate);
  return totalAmount - commission;
};

/**
 * Calculate the dividend amount for a specific month
 * @param totalAmount Total chit fund amount
 * @param bidAmount Winning bid amount for the month
 * @param durationMonths Total duration in months
 * @param commissionRate Commission rate (default: 5%)
 * @returns Dividend amount per subscriber
 */
export const calculateDividend = (
  totalAmount: number,
  bidAmount: number,
  durationMonths: number,
  commissionRate: number = 5
): number => {
  const netChitAmount = calculateNetChitAmount(totalAmount, commissionRate);
  const dividend = (bidAmount - calculateForemanCommission(totalAmount, commissionRate)) / durationMonths;
  return Math.round(dividend);
};

/**
 * Calculate the net monthly payment (monthly contribution minus dividend)
 * @param totalAmount Total chit fund amount
 * @param bidAmount Winning bid amount for the month
 * @param durationMonths Total duration in months
 * @param commissionRate Commission rate (default: 5%)
 * @returns Net monthly payment
 */
export const calculateNetMonthlyPayment = (
  totalAmount: number,
  bidAmount: number,
  durationMonths: number,
  commissionRate: number = 5
): number => {
  const monthlyContribution = calculateMonthlyContribution(totalAmount, durationMonths);
  const dividend = calculateDividend(totalAmount, bidAmount, durationMonths, commissionRate);
  return monthlyContribution - dividend;
};

/**
 * Calculate the prize money for the auction winner
 * @param totalAmount Total chit fund amount
 * @param bidAmount Winning bid amount
 * @param commissionRate Commission rate (default: 5%)
 * @returns Prize money amount
 */
export const calculatePrizeMoney = (
  totalAmount: number,
  bidAmount: number,
  commissionRate: number = 5
): number => {
  const netChitAmount = calculateNetChitAmount(totalAmount, commissionRate);
  return netChitAmount - bidAmount;
};

/**
 * Calculate the total amount paid by a subscriber
 * @param monthlyContribution Monthly contribution amount
 * @param completedMonths Number of months completed
 * @param dividends Array of dividend amounts for each month
 * @returns Total amount paid
 */
export const calculateTotalPaid = (
  monthlyContribution: number,
  completedMonths: number,
  dividends: number[]
): number => {
  let totalPaid = 0;
  
  for (let i = 0; i < completedMonths; i++) {
    const dividend = dividends[i] || 0;
    totalPaid += (monthlyContribution - dividend);
  }
  
  return totalPaid;
};

/**
 * Calculate the remaining balance for a subscriber
 * @param totalAmount Total chit fund amount
 * @param durationMonths Total duration in months
 * @param completedMonths Number of months completed
 * @param dividends Array of dividend amounts for each month
 * @param hasWon Whether the subscriber has won an auction
 * @param prizeMoneyReceived Prize money received if won
 * @returns Remaining balance
 */
export const calculateRemainingBalance = (
  totalAmount: number,
  durationMonths: number,
  completedMonths: number,
  dividends: number[],
  hasWon: boolean = false,
  prizeMoneyReceived: number = 0
): number => {
  const monthlyContribution = calculateMonthlyContribution(totalAmount, durationMonths);
  const totalPaid = calculateTotalPaid(monthlyContribution, completedMonths, dividends);
  
  // If the subscriber has won, subtract the prize money received
  const remainingBalance = hasWon 
    ? totalAmount - totalPaid - prizeMoneyReceived 
    : totalAmount - totalPaid;
  
  return Math.max(0, remainingBalance);
};

/**
 * Calculate the net position (profit/loss) for a subscriber
 * @param totalAmount Total chit fund amount
 * @param durationMonths Total duration in months
 * @param completedMonths Number of months completed
 * @param dividends Array of dividend amounts for each month
 * @param hasWon Whether the subscriber has won an auction
 * @param prizeMoneyReceived Prize money received if won
 * @param bidAmount Bid amount if won
 * @returns Net position (positive for profit, negative for loss)
 */
export const calculateNetPosition = (
  totalAmount: number,
  durationMonths: number,
  completedMonths: number,
  dividends: number[],
  hasWon: boolean = false,
  prizeMoneyReceived: number = 0,
  bidAmount: number = 0
): number => {
  const monthlyContribution = calculateMonthlyContribution(totalAmount, durationMonths);
  const totalPaid = calculateTotalPaid(monthlyContribution, completedMonths, dividends);
  
  if (hasWon) {
    // If won, net position is prize money received minus total paid
    return prizeMoneyReceived - totalPaid;
  } else {
    // If not won yet, net position is negative of total paid
    return -totalPaid;
  }
};

/**
 * Calculate the projected final position at the end of the chit fund
 * @param totalAmount Total chit fund amount
 * @param durationMonths Total duration in months
 * @param currentMonth Current month
 * @param dividends Array of dividend amounts for each month
 * @param projectedDividends Array of projected dividend amounts for future months
 * @param hasWon Whether the subscriber has won an auction
 * @param prizeMoneyReceived Prize money received if won
 * @param bidAmount Bid amount if won
 * @param projectedBidAmount Projected bid amount if planning to win
 * @param projectedWinMonth Projected month to win (0 if not planning to win)
 * @returns Projected final position
 */
export const calculateProjectedFinalPosition = (
  totalAmount: number,
  durationMonths: number,
  currentMonth: number,
  dividends: number[],
  projectedDividends: number[],
  hasWon: boolean = false,
  prizeMoneyReceived: number = 0,
  bidAmount: number = 0,
  projectedBidAmount: number = 0,
  projectedWinMonth: number = 0
): number => {
  const monthlyContribution = calculateMonthlyContribution(totalAmount, durationMonths);
  
  // Calculate total paid so far
  const totalPaidSoFar = calculateTotalPaid(monthlyContribution, currentMonth, dividends);
  
  // Calculate projected payments for remaining months
  let projectedRemainingPayments = 0;
  for (let i = currentMonth; i < durationMonths; i++) {
    const projectedDividend = projectedDividends[i - currentMonth] || 0;
    projectedRemainingPayments += (monthlyContribution - projectedDividend);
  }
  
  // Calculate total projected payments
  const totalProjectedPayments = totalPaidSoFar + projectedRemainingPayments;
  
  // Calculate projected final position
  let projectedFinalPosition = -totalProjectedPayments;
  
  // If already won, add prize money received
  if (hasWon) {
    projectedFinalPosition += prizeMoneyReceived;
  } 
  // If planning to win in a future month
  else if (projectedWinMonth > currentMonth && projectedWinMonth <= durationMonths) {
    const projectedPrizeMoney = calculatePrizeMoney(totalAmount, projectedBidAmount);
    projectedFinalPosition += projectedPrizeMoney;
  }
  
  return projectedFinalPosition;
};
