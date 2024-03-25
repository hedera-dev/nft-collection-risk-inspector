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

import { calculateRiskScoreFromData } from '@hashgraph/hedera-nft-utilities/src/risk';
import { z } from 'zod';
import { useRugRiskWizardContext } from '@/components/rug-risk-wizard';
import { RugRiskWizardTabForm } from '@/components/rug-risk-wizard/tab-form';
import { inputsDataForNewTokenKeysWithDescriptions } from '@/utils/forms-inputs-data';
import { newTokenSchema } from '@/utils/schemas';

const renderRiskScoreCalculationKey = (isKey?: boolean) => (isKey ? 'key' : '');

export const RugRiskWizardNewTokenTabForm = ({ submitButtonText }: { submitButtonText: string }) => {
  const { setRiskFactors, setRiskLevel, setRiskScore } = useRugRiskWizardContext();

  const calculateRiskScoreForNewToken = (values: z.infer<typeof newTokenSchema>) => {
    const newTokenRiskScoreCalculation = calculateRiskScoreFromData({
      metadata: {
        total_supply: values.total_supply.toString(),
        max_supply: values.max_supply ? values.max_supply.toString() : '',
        supply_type: values.max_supply && values.max_supply > 0 ? 'FINITE' : 'INFINITE',
        admin_key: renderRiskScoreCalculationKey(values.admin_key),
        wipe_key: renderRiskScoreCalculationKey(values.wipe_key),
        freeze_key: renderRiskScoreCalculationKey(values.freeze_key),
        supply_key: renderRiskScoreCalculationKey(values.supply_key),
        kyc_key: renderRiskScoreCalculationKey(values.kyc_key),
        pause_key: renderRiskScoreCalculationKey(values.pause_key),
        fee_schedule_key: renderRiskScoreCalculationKey(values.fee_schedule_key),
      },
    });

    setRiskLevel(newTokenRiskScoreCalculation.riskLevel);
    setRiskScore(newTokenRiskScoreCalculation.riskScore);
    setRiskFactors(newTokenRiskScoreCalculation.riskScoreFactors);
  };

  return (
    <RugRiskWizardTabForm
      onSubmit={calculateRiskScoreForNewToken}
      submitButtonText={submitButtonText}
      keysWithDescriptions={inputsDataForNewTokenKeysWithDescriptions}
      schema={newTokenSchema}
      disableIfDirty={false}
      submitOnValueChange
      defaultValues={{
        total_supply: 0,
        max_supply: undefined,
        admin_key: false,
        wipe_key: false,
        freeze_key: false,
        supply_key: false,
        kyc_key: false,
        pause_key: false,
        fee_schedule_key: false,
      }}
    />
  );
};
