import React, { useState } from 'react';
import { BannerHero } from '../components/common/BannerHero';
import { storeService } from '../services/storeService';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Plus,
  Minus,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    storeService.saveMessage({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Banner */}
      <BannerHero
        badge="GET IN TOUCH"
        title="Contact"
        highlightedText="Us"
        subtitle="We'd love to hear from you. Reach out to our Mukono boutique team anytime!"
        rightScript="We're Here To Help!"
        image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
      />

      {/* Main 2-Column Contact Section matching screenshot `IMG-20261108-WA0014_419e83ee.jpg` */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Our Contact Details
          </h3>

          <div className="space-y-4 text-xs">
            {/* Phone / WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Phone / WhatsApp</h4>
                <a
                  href="tel:+256778781601"
                  className="font-bold text-[#F97316] hover:underline text-sm block mt-0.5"
                >
                  +256 778 781601
                </a>
                <span className="text-[11px] text-gray-500">Mon–Sat: 8:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email Us</h4>
                <a
                  href="mailto:elviselegantcloset@gmail.com"
                  className="font-bold text-gray-800 hover:text-[#F97316] text-xs block mt-0.5 break-all"
                >
                  elviselegantcloset@gmail.com
                </a>
                <span className="text-[11px] text-gray-500">We reply within 24 hours</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Our Boutique Location</h4>
                <p className="font-medium text-gray-800 mt-0.5">
                  Mukono, Uganda (Kampala-Jinja Highway)
                </p>
                <span className="text-[11px] text-gray-500">Fast dispatch across all regions</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-900 block mb-3">Follow Us</span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#F97316] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#F97316] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#F97316] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#F97316] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send Us a Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Send Us a Message
          </h3>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Thank you! Your message has been received. Our team will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+256 700 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 font-medium"
                >
                  <option value="Order & Delivery Inquiry">Order & Delivery Inquiry</option>
                  <option value="Wholesale / Bulk Orders">Wholesale / Bulk Orders</option>
                  <option value="Size & Fitting Help">Size & Fitting Help</option>
                  <option value="Payment & Pesapal Questions">Payment & Pesapal Questions</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Lower 2 Sections: Map Box & FAQ Snippet matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Map Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2">
            Find Us on the Map
          </h3>
          <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            {/* Styled interactive map preview */}
            <iframe
              title="Elvis Closet Mukono Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127670.36015525043!2d32.70014731872199!3d0.3541460144983584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db027bebf1d87%3A0xb35a091410d55eec!2sMukono%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-gray-500">
            Conveniently situated on the main Mukono commercial artery for swift local pickups and rapid cross-district dispatch.
          </p>
        </div>

        {/* Quick FAQs Snippet */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3 text-xs">
            {[
              {
                q: 'Do you deliver across Uganda?',
                a: 'Yes, we deliver to all major towns and districts in Uganda including Kampala, Mukono, Entebbe, Jinja, Mbarara, and Gulu.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept direct MTN Mobile Money and Airtel Money STK Push payments, as well as VISA and Mastercard via Pesapal API 3.0.',
              },
              {
                q: 'How long does delivery take?',
                a: 'Deliveries within Mukono and Kampala typically arrive within 1–2 business days. Upcountry orders arrive in 3–5 business days.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-gray-900 bg-gray-50/70 hover:bg-orange-50/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <Minus className="w-4 h-4 text-[#F97316] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="p-3.5 bg-white text-gray-600 border-t border-gray-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
