'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Upload, AlertCircle, ChevronDown } from 'lucide-react';

interface FormData {
  full_name: string;
  date_of_birth: string;
  nationality: string;
  passport_number: string;
  passport_country_of_issue: string;
  passport_expiry_date: string;
  phone_number: string;
  email: string;
  employment_history: string;
  work_experience: string;
  education: string;
  travel_history: string;
  medical_report: string;
  biometrics_center: string;
  fees_acknowledged: boolean;
  declaration_accepted: boolean;
}

const EMPTY: FormData = {
  full_name: '', date_of_birth: '', nationality: '',
  passport_number: '', passport_country_of_issue: '', passport_expiry_date: '',
  phone_number: '', email: '',
  employment_history: '', work_experience: '', education: '',
  travel_history: '', medical_report: '', biometrics_center: '',
  fees_acknowledged: false, declaration_accepted: false,
};

const CENTERS = [
  '', 'Luxembourg City — Main Immigration Office', 'Esch-sur-Alzette — Regional Center',
  'Differdange — Service Point', 'Dudelange — Processing Unit',
  'Ettelbruck — North Regional Center', 'Diekirch — Administrative Hub',
  'Other (specify in notes)',
];

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-navy-700 mb-1.5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, ...rest } = props;
  return (
    <>
      <input
        {...rest}
        className={`w-full border ${error ? 'border-red-400 bg-red-50' : 'border-sky-border bg-white'} rounded-lg px-3.5 py-2.5 text-sm text-navy-700 placeholder-navy-300 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition`}
      />
      {error && <p className="text-xs text-red-500 mt-1 flex gap-1 items-center"><AlertCircle className="w-3 h-3" />{error}</p>}
    </>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={4}
      className="w-full border border-sky-border bg-white rounded-lg px-3.5 py-2.5 text-sm text-navy-700 placeholder-navy-300 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition resize-none"
      {...props}
    />
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full border border-sky-border bg-white rounded-lg px-3.5 py-2.5 text-sm text-navy-700 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition appearance-none pr-9"
      />
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
    </div>
  );
}

function Section({ num, title, note, children }: { num: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-sky-border rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-sky-border flex items-center gap-3 bg-sky-light">
        <span className="w-7 h-7 bg-navy-700 text-white text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0" style={{ fontFamily: "'Poppins', sans-serif" }}>{num}</span>
        <div>
          <h3 className="text-sm font-bold text-navy-700" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
          {note && <p className="text-xs text-navy-400 mt-0.5">{note}</p>}
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(f => ({ ...f, [key]: value }));
    setErrors(er => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.full_name.trim()) e.full_name = 'Full name is required.';
    if (!form.date_of_birth) e.date_of_birth = 'Date of birth is required.';
    if (!form.nationality.trim()) e.nationality = 'Nationality is required.';
    if (!form.passport_number.trim()) e.passport_number = 'Passport number is required.';
    if (!form.passport_country_of_issue.trim()) e.passport_country_of_issue = 'Country of issue is required.';
    if (!form.passport_expiry_date) e.passport_expiry_date = 'Expiry date is required.';
    if (!form.phone_number.trim()) e.phone_number = 'Phone number is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.fees_acknowledged) e.fees_acknowledged = 'Please acknowledge the fees note.';
    if (!form.declaration_accepted) e.declaration_accepted = 'You must accept the declaration to submit.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) { topRef.current?.scrollIntoView({ behavior: 'smooth' }); return; }
    setSubmitting(true);
    setServerError('');
    const { data, error } = await supabase.from('visa_applications').insert([form]).select('id').single();
    if (error || !data) {
      setServerError('Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }
    router.push(`/success?id=${data.id}`);
  };

  const errCount = Object.keys(errors).length;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="sticky top-0 z-10 bg-white border-b border-sky-border shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-navy-400 hover:text-navy-700 transition-colors p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image.png" alt="LuxCareer Help" className="h-8 w-auto" />
          <span className="text-navy-400 text-sm ml-auto hidden sm:block">Luxembourg Travel Documentation</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8" ref={topRef}>

        <div className="bg-navy-700 text-white rounded-2xl p-7 mb-6 shadow-lg">
          <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Luxembourg Travel Documentation</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            Welcome to the official application portal. All applicants must complete this form accurately and submit the necessary documents for processing. Incomplete or false information may result in delays or rejection.
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Please have the following ready before filling the form:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/60">
              {[
                'Valid Passport (min. 6 months before expiry)',
                'Recent passport-sized photograph',
                'Medical Report (if applicable)',
                'Employment / Education Records',
                'Travel History & Supporting Documents',
                'Police Clearance Certificate',
                'Payment for Legal Immigration Processing Fees',
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-gold-300 mt-0.5">&#8599;</span> {item}
                </div>
              ))}
            </div>
          </div>
          <p className="text-gold-300 text-xs mt-4 font-medium">Proceed carefully and provide accurate information.</p>
        </div>

        {errCount > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-5 flex gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">Please fix {errCount} error{errCount > 1 ? 's' : ''} before submitting. Required fields are marked with *</p>
          </div>
        )}

        {serverError && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-5 flex gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Section num="1" title="Full Name" note="As it appears on your passport">
            <div>
              <Label text="Full Legal Name" required />
              <TextInput placeholder="e.g. Ahmed Al-Rashid" value={form.full_name} onChange={set('full_name')} error={errors.full_name} />
            </div>
          </Section>

          <Section num="2" title="Date of Birth">
            <div>
              <Label text="Date of Birth" required />
              <TextInput type="date" value={form.date_of_birth} onChange={set('date_of_birth')} error={errors.date_of_birth} />
            </div>
          </Section>

          <Section num="3" title="Nationality / Citizenship">
            <div>
              <Label text="Nationality" required />
              <TextInput placeholder="e.g. Indian, Filipino, Nigerian..." value={form.nationality} onChange={set('nationality')} error={errors.nationality} />
            </div>
          </Section>

          <Section num="4" title="Passport Details" note="Number, country of issue, expiry date">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label text="Passport Number" required />
                <TextInput placeholder="e.g. A12345678" value={form.passport_number} onChange={set('passport_number')} error={errors.passport_number} />
              </div>
              <div>
                <Label text="Country of Issue" required />
                <TextInput placeholder="e.g. Nigeria, India, Philippines..." value={form.passport_country_of_issue} onChange={set('passport_country_of_issue')} error={errors.passport_country_of_issue} />
              </div>
            </div>
            <div>
              <Label text="Passport Expiry Date" required />
              <TextInput type="date" value={form.passport_expiry_date} onChange={set('passport_expiry_date')} error={errors.passport_expiry_date} />
              <p className="text-xs text-navy-400 mt-1">Must be valid for at least 6 months from your intended travel date</p>
            </div>
          </Section>

          <Section num="5" title="Phone Number & Email Address">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label text="Phone Number" required />
                <TextInput type="tel" placeholder="+234 80 000 0000" value={form.phone_number} onChange={set('phone_number')} error={errors.phone_number} />
                <p className="text-xs text-navy-400 mt-1">Include country code</p>
              </div>
              <div>
                <Label text="Email Address" required />
                <TextInput type="email" placeholder="yourname@email.com" value={form.email} onChange={set('email')} error={errors.email} />
              </div>
            </div>
          </Section>

          <Section num="6" title="Employment History" note="If any — leave blank if none">
            <div>
              <Label text="Previous Employment" />
              <Textarea
                placeholder={"e.g.\n2019–2022: Driver, XYZ Transport, Lagos\n2022–2024: Warehouse Staff, Dubai"}
                value={form.employment_history}
                onChange={set('employment_history')}
              />
            </div>
          </Section>

          <Section num="7–8" title="Work Experience & Education">
            <div>
              <Label text="Work Experience" />
              <Textarea
                placeholder="Describe your skills, experience, and type of work..."
                value={form.work_experience}
                onChange={set('work_experience')}
              />
            </div>
            <div>
              <Label text="Education" />
              <Textarea
                placeholder={"e.g.\nBSc Engineering — University of Lagos (2017)\nDiploma in Healthcare — Nairobi College (2019)"}
                value={form.education}
                onChange={set('education')}
              />
            </div>
          </Section>

          <Section num="9" title="Legal Immigration Processing Fees">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
              <p className="font-semibold text-amber-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Important Note on Fees</p>
              Payment of the Legal Immigration Processing Fees will be guided by the Immigration Diplomatic Finance Desk, in accordance with the applicant&apos;s country of residence, geographical location, and applicable regulations. Please ensure you follow the instructions provided to remain compliant.
            </div>
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.fees_acknowledged} onChange={set('fees_acknowledged')} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#F5A00E]" />
                <span className="text-sm text-navy-600">
                  I acknowledge and understand the fees requirement and agree to follow the instructions provided. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.fees_acknowledged && <p className="text-xs text-red-500 mt-1 flex gap-1 items-center"><AlertCircle className="w-3 h-3" />{errors.fees_acknowledged}</p>}
            </div>
          </Section>

          <Section num="10" title="Biometrics Center" note="We will confirm your appointment after reviewing your application">
            <div>
              <Label text="Preferred Center" />
              <SelectInput value={form.biometrics_center} onChange={set('biometrics_center')}>
                {CENTERS.map(c => <option key={c} value={c}>{c || 'Select a center...'}</option>)}
              </SelectInput>
            </div>
          </Section>

          <Section num="11" title="Travel History" note="If any">
            <div>
              <Label text="Countries Visited" />
              <Textarea
                placeholder={"e.g.\n2021: UAE (Dubai) — Work\n2023: South Africa (Cape Town) — Tourism"}
                value={form.travel_history}
                onChange={set('travel_history')}
              />
            </div>
          </Section>

          <Section num="12" title="Medical Report" note="Only required if under medication or with special needs">
            <p className="text-sm text-navy-400">Leave this section blank if you are in good health and not on any regular medication.</p>
            <div>
              <Label text="Medical Information (optional)" />
              <Textarea
                placeholder="Describe any conditions, medications, or special requirements..."
                value={form.medical_report}
                onChange={set('medical_report')}
              />
            </div>
            <div className="flex items-start gap-3 border border-dashed border-sky-border rounded-xl p-4 bg-sky-light">
              <Upload className="w-4 h-4 text-navy-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-navy-500">Bring your original medical report to your biometrics appointment. We&apos;ll advise if a digital copy is needed.</p>
            </div>
          </Section>

          <Section num="13" title="Declaration & Consent">
            <div className="bg-sky-light border border-sky-border rounded-xl p-4 text-sm text-navy-600 leading-relaxed space-y-2">
              <p>I hereby declare that the information provided in this application is true and accurate to the best of my knowledge. I understand that any false or incomplete information may lead to delays or rejection of my application.</p>
              <p>By submitting this form, I consent to the processing of my personal data for the purpose of travel and immigration requirements.</p>
            </div>
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.declaration_accepted} onChange={set('declaration_accepted')} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#F5A00E]" />
                <span className="text-sm text-navy-600">
                  I agree to the declaration above and confirm that all information provided is accurate and truthful. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.declaration_accepted && <p className="text-xs text-red-500 mt-1 flex gap-1 items-center"><AlertCircle className="w-3 h-3" />{errors.declaration_accepted}</p>}
            </div>
          </Section>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
            <p className="font-semibold text-amber-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Final Reminder</p>
            All required documents must be uploaded and payment instructions followed as advised. Incomplete or non-compliant applications will not be processed.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold-400 hover:bg-gold-500 disabled:bg-gold-300 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {submitting
              ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting...</>
              : 'Submit Application'
            }
          </button>

          <p className="text-center text-navy-400 text-xs pb-4">Your information is kept private and used only for your application.</p>
        </form>
      </div>
    </div>
  );
}
