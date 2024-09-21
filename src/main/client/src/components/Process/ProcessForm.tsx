import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonVariant } from '@/enums/button.ts';
import { ProcessToCreate } from '@/interfaces/process.ts';
import { processToCreateSchema } from '@/schemas/process.ts';
import Button from '@/components/Common/Button.tsx';
import Input from '@/components/Field/Input.tsx';

interface ProcessFormProps {
  onSubmit: SubmitHandler<ProcessToCreate>;
  onCancel(): void;
}

export default function ProcessForm({ onSubmit, onCancel }: ProcessFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProcessToCreate>({
    resolver: zodResolver(processToCreateSchema),
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" label="Name" register={register} errors={errors} />
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
