import { CheckCircle, Home, Copy, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  applicationId: string;
  onHome: () => void;
}

export default function SuccessPage({ applicationId, onHome }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="min-h-screen bg-sky-light flex flex-col items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <div className="bg-white rounded-3xl shadow-xl border border-sky-border p-10 max-w-lg w-full text-center">

        {/* Success icon */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gold-100 rounded-full animate-ping opacity-40" />
          <div className="relative w-20 h-20 bg-navy-700 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 text-gold-300" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-navy-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          You're all done!
        </h1>
        <p className="text-navy-500 text-sm leading-relaxed mb-8">
          Thank you for submitting your application to LuxCareer Help. Our team will read it personally and get back to you within{' '}
          <strong className="text-navy-700">3–5 working days</strong> using the email and phone number you provided.
        </p>

        {/* Reference number */}
        <div className="bg-sky-light border-2 border-sky-border rounded-2xl p-5 mb-8">
          <p className="text-xs text-navy-400 uppercase tracking-widest mb-2 font-semibold">Your Reference Number</p>
          <div className="flex items-center justify-between gap-3">
            <code className="text-navy-700 font-mono text-xs break-all text-left">{applicationId}</code>
            <button
              onClick={copy}
              className="flex-shrink-0 bg-white border border-sky-border hover:border-gold-400 hover:text-gold-500 text-navy-400 rounded-lg p-2 transition-all"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <p className="text-gold-500 text-xs mt-2 font-semibold flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" /> Copied!
            </p>
          )}
          <p className="text-navy-400 text-xs mt-2">Keep this safe — you'll need it if you contact us about your application.</p>
        </div>

        {/* Next steps */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-left mb-8">
          <p className="text-amber-900 font-bold text-sm mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>What happens next</p>
          <div className="space-y-3">
            {[
              'Our team reviews your application personally within 3–5 working days.',
              "We'll contact you about processing fees and the next steps.",
              'Prepare your original documents for your biometrics appointment.',
              "If anything is unclear, we'll reach out — no guessing on your part.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-400 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {i + 1}
                </div>
                <p className="text-amber-800 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp nudge */}
        <div className="bg-navy-50 border border-navy-100 rounded-2xl p-4 flex items-center gap-3 mb-8 text-left">
          <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-navy-700 font-semibold text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Have questions? Message us on WhatsApp</p>
            <p className="text-navy-500 text-xs mt-0.5">We usually respond within a few hours.</p>
          </div>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <ArrowRight className="w-4 h-4 text-navy-400" />
          </a>
        </div>

        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="mt-8">
        <img src="/image.png" alt="LuxCareer Help" className="h-10 w-auto opacity-70" />
      </div>
    </div>
  );
}
