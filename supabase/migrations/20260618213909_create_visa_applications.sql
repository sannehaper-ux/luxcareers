
CREATE TABLE visa_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  nationality text NOT NULL,
  passport_number text NOT NULL,
  passport_country_of_issue text NOT NULL,
  passport_expiry_date date NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  employment_history text,
  work_experience text,
  education text,
  travel_history text,
  medical_report text,
  biometrics_center text,
  fees_acknowledged boolean NOT NULL DEFAULT false,
  declaration_accepted boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE visa_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_visa_applications" ON visa_applications FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "select_own_visa_applications" ON visa_applications FOR SELECT
  TO anon USING (true);
