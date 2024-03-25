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

import { useState } from 'react';
import { calculateRiskScoreFromTokenId } from '@hashgraph/hedera-nft-utilities/src/risk';
import { z } from 'zod';
import { useRugRiskWizardContext } from '@/components/rug-risk-wizard';
import { RugRiskWizardTabForm } from '@/components/rug-risk-wizard/tab-form';
import { en } from '@/utils/dictionaries';
import { inputsDataForExistingTokenKeysWithDescriptions } from '@/utils/forms-inputs-data';
import { existingTokenSchema } from '@/utils/schemas';

const dictionary = en.rugRiskWizard.tabs.existingToken;

export const RugRiskWizardExistingTokenTabForm = ({ submitButtonText }: { submitButtonText: string }) => {
  const { setRiskFactors, setRiskLevel, setRiskScore } = useRugRiskWizardContext();

  const [isFetchingCollectionData, setIsFetchingCollectionData] = useState(false);
  const [fetchingCollectionDataError, setIsFetchingCollectionDataError] = useState<string | null>(null);

  const calculateRiskScoreForExistingToken = async (values: z.infer<typeof existingTokenSchema>) => {
    setIsFetchingCollectionDataError(null);
    setIsFetchingCollectionData(true);

    try {
      const existingTokenRiskScoreCalculation = await calculateRiskScoreFromTokenId({
        tokenId: values.token_id,
        network: 'mainnet',
      });

      setRiskLevel(existingTokenRiskScoreCalculation.riskLevel);
      setRiskScore(existingTokenRiskScoreCalculation.riskScore);
      setRiskFactors(existingTokenRiskScoreCalculation.riskScoreFactors);
    } catch (e) {
      if (!values.token_id) {
        setIsFetchingCollectionDataError(dictionary.errors.provideTokenId);
        return;
      }

      if (!e || (e instanceof Error && 'status' in e && e.status !== 404)) {
        setIsFetchingCollectionDataError(dictionary.errors.unknownError);
        return;
      }

      setIsFetchingCollectionDataError(dictionary.errors.cannotFindCollectionWithId(values.token_id));
    } finally {
      setIsFetchingCollectionData(false);
    }
  };

  return (
    <>
      <RugRiskWizardTabForm
        keysWithDescriptions={inputsDataForExistingTokenKeysWithDescriptions}
        onSubmit={calculateRiskScoreForExistingToken}
        schema={existingTokenSchema}
        submitButtonText={isFetchingCollectionData ? dictionary.fetchingData : submitButtonText}
        defaultValues={{ token_id: '' }}
        disabled={isFetchingCollectionData}
      />

      {fetchingCollectionDataError && <p className="text-right text-sm text-red-500">{fetchingCollectionDataError}</p>}
    </>
  );
};
