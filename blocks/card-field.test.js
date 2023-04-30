const { it, describe, expect } = require('@jest/globals');
const { CardField } = require('./card-field');
const { templateEngine } = require('../node_modules/tonyabayonetta/lib/scripts/templateEngine');
// eslint-disable-next-line no-undef
jest.mock('../node_modules/tonyabayonetta/lib/scripts/templateEngine');

describe('Test', () => {
    it('should mixed', () => {
        //const field = new CardField();

        expect(CardField.MIXER([1, 2])).toHaveLength(2);
    });
});
