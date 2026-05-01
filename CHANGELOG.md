# Changelog

## [0.0.4](https://github.com/nayadev/seal_ui_react/compare/v0.0.3...v0.0.4) (2026-04-29)


### Features

* add SealToast and SealSonner components ([3d07fd5](https://github.com/nayadev/seal_ui_react/commit/3d07fd5721d752790ba677011263bb39ee8a7dc6))


### Bug Fixes

* enforce no-negated-condition via ESLint and fix violations ([1157e47](https://github.com/nayadev/seal_ui_react/commit/1157e47a932276e7d89a567018866632dc1400db))
* resolve SonarQube S7735 negated conditions in SealToast ([b8acfa7](https://github.com/nayadev/seal_ui_react/commit/b8acfa77628c2cb6edf514f3baa2f53c8deab35a))
* **SealToast:** remove border to match Flutter reference ([fcd08d7](https://github.com/nayadev/seal_ui_react/commit/fcd08d7e19c19b9d525de91c87a46ce4e9f8674d))
* **SealToast:** revert border to --seal-border-default ([921638a](https://github.com/nayadev/seal_ui_react/commit/921638ab9fc2b4d935c56315dbd9b45db0d6794c))
* **SealToast:** use accent color for border and action button ([4bcef42](https://github.com/nayadev/seal_ui_react/commit/4bcef42da2cda6e619319528c55f4854b7259069))
* **storybook:** mount SealSonner once globally to prevent multi-toaster firing ([b381c4b](https://github.com/nayadev/seal_ui_react/commit/b381c4b7334c61fee3cc378a3213ab09d263a499))

## [0.0.3](https://github.com/nayadev/seal_ui_react/compare/v0.0.2...v0.0.3) (2026-04-29)


### Features

* add SealProgress component ([066e9af](https://github.com/nayadev/seal_ui_react/commit/066e9af0dc20cd1894ba7a4938521430342706a9))

## [0.0.2](https://github.com/nayadev/seal_ui_react/compare/react-v0.0.1...react-v0.0.2) (2026-04-29)


### Features

* add filled button component ([2b735d3](https://github.com/nayadev/seal_ui_react/commit/2b735d3f6e8c20bfaf8a46865a12428263c370d5))
* add SealAlert component ([5f8a5ac](https://github.com/nayadev/seal_ui_react/commit/5f8a5ac007f2a27e64905bf7d2b48747f398c177))
* add SealBouncingDots component ([a7e4c7d](https://github.com/nayadev/seal_ui_react/commit/a7e4c7d13f91caf2a6f044c7c45a9d3110249c51))
* add SealFilledIconButton component ([239f287](https://github.com/nayadev/seal_ui_react/commit/239f287ccfa766f0caa4ce6a0fb0fddb1e2f8357))
* add SealIconButton component ([873d6b2](https://github.com/nayadev/seal_ui_react/commit/873d6b29f4f56d8c78c36e65952ce47182c9f557))
* add SealLoader component ([8490ab0](https://github.com/nayadev/seal_ui_react/commit/8490ab046022e26dbfb1fd91dd3dd18d33f66675))
* add SealOutlineIconButton component ([b1e40d2](https://github.com/nayadev/seal_ui_react/commit/b1e40d20f3340eb2d0e2c7a0f771132ad1ae6bdf))
* **buttons:** add outline button component ([b93aba2](https://github.com/nayadev/seal_ui_react/commit/b93aba28340073641630f3a697d6dd597066d0b6))
* **buttons:** add SealTextButton component ([842b25a](https://github.com/nayadev/seal_ui_react/commit/842b25aecab23ae6f45cad71243b4df9f1b5308c))
* replace spinner with bouncing dots animation in button loading state ([7745a39](https://github.com/nayadev/seal_ui_react/commit/7745a395e7e4d16d9cd6140317eba42a1f4dd81e))
* **SealOutlineButton:** paint icon stroke with SVG gradient matching token direction ([5aff10c](https://github.com/nayadev/seal_ui_react/commit/5aff10c08d7f1368afaa14353824004722069b38))
* **storybook:** add MCP server via addon-mcp ([5d5941f](https://github.com/nayadev/seal_ui_react/commit/5d5941f9728ed9e483174a8766f9e95a5693331e))


### Bug Fixes

* bring existing components into full compliance with project rules ([b371af7](https://github.com/nayadev/seal_ui_react/commit/b371af719ab1faf2b46e9cafe42e2e041724b755))
* **buttons:** flip negated ternaries to satisfy Sonar rule ([3c6e37e](https://github.com/nayadev/seal_ui_react/commit/3c6e37e1c4c85cc38659d3ec799d240f912e097e))
* **buttons:** make gradient outline border transparent via mask-composite ([e6ad46e](https://github.com/nayadev/seal_ui_react/commit/e6ad46e801213d14272c721a30203c13edbf74ad))
* **buttons:** parse custom gradient stop colors for SVG icon gradient ([8febdfa](https://github.com/nayadev/seal_ui_react/commit/8febdfa2e4c6770db7dca354ea97daaa391ebf5e))
* **buttons:** use first gradient stop for outline hover fill ([ec81e7b](https://github.com/nayadev/seal_ui_react/commit/ec81e7bfa55bbede0f5f5dd661150685f48a80dc))
* **buttons:** use parsed gradient color as border base for custom gradient outlines ([a45c156](https://github.com/nayadev/seal_ui_react/commit/a45c156952507a0d67be54a401e0d743c46e165d))
* **ci:** exclude test and infra files from sonarcloud coverage ([b6669cd](https://github.com/nayadev/seal_ui_react/commit/b6669cd9c1d98c1f0751ac42eac26a29d3a2dbb1))
* **ci:** run only unit tests for coverage in sonarcloud workflow ([fcf57d5](https://github.com/nayadev/seal_ui_react/commit/fcf57d5bd420d3ddc36a45d5a526beb9bdc6ccb5))
* correct text color logic in SealAlert component to satisfy Sonar rules ([dc5c880](https://github.com/nayadev/seal_ui_react/commit/dc5c8803852e1ce51ee072dd2d1e7dee7904d5a5))
* **package:** move "types" condition before "import" and "require" in exports ([bac96a4](https://github.com/nayadev/seal_ui_react/commit/bac96a407b49b65e83d233cdf6237e694cf3203a))
* reinitialize shadcn via CLI and restore proper component setup ([19bab1a](https://github.com/nayadev/seal_ui_react/commit/19bab1a872a8dde52086c367a0fe4311239dd518))
* remove baseUrl and ignoreDeprecations — invalid in TypeScript 6 ([c0645be](https://github.com/nayadev/seal_ui_react/commit/c0645be3694fa212c64beb64b5ddeb2299d026cc))
* remove mdx story pattern with no matching files ([921d1a6](https://github.com/nayadev/seal_ui_react/commit/921d1a63aa3f71f7e873db45a9b080baf8e444db))
* resolve sonarcloud issues in project foundation ([2663d08](https://github.com/nayadev/seal_ui_react/commit/2663d080c3c925a47f64bf19d1cbdea65f588867))
* resolve tailwind static scanning for dynamic hover classes ([71d5453](https://github.com/nayadev/seal_ui_react/commit/71d5453448ca2f5062f148c1e20ad94077d657e1))
* **SealTextButton:** keep button background transparent for gradient variants ([8eea17f](https://github.com/nayadev/seal_ui_react/commit/8eea17fec41742100ca30662507bc2674ae7c72b))
* **stories:** make AllVariants controls functional ([666b08c](https://github.com/nayadev/seal_ui_react/commit/666b08c495e31076eb3b0f806bc18d5d08fe6b8e))
* theme and mode switching in Storybook toolbar ([19ecd71](https://github.com/nayadev/seal_ui_react/commit/19ecd713208b087874d8bb5eb6ee45a41616bccb))
