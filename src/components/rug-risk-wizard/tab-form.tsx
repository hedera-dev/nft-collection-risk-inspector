/*
 *
 * Risk Inspector
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRugRiskWizardContext } from '@/components/rug-risk-wizard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useMatchMediaContext } from '@/utils/MatchMediaContext';
import { isValidTokenId } from '@/utils/isValidToken';
import { fetchTokenName } from '@/utils/fetchTokenName';

export const RugRiskWizardTabForm = <T extends z.Schema>({
  schema,
  onSubmit,
  keysWithDescriptions,
  submitButtonText,
  defaultValues,
  disabled,
  submitButtonTooltipMessage,
  disableIfDirty = true,
  submitOnValueChange = false,
}: {
  disableIfDirty?: boolean;
  submitButtonTooltipMessage?: string;
  disabled?: boolean;
  defaultValues: z.infer<T>;
  submitButtonText: string;
  schema: T;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: z.infer<T>) => void;
  submitOnValueChange?: boolean;
  keysWithDescriptions: Record<string, { type: string; label: string; description?: string }>;
}) => {
  const [tokenName, setTokenName] = useState<string>('');
  const { isMd } = useMatchMediaContext();
  const { setHasFormError } = useRugRiskWizardContext();

  const mdScreenSubmitButtonOnClickHandler = () =>
    !isMd &&
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });

  const rugRiskWizardTabForm = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const isDirty = Object.keys(rugRiskWizardTabForm.formState.dirtyFields).length > 0;

  const disableSubmitButton = (disableIfDirty ? !isDirty : false) || disabled;

  useEffect(() => {
    if (submitOnValueChange) {
      const subscription = rugRiskWizardTabForm.watch(rugRiskWizardTabForm.handleSubmit(onSubmit));
      return () => subscription.unsubscribe();
    }
  }, [rugRiskWizardTabForm.watch, rugRiskWizardTabForm.formState.errors]);

  useEffect(() => {
    if (submitOnValueChange) {
      setHasFormError(Object.keys(rugRiskWizardTabForm.formState.errors).length > 0);
    }
  }, [setHasFormError, submitOnValueChange, rugRiskWizardTabForm.formState.errors]);

  const handleTokenBlur = async (tokenId: string) => {
    if (!isValidTokenId(tokenId)) return;
    const tokenName = await fetchTokenName(tokenId, 'mainnet');
    setTokenName(tokenName);
  };

  return (
    <Form {...rugRiskWizardTabForm}>
      <form onSubmit={rugRiskWizardTabForm.handleSubmit(onSubmit)} className="grid gap-4">
        {Object.entries(keysWithDescriptions).map(([key, { type, label, description }]) => (
          <FormField
            key={key}
            control={rugRiskWizardTabForm.control}
            name={key as Path<z.TypeOf<T>>}
            render={({ field }) =>
              type === 'switch' ? (
                <FormItem key={key} className="flex w-full items-center gap-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-1">
                      <FormLabel className="mt-0 self-center">{label}</FormLabel>
                      <FormDescription className="self-start">
                        <Popover>
                          <PopoverTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                            <Info className="h-3.5 w-3.5" />
                          </PopoverTrigger>
                          <PopoverContent className="max-w-80 text-center sm:max-w-md">{description}</PopoverContent>
                        </Popover>
                      </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem key={key}>
                  <FormLabel>{label}</FormLabel>
                  <FormDescription>{description}</FormDescription>
                  <FormControl className="mt-2">
                    <Input
                      type={type}
                      {...field}
                      onBlur={(event) => {
                        field.onBlur();
                        void handleTokenBlur(event.target.value);
                      }}
                    />
                  </FormControl>
                  {tokenName && <p className="mt-2 text-sm text-muted-foreground">{tokenName}</p>}
                  <FormMessage />
                </FormItem>
              )
            }
          />
        ))}

        {!submitOnValueChange &&
          (submitButtonTooltipMessage ? (
            <Popover>
              <PopoverTrigger>
                <div className="relative">
                  <Button onClick={mdScreenSubmitButtonOnClickHandler} disabled={disableSubmitButton} className="ml-auto mt-4 block" type="submit">
                    {submitButtonText}
                  </Button>
                  <div className="absolute -right-1.5 -top-1.5">
                    <Info className="h-3.5 w-3.5 rounded-full border bg-yellow-400" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="max-w-96 text-center">{submitButtonTooltipMessage}</PopoverContent>
            </Popover>
          ) : (
            <Button onClick={mdScreenSubmitButtonOnClickHandler} disabled={disableSubmitButton} className="ml-auto mt-4 block" type="submit">
              {submitButtonText}
            </Button>
          ))}
      </form>
    </Form>
  );
};
