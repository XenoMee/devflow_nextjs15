'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { z, ZodType } from 'zod';

import ROUTES from '@/constants/routes';

import { Button } from '../ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface AuthFormProps<T extends FieldValues> {
  formType: 'SIGN_IN' | 'SIGN_UP';
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up';

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='mt-10 space-y-6'
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-2.5'>
                <FormLabel className='paragraph-medium text-dark400_light700 '>
                  {field.name === 'email'
                    ? 'Email Address'
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === 'password' ? 'password' : 'text'}
                    {...field}
                    className='paragraph-regular background-light900_dark300 
                    light-border-2 text-dark300_light700 no-focus min-h-12 
                    rounded-1.5 border'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className='
            primary-gradient paragraph-medium min-h-12 w-full 
            rounded-2 px-4 py-3 font-inter text-light-900
          '
          onClick={() => onSubmit}
        >
          {form.formState.isSubmitting
            ? buttonText === 'Sign In'
              ? 'Signing in...'
              : 'Signing up...'
            : buttonText}
        </Button>

        {formType === 'SIGN_IN' ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href={ROUTES.SIGN_UP}
              className='paragraph-semibold primary-text-gradient'
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              href={ROUTES.SIGN_IN}
              className='paragraph-semibold primary-text-gradient'
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default AuthForm;