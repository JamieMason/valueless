const valueless = require('./index.js');

it('transforms shallow arrays', () => {
  expect(valueless(['ivo', 'marloes'])).toEqual(['0', '1']);
});

it('transforms nested arrays', () => {
  expect(valueless([['ivo'], ['marloes']])).toEqual([['0.0'], ['1.0']]);
});

it('transforms deeply nested arrays', () => {
  expect(valueless([['ivo', ['ivo']], ['marloes', ['marloes']]])).toEqual([
    ['0.0', ['0.1.0']],
    ['1.0', ['1.1.0']]
  ]);
});

it('transforms shallow objects', () => {
  expect(valueless({ vim: 1, hedrik: 2 })).toEqual({ vim: 'vim', hedrik: 'hedrik' });
});

it('transforms arrays of objects', () => {
  expect(valueless([{ name: 'coco', gender: 'female' }, { name: 'leo', gender: 'male' }])).toEqual([
    { name: '0.name', gender: '0.gender' },
    { name: '1.name', gender: '1.gender' }
  ]);
});

it('transforms objects containing arrays', () => {
  expect(
    valueless({
      berry: [8, 16],
      willem: [2, 4]
    })
  ).toEqual({
    berry: ['berry.0', 'berry.1'],
    willem: ['willem.0', 'willem.1']
  });
});

it('transform deeply nested structures', () => {
  expect(
    valueless({
      ivo: [{ vim: { jan: { ian: [null] } } }]
    })
  ).toEqual({ ivo: [{ vim: { jan: { ian: ['ivo.0.vim.jan.ian.0'] } } }] });
});