import { render, screen } from '@testing-library/react';
import { ABILITIES, CLASSES, determineClass, rollDice } from './App';

test('test random number generator', () => {
  for (let i = 0; i < 10000; i++) {
    const value = rollDice();
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(6);
  }
});

test('test character type based on attributes', () => {
  let abilityScores = {
    [ABILITIES.STR]: rollDice(6, 3),
    [ABILITIES.INT]: rollDice(6, 3),
    [ABILITIES.WIS]: rollDice(6, 3),
    [ABILITIES.DEX]: rollDice(6, 3),
    [ABILITIES.CHA]: rollDice(6, 3),
    [ABILITIES.CON]: rollDice(6, 3),
  };
  const charClass = determineClass(abilityScores);

  const sortedAbilities = Object.values(abilityScores).map(score => { return { name: score[0], value: score[1] } }).sort((a, b) => b.value - a.value);

  if (sortedAbilities[0].name === ABILITIES.STR) expect(charClass).toEqual(CLASSES.FIGHTER);
  else if (sortedAbilities[0].name === ABILITIES.INT) expect(charClass).toEqual(CLASSES.MAGICUSER);
  else if (sortedAbilities[0].name === ABILITIES.WIS) expect(charClass).toEqual(CLASSES.CLERIC);
  else if (sortedAbilities[0].name === ABILITIES.INT) expect(charClass).toEqual(CLASSES.THIEF);

  expect(charClass).toBeDefined();
});