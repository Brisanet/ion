import { generateIDs } from './generateID';

describe('generateIDs', () => {
  it('should return the prefix if no elements with the specified testid exist', () => {
    const generetedID = generateIDs('prefix', 'testid');
    expect(generetedID).toBe('prefix1');
  });

  it('should generate unique IDs with the specified prefix and testid', () => {
    document.body.innerHTML = `
      <div data-testid="testid" id="prefix1"></div>
      <div data-testid="testid" id="prefix2"></div>
    `;

    const generetedID1 = generateIDs('prefix', 'testid');
    expect(generetedID1).toBe('prefix3');

    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-testid', 'testid');
    newDiv.setAttribute('id', generetedID1);
    document.body.appendChild(newDiv);

    const generatedID2 = generateIDs('prefix', 'testid');
    expect(generatedID2).toBe('prefix4');
  });
});
