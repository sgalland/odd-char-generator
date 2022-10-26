import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

export const CLASSES = {
  FIGHTER: 'FIGHTER',
  MAGICUSER: 'MAGICUSER',
  CLERIC: 'CLERIC',
  THIEF: 'THIEF'
}

export const ABILITIES = {
  STR: 'STR',
  INT: 'INT',
  WIS: 'WIS',
  DEX: 'DEX',
  CHA: 'CHA',
  CON: 'CON'
}

// Compute the rolling of dice.
// diceSides: How many sides of a dice to roll. Default is 6.
// rollTimes: How many times should the dice be rolled. Default is 1.
export const rollDice = (diceSides = 6, rollTimes = 1) => {
  let value = 0;
  while (rollTimes--)
    value += Math.floor(Math.random() * diceSides) + 1;
  return value;
}

// Determine what character class the character is suited for based on highest ability store.
export const determineClass = (attributeScores, setLog) => {
  let abilitiesArray = Object.entries(attributeScores).map(a => { return { name: a[0], value: a[1] } });
  const sortedArray = abilitiesArray.sort((a, b) => b.value - a.value);

  let charClass = CLASSES.FIGHTER;

  if (sortedArray[0].name === ABILITIES.STR) charClass = CLASSES.FIGHTER;
  else if (sortedArray[0].name === ABILITIES.INT) charClass = CLASSES.MAGICUSER;
  else if (sortedArray[0].name === ABILITIES.WIS) charClass = CLASSES.CLERIC;
  else if (sortedArray[0].name === ABILITIES.DEX) charClass = CLASSES.THIEF;

  if (setLog) setLog((prevState) => [...prevState, `Character class is ${charClass}`]);

  return charClass;
};

// Adjusts ability scores to get the highest Prime Requisite score.
// sourceAttribute: The Attribute in which to decrease based on the basis.
// destinationAttribute: The Attribute in which to increase by 1.
// basis: How many points to trade on an X for 1 basis.
// abilityScores: A reference to an object containing ability scores.
export const reduceAbility = (sourceAttribute, destinationAttribute, basis, abilityScores, setLog) => {
  const MINIMUM_ABILITY_VALUE = 9;

  if (abilityScores[sourceAttribute] - basis >= MINIMUM_ABILITY_VALUE) {
    setLog((prevState) => [...prevState, `Reducing ${sourceAttribute} from ${abilityScores[sourceAttribute]} to ${abilityScores[sourceAttribute] - basis} on a basis of ${basis} to 1`]);
    setLog((prevState) => [...prevState, `Increasing ${destinationAttribute} from ${abilityScores[destinationAttribute]} to ${abilityScores[destinationAttribute] + 1}`]);
    abilityScores[sourceAttribute] -= basis;
    abilityScores[destinationAttribute] += 1;
  }
};

const NumericTextBox = ({ label, style, value = 0, onChange }) => {
  return (
    <div>
      <label style={{ fontWeight: 'bold' }}>{label}:</label>&nbsp;
      <input style={{ ...style }} type='number' value={value} onChange={onChange} />
    </div>);
}

NumericTextBox.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func
}

const TextBox = ({ label, style, value = '', onChange }) => {

  const changeHandler = () => { }
  const handleOnChange = onChange || changeHandler;

  return (
    <div>
      <label style={{ fontWeight: 'bold' }}>{label}:</label>&nbsp;
      <input style={{ ...style }} type='text' value={value} onChange={handleOnChange} />
    </div>);
}

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func
}

const RollLog = ({ log, onChange }) => {

  const changeHandler = () => { }
  const handleOnChange = onChange || changeHandler;

  return (
    <div><textarea style={{ float: 'left', width: "60%", height: "100%" }} value={log ? log.join('\n') : ''} onChange={handleOnChange} readOnly></textarea></div>
  );
}

const App = () => {



  const [str, setStr] = useState();
  const [int, setInt] = useState();
  const [wis, setWis] = useState();
  const [dex, setDex] = useState();
  const [cha, setCha] = useState();
  const [con, setCon] = useState();
  const [characterClass, setCharacterClass] = useState();
  const [log, setLog] = useState([]);

  useEffect(() => {
    let abilityScores = {
      charClass: undefined,
      [ABILITIES.STR]: rollDice(6, 3),
      [ABILITIES.INT]: rollDice(6, 3),
      [ABILITIES.WIS]: rollDice(6, 3),
      [ABILITIES.DEX]: rollDice(6, 3),
      [ABILITIES.CHA]: rollDice(6, 3),
      [ABILITIES.CON]: rollDice(6, 3),
    };

    const characaterClass = determineClass(abilityScores, setLog);
    setCharacterClass(() => characaterClass);
    computePrimeRequisite(abilityScores, characaterClass);
  }, []);

  // Adjust the Prime Requisite according to the basis rules in the 3LBBs.
  const computePrimeRequisite = (abilityScores, charClass) => {
    setLog((prevState) => [...prevState, "Original Stats", ...Object.entries(abilityScores).map(score => `${score[0]}: ${score[1]}`)]);

    switch (charClass) {
      case CLASSES.FIGHTER: {
        reduceAbility(ABILITIES.INT, ABILITIES.STR, 2, abilityScores, setLog);
        reduceAbility(ABILITIES.WIS, ABILITIES.STR, 3, abilityScores, setLog);
      } break;
      case CLASSES.MAGICUSER: {
        reduceAbility(ABILITIES.WIS, ABILITIES.INT, 2, abilityScores, setLog);
      } break;
      case CLASSES.CLERIC: {
        reduceAbility(ABILITIES.STR, ABILITIES.WIS, 3, abilityScores, setLog);
        reduceAbility(ABILITIES.INT, ABILITIES.WIS, 2, abilityScores, setLog);
      } break;
      case CLASSES.THIEF: {

      } break;
    }

    setLog((prevState) => [...prevState, "Modified Stats", ...Object.entries(abilityScores).map(score => `${score[0]}: ${score[1]}`)]);

    setStr(() => abilityScores.STR);
    setInt(() => abilityScores.INT);
    setWis(() => abilityScores.WIS);
    setDex(() => abilityScores.DEX);
    setCha(() => abilityScores.CHA);
    setCon(() => abilityScores.CON);
  };



  const handleOnChange = () => { }

  return (
    <>
      <div style={{ float: "left", height: "100%" }}>
        <form>
          <NumericTextBox label={'STR'} style={{ width: 32 }} value={str} onChange={handleOnChange} />
          <NumericTextBox label={'INT'} style={{ width: 32 }} value={int} onChange={handleOnChange} />
          <NumericTextBox label={'WIS'} style={{ width: 32 }} value={wis} onChange={handleOnChange} />
          <NumericTextBox label={'DEX'} style={{ width: 32 }} value={dex} onChange={handleOnChange} />
          <NumericTextBox label={'CHA'} style={{ width: 32 }} value={cha} onChange={handleOnChange} />
          <NumericTextBox label={'CON'} style={{ width: 32 }} value={con} onChange={handleOnChange} />

          <TextBox label={'Class'} style={{ width: 80 }} value={characterClass} />
        </form>
      </div>

      <RollLog log={log} />
    </>
  );
}

export default App;
