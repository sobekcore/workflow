import ApplicationIcon from '@/components/ApplicationIcon.tsx';

export default function ApplicationLogo() {
  return (
    <h1 className="flex items-center gap-2 text-4xl font-bold">
      <ApplicationIcon alt="Logo" className="w-10" /> Workflow
    </h1>
  );
}
