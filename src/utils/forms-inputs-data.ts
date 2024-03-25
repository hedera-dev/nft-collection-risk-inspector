/*
 *
 * Hedera Rug Risk Inspector
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

import { en } from '@/utils/dictionaries';
import { defaultWeights } from '@/utils/consts';

const dictionary = en.form.inputsDataFields;

export const inputsDataForNewTokenKeysWithDescriptions = {
  max_supply: {
    label: dictionary.max_supply.label,
    type: 'number',
    description: dictionary.max_supply.description,
  },
  total_supply: {
    type: 'number',
    label: dictionary.total_supply.label,
    description: dictionary.total_supply.description,
  },
  admin_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.admin_key,
    label: dictionary.admin_key.label,
    description: dictionary.admin_key.description,
  },
  wipe_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.wipe_key,
    label: dictionary.wipe_key.label,
    description: dictionary.wipe_key.description,
  },
  freeze_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.freeze_key,
    label: dictionary.freeze_key.label,
    description: dictionary.freeze_key.description,
  },
  supply_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.supply_key,
    label: dictionary.supply_key.label,
    description: dictionary.supply_key.description,
  },
  kyc_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.kyc_key,
    label: dictionary.kyc_key.label,
    description: dictionary.kyc_key.description,
  },
  pause_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.pause_key,
    label: dictionary.pause_key.label,
    description: dictionary.pause_key.description,
  },
  fee_schedule_key: {
    type: 'switch',
    defaultWeight: defaultWeights.keys.fee_schedule_key,
    label: dictionary.fee_schedule_key.label,
    description: dictionary.fee_schedule_key.description,
  },
} as const;

export const inputsDataForExistingTokenKeysWithDescriptions = {
  token_id: {
    label: dictionary.token_id.label,
    type: 'text',
  },
} as const;
