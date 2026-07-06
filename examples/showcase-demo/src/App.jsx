import { Suspense, useState } from 'react';

import { sampleQuestion } from './question.js';

import { useDemoStyles } from './hooks/useDemoStyles.js';

import { DEMO_META, DEMO_ORDER } from './demoMeta.js';

import { DemoIntro } from './components/DemoIntro.jsx';

import { CodeSample } from './components/CodeSample.jsx';

import {

  BootstrapSlotSection,

  CompoundSection,

  CompoundSlotSection,

  DefaultSection,

  HeadlessSection,

  MuiSlotSection,

  TailwindSlotSection,

} from './demoLoaders.js';



const LOADERS = {

  default: DefaultSection,

  compound: CompoundSection,

  tailwind: TailwindSlotSection,

  bootstrap: BootstrapSlotSection,

  mui: MuiSlotSection,

  'compound-slot': CompoundSlotSection,

  headless: HeadlessSection,

};



const DEMOS = DEMO_ORDER.map((id, index) => ({
  id,
  order: index + 1,
  ...DEMO_META[id],
  Component: LOADERS[id],
}));



export default function App() {

  const [selectedId, setSelectedId] = useState(DEMOS[0].id);

  const active = DEMOS.find((d) => d.id === selectedId) ?? DEMOS[0];

  const { Component } = active;



  useDemoStyles(selectedId);



  return (

    <div className="showcase-page">

      <header className="showcase-header">

        <div className="showcase-header-text">

          <h1>react-headless-quiz</h1>

          <p>Chọn kiểu demo — cùng logic quiz, khác cách tích hợp UI</p>

        </div>



        <label className="showcase-select-wrap">

          <span className="showcase-select-label">Kiểu demo</span>

          <select

            className="showcase-select"

            value={selectedId}

            onChange={(event) => setSelectedId(event.target.value)}

          >

            {DEMOS.map(({ id, order, title }) => (
              <option key={id} value={id}>
                {order}. {title}
              </option>
            ))}

          </select>

        </label>

      </header>



      <main className="showcase-panel" key={selectedId}>

        <div className="section-head">
          <span className="section-order">{active.order}</span>
          <div className="section-head-main">
            <h2>{active.title}</h2>
            <span className="section-tag">{active.tag}</span>
          </div>
        </div>



        <div className="section-intro-wrap">

          <DemoIntro meta={active} total={DEMOS.length} />

        </div>



        <div className="section-preview-label">Xem trước</div>



        <div

          className={`section-body${active.dark ? ' section-body--dark' : ''}${active.compoundBg ? ' section-body--compound' : ''}`}

        >

          <Suspense fallback={<p className="showcase-loading">Đang tải demo…</p>}>

            <Component question={sampleQuestion} />

          </Suspense>

        </div>



        <div className="section-code-wrap">

          <CodeSample code={active.code} />

        </div>

      </main>

    </div>

  );

}

