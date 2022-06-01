module.exports = {
  name: "utils-form-effects",
  preset: "../../../jest.config.js",
  coverageDirectory: "../../../coverage/libs/utils/form-effects",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js",
  ],
};
