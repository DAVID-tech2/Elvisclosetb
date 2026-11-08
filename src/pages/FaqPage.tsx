import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerHero } from '../components/common/BannerHero';
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

const FAQS_DATA = [
  {
    q: 'How can I place an order?',
    a: "Browse our collections, select your desired size and color, click 'Add to Cart', and proceed to Checkout. Enter your delivery details, select MTN Mobile Money or Airtel Money, and authorize the push prompt on your handset.",
  },
  {
    q: 'What are the delivery options and fees?',
    a: 'In accordance with our boutique policy, transport fees are agreed with our customer service team after payment is completed. You only pay for your products during online checkout. Our support team contacts you to arrange convenient delivery via courier or boda.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept direct Uganda Mobile Money STK Push (MTN MoMo and Airtel Money) as well as VISA and Mastercard processed securely through Pesapal API 3.0.',
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes! We offer a 7-day return and exchange policy for unused items in original boutique packaging with tags intact. Contact us via WhatsApp (+256 778 781601) to initiate an exchange.',
  },
  {
    q: 'How do I use a discount code?',
    a: 'During promotional campaigns or seasonal flash sales, promotional discounts are applied automatically or you can enter your promo code in the coupon field at checkout.',
  },
  {
    q: 'How can I track my order?',
    a: "Use our dedicated 'Track Order' page. Enter your order number (e.g. #EC12345) and your phone number to check the real-time fulfillment and dispatch status.",
  },
  {
    q: 'Is my payment information secure?',
    a: "100% secure. We never collect or store your Mobile Money PIN. All transactions are authorized on your phone's official banking interface and secured with end-to-end encryption via Pesapal.",
  },
  {
    q: 'How can I contact customer support?',
    a: 'Our support team in Mukono is available from Monday to Saturday (8:00 AM – 8:00 PM) via WhatsApp & phone at +256 778 781601 or email at elviselegantcloset@gmail.com.',
  },
  {
    q: 'Do you have a physical store?',
    a: 'Yes, our main fashion boutique and fulfillment hub is based in Mukono, Uganda. Customers are welcome to arrange local pickups or order online for fast nationwide delivery.',
  },
  {
    q: 'What is your return policy?',
    a: 'You can return items within 7 days of delivery. Once inspected, refunds are credited back via Mobile Money or your original payment method within 3–7 business days.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <BannerHero
        badge="HELP & SUPPORT"
        title="Frequently Asked"
        highlightedText="Questions"
        subtitle="Find quick answers to common questions about our products, orders, shipping and more."
        rightScript="We're Here To Help!"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-14">
        {/* Left 2 Columns: Accordion List matching screenshot `IMG-20261108-WA0016_8ad6bfbf.jpg` */}
        <div className="lg:col-span-2 space-y-3">
          {FAQS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-gray-900 hover:text-[#F97316] transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#F97316] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Sidebar matching screenshot */}
        <div className="space-y-6">
          {/* Still Have Questions? */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-gray-900">Still Have Questions?</h3>
            <p className="text-xs text-gray-500">Our support team is ready to help you.</p>

            <div className="pt-2">
              <a
                href="https://wa.me/256778781601"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Chat With Us
              </a>
              <span className="text-[11px] text-gray-400 block mt-2">
                or call: <strong className="text-gray-700">+256 778 781601</strong>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3 text-xs font-bold">
            <h4 className="text-gray-900 font-black border-b border-gray-100 pb-2">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/order-tracking"
                className="flex items-center justify-between p-2 hover:text-[#F97316] transition-colors"
              >
                <span>Track Your Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/returns-policy"
                className="flex items-center justify-between p-2 hover:text-[#F97316] transition-colors"
              >
                <span>Return & Refund Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/shipping-policy"
                className="flex items-center justify-between p-2 hover:text-[#F97316] transition-colors"
              >
                <span>Shipping Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between p-2 hover:text-[#F97316] transition-colors"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Shop with Confidence */}
          <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#F2E5D5] shadow-xs text-xs space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-black">
              <ShieldCheck className="w-5 h-5 text-[#F97316]" />
              <h4>Shop with Confidence</h4>
            </div>
            <p className="text-gray-600 text-[11px]">
              Secure payments • Easy returns • Trusted by thousands of fashion lovers in Uganda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
