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

import { z } from 'zod';
import { en } from '@/utils/dictionaries';

export const newTokenSchema = z
  .object({
    total_supply: z.coerce.number().int().min(0),
    max_supply: z.coerce.number().int().min(0).nullish(),
    admin_key: z.boolean().optional(),
    wipe_key: z.boolean().optional(),
    freeze_key: z.boolean().optional(),
    supply_key: z.boolean().optional(),
    kyc_key: z.boolean().optional(),
    pause_key: z.boolean().optional(),
    fee_schedule_key: z.boolean().optional(),
  })
  .superRefine(({ max_supply, total_supply }, ctx) => {
    if (max_supply && max_supply > 0 && total_supply > max_supply) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: en.form.errors.totalSupplyGreaterThanMaxSupply,
        path: ['max_supply'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: en.form.errors.totalSupplyGreaterThanMaxSupply,
        path: ['total_supply'],
      });

      return false;
    }

    return true;
  });

export const existingTokenSchema = z.object({
  token_id: z.string().regex(/^0.0.\d+$/, en.form.errors.invalidTokenIdFormat),
});
