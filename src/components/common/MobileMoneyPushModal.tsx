import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, XCircle, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import confetti from 'canvas-confetti';

interface MobileMoneyPushModalProps {
  isOpen: boolean;
  phoneNumber: string;
  provider: 'MTN Mobile Money' | 'Airtel Money' | 'Card (Visa/Mastercard)';
  amount: number; // UGX
  orderNumber: string;
  onSuccess: (transactionRef: string) => void;
  onCancel: () => void;
}

type PushState = 'initiating' | 'awaiting_pin' | 'verifying' | 'success' | 'failed' | 'timeout';

export const MobileMoneyPushModal: React.FC<MobileMoneyPushModalProps> = ({
  isOpen,
  phoneNumber,
  provider,
  amount,
  orderNumber,
  onSuccess,
  onCancel,
}) => {
  const { formatUGX } = useStore();
  const [pushState, setPushState] = useState<PushState>('initiating');
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 minute countdown
  const [errorMessage, setErrorMessage] = useState('');

  // Handle countdown & simulated status transitions
  useEffect(() => {
    if (!isOpen) {
      setPushState('initiating');
      setSecondsLeft(120);
      setErrorMessage('');
      return;
    }

    // Step 1: Transition from initiating to awaiting_pin
    const initTimer = setTimeout(() => {
      setPushState('awaiting_pin');
    }, 1500);

    return () => clearTimeout(initTimer);
  }, [isOpen]);

  useEffect(() => {
    if (pushState !== 'awaiting_pin') return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPushState('timeout');
          setErrorMessage('Payment request timed out. Please verify your phone has network signal and try again.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pushState]);

  if (!isOpen) return null;

  const handleSimulatePinApproved = () => {
    setPushState('verifying');
    setTimeout(() => {
      setPushState('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // no-op
      }
      setTimeout(() => {
        onSuccess(`PESAPAL-MOMO-${Date.now().toString().slice(-6)}`);
      }, 1500);
    }, 1800);
  };

  const handleSimulatePinDeclined = () => {
    setPushState('verifying');
    setTimeout(() => {
      setPushState('failed');
      setErrorMessage('Transaction was declined by user or insufficient Mobile Money balance.');
    }, 1500);
  };

  const handleRetry = () => {
    setPushState('initiating');
    setSecondsLeft(120);
    setErrorMessage('');
    setTimeout(() => {
      setPushState('awaiting_pin');
    }, 1200);
  };

  const isMtn = provider === 'MTN Mobile Money';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
        {/* Provider Color Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isMtn ? 'bg-[#FFCC00]' : 'bg-[#ED1C24]'
          }`}
        />

        {/* State 1: Initiating Push */}
        {pushState === 'initiating' && (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-[#F97316] animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Initiating Push Request</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Connecting securely to Pesapal API 3.0 and dispatching prompt to your mobile network...
            </p>
          </div>
        )}

        {/* State 2: Awaiting PIN on phone */}
        {pushState === 'awaiting_pin' && (
          <div className="space-y-5">
            {/* Pulsing Handset Graphic */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full animate-ping opacity-25 ${
                  isMtn ? 'bg-amber-400' : 'bg-red-400'
                }`}
              />
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg text-white ${
                  isMtn ? 'bg-[#EAB308]' : 'bg-[#DC2626]'
                }`}
              >
                <Smartphone className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
                Action Required On Handset
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">Check your phone</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                We've sent a payment request to your mobile phone. Please check your phone screen and enter your official{' '}
                <span className="font-bold text-gray-900">{provider}</span> PIN to complete your payment.
              </p>
            </div>

            {/* Transaction summary card */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Mobile Number:</span>
                <span className="font-bold text-gray-900">{phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Provider:</span>
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isMtn ? 'bg-[#FFCC00]' : 'bg-[#ED1C24]'
                    }`}
                  />
                  {provider}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Order Ref:</span>
                <span className="font-mono text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total To Pay:</span>
                <span className="text-base font-black text-[#F97316]">{formatUGX(amount)}</span>
              </div>
            </div>

            {/* Countdown timer & Security note */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-gray-400" />
              <span>Prompt expires in: </span>
              <span className="font-mono font-bold text-gray-900">
                {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* PIN Disclaimer (CRITICAL: Do NOT collect PIN on website) */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-2.5 text-[11px] text-amber-800 flex items-center gap-2 text-left">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Do not share your PIN with anyone. Elvis' Closet will never ask you to type your PIN on this website.
              </span>
            </div>

            {/* Sandbox / Testing controls (allows testing the verified payment flow seamlessly) */}
            <div className="p-3 bg-neutral-100/80 rounded-xl border border-neutral-200/80 text-[11px] space-y-2">
              <p className="text-gray-500 font-medium">Merchant Sandbox Simulator:</p>
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleSimulatePinApproved}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-xs cursor-pointer"
                >
                  ✓ Simulate PIN Approved
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePinDeclined}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] shadow-xs cursor-pointer"
                >
                  ✕ Simulate Declined
                </button>
              </div>
            </div>

            <button
              onClick={onCancel}
              className="text-xs text-gray-400 hover:text-gray-600 underline font-medium cursor-pointer"
            >
              Cancel Payment & Return to Cart
            </button>
          </div>
        )}

        {/* State 3: Verifying */}
        {pushState === 'verifying' && (
          <div className="py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-600 animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Verifying Transaction</h3>
            <p className="text-xs text-gray-500">
              Querying Pesapal IPN and confirmed banking authorization...
            </p>
          </div>
        )}

        {/* State 4: Success */}
        {pushState === 'success' && (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Payment Verified!</h3>
            <p className="text-xs text-gray-600">
              Your Mobile Money payment of <span className="font-bold text-gray-900">{formatUGX(amount)}</span> has been confirmed. Redirecting to your receipt...
            </p>
          </div>
        )}

        {/* State 5: Failed or Timeout */}
        {(pushState === 'failed' || pushState === 'timeout') && (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              {pushState === 'timeout' ? <AlertCircle className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            <h3 className="text-xl font-black text-gray-900">
              {pushState === 'timeout' ? 'Payment Timed Out' : 'Payment Failed'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {errorMessage || 'Unable to complete Mobile Money transaction.'}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleRetry}
                className="w-full py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Retry Mobile Money Push
              </button>
              <button
                onClick={onCancel}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Choose Another Payment Method
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
