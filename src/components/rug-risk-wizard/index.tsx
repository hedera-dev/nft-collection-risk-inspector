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
import { RugRiskWizardSummary } from '@/components/rug-risk-wizard/summary';
import { RugRiskWizardNewTokenTabForm } from '@/components/rug-risk-wizard/tab-forms/new-token';
import { RugRiskWizardExistingTokenTabForm } from '@/components/rug-risk-wizard/tab-forms/existing-token';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsListElement } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { en } from '@/utils/dictionaries';
import { MatchMediaContextProvider } from '@/utils/MatchMediaContext';

const dictionary = en.rugRiskWizard;

export const RugRiskWizard = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<null | 'NORISK' | 'LOW' | 'MEDIUM' | 'HIGH'>(null);
  const [riskFactors, setRiskFactors] = useState<Record<string, number> | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'new-token' | 'existing-token'>('new-token');

  const isCalculated = riskScore !== null && !!riskLevel;

  const resetRiskData = () => {
    setRiskLevel(null);
    setRiskScore(null);
    setRiskFactors(null);
  };

  const toggleTab = () => {
    setActiveTab(activeTab === 'new-token' ? 'existing-token' : 'new-token');
  };

  const handleTabChange = () => {
    if (isCalculated) {
      setIsDialogOpen(true);
      return;
    }

    toggleTab();
  };

  const handleDialogCloseWithReset = () => {
    setIsDialogOpen(false);
    resetRiskData();
    toggleTab();
  };

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.4fr,_1fr] lg:gap-0">
      <Tabs value={activeTab} defaultValue={activeTab}>
        <MatchMediaContextProvider>
          <TabsList className="w-full justify-start rounded-none">
            <TabsListElement isActive={activeTab === 'new-token'} onClick={() => activeTab !== 'new-token' && handleTabChange()}>
              {dictionary.tabs.newToken.title}
            </TabsListElement>
            <TabsListElement isActive={activeTab === 'existing-token'} onClick={() => activeTab !== 'existing-token' && handleTabChange()}>
              {dictionary.tabs.existingToken.title}
            </TabsListElement>
          </TabsList>
        </MatchMediaContextProvider>
        <Separator />
        <TabsContent value="new-token" className="px-6 pt-6 lg:pb-6">
          <RugRiskWizardNewTokenTabForm
            setRiskFactors={setRiskFactors}
            setRiskLevel={setRiskLevel}
            setRiskScore={setRiskScore}
            submitButtonText={
              isCalculated ? dictionary.tabs.newToken.submitButtonText.recalculate : dictionary.tabs.newToken.submitButtonText.calculate
            }
          />
        </TabsContent>
        <TabsContent value="existing-token" className="px-6 pt-6 lg:pb-6">
          <RugRiskWizardExistingTokenTabForm
            // setRiskFactors={setRiskFactors}
            setRiskLevel={setRiskLevel}
            setRiskScore={setRiskScore}
            submitButtonText={
              isCalculated ? dictionary.tabs.existingToken.submitButtonText.recalculate : dictionary.tabs.existingToken.submitButtonText.calculate
            }
          />
        </TabsContent>
      </Tabs>

      <Separator className="lg:hidden" />

      <RugRiskWizardSummary riskScore={riskScore} riskLevel={riskLevel} riskFactors={riskFactors} />

      <Dialog open={isDialogOpen} defaultOpen={false} onOpenChange={() => setIsDialogOpen((prev) => !prev)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dictionary.deleteCalculationResultsDialog.title}</DialogTitle>
            <DialogDescription>{dictionary.deleteCalculationResultsDialog.description}</DialogDescription>
            <Separator />
            <div className="flex gap-4">
              <Button onClick={handleDialogCloseWithReset}>{dictionary.deleteCalculationResultsDialog.delete}</Button>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                {dictionary.deleteCalculationResultsDialog.cancel}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
