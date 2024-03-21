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

import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/helpers';
import capitalize from 'lodash.capitalize';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { en } from '@/utils/dictionaries';

const dictionary = en.rugRiskWizard.summary;

const HowWeAreCalculatingRiskLevelPopover = () => (
  <Popover>
    <PopoverTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      {dictionary.howWeAreCalculatingRiskLevelPopover.triggerText}
    </PopoverTrigger>
    <PopoverContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.noRisk.label}</TableHead>
            <TableHead className="text-green-600">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.low.label}</TableHead>
            <TableHead className="text-yellow-600">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.medium.label}</TableHead>
            <TableHead className="text-right text-red-600">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.high.label}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-gray-800">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.noRisk.range}</TableCell>
            <TableCell className="text-green-800">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.low.range}</TableCell>
            <TableCell className="text-yellow-800">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.medium.range}</TableCell>
            <TableCell className="text-right text-red-800">{dictionary.howWeAreCalculatingRiskLevelPopover.riskLevels.high.range}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopoverContent>
  </Popover>
);

const RugRiskWizardSummaryCardHeader = ({ isCalculated = false }: { isCalculated?: boolean }) => (
  <div className="flex flex-col space-y-1.5 pb-4 ">
    <div className="flex flex-col">
      <span className="text-2xl font-semibold leading-none tracking-tight">{dictionary.cardHeader.title}</span>
      <div>
        <HowWeAreCalculatingRiskLevelPopover />
      </div>
    </div>
    <CardDescription>{isCalculated ? dictionary.cardHeader.description.calculated : dictionary.cardHeader.description.notCalculated}</CardDescription>
  </div>
);

export const RugRiskWizardSummary = ({
  riskLevel,
  riskScore,
  riskFactors,
  className,
}: {
  className?: string;
  riskLevel: null | 'NORISK' | 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: null | number;
  riskFactors: Record<string, number> | null;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cardWrapperClassName = cn('rounded-none border-0 lg:border-l p-0 px-6 lg:pr-0 shadow-none', className);

  if (riskScore === null || !riskLevel) {
    return (
      <Card className={cardWrapperClassName}>
        <RugRiskWizardSummaryCardHeader />
      </Card>
    );
  }

  return (
    <Card className={cardWrapperClassName}>
      <RugRiskWizardSummaryCardHeader isCalculated />
      <div className="grid gap-4 pt-4">
        <div>
          <div className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{dictionary.calculatedRiskScoreContent.collectionRiskLevelTitle}</p>
              <p
                className={cn('text-sm text-muted-foreground', {
                  'text-gray-600': riskLevel === 'NORISK',
                  'text-green-600': riskLevel === 'LOW',
                  'text-yellow-600': riskLevel === 'MEDIUM',
                  'text-red-600': riskLevel === 'HIGH',
                })}
              >
                {riskLevel}
              </p>
            </div>
          </div>
          <div className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{dictionary.calculatedRiskScoreContent.collectionRiskScoreTitle}</p>
              <p className="text-sm text-muted-foreground">{riskScore}</p>
            </div>
          </div>
        </div>
      </div>

      {riskFactors && (
        <>
          <div className="mx-auto px-2 py-4">
            <Button type="button" onClick={() => setIsDialogOpen(true)}>
              {dictionary.calculatedRiskScoreContent.showAllRiskFactorsButtonText}
            </Button>
          </div>

          <Dialog open={isDialogOpen} defaultOpen={false} onOpenChange={() => setIsDialogOpen((prev) => !prev)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-6 text-2xl font-bold">{dictionary.calculatedRiskScoreContent.allRiskFactorsDialogTitle}</DialogTitle>
                <DialogDescription>
                  <CardContent className="grid gap-4">
                    <ScrollArea className="max-h-[70dvh] px-4">
                      <div className="grid gap-4">
                        {Object.entries(riskFactors).map(([key, value]) => (
                          <div
                            key={key}
                            className={cn('grid grid-cols-[25px_1fr] items-start rounded-md border p-5 shadow-sm', {
                              'bg-red-100': value >= 200,
                              'bg-yellow-100': value < 200 && value > 40,
                              'bg-green-100': value > 0 && value <= 40,
                              'bg-gray-100': value === 0,
                            })}
                          >
                            <span
                              className={cn('flex h-2 w-2 translate-y-1 rounded-full shadow', {
                                'bg-red-600': value >= 200,
                                'bg-yellow-600': value < 200 && value > 40,
                                'bg-green-600': value > 0 && value <= 40,
                                'bg-gray-600': value === 0,
                              })}
                            />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{key.split('_').map(capitalize).join(' ')}</p>
                              <p className="text-sm text-muted-foreground">
                                {value > 0
                                  ? `${dictionary.calculatedRiskScoreContent.allRiskFactorsDialogAddedRiskScore}: ${value}`
                                  : dictionary.calculatedRiskScoreContent.allRiskFactorsDialogNoAffectRiskScore}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </DialogDescription>
                <Separator />
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                    {dictionary.calculatedRiskScoreContent.allRiskFactorsDialogClose}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Card>
  );
};
