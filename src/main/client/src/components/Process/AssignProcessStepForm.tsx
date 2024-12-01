import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdPolyline } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonVariant } from '@/enums/button.ts';
import { ProcessStep, ProcessStepToAssign } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { processStepToAssignSchema } from '@/schemas/process-step/process-step.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import Button from '@/components/Common/Button.tsx';
import Select from '@/components/Field/Select.tsx';

interface ProcessFormProps {
  processId: string;
  assignProcessStepId: string;
  onSubmit: SubmitHandler<ProcessStepToAssign>;
  onCancel(): void;
}

export default function AssignProcessStepForm({
  processId,
  assignProcessStepId,
  onSubmit,
  onCancel,
}: ProcessFormProps) {
  const { data: processes } = useReadProcesses();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProcessStepToAssign>({
    resolver: zodResolver(processStepToAssignSchema),
  });

  useEffect((): void => {
    if (assignProcessStepId) {
      setValue('assignProcessStepId', assignProcessStepId);
    }
  }, [setValue, assignProcessStepId]);

  setValue('processId', processId);

  const process: Process | undefined = processes?.find((process: Process): boolean => process.id === processId);
  const defaultProcessStepId: string | undefined = process?.steps[0].id;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select
        name="processStepId"
        label="Process Step"
        register={register}
        errors={errors}
        defaultValue={defaultProcessStepId}
      >
        {process?.steps
          .filter((processStep: ProcessStep) => processStep.id !== assignProcessStepId)
          .filter(
            (processStep: ProcessStep) =>
              !processStep.availableFrom
                ?.map((processStep: ProcessStep) => processStep.id)
                .includes(assignProcessStepId),
          )
          .map((processStep: ProcessStep) => (
            <option key={processStep.id} value={processStep.id}>
              {processStep.name}
            </option>
          ))}
      </Select>
      <div className="flex justify-end gap-2">
        <Button variant={ButtonVariant.TEXT} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <MdPolyline className="text-xl" />
          Assign
        </Button>
      </div>
    </form>
  );
}
