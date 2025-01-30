import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd, MdEdit } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonVariant } from '@/enums/button.ts';
import { Process, ProcessToCreate, ProcessToUpdate } from '@/interfaces/process.ts';
import { processToCreateSchema, processToUpdateSchema } from '@/schemas/process.ts';
import Button from '@/components/Common/Button.tsx';
import Input from '@/components/Field/Input.tsx';

type ProcessFormType = ProcessToCreate | ProcessToUpdate;

export interface ProcessFormProps<T extends ProcessFormType> {
  process?: Process;
  onSubmit: SubmitHandler<T>;
  onCancel(): void;
}

export default function ProcessForm<T extends ProcessFormType>({ process, onSubmit, onCancel }: ProcessFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProcessFormType>({
    resolver: zodResolver(process ? processToUpdateSchema : processToCreateSchema),
  });

  useEffect((): void => {
    if (process) {
      reset(process, { keepDefaultValues: true });
    }
  }, [reset, process]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit as SubmitHandler<ProcessFormType>)}>
      <Input name="name" label="Name" register={register} errors={errors} />
      <div className="flex justify-end gap-2">
        <Button variant={ButtonVariant.TEXT} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {process ? <MdEdit className="text-xl" /> : <MdAdd className="text-xl" />}
          {process ? 'Edit' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
