import { titleInitials, filterAndSortChats, getDisplayedName } from './helpers';

const getChats = () => [
  { title: 'Test' },
  { title: 'Some Test' },
  { title: 'ABC' },
  { title: 'Mr Smith' },
];

const sortedChats = [
  { title: 'ABC' },
  { title: 'Mr Smith' },
  { title: 'Some Test' },
  { title: 'Test' },
];

describe('helpers utils', () => {
  it('should show title initials correctly', () => {
    const testSuite = [
      { input: null, output: '' },
      { input: [], output: '' },
      { input: new Date(), output: '' },
      { input: 'hello', output: 'H' },
      { input: 'hello world', output: 'HW' },
      { input: 'John Doe says "Hi"', output: 'JD' },
    ];
    testSuite.forEach(({ input, output }) => {
      expect(titleInitials(input)).toBe(output);
    });
  });
  it('should show user name correctly', () => {
    const testSuite = [
      { input: { username: 'johndoe', firstName: 'Mike' }, output: 'Mike' },
      {
        input: { username: 'johndoe', firstName: 'Mike', lastName: 'Smith' },
        output: 'Mike Smith',
      },
      { input: { username: 'johndoe' }, output: 'johndoe' },
    ];
    testSuite.forEach(({ input, output }) => {
      expect(getDisplayedName(input)).toBe(output);
    });
  });
  it('should filter and sort chats correctly', () => {
    const testSuite = [
      { input: '', output: sortedChats },
      { input: 'ab', output: [{ title: 'ABC' }] },
      { input: 'abm', output: [] },
    ];
    testSuite.forEach(({ input, output }) => {
      expect(filterAndSortChats(getChats(), input)).toEqual(output);
    });
  });
});
