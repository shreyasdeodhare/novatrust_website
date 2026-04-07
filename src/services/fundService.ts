import { supabase } from './supabaseClient';
import * as chitFundCalc from '../utils/chitFundCalculations';

export interface ChitFund {
  id: string;
  name: string;
  total_amount: number;
  duration_months: number;
  monthly_contribution: number;
  start_date: string;
  created_at: string;
  created_by: string;
}

export interface ChitFundMember {
  id: string;
  chit_fund_id: string;
  user_id: string;
  joined_at: string;
  user?: {
    full_name: string;
    email: string;
    phone: string;
  };
}

export interface Payment {
  id: string;
  chit_fund_id: string;
  user_id: string;
  amount: number;
  payment_date: string;
  month_number: number;
  status: 'pending' | 'paid' | 'overdue';
  created_at: string;
}

export interface Auction {
  id: string;
  chit_fund_id: string;
  month_number: number;
  auction_date: string;
  winner_id: string | null;
  winning_bid: number | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  winner?: {
    full_name: string;
    email: string;
  };
}

export interface Dividend {
  month_number: number;
  amount: number;
}

export interface UserFundBalance {
  totalAmount: number;
  monthlyContribution: number;
  durationMonths: number;
  completedMonths: number;
  totalPaid: number;
  remainingAmount: number;
  progressPercentage: number;
  hasWon: boolean;
  winMonth: number | null;
  prizeMoneyReceived: number;
  bidAmount: number;
  netPosition: number;
  dividends: Dividend[];
  netMonthlyPayments: number[];
  projectedFinalPosition: number;
  foremanCommission: number;
  netChitAmount: number;
}

// Create a new chit fund
export const createChitFund = async (chitFundData: Omit<ChitFund, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('chit_funds')
      .insert([
        {
          ...chitFundData,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, chitFund: data[0] };
  } catch (error) {
    console.error('Error creating chit fund:', error);
    return { success: false, error };
  }
};

// Get all chit funds for a user
export const getUserChitFunds = async (userId: string) => {
  try {
    // Get chit funds created by the user
    const { data: createdFunds, error: createdError } = await supabase
      .from('chit_funds')
      .select('*')
      .eq('created_by', userId);

    if (createdError) throw createdError;

    // Get chit funds the user is a member of
    const { data: memberFunds, error: memberError } = await supabase
      .from('chit_fund_members')
      .select(`
        id,
        joined_at,
        chit_funds (*)
      `)
      .eq('user_id', userId);

    if (memberError) throw memberError;

    // Combine and deduplicate the results
    const memberFundsData = memberFunds.map((member: any) => member.chit_funds);
    const allFunds = [...createdFunds, ...memberFundsData];

    // Remove duplicates based on id
    const uniqueFunds = Array.from(
      new Map(allFunds.map(fund => [fund.id, fund])).values()
    );

    return { success: true, chitFunds: uniqueFunds };
  } catch (error) {
    console.error('Error getting user chit funds:', error);
    return { success: false, error };
  }
};

// Get a single chit fund by ID
export const getChitFundById = async (fundId: string) => {
  try {
    const { data, error } = await supabase
      .from('chit_funds')
      .select('*')
      .eq('id', fundId)
      .single();

    if (error) throw error;

    return { success: true, chitFund: data };
  } catch (error) {
    console.error('Error getting chit fund:', error);
    return { success: false, error };
  }
};

// Get members of a chit fund
export const getChitFundMembers = async (fundId: string) => {
  try {
    const { data, error } = await supabase
      .from('chit_fund_members')
      .select(`
        *,
        users (
          id,
          full_name,
          email,
          phone
        )
      `)
      .eq('chit_fund_id', fundId);

    if (error) throw error;

    // Format the response
    const members = data.map((member: any) => ({
      id: member.id,
      chit_fund_id: member.chit_fund_id,
      user_id: member.user_id,
      joined_at: member.joined_at,
      user: member.users,
    }));

    return { success: true, members };
  } catch (error) {
    console.error('Error getting chit fund members:', error);
    return { success: false, error };
  }
};

// Add a member to a chit fund
export const addChitFundMember = async (fundId: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('chit_fund_members')
      .insert([
        {
          chit_fund_id: fundId,
          user_id: userId,
          joined_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, member: data[0] };
  } catch (error) {
    console.error('Error adding chit fund member:', error);
    return { success: false, error };
  }
};

// Get payments for a chit fund
export const getChitFundPayments = async (fundId: string, userId?: string) => {
  try {
    let query = supabase
      .from('payments')
      .select('*')
      .eq('chit_fund_id', fundId);

    // If userId is provided, filter by user
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('month_number', { ascending: true });

    if (error) throw error;

    return { success: true, payments: data };
  } catch (error) {
    console.error('Error getting chit fund payments:', error);
    return { success: false, error };
  }
};

// Record a payment
export const recordPayment = async (paymentData: Omit<Payment, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          ...paymentData,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, payment: data[0] };
  } catch (error) {
    console.error('Error recording payment:', error);
    return { success: false, error };
  }
};

// Get auctions for a chit fund
export const getChitFundAuctions = async (fundId: string) => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .select(`
        *,
        users (
          id,
          full_name,
          email
        )
      `)
      .eq('chit_fund_id', fundId)
      .order('month_number', { ascending: true });

    if (error) throw error;

    // Format the response
    const auctions = data.map((auction: any) => ({
      id: auction.id,
      chit_fund_id: auction.chit_fund_id,
      month_number: auction.month_number,
      auction_date: auction.auction_date,
      winner_id: auction.winner_id,
      winning_bid: auction.winning_bid,
      status: auction.status,
      winner: auction.users,
    }));

    return { success: true, auctions };
  } catch (error) {
    console.error('Error getting chit fund auctions:', error);
    return { success: false, error };
  }
};

// Schedule an auction
export const scheduleAuction = async (auctionData: Omit<Auction, 'id' | 'winner_id' | 'winning_bid'>) => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .insert([auctionData])
      .select();

    if (error) throw error;

    return { success: true, auction: data[0] };
  } catch (error) {
    console.error('Error scheduling auction:', error);
    return { success: false, error };
  }
};

// Record auction result
export const recordAuctionResult = async (auctionId: string, winnerId: string, winningBid: number) => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .update({
        winner_id: winnerId,
        winning_bid: winningBid,
        status: 'completed',
      })
      .eq('id', auctionId)
      .select();

    if (error) throw error;

    return { success: true, auction: data[0] };
  } catch (error) {
    console.error('Error recording auction result:', error);
    return { success: false, error };
  }
};

// Get user payment summary
export const getUserPaymentSummary = async (userId: string, fundId: string) => {
  try {
    // Get the chit fund details
    const { data: fundData, error: fundError } = await supabase
      .from('chit_funds')
      .select('*')
      .eq('id', fundId)
      .single();

    if (fundError) throw fundError;

    // Get all payments made by the user for this fund
    const { data: paymentsData, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('chit_fund_id', fundId)
      .eq('user_id', userId)
      .eq('status', 'paid');

    if (paymentsError) throw paymentsError;

    // Calculate total paid
    const totalPaid = paymentsData.reduce((sum, payment) => sum + payment.amount, 0);

    // Calculate remaining amount
    const totalAmount = fundData.total_amount;
    const remainingAmount = totalAmount - totalPaid;

    // Calculate progress percentage
    const progressPercentage = (totalPaid / totalAmount) * 100;

    return {
      success: true,
      summary: {
        totalAmount,
        totalPaid,
        remainingAmount,
        progressPercentage,
        monthlyContribution: fundData.monthly_contribution,
        durationMonths: fundData.duration_months,
        completedMonths: paymentsData.length,
        remainingMonths: fundData.duration_months - paymentsData.length,
      },
    };
  } catch (error) {
    console.error('Error getting user payment summary:', error);
    return { success: false, error };
  }
};

// Get detailed user fund balance with all calculations
export const getUserFundBalance = async (userId: string, fundId: string) => {
  try {
    // Get the chit fund details
    const { data: fundData, error: fundError } = await supabase
      .from('chit_funds')
      .select('*')
      .eq('id', fundId)
      .single();

    if (fundError) throw fundError;

    // Get all payments made by the user for this fund
    const { data: paymentsData, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('chit_fund_id', fundId)
      .eq('user_id', userId)
      .order('month_number', { ascending: true });

    if (paymentsError) throw paymentsError;

    // Get all auctions for this fund
    const { auctions, error: auctionsError } = await getChitFundAuctions(fundId);

    if (auctionsError) throw auctionsError;

    const totalAmount = fundData.total_amount;
    const durationMonths = fundData.duration_months;
    const monthlyContribution = fundData.monthly_contribution;
    const completedMonths = paymentsData.filter(p => p.status === 'paid').length;

    // Calculate foreman's commission
    const foremanCommission = chitFundCalc.calculateForemanCommission(totalAmount);

    // Calculate net chit amount
    const netChitAmount = chitFundCalc.calculateNetChitAmount(totalAmount);

    // Check if user has won an auction
    const wonAuction = auctions?.find(a => a.winner_id === userId && a.status === 'completed');
    const hasWon = !!wonAuction;
    const winMonth = hasWon ? wonAuction.month_number : null;
    const bidAmount = hasWon ? (wonAuction.winning_bid || 0) : 0;

    // Calculate prize money received if user has won
    const prizeMoneyReceived = hasWon
      ? chitFundCalc.calculatePrizeMoney(totalAmount, bidAmount)
      : 0;

    // Calculate dividends for each month based on auction results
    const dividends: Dividend[] = [];
    const netMonthlyPayments: number[] = [];

    for (let i = 1; i <= completedMonths; i++) {
      const monthAuction = auctions?.find(a => a.month_number === i && a.status === 'completed');

      if (monthAuction && monthAuction.winning_bid) {
        const dividend = chitFundCalc.calculateDividend(
          totalAmount,
          monthAuction.winning_bid,
          durationMonths
        );

        dividends.push({
          month_number: i,
          amount: dividend
        });

        const netMonthlyPayment = chitFundCalc.calculateNetMonthlyPayment(
          totalAmount,
          monthAuction.winning_bid,
          durationMonths
        );

        netMonthlyPayments.push(netMonthlyPayment);
      } else {
        // If no auction result for this month, assume no dividend
        dividends.push({
          month_number: i,
          amount: 0
        });

        netMonthlyPayments.push(monthlyContribution);
      }
    }

    // Calculate total paid using the actual net monthly payments
    const totalPaid = netMonthlyPayments.reduce((sum, payment) => sum + payment, 0);

    // Calculate remaining amount
    const remainingAmount = chitFundCalc.calculateRemainingBalance(
      totalAmount,
      durationMonths,
      completedMonths,
      dividends.map(d => d.amount),
      hasWon,
      prizeMoneyReceived
    );

    // Calculate net position
    const netPosition = chitFundCalc.calculateNetPosition(
      totalAmount,
      durationMonths,
      completedMonths,
      dividends.map(d => d.amount),
      hasWon,
      prizeMoneyReceived,
      bidAmount
    );

    // Calculate progress percentage
    const progressPercentage = (completedMonths / durationMonths) * 100;

    // Project future dividends based on average of past dividends
    const avgDividend = dividends.length > 0
      ? dividends.reduce((sum, d) => sum + d.amount, 0) / dividends.length
      : 0;

    const projectedDividends = Array(durationMonths - completedMonths).fill(avgDividend);

    // Calculate projected final position
    const projectedFinalPosition = chitFundCalc.calculateProjectedFinalPosition(
      totalAmount,
      durationMonths,
      completedMonths,
      dividends.map(d => d.amount),
      projectedDividends,
      hasWon,
      prizeMoneyReceived,
      bidAmount,
      // Assume user will bid at average bid amount if they haven't won yet
      !hasWon ? ((auctions?.filter(a => a.winning_bid) ?? []).reduce((sum, a) => sum + (a.winning_bid || 0), 0) /
                ((auctions?.filter(a => a.winning_bid) ?? []).length || 1)) : 0,
      // Assume user will win in the middle of remaining months if they haven't won yet
      !hasWon ? Math.round(completedMonths + (durationMonths - completedMonths) / 2) : 0
    );

    const balance: UserFundBalance = {
      totalAmount,
      monthlyContribution,
      durationMonths,
      completedMonths,
      totalPaid,
      remainingAmount,
      progressPercentage,
      hasWon,
      winMonth,
      prizeMoneyReceived,
      bidAmount,
      netPosition,
      dividends,
      netMonthlyPayments,
      projectedFinalPosition,
      foremanCommission,
      netChitAmount
    };

    return {
      success: true,
      balance
    };
  } catch (error) {
    console.error('Error getting user fund balance:', error);
    return { success: false, error };
  }
};
