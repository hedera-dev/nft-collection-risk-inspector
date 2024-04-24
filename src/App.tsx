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

import { RugRiskWizard } from '@/components/rug-risk-wizard';
import { en } from '@/utils/dictionaries';

const App = () => {
  return (
    <main>
      <section className="container mx-auto mb-28 flex flex-col gap-8 lg:gap-20">
        <div>
          <h1 className="mt-20 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">{en.appHeader.title}</h1>
          <p className="text-center leading-7 [&:not(:first-child)]:mt-6">{en.appHeader.description}</p>
        </div>

        <RugRiskWizard />
      </section>
    </main>
  );
};

export default App;
