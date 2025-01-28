import ApplicationIcon from '@/components/ApplicationIcon.tsx';

export default function ApplicationLogo() {
  return (
    <a href="/" className="text-slate-900 outline-none focus-visible:text-indigo-500">
      <h1 className="flex items-center gap-2 text-4xl font-bold">
        <ApplicationIcon alt="Logo" className="h-10" /> Workflow
      </h1>
    </a>
  );
}
