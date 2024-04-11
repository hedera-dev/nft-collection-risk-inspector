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

export const en = {
  appHeader: {
    title: 'Rug Risk Inspector',
    description:
      "Use this tool to calculate the risk of a rug pull for a token. The tool will calculate a risk score and risk level based on the token's properties.",
  },
  rugRiskWizard: {
    tabs: {
      newToken: {
        title: 'New token',
        submitButtonText: {
          calculate: 'Calculate risk score',
          recalculate: 'Recalculate risk score',
        },
      },
      existingToken: {
        title: 'Existing token',
        submitButtonText: {
          calculate: 'Get risk score of token',
          recalculate: 'Get risk score of another token',
        },
        fetchingData: 'Fetching data...',
        errors: {
          provideTokenId: 'Please provide a token id.',
          unknownError: 'Something went wrong while fetching collection data.',
          cannotFindCollectionWithId: (id: string) => `Cannot find collection with id ${id} on Hedera Mainnet network.`,
        },
      },
    },
    summary: {
      howWeAreCalculatingRiskLevelPopover: {
        triggerText: 'How is Risk Level calculated',
        riskLevels: {
          noRisk: {
            label: 'NO RISK',
            range: '≤ 0',
          },
          low: {
            label: 'LOW',
            range: '1-40',
          },
          medium: {
            label: 'MEDIUM',
            range: '41-199',
          },
          high: {
            label: 'HIGH',
            range: '200 ≤',
          },
        },
      },
      cardHeader: {
        title: 'Risk score calculation',
        description: {
          formError: 'Please fix issues in the form to see results of calculation the risk score of your collection.',
          calculated: 'Your collection risk score has been calculated.',
          notCalculated: 'Please fill in the form to see the risk score of the collection.',
        },
      },
      calculatedRiskScoreContent: {
        collectionRiskLevelTitle: 'Collection risk level:',
        collectionRiskScoreTitle: 'Total collection risk score:',
        showAllRiskFactorsButtonText: 'List all the risk factors',
      },
      riskScoreFactorsTitle: 'Risk score factors:',
    },
  },
  form: {
    errors: {
      invalidTokenIdFormat: 'Invalid token ID format (0.0.<id>)',
      totalSupplyGreaterThanMaxSupply: 'Total supply cannot be greater than max supply.',
    },
    inputsDataFields: {
      max_supply: {
        label: 'Max Supply',
        description: 'The maximum amount of tokens that can be minted. Leave blank or set to 0 for infinite supply.',
      },
      total_supply: {
        label: 'Total Supply',
        description: 'The total amount of tokens that have been minted.',
      },
      admin_key: {
        label: 'Admin Key',
        description: 'The ADMIN key can be used to delete an entire Collection.',
      },
      wipe_key: {
        label: 'Wipe Key',
        description: 'The WIPE key can be used to delete all tokens within that Collection for a specific account.',
      },
      freeze_key: {
        label: 'Freeze Key',
        description: 'The FREEZE key can be used to freeze an account for token transfers.',
      },
      supply_key: {
        label: 'Supply Key',
        description: 'The SUPPLY key can change the total supply of a token within a Collection and must be set to mint additional tokens.',
      },
      kyc_key: {
        label: 'KYC Key',
        description: 'This key can mark an account as KYC-approved.',
      },
      pause_key: {
        label: 'Pause Key',
        description:
          'The PAUSE key has the authority to pause or unpause a Collection. Pausing a Collection prevents all transfers of the tokens within the Collection.',
      },
      fee_schedule_key: {
        label: 'Fee Schedule Key',
        description:
          'The Fee Schedule key has the ability to change the Collection’s royalty fees after it has been minted. Changing the royalty fees of a Collection will impact all tokens within the Collection (fixed, royalty and fallback).',
      },
      token_id: {
        label: 'Token ID',
      },
    },
  },
} as const;
