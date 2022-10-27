import { render, screen } from '@testing-library/react';
import { determineClass, rollDice } from './chargen';
import { ABILITIES, CLASSES, } from './enums';

test('test random number generator', () => {
  // Test single rolls
  for (let i = 0; i < 10000; i++) {
    const value = rollDice();
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(6);
  }

  for (let i = 0; i < 10000; i++) {
    const value = rollDice(6);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(6);
  }

  for (let i = 0; i < 10000; i++) {
    const value = rollDice(6, 1);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(6);
  }

  // Test double rolls
  for (let i = 0; i < 10000; i++) {
    const value = rollDice(6, 2);
    expect(value).toBeGreaterThanOrEqual(2);
    expect(value).toBeLessThanOrEqual(12);
  }

  // Test triple rolls (I have been seeing problems here, with 19's being rolled)
  for (let i = 0; i < 10000; i++) {
    const value = rollDice(6, 3);
    expect(value).toBeGreaterThanOrEqual(3);
    expect(value).toBeLessThanOrEqual(18);
  }
});

test('test character type based on attributes', () => {
  let character = {
    charClass: CLASSES.FIGHTER,
    [ABILITIES.STR]: rollDice(6, 3),
    [ABILITIES.INT]: rollDice(6, 3),
    [ABILITIES.WIS]: rollDice(6, 3),
    [ABILITIES.DEX]: rollDice(6, 3),
    [ABILITIES.CHA]: rollDice(6, 3),
    [ABILITIES.CON]: rollDice(6, 3),
  };
  determineClass(character);
  const sortedAbilities = Object.values(character).map(score => { return { name: score[0], value: score[1] } }).sort((a, b) => b.value - a.value);

  if (sortedAbilities[0].name === ABILITIES.STR) expect(character.charClass).toEqual(CLASSES.FIGHTER);
  else if (sortedAbilities[0].name === ABILITIES.INT) expect(character.charClass).toEqual(CLASSES.MAGICUSER);
  else if (sortedAbilities[0].name === ABILITIES.WIS) expect(character.charClass).toEqual(CLASSES.CLERIC);
  // else if (sortedAbilities[0].name === ABILITIES.INT) expect(charClass).toEqual(CLASSES.THIEF);

  expect(character.charClass).toBeDefined();
});