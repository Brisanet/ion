import { generateIDs } from './generateID';

describe('generateIDs', () => {
  it('should return the prefix if no elements with the specified testid exist', () => {
    const generetedID = generateIDs('prefix', 'testeid');
    expect(generetedID).toBe('prefix1');
  });

  it('should generate unique IDs with the specified prefix and testid', () => {
    document.body.innerHTML = `
      <div data-testid="testeid" id="prefix1"></div>
      <div data-testid="testeid" id="prefix2"></div>
    `;

    const generetedID1 = generateIDs('prefix', 'testeid');
    expect(generetedID1).toBe('prefix3');

    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-testid', 'testeid');
    newDiv.setAttribute('id', generetedID1);
    document.body.appendChild(newDiv);

    const generatedID2 = generateIDs('prefix', 'testeid');
    expect(generatedID2).toBe('prefix4');
  });
});
