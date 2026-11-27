import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Order } from '../types';

export type PaymentSubmissionStatus = 'pending' | 'approved' | 'rejected';
export type PaymentSubmissionType = 'order' | 'save_to_buy';

export interface PaymentSubmission {
  id: string;
  customerUid: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  paymentType: PaymentSubmissionType;
  status: PaymentSubmissionStatus;
  receiptUrl: string;
  receiptPublicId?: string;
  orderId?: string;
  orderNumber?: string;
  planId?: string;
  planNumber?: string;
  createdAt?: Timestamp;
  reviewedAt?: Timestamp;
  reviewNote?: string;
}

export async function submitOrderBankTransfer(
  customerUid: string,
  order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'orderStatus'>,
  receipt: { secureUrl: string; publicId: string }
) {
  const orderNumber = `IBUS-${order.deliveryAddress.state.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderRef = doc(collection(db, 'orders'));
  const paymentRef = doc(collection(db, 'paymentSubmissions'));
  const now = new Date();
  const orderRecord = {
    ...order,
    id: orderRef.id,
    customerUid,
    orderNumber,
    date: now.toISOString().replace('T', ' ').slice(0, 16),
    orderStatus: 'pending_payment',
    paymentStatus: 'pending',
    paymentMethod: 'bank_transfer'
  };

  await runTransaction(db, async (transaction) => {
    transaction.set(orderRef, orderRecord);
    transaction.set(paymentRef, {
      customerUid,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      amount: order.total,
      paymentType: 'order',
      status: 'pending',
      receiptUrl: receipt.secureUrl,
      receiptPublicId: receipt.publicId,
      orderId: orderRef.id,
      orderNumber,
      createdAt: serverTimestamp()
    });
  });

  return { orderId: orderRef.id, orderNumber, paymentId: paymentRef.id };
}

export async function approveOrRejectPayment(
  payment: PaymentSubmission,
  decision: 'approved' | 'rejected',
  adminUid: string,
  reviewNote = ''
) {
  const paymentRef = doc(db, 'paymentSubmissions', payment.id);

  await runTransaction(db, async (transaction) => {
    const paymentSnap = await transaction.get(paymentRef);
    if (!paymentSnap.exists() || paymentSnap.data().status !== 'pending') {
      throw new Error('This payment has already been reviewed or no longer exists.');
    }

    if (payment.paymentType === 'order' && payment.orderId) {
      const orderRef = doc(db, 'orders', payment.orderId);
      const orderSnap = await transaction.get(orderRef);
      if (!orderSnap.exists()) throw new Error('The linked order could not be found.');
      transaction.update(orderRef, decision === 'approved' ? {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        paymentReference: payment.id,
        paymentVerifiedAt: serverTimestamp()
      } : {
        paymentStatus: 'failed',
        orderStatus: 'pending_payment',
        paymentReviewNote: reviewNote,
        paymentReviewedAt: serverTimestamp()
      });
    }

    if (decision === 'approved' && payment.paymentType === 'save_to_buy' && payment.planId) {
      const planRef = doc(db, 'saveToBuyPlans', payment.planId);
      const planSnap = await transaction.get(planRef);
      if (!planSnap.exists()) throw new Error('The linked Save to Buy plan could not be found.');
      const plan = planSnap.data();
      const newTotal = Number(plan.totalSaved || 0) + payment.amount;
      const deposit = {
        id: payment.id,
        amount: payment.amount,
        date: new Date().toISOString().slice(0, 10),
        reference: payment.id,
        proofImage: payment.receiptUrl,
        verified: true,
        channel: 'Bank Transfer'
      };
      transaction.update(planRef, {
        totalSaved: newTotal,
        depositCount: Number(plan.depositCount || 0) + 1,
        status: newTotal >= Number(plan.targetAmount || 0) ? 'completed' : 'active',
        deposits: [deposit, ...(Array.isArray(plan.deposits) ? plan.deposits : [])]
      });
    }

    transaction.update(paymentRef, {
      status: decision,
      reviewedBy: adminUid,
      reviewedAt: serverTimestamp(),
      reviewNote
    });
  });
}

export async function submitSaveToBuyBankTransfer(
  customerUid: string,
  plan: Record<string, unknown>,
  amount: number,
  receipt: { secureUrl: string; publicId: string },
  customer: { name: string; email: string; phone: string }
) {
  const planRef = await addDoc(collection(db, 'saveToBuyPlans'), {
    ...plan,
    customerUid,
    totalSaved: 0,
    depositCount: 0,
    deposits: [],
    createdAt: serverTimestamp()
  });
  const paymentRef = await addDoc(collection(db, 'paymentSubmissions'), {
    customerUid,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    amount,
    paymentType: 'save_to_buy',
    status: 'pending',
    receiptUrl: receipt.secureUrl,
    receiptPublicId: receipt.publicId,
    planId: planRef.id,
    planNumber: String(plan.planNumber || ''),
    createdAt: serverTimestamp()
  });
  return { planId: planRef.id, paymentId: paymentRef.id };
}

export async function submitSaveToBuyTopUp(
  customerUid: string,
  planId: string,
  planNumber: string,
  amount: number,
  receipt: { secureUrl: string; publicId: string },
  customer: { name: string; email: string; phone: string }
) {
  const paymentRef = await addDoc(collection(db, 'paymentSubmissions'), {
    customerUid,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    amount,
    paymentType: 'save_to_buy',
    status: 'pending',
    receiptUrl: receipt.secureUrl,
    receiptPublicId: receipt.publicId,
    planId,
    planNumber,
    createdAt: serverTimestamp()
  });
  return paymentRef.id;
}
