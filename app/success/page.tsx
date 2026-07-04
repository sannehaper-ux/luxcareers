// app/success/page.tsx
import SuccessContent from "./SuccessContent";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  return <SuccessContent applicationId={id ?? ""} />;
}
