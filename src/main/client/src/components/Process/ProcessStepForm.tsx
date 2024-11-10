import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd, MdRemove } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonVariant } from '@/enums/button.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { processStepToCreateSchema } from '@/schemas/process-step/process-step.ts';
import Button from '@/components/Common/Button.tsx';
import Input from '@/components/Field/Input.tsx';
import Select from '@/components/Field/Select.tsx';

interface ProcessStepFormProps {
  processId: string;
  prevProcessStepId?: string;
  onSubmit: SubmitHandler<ProcessStepToCreate>;
  onCancel(): void;
}

export default function ProcessStepForm({ processId, prevProcessStepId, onSubmit, onCancel }: ProcessStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    resetField,
    watch,
  } = useForm<ProcessStepToCreate>({
    resolver: zodResolver(processStepToCreateSchema),
  });
  const [options, setOptions] = useState<number>(1);

  useEffect((): void => {
    if (prevProcessStepId) {
      setValue('prevProcessStepId', prevProcessStepId);
      setValue('fromProcessStepsIds', [prevProcessStepId]);
    }
  }, [setValue, prevProcessStepId]);

  setValue('processId', processId);
  const conditionType: ConditionType = watch('condition.type');

  const handleConditionTypeChange = (): void => {
    resetField('condition.data');
    setOptions(1);
  };

  const handleOptionChange = (label: string, index: number): void => {
    setValue(`condition.data.options.${index}.value`, label.replace(/\s+/, '-').toLowerCase());
  };

  const handleOptionRemove = (): void => {
    setValue('condition.data.options', getValues('condition.data.options')?.slice(0, -1));
    setOptions((options: number): number => options - 1);
  };

  const handleOptionAdd = (): void => {
    setOptions((options: number): number => options + 1);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" label="Name" register={register} errors={errors} />
      <Input name="description" label="Description" register={register} errors={errors} />
      <Select
        name="condition.type"
        label="Condition Type"
        register={register}
        errors={errors}
        defaultValue={ConditionType.NONE}
        onChange={handleConditionTypeChange}
      >
        <option value={ConditionType.NONE}>None</option>
        <option value={ConditionType.VISIT}>Visit</option>
        <option value={ConditionType.RADIO}>Radio</option>
        <option value={ConditionType.CHECKBOX}>Checkbox</option>
      </Select>
      {conditionType === ConditionType.VISIT && (
        <Input name="condition.data.link" label="Link" register={register} errors={errors} />
      )}
      {[ConditionType.RADIO, ConditionType.CHECKBOX].includes(conditionType) && (
        <>
          {Array.from({ length: options }).map((_: unknown, index: number) => (
            <Input
              key={`${conditionType}.${index}`}
              name={`condition.data.options.${index}.label`}
              label={`Option ${index + 1}`}
              register={register}
              errors={errors}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleOptionChange(event.target.value, index)}
            />
          ))}
          <div className="flex gap-2">
            <Button disabled={options === 1} className="w-full justify-center" onClick={handleOptionRemove}>
              <MdRemove className="text-xl" />
              Remove Option
            </Button>
            <Button className="w-full justify-center" onClick={handleOptionAdd}>
              <MdAdd className="text-xl" />
              Add Option
            </Button>
          </div>
        </>
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
