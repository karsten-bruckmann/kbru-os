module.exports = {
  name: 'showcases-form',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/showcases/form',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
