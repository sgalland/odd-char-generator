import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

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

const App = () => {

  const CLASSES = {
    FIGHTER: 'FIGHTER',
    MAGICUSER: 'MAGICUSER',
    CLERIC: 'CLERIC',
    THIEF: 'THIEF'
  }

  const ABILITIES = {
    STR: 'STR',
    INT: 'INT',
    WIS: 'WIS',
    DEX: 'DEX',
    CHA: 'CHA',
    CON: 'CON'
  }

  const [str, setStr] = useState();
  const [int, setInt] = useState();
  const [wis, setWis] = useState();
  const [dex, setDex] = useState();
  const [cha, setCha] = useState();
  const [con, setCon] = useState();
  const [characterClass, setCharacterClass] = useState();

  useEffect(() => {
    let abilityScores = {
      [ABILITIES.STR]: rollDice(6, 3),
      [ABILITIES.INT]: rollDice(6, 3),
      [ABILITIES.WIS]: rollDice(6, 3),
      [ABILITIES.DEX]: rollDice(6, 3),
      [ABILITIES.CHA]: rollDice(6, 3),
      [ABILITIES.CON]: rollDice(6, 3),
    };

    const characaterClass = determineClass(abilityScores);
    setCharacterClass(() => characaterClass);
    computePrimeRequisite(abilityScores, characaterClass);
  }, []);

  // Compute the rolling of dice.
  // diceSides: How many sides of a dice to roll. Default is 6.
  // rollTimes: How many times should the dice be rolled. Default is 1.
  const rollDice = (diceSides = 6, rollTimes = 1) => {
    let value = 0;
    while (rollTimes--)
      value += Math.floor(Math.random() * diceSides) + 1;
    return value;
  }

  // Adjust the Prime Requisite according to the basis rules in the 3LBBs.
  const computePrimeRequisite = (abilityScores, charClass) => {
    //! Dump of original Attribute scores
    const initScores = Object.entries(abilityScores).map(score => `${score[0]}: ${score[1]}`).join(', ');
    console.log(initScores);


    switch (charClass) {
      case CLASSES.FIGHTER: {
        reduceAbility(ABILITIES.INT, ABILITIES.STR, 2, abilityScores);
        reduceAbility(ABILITIES.WIS, ABILITIES.STR, 3, abilityScores);
      } break;
      case CLASSES.MAGICUSER: {
        reduceAbility(ABILITIES.WIS, ABILITIES.INT, 2, abilityScores);
      } break;
      case CLASSES.CLERIC: {
        reduceAbility(ABILITIES.STR, ABILITIES.WIS, 3, abilityScores);
        reduceAbility(ABILITIES.INT, ABILITIES.WIS, 2, abilityScores);
      } break;
      case CLASSES.THIEF: {

      } break;
    }

    const newScores = Object.entries(abilityScores).map(score => `${score[0]}: ${score[1]}`).join(', ');
    console.log(newScores);

    setStr(() => abilityScores.STR);
    setInt(() => abilityScores.INT);
    setWis(() => abilityScores.WIS);
    setDex(() => abilityScores.DEX);
    setCha(() => abilityScores.CHA);
    setCon(() => abilityScores.CON);
  };

  // Determine what character class the character is suited for based on highest ability store.
  const determineClass = (attributeScores) => {
    let abilitiesArray = Object.entries(attributeScores).map(a => { return { name: a[0], value: a[1] } });
    const sortedArray = abilitiesArray.sort((a, b) => b.value - a.value);

    let charClass = CLASSES.FIGHTER;

    if (sortedArray[0].name === 'STR') charClass = CLASSES.FIGHTER;
    else if (sortedArray[0].name === 'INT') charClass = CLASSES.MAGICUSER;
    else if (sortedArray[0].name === 'WIS') charClass = CLASSES.CLERIC;
    else if (sortedArray[0].name === 'DEX') charClass = CLASSES.THIEF;

    console.log(`Character class is ${charClass}`);

    return charClass;
  };

  // Adjusts ability scores to get the highest Prime Requisite score.
  // sourceAttribute: The Attribute in which to decrease based on the basis.
  // destinationAttribute: The Attribute in which to increase by 1.
  // basis: How many points to trade on an X for 1 basis.
  // abilityScores: A reference to an object containing ability scores.
  const reduceAbility = (sourceAttribute, destinationAttribute, basis, abilityScores) => {
    const MINIMUM_ABILITY_VALUE = 9;

    if (abilityScores[sourceAttribute] - basis >= MINIMUM_ABILITY_VALUE) {
      console.log(`Reducing ${sourceAttribute} from ${abilityScores[sourceAttribute]} to ${abilityScores[sourceAttribute] - basis}`);
      console.log(`Increasing ${destinationAttribute} from ${abilityScores[destinationAttribute]} to ${abilityScores[destinationAttribute] + 1}`);
      abilityScores[sourceAttribute] -= basis;
      abilityScores[destinationAttribute] += 1;
    }
  };

  const handleOnChange = () => { }

  return (
    <>
      <form>
        <NumericTextBox label={'STR'} style={{ width: 32 }} value={str} onChange={handleOnChange} />
        <NumericTextBox label={'INT'} style={{ width: 32 }} value={int} onChange={handleOnChange} />
        <NumericTextBox label={'WIS'} style={{ width: 32 }} value={wis} onChange={handleOnChange} />
        <NumericTextBox label={'DEX'} style={{ width: 32 }} value={dex} onChange={handleOnChange} />
        <NumericTextBox label={'CHA'} style={{ width: 32 }} value={cha} onChange={handleOnChange} />
        <NumericTextBox label={'CON'} style={{ width: 32 }} value={con} onChange={handleOnChange} />

        <TextBox label={'Class'} style={{ width: 80 }} value={characterClass} />
      </form>
    </>
  );
}

export default App;
