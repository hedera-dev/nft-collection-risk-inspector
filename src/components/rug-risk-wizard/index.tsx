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

import { createContext, useContext, useState } from 'react';
import type { RiskLevel, RiskScoreFactors } from '@hashgraph/hedera-nft-utilities/src/types/risk';
import { RugRiskWizardSummary } from '@/components/rug-risk-wizard/summary';
import { RugRiskWizardExistingTokenTabForm } from '@/components/rug-risk-wizard/tab-forms/existing-token';
import { RugRiskWizardNewTokenTabForm } from '@/components/rug-risk-wizard/tab-forms/new-token';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsListElement } from '@/components/ui/tabs';
import { MatchMediaContextProvider } from '@/utils/MatchMediaContext';
import { en } from '@/utils/dictionaries';

interface RugRiskWizardContextProps {
  riskScore: number | null;
  setRiskScore: (score: number | null) => void;
  riskLevel: null | RiskLevel;
  setRiskLevel: (level: null | RiskLevel) => void;
  riskFactors: RiskScoreFactors | null;
  setRiskFactors: (factors: RiskScoreFactors | null) => void;
  hasFormError: boolean;
  setHasFormError: (hasFormError: boolean) => void;
}

const dictionary = en.rugRiskWizard;

const RugRiskWizardContext = createContext<RugRiskWizardContextProps>({
  riskScore: null,
  setRiskScore: () => {},
  riskLevel: null,
  setRiskLevel: () => {},
  riskFactors: null,
  setRiskFactors: () => {},
  hasFormError: false,
  setHasFormError: () => {},
});

export const useRugRiskWizardContext = () => {
  const context = useContext(RugRiskWizardContext);

  if (!context) {
    throw new Error('useRugRiskWizardContext must be used within a RugRiskWizardContextProvider');
  }

  return context;
};

export const RugRiskWizard = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<null | RiskLevel>(null);
  const [riskFactors, setRiskFactors] = useState<RiskScoreFactors | null>(null);

  const [hasFormError, setHasFormError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'new-token' | 'existing-token'>('new-token');

  const isCalculated = riskScore !== null && !!riskLevel;

  const submitButtonText = isCalculated ? dictionary.tabs.newToken.submitButtonText.recalculate : dictionary.tabs.newToken.submitButtonText.calculate;

  const resetRiskData = () => {
    setRiskLevel(null);
    setRiskScore(null);
    setRiskFactors(null);
    setHasFormError(false);
  };

  const handleTabChange = (tabName: 'new-token' | 'existing-token') => {
    resetRiskData();
    setActiveTab(tabName);
  };

  return (
    <RugRiskWizardContext.Provider
      value={{ riskScore, setRiskScore, riskLevel, setRiskLevel, riskFactors, setRiskFactors, hasFormError, setHasFormError }}
    >
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.4fr,_1fr] lg:gap-0">
        <Tabs value={activeTab} defaultValue={activeTab}>
          <MatchMediaContextProvider>
            <TabsList className="w-full justify-start rounded-none">
              <TabsListElement isActive={activeTab === 'new-token'} onClick={() => activeTab !== 'new-token' && handleTabChange('new-token')}>
                {dictionary.tabs.newToken.title}
              </TabsListElement>
              <TabsListElement
                isActive={activeTab === 'existing-token'}
                onClick={() => activeTab !== 'existing-token' && handleTabChange('existing-token')}
              >
                {dictionary.tabs.existingToken.title}
              </TabsListElement>
            </TabsList>
          </MatchMediaContextProvider>
          <Separator />
          <TabsContent value="new-token" className="px-6 pt-6 lg:pb-6">
            <RugRiskWizardNewTokenTabForm submitButtonText={submitButtonText} />
          </TabsContent>
          <TabsContent value="existing-token" className="px-6 pt-6 lg:pb-6">
            <RugRiskWizardExistingTokenTabForm submitButtonText={submitButtonText} />
          </TabsContent>
        </Tabs>

        <Separator className="lg:hidden" />

        <RugRiskWizardSummary />
      </div>
    </RugRiskWizardContext.Provider>
  );
};
