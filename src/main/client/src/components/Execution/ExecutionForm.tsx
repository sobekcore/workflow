import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonVariant } from '@/enums/button.ts';
import { ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { executionToCreateSchema } from '@/schemas/execution/execution.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import Button from '@/components/Common/Button.tsx';
import Select from '@/components/Field/Select.tsx';

interface ExecutionFormProps {
  onSubmit: SubmitHandler<ExecutionToCreate>;
  onCancel(): void;
}

export default function ExecutionForm({ onSubmit, onCancel }: ExecutionFormProps) {
  const { data: processes } = useReadProcesses();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ExecutionToCreate>({
    resolver: zodResolver(executionToCreateSchema),
  });

  const defaultProcessId: string | undefined = processes?.[0].id;
  const processId: string | undefined = watch('processId') || defaultProcessId;

  const process: Process | undefined = processes?.find((process: Process): boolean => process.id === processId);
  const defaultProcessStepId: string | undefined = process?.steps[0]?.id;

  useEffect((): void => {
    if (defaultProcessStepId) {
      setValue('processStepId', defaultProcessStepId);
    }
  }, [setValue, defaultProcessStepId]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select name="processId" label="Process" register={register} errors={errors} defaultValue={defaultProcessId}>
        {processes?.map((process: Process) => (
          <option key={process.id} value={process.id}>
            {process.name}
          </option>
        ))}
      </Select>
      {processId && (
        <Select
          name="processStepId"
          label="Process Step"
          register={register}
          errors={errors}
          defaultValue={defaultProcessStepId}
        >
          {process?.steps
            .sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime())
            .map((processStep: ProcessStep) => (
              <option key={processStep.id} value={processStep.id}>
                {processStep.name}
              </option>
            ))}
        </Select>
      )}
      <div className="flex justify-end gap-2">
        <Button variant={ButtonVariant.TEXT} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <MdAdd className="text-xl" />
          Create
        </Button>
      </div>
    </form>
  );
}
