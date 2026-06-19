import SuccessContent from './SuccessContent';

interface Props {
  searchParams: { id?: string };
}

export default function SuccessPage({ searchParams }: Props) {
  return <SuccessContent applicationId={searchParams.id ?? ''} />;
}
