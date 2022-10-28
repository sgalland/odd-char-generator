import { ABILITIES, CLASSES } from './enums';

// Initialize a new character
export const initChar = (setLog) => {
    let character = {
        charClass: CLASSES.FIGHTER,
        [ABILITIES.STR]: rollDice(6, 3),
        [ABILITIES.INT]: rollDice(6, 3),
        [ABILITIES.WIS]: rollDice(6, 3),
        [ABILITIES.DEX]: rollDice(6, 3),
        [ABILITIES.CHA]: rollDice(6, 3),
        [ABILITIES.CON]: rollDice(6, 3),
    };

    determineClass(character, setLog);
    computePrimeRequisite(character, setLog);

    return character;
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
export const determineClass = (character, setLog) => {
    const { charClass, ...rest } = character;
    let abilitiesArray = Object.entries(rest)
        .filter(a => a[0] !== ABILITIES.CON && a[0] !== ABILITIES.CHA) // Remove abilities that are not Prime Requisites
        .filter(a => a[0] !== ABILITIES.DEX) // Until we can deal with Thieves take dex out
        .map(a => { return { name: a[0], value: a[1] } });
    const sortedArray = abilitiesArray.sort((a, b) => b.value - a.value);

    if (sortedArray[0].name === ABILITIES.STR) character.charClass = CLASSES.FIGHTER;
    else if (sortedArray[0].name === ABILITIES.INT) character.charClass = CLASSES.MAGICUSER;
    else if (sortedArray[0].name === ABILITIES.WIS) character.charClass = CLASSES.CLERIC;
    // else if (sortedArray[0].name === ABILITIES.DEX) character.charClass = CLASSES.THIEF;

    if (setLog) setLog((prevState) => [...prevState, `Character class is ${character.charClass}`]);
};

// Adjusts ability scores to get the highest Prime Requisite score.
// sourceAttribute: The Attribute in which to decrease based on the basis.
// destinationAttribute: The Attribute in which to increase by 1.
// basis: How many points to trade on an X for 1 basis.
// abilityScores: A reference to an object containing ability scores.
export const reduceAbility = (sourceAttribute, destinationAttribute, basis, character, setLog) => {
    const MINIMUM_ABILITY_VALUE = 9;

    if (character[sourceAttribute] - basis >= MINIMUM_ABILITY_VALUE) {
        const log = [];
        log.push(`Reducing ${sourceAttribute} from ${character[sourceAttribute]} to ${character[sourceAttribute] - basis} on a basis of ${basis} to 1`);
        log.push(`Increasing ${destinationAttribute} from ${character[destinationAttribute]} to ${character[destinationAttribute] + 1}`);

        character[sourceAttribute] -= basis;
        character[destinationAttribute] += 1;

        setLog((prevState) => [...prevState, ...log]);
    }
};

// Adjust the Prime Requisite according to the basis rules in the 3LBBs.
export const computePrimeRequisite = (character, setLog) => {
    setLog((prevState) => [...prevState, "Original Stats", ...Object.entries(character).map(score => `${score[0]}: ${score[1]}`)]);

    switch (character.charClass) {
        case CLASSES.FIGHTER: {
            reduceAbility(ABILITIES.INT, ABILITIES.STR, 2, character, setLog);
            reduceAbility(ABILITIES.WIS, ABILITIES.STR, 3, character, setLog);
        } break;
        case CLASSES.MAGICUSER: {
            reduceAbility(ABILITIES.WIS, ABILITIES.INT, 2, character, setLog);
        } break;
        case CLASSES.CLERIC: {
            reduceAbility(ABILITIES.STR, ABILITIES.WIS, 3, character, setLog);
            reduceAbility(ABILITIES.INT, ABILITIES.WIS, 2, character, setLog);
        } break;
        // case CLASSES.THIEF: {

        // } break;
    }

    setLog((prevState) => [...prevState, "Modified Stats", ...Object.entries(character).map(score => `${score[0]}: ${score[1]}`)]);
};