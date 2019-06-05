module.exports = {
  name: 'angular-day',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-day',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
