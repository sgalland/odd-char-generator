'use strict';
import { useState, useRef } from 'react';
import './App.css';
import { NumericTextBox, TextBox } from './common/components';
import { initChar } from './chargen';

const RollLog = ({ log }) => {
  const counter = useRef(0);
  return (
    <div style={{ float: 'left', width: "60%", height: "100%" }}>{log ? log.map(l => <div key={`${counter.current++}`}>{l}</div>) : ''}</div>
  );
}

const App = () => {
  const [log, setLog] = useState([]);
  const [character, _] = useState(() => initChar(setLog));

  const handleOnChange = () => { }

  return (
    <>
      <div style={{ float: "left", height: "100%" }}>
        <form>
          <NumericTextBox label={'STR'} style={{ width: 32 }} value={character.STR} onChange={handleOnChange} />
          <NumericTextBox label={'INT'} style={{ width: 32 }} value={character.INT} onChange={handleOnChange} />
          <NumericTextBox label={'WIS'} style={{ width: 32 }} value={character.WIS} onChange={handleOnChange} />
          <NumericTextBox label={'DEX'} style={{ width: 32 }} value={character.DEX} onChange={handleOnChange} />
          <NumericTextBox label={'CHA'} style={{ width: 32 }} value={character.CHA} onChange={handleOnChange} />
          <NumericTextBox label={'CON'} style={{ width: 32 }} value={character.CON} onChange={handleOnChange} />

          <TextBox label={'Class'} style={{ width: 80 }} value={character.charClass} />
        </form>
      </div>

      <RollLog log={log} />
    </>
  );
}

export default App;
