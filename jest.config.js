/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/', '\\.s?css$'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^swiper$': '<rootDir>/__mocks__/swiperMock.js',
    '^swiper/modules$': '<rootDir>/__mocks__/swiperModulesMock.js',
    '^swiper/scss$': '<rootDir>/__mocks__/swiperScssMock.js',
    '^swiper/scss/navigation$': '<rootDir>/__mocks__/swiperScssMock.js',
    '^swiper/scss/pagination$': '<rootDir>/__mocks__/swiperScssMock.js',
  },
};
