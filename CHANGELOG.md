# Changelog

## [0.0.12](https://github.com/nayadev/seal_ui_react/compare/v0.0.11...v0.0.12) (2026-05-25)


### Bug Fixes

* **buttons:** replace rounded/p arbitrary token vars with token classes in all button wrappers ([86c0b2a](https://github.com/nayadev/seal_ui_react/commit/86c0b2a12f662672dc4dcef0b9c1f22cfa4a3ea2))
* **buttons:** revert rounded-md to rounded-sm for filled/outline icon buttons ([ec2c058](https://github.com/nayadev/seal_ui_react/commit/ec2c058c81e5c1fb3f4054c7b5430f5798d7fa27))
* **buttons:** use size=icon for square icon buttons; rounded-md for filled/outline ([d619e24](https://github.com/nayadev/seal_ui_react/commit/d619e2452e6a15e78988fed5aa9a35efdd5250d2))
* **SealAccordion:** remove redundant font-medium; use disabled-opacity token ([592ec12](https://github.com/nayadev/seal_ui_react/commit/592ec1218ba33860944ce12bb18e21b3210e203c))
* **SealAccordion:** replace arbitrary token vars with token classes in Trigger, Content and stories ([d36e81a](https://github.com/nayadev/seal_ui_react/commit/d36e81a1924b57dbb91157f8ba9ab11efbfe40fa))
* **SealAlert:** replace rounded arbitrary token var with token class in component and stories ([562e251](https://github.com/nayadev/seal_ui_react/commit/562e2512e1f864aa665dc6a29f3f8efb907766cb))
* **SealAvatar:** replace font-medium and gap-[var(...)] with token classes ([230e535](https://github.com/nayadev/seal_ui_react/commit/230e5356842918f23a72938559233b0838015d03))
* **SealBadge:** replace arbitrary token vars and hardcoded typography with token classes ([e2fc46c](https://github.com/nayadev/seal_ui_react/commit/e2fc46c7fa3a2e295782da8b5a032b59c8fcdb65))
* **SealBreadcrumb:** replace arbitrary token vars and hardcoded utilities with token classes ([01839b9](https://github.com/nayadev/seal_ui_react/commit/01839b9fc8a600aa77d1448f35fea513de64e8fb))
* **SealCalendar:** replace arbitrary token vars and font-normal with token classes ([ceab404](https://github.com/nayadev/seal_ui_react/commit/ceab4045606d07315064539d933f90d11494439a))
* **SealCard:** replace arbitrary token vars and inline styles with token classes ([d03baeb](https://github.com/nayadev/seal_ui_react/commit/d03baebc42124f527c7ae350c7504668714d08e5))
* **SealCard:** replace inline style with token classes in story doc source ([8d4f99b](https://github.com/nayadev/seal_ui_react/commit/8d4f99bcb1a1d4c8744f373613a876989022ee47))
* **SealCheckbox:** replace arbitrary token vars and inline styles with token classes ([cc6a4bd](https://github.com/nayadev/seal_ui_react/commit/cc6a4bdb9846dd9e090921ace7388bc5904f0e2e))
* **SealContainer:** replace inline styles in stories with token classes ([a91b691](https://github.com/nayadev/seal_ui_react/commit/a91b6917f0072245c58187b6192e0b716fe2133b))
* **SealContextMenu:** replace arbitrary token vars and hardcoded utilities with token classes ([aef984c](https://github.com/nayadev/seal_ui_react/commit/aef984c772cc35808efb391ae2d95e1cbfa3eb20))
* **SealContextMenu:** replace remaining arbitrary vars in SubContent with token classes ([ca59837](https://github.com/nayadev/seal_ui_react/commit/ca5983797d8b17e1d28f254e767c7a53a6d106bf))
* **SealDatePicker:** replace arbitrary token vars with token classes ([182316b](https://github.com/nayadev/seal_ui_react/commit/182316b5d46efb858dac6cb2ecdf081a90bc73ba))
* **SealDialog:** replace arbitrary token vars and hardcoded utilities with token classes ([38b730b](https://github.com/nayadev/seal_ui_react/commit/38b730bc59b9ee3753d546520f6cbbe9f5eb576c))
* **SealForm:** replace arbitrary token vars with token classes ([a184542](https://github.com/nayadev/seal_ui_react/commit/a1845422838075e88c40cfaf54b3c71af064e748))
* **SealForm:** replace inline styles with token classes in Label, Description and Message ([d71df4b](https://github.com/nayadev/seal_ui_react/commit/d71df4b024463e97b38310128db1097da2c11628))
* **SealIconButton:** use first gradient stop color for hover on gradient variants ([9c1486f](https://github.com/nayadev/seal_ui_react/commit/9c1486f8659626cd3329d2c0c8afa0513a35b2d8))
* **SealInputOtp:** replace arbitrary token vars with token classes ([f3028a2](https://github.com/nayadev/seal_ui_react/commit/f3028a24a844ce033c3a13415695f47ad4974c00))
* **SealLoader:** replace arbitrary token vars with token classes in component and stories ([95bc655](https://github.com/nayadev/seal_ui_react/commit/95bc65508195ca47f534bc744250391601a5b116))
* **SealMenubar:** replace arbitrary token vars and hardcoded typography with token classes ([9029e65](https://github.com/nayadev/seal_ui_react/commit/9029e65d14947dbb98ce01df519b3896a4075a42))
* **SealPopover:** replace arbitrary token vars and hardcoded utilities with token classes ([e8dad2b](https://github.com/nayadev/seal_ui_react/commit/e8dad2be7b5bad8bdf1306f3b1f6209e995ca834))
* **SealProgress:** replace rounded/gap arbitrary token vars with token classes ([694936e](https://github.com/nayadev/seal_ui_react/commit/694936ee2837965baa7b2d69a5b1d3f192397fcc))
* **SealRadioGroup:** replace arbitrary token vars with token classes ([53caa21](https://github.com/nayadev/seal_ui_react/commit/53caa2150a487e51675a8329e88e9a51cfc3bceb))
* **SealResizable:** replace arbitrary token vars and inline styles with token classes ([99e1a10](https://github.com/nayadev/seal_ui_react/commit/99e1a10dfaaa4439da0e7ca8af61642942ace711))
* **SealSelect:** remove ROUNDED_SM constant and replace arbitrary token vars with token classes ([190bc32](https://github.com/nayadev/seal_ui_react/commit/190bc32a278837e52d8961216b50c0bcd4b89d31))
* **SealSeparator:** replace inline styles and TOKEN_* constants in stories with token classes ([e2249c2](https://github.com/nayadev/seal_ui_react/commit/e2249c27630fe0f1efe34b7e72cdf00ad297b5da))
* **SealSheet:** replace arbitrary token vars and hardcoded utilities with token classes ([a245db7](https://github.com/nayadev/seal_ui_react/commit/a245db796ee99d7cef4e0f130db649537498f619))
* **SealSlider:** replace arbitrary token vars with token classes ([3cc0abb](https://github.com/nayadev/seal_ui_react/commit/3cc0abb1e751e4175da753b559e3cba38f84cea7))
* **SealSwitch:** replace arbitrary token vars with token classes ([e338303](https://github.com/nayadev/seal_ui_react/commit/e338303df56aab50979b4f2c796d3a2aa6bfb4a7))
* **SealTable:** replace arbitrary token vars and hardcoded utilities with token classes ([33a99ae](https://github.com/nayadev/seal_ui_react/commit/33a99ae9925ec3b74d8fc05eb0c29fec7b29f768))
* **SealTabs:** replace arbitrary token vars and hardcoded utilities with token classes ([dba8900](https://github.com/nayadev/seal_ui_react/commit/dba89003ef4efa2b49886d7d68c543c280bf5d6a))
* **SealTextarea:** replace arbitrary token vars and inline styles with token classes ([5ce7877](https://github.com/nayadev/seal_ui_react/commit/5ce787767b78e0eb5c4a86bc99d1a8d865d7a032))
* **SealTextField:** replace arbitrary token vars and inline styles with token classes ([13d41b6](https://github.com/nayadev/seal_ui_react/commit/13d41b6ad9db5d3ceb521daac6f3d622dc03cb57))
* **SealTimePicker:** replace arbitrary token vars and typography utilities with token classes ([0fee051](https://github.com/nayadev/seal_ui_react/commit/0fee0512ae78f44eafaa1b8ea941f12f40bb4d8d))
* **SealToast:** replace gap arbitrary token var with token class in stories ([60bb276](https://github.com/nayadev/seal_ui_react/commit/60bb276aa8736936841d347e058c8c10500ebb50))
* **SealTooltip:** replace rounded/px/py/gap arbitrary token vars with token classes ([32560d9](https://github.com/nayadev/seal_ui_react/commit/32560d9ade11aff73f4dcff3f68f9debe40b5fa7))
* **SealTooltip:** replace text-sm, px/py hardcoded utilities with token classes in stories ([4b3bbe5](https://github.com/nayadev/seal_ui_react/commit/4b3bbe553e3e9df871d9ed4c4fb929adb05fcc16))

## [0.0.11](https://github.com/nayadev/seal_ui_react/compare/v0.0.10...v0.0.11) (2026-05-24)


### Features

* add copilot instructions for repository guidelines ([cbd994b](https://github.com/nayadev/seal_ui_react/commit/cbd994b2ab1489d971650ebc005e0a8032aef17f))
* add filled button component ([2b735d3](https://github.com/nayadev/seal_ui_react/commit/2b735d3f6e8c20bfaf8a46865a12428263c370d5))
* add SealAccordion component ([170a6d1](https://github.com/nayadev/seal_ui_react/commit/170a6d1cbb9dab2b77a6120d0dd5317c649d824a))
* add SealAlert component ([5f8a5ac](https://github.com/nayadev/seal_ui_react/commit/5f8a5ac007f2a27e64905bf7d2b48747f398c177))
* add SealAvatar component ([bfcaf5b](https://github.com/nayadev/seal_ui_react/commit/bfcaf5bfe024f453b58287e5cee6eb2378130755))
* add SealBadge component ([356ef48](https://github.com/nayadev/seal_ui_react/commit/356ef48c5df034ee681eb8e991ad9e7e216651b0))
* add SealBouncingDots component ([a7e4c7d](https://github.com/nayadev/seal_ui_react/commit/a7e4c7d13f91caf2a6f044c7c45a9d3110249c51))
* add SealBreadcrumb component ([da57380](https://github.com/nayadev/seal_ui_react/commit/da573801014dcc375ce5d49a532c2c5ea60b39fb))
* add SealCalendar component ([6a94b5c](https://github.com/nayadev/seal_ui_react/commit/6a94b5cd1bc53e35fe2c5225ae3d6498be90a077))
* add SealCard component ([cf93eaa](https://github.com/nayadev/seal_ui_react/commit/cf93eaa562268d1d6f2c5e0f522aa60848083d03))
* add SealCheckbox component ([41ac682](https://github.com/nayadev/seal_ui_react/commit/41ac682d428404356c84fe24a6b36eb8c13b17e8))
* add SealContainer component ([a68d5ae](https://github.com/nayadev/seal_ui_react/commit/a68d5ae3ff574e515b9cc41a2062ff54b951aa36))
* add SealContextMenu component ([ea4a40e](https://github.com/nayadev/seal_ui_react/commit/ea4a40e8ff1785a98060d189d9bda5afaea632f0))
* add SealDatePicker component ([36e070a](https://github.com/nayadev/seal_ui_react/commit/36e070a89776d53565d1912ad7e0dd23971ad8b2))
* add SealDialog component ([8867001](https://github.com/nayadev/seal_ui_react/commit/88670014524543f4fa27bb62aacf856ae14c62a2))
* add SealFilledIconButton component ([239f287](https://github.com/nayadev/seal_ui_react/commit/239f287ccfa766f0caa4ce6a0fb0fddb1e2f8357))
* add SealForm component ([7aa5f3b](https://github.com/nayadev/seal_ui_react/commit/7aa5f3ba8556ec1a74c40cd9c8dca3153d8a3650))
* add SealIconButton component ([873d6b2](https://github.com/nayadev/seal_ui_react/commit/873d6b29f4f56d8c78c36e65952ce47182c9f557))
* add SealInputOtp component ([de19769](https://github.com/nayadev/seal_ui_react/commit/de19769c7c2953e2ce1bee89405edc42dab9b7ca))
* add SealLoader component ([8490ab0](https://github.com/nayadev/seal_ui_react/commit/8490ab046022e26dbfb1fd91dd3dd18d33f66675))
* add SealMenubar component ([7e45a37](https://github.com/nayadev/seal_ui_react/commit/7e45a371f67400b8050b32efff6133728ae01831))
* add SealOutlineIconButton component ([b1e40d2](https://github.com/nayadev/seal_ui_react/commit/b1e40d20f3340eb2d0e2c7a0f771132ad1ae6bdf))
* add SealPopover component ([0e3bef7](https://github.com/nayadev/seal_ui_react/commit/0e3bef7d89a148a315ee4b953a2e7798630b670e))
* add SealProgress component ([d7c9338](https://github.com/nayadev/seal_ui_react/commit/d7c933831850870060c91fb288d9110569b25ab0))
* add SealRadioGroup component ([099258a](https://github.com/nayadev/seal_ui_react/commit/099258af151a071f1859fc8aeaa6dc8eaff8948c))
* add SealResizable component ([ddfe313](https://github.com/nayadev/seal_ui_react/commit/ddfe3134072ce9242278312609939138c9ecdec4))
* add SealSelect component ([2945d41](https://github.com/nayadev/seal_ui_react/commit/2945d41359e690e57c0f1c697849a020dcdaeccb))
* add SealSeparator component ([261366d](https://github.com/nayadev/seal_ui_react/commit/261366dc11cefcf4022cafd0bd9ea80d2a851209))
* add SealSheet component ([3186c96](https://github.com/nayadev/seal_ui_react/commit/3186c962c33aef1b1d2edf74d7f55c6f37ec1feb))
* add SealSlider component ([94d9d2a](https://github.com/nayadev/seal_ui_react/commit/94d9d2a6de05c56f16671f9e66093bdc546c74dc))
* add SealSwitch component ([2c8b759](https://github.com/nayadev/seal_ui_react/commit/2c8b7597ad41eec257b528f7d7bb3d84b529ba25))
* add SealTable component ([2dd3b37](https://github.com/nayadev/seal_ui_react/commit/2dd3b372816cf7f85109cb37aaeabadea7ecdc24))
* add SealTabs component ([04b610e](https://github.com/nayadev/seal_ui_react/commit/04b610eea4403f3d1a2a54189b37d708bc895a5a))
* add SealTextarea component ([6aab5e3](https://github.com/nayadev/seal_ui_react/commit/6aab5e34abeb492a7604c868d34e98014ae1ba8b))
* add SealTextField component ([b4db5e9](https://github.com/nayadev/seal_ui_react/commit/b4db5e90ee3803a8ba75da7fa26b09c75024f763))
* add SealTimePicker component ([0025bc8](https://github.com/nayadev/seal_ui_react/commit/0025bc8976948fd99f4938f1d11ad20f2ecf79ec))
* add SealToast and SealSonner components ([c5d3369](https://github.com/nayadev/seal_ui_react/commit/c5d3369897dd81c3fa020f14cc209cfe5b5dd609))
* add SealTooltip component ([895890f](https://github.com/nayadev/seal_ui_react/commit/895890ff97dfd4f42ef5449838633d2dcd912566))
* **buttons:** add outline button component ([b93aba2](https://github.com/nayadev/seal_ui_react/commit/b93aba28340073641630f3a697d6dd597066d0b6))
* **buttons:** add SealTextButton component ([842b25a](https://github.com/nayadev/seal_ui_react/commit/842b25aecab23ae6f45cad71243b4df9f1b5308c))
* exclude CHANGELOG.md from Prettier formatting ([9ce1983](https://github.com/nayadev/seal_ui_react/commit/9ce19836c30aff62bd2d6a980b77fd74f1b62c47))
* exclude src/components/ui/ from Prettier formatting ([fd8c81d](https://github.com/nayadev/seal_ui_react/commit/fd8c81de2e7572c2aa293fdfac05e95658d3b193))
* replace spinner with bouncing dots animation in button loading state ([7745a39](https://github.com/nayadev/seal_ui_react/commit/7745a395e7e4d16d9cd6140317eba42a1f4dd81e))
* **SealOutlineButton:** paint icon stroke with SVG gradient matching token direction ([5aff10c](https://github.com/nayadev/seal_ui_react/commit/5aff10c08d7f1368afaa14353824004722069b38))
* **storybook:** add MCP server via addon-mcp ([5d5941f](https://github.com/nayadev/seal_ui_react/commit/5d5941f9728ed9e483174a8766f9e95a5693331e))
* **storybook:** sync docs page background with active Seal theme ([b13f249](https://github.com/nayadev/seal_ui_react/commit/b13f2494414212cc213486cd3d0237316e416e57))


### Bug Fixes

* **accordion:** restore hover underline and add disabled item story ([bb97a83](https://github.com/nayadev/seal_ui_react/commit/bb97a83d6742b37085956e89c9247d14daf69c0f))
* **accordion:** suppress hover underline on disabled items ([33b8d9d](https://github.com/nayadev/seal_ui_react/commit/33b8d9d277d8be7f3e7b145ba52a75a9ce92ecdf))
* align SealCalendar and SealDatePicker visuals with Flutter ([19904f9](https://github.com/nayadev/seal_ui_react/commit/19904f95075cf2a83520bfe71eee0cbca9102855))
* bring existing components into full compliance with project rules ([084cc34](https://github.com/nayadev/seal_ui_react/commit/084cc34ac971b0ab2195fda700874b71582e0974))
* bring existing components into full compliance with project rules ([b371af7](https://github.com/nayadev/seal_ui_react/commit/b371af719ab1faf2b46e9cafe42e2e041724b755))
* **buttons:** flip negated ternaries to satisfy Sonar rule ([3c6e37e](https://github.com/nayadev/seal_ui_react/commit/3c6e37e1c4c85cc38659d3ec799d240f912e097e))
* **buttons:** make gradient outline border transparent via mask-composite ([e6ad46e](https://github.com/nayadev/seal_ui_react/commit/e6ad46e801213d14272c721a30203c13edbf74ad))
* **buttons:** parse custom gradient stop colors for SVG icon gradient ([8febdfa](https://github.com/nayadev/seal_ui_react/commit/8febdfa2e4c6770db7dca354ea97daaa391ebf5e))
* **buttons:** use first gradient stop for outline hover fill ([ec81e7b](https://github.com/nayadev/seal_ui_react/commit/ec81e7bfa55bbede0f5f5dd661150685f48a80dc))
* **buttons:** use parsed gradient color as border base for custom gradient outlines ([a45c156](https://github.com/nayadev/seal_ui_react/commit/a45c156952507a0d67be54a401e0d743c46e165d))
* **calendar:** align dropdown arrow inline with month/year label ([18ed4ac](https://github.com/nayadev/seal_ui_react/commit/18ed4acedd4b193ad48a25dd736384c83630c27f))
* **calendar:** change week start from Monday to Sunday ([85969f8](https://github.com/nayadev/seal_ui_react/commit/85969f88d4c30ae121057137d98f2c75b30a27c4))
* **ci:** exclude test and infra files from sonarcloud coverage ([b6669cd](https://github.com/nayadev/seal_ui_react/commit/b6669cd9c1d98c1f0751ac42eac26a29d3a2dbb1))
* **ci:** run only unit tests for coverage in sonarcloud workflow ([fcf57d5](https://github.com/nayadev/seal_ui_react/commit/fcf57d5bd420d3ddc36a45d5a526beb9bdc6ccb5))
* correct text color logic in SealAlert component to satisfy Sonar rules ([dc5c880](https://github.com/nayadev/seal_ui_react/commit/dc5c8803852e1ce51ee072dd2d1e7dee7904d5a5))
* **css:** wire Tailwind v4 [@theme](https://github.com/theme) to generate all seal token utility classes ([58ed42c](https://github.com/nayadev/seal_ui_react/commit/58ed42c5d4868229ce5fb6458694ea29062f2ebe))
* **deps:** update dependency lucide-react to ^0.577.0 ([#21](https://github.com/nayadev/seal_ui_react/issues/21)) ([8ece9c8](https://github.com/nayadev/seal_ui_react/commit/8ece9c8cf5e7d322a794aad7028cf1b033d5fda5))
* **deps:** update dependency lucide-react to v1 ([#30](https://github.com/nayadev/seal_ui_react/issues/30)) ([83091d1](https://github.com/nayadev/seal_ui_react/commit/83091d1acd91ade3f806f318d3d4dcef2380275f))
* **deps:** update dependency react-day-picker to v10 ([#31](https://github.com/nayadev/seal_ui_react/issues/31)) ([9da25a0](https://github.com/nayadev/seal_ui_react/commit/9da25a0af10236d0f2002b83f14696c39852f070))
* **deps:** update dependency tailwind-merge to v3 ([#32](https://github.com/nayadev/seal_ui_react/issues/32)) ([1b5e376](https://github.com/nayadev/seal_ui_react/commit/1b5e376ea12460f508e64afe103e510ccb12859f))
* enforce no-negated-condition via ESLint and fix violations ([22478a6](https://github.com/nayadev/seal_ui_react/commit/22478a69cde77bc4bb734fbb48a6c57f86555b38))
* **package:** move "types" condition before "import" and "require" in exports ([bac96a4](https://github.com/nayadev/seal_ui_react/commit/bac96a407b49b65e83d233cdf6237e694cf3203a))
* **README:** update version badge to release badge for consistency ([4195571](https://github.com/nayadev/seal_ui_react/commit/4195571b9052a0d1d66a2d27946be968193b4d08))
* reinitialize shadcn via CLI and restore proper component setup ([19bab1a](https://github.com/nayadev/seal_ui_react/commit/19bab1a872a8dde52086c367a0fe4311239dd518))
* remove baseUrl and ignoreDeprecations — invalid in TypeScript 6 ([c0645be](https://github.com/nayadev/seal_ui_react/commit/c0645be3694fa212c64beb64b5ddeb2299d026cc))
* remove mdx story pattern with no matching files ([921d1a6](https://github.com/nayadev/seal_ui_react/commit/921d1a63aa3f71f7e873db45a9b080baf8e444db))
* rename deprecated 'table' classname key to 'month_grid' in calendar primitive ([61a0280](https://github.com/nayadev/seal_ui_react/commit/61a028012c30a3d9546c3ba79bdd41b4f3e37635))
* resolve sonarcloud issues in project foundation ([a5c9b88](https://github.com/nayadev/seal_ui_react/commit/a5c9b8848db729772efaa02ff6958ef4fd54acb0))
* resolve sonarcloud issues in project foundation ([2663d08](https://github.com/nayadev/seal_ui_react/commit/2663d080c3c925a47f64bf19d1cbdea65f588867))
* resolve SonarQube S7735 negated conditions in SealToast ([70b3521](https://github.com/nayadev/seal_ui_react/commit/70b3521eb89e64427dc96a0448883608cb09cbde))
* resolve tailwind static scanning for dynamic hover classes ([71d5453](https://github.com/nayadev/seal_ui_react/commit/71d5453448ca2f5062f148c1e20ad94077d657e1))
* **SealAlert:** bring component into full compliance ([6257f53](https://github.com/nayadev/seal_ui_react/commit/6257f535805ac790a5ab8dc1e768bda919bae2fd))
* **SealBouncingDots:** replace gap-6 with gap-dimension-lg token in stories ([67417af](https://github.com/nayadev/seal_ui_react/commit/67417af7d9e1a64a7608cfdf8d255c8912e8b527))
* **SealCalendar:** bring component into full compliance with project rules ([777355b](https://github.com/nayadev/seal_ui_react/commit/777355b05d61cfab8de92268dbd10ced67722d50))
* **SealCalendar:** remove what-comment from CSS tokens test ([01e6f19](https://github.com/nayadev/seal_ui_react/commit/01e6f194a0da2f9c4f8c360aa08a4b7185ca27a0))
* **SealCheckbox:** bring stories into full compliance ([721ea3a](https://github.com/nayadev/seal_ui_react/commit/721ea3a4536e043dbd27b40305d291be35e299b2))
* **SealCheckbox:** remove what-comment from test ([1f80a2c](https://github.com/nayadev/seal_ui_react/commit/1f80a2c28f5991ba86e78d3bb0593e54fbe2bb80))
* **SealDatePicker:** replace inline styles with token classes and className in stories ([d66b91e](https://github.com/nayadev/seal_ui_react/commit/d66b91e7f109dd66b1af72a0da6447834bfd85b8))
* **SealFilledIconButton:** replace gap-4 with gap-dimension-md token ([9846511](https://github.com/nayadev/seal_ui_react/commit/9846511a413f850e3984d61b3ec9601b71449e19))
* **SealIconButton:** remove obvious what-comments from implementation ([48289a5](https://github.com/nayadev/seal_ui_react/commit/48289a572a03fdd044c5e1e86c648b8756f4f849))
* **SealIconButton:** replace gap-4 with gap-dimension-md token ([26e1b62](https://github.com/nayadev/seal_ui_react/commit/26e1b6241e7760aaacededcba35280aa32311c2a))
* **SealInputOtp:** prevent input-otp timer from firing after jsdom teardown ([4308959](https://github.com/nayadev/seal_ui_react/commit/4308959319a8cb1b8cd13ebdeb53333eebb58369))
* **SealInputOtp:** replace text-sm/font-medium and gap-4 with token classes; remove what-comment ([d7cb3e1](https://github.com/nayadev/seal_ui_react/commit/d7cb3e16ba15654cbacbd37601b27ecb72b614df))
* **SealInputOtp:** use brand primary focus ring and remove dot separator ([7eafba2](https://github.com/nayadev/seal_ui_react/commit/7eafba29c3413a4a46b20da95cac25178be30ee3))
* **SealLoader:** remove what-comment from test ([945c822](https://github.com/nayadev/seal_ui_react/commit/945c8226e8dc1b3cebb5adc0a58489b20ac3153a))
* **SealOutlineButton:** replace gap-3 with gap-dimension-sm token ([81bb50c](https://github.com/nayadev/seal_ui_react/commit/81bb50c972978182b51eeaac977d16cbd62152d6))
* **SealOutlineIconButton:** replace gap-4 with gap-dimension-md token in AllVariants story ([418f572](https://github.com/nayadev/seal_ui_react/commit/418f5724dacfd1bfe9896f63f9a7a810452f33b7))
* **SealProgress:** bring component into full compliance ([907c54d](https://github.com/nayadev/seal_ui_react/commit/907c54d13e3777267692c8b181116d9f00dc4ad2))
* **SealProgress:** replace text-sm with text-style-small token in AllVariants story ([e526449](https://github.com/nayadev/seal_ui_react/commit/e52644946595a81abb062443a4f198fa17db901b))
* **SealRadioGroup:** bring component into full compliance ([c96cb45](https://github.com/nayadev/seal_ui_react/commit/c96cb45123ee0784ea2ddcd490356b1c1b5465f7))
* **SealRadioGroup:** replace text-sm with text-style-small token in AllVariants story ([b8155cb](https://github.com/nayadev/seal_ui_react/commit/b8155cb8833e8cf96f43babd7d7f2ac63c554ae7))
* **SealSelect:** bring component into full compliance ([fc86b97](https://github.com/nayadev/seal_ui_react/commit/fc86b976a4f569124b83abb0f3b450b8921a3b67))
* **SealSlider:** bring component into full compliance ([f4aabb2](https://github.com/nayadev/seal_ui_react/commit/f4aabb2be399855775847cebb02779537a32de07))
* **SealSlider:** replace gap-3/text-sm with token classes in Controlled story ([540e344](https://github.com/nayadev/seal_ui_react/commit/540e344d4f955ba7381d8103f99ada60290baafd))
* **SealSonner:** bring component into full compliance ([1442f2f](https://github.com/nayadev/seal_ui_react/commit/1442f2fc7885cca9fe6dc2f4324edcddc56a513d))
* **SealSwitch:** bring component into full compliance ([add0ea7](https://github.com/nayadev/seal_ui_react/commit/add0ea7412a6c63fdc9b00776ca032cb3b782769))
* **SealSwitch:** replace inline styles with Tailwind token classes for label and sublabel ([7c4a470](https://github.com/nayadev/seal_ui_react/commit/7c4a470d4bde73b7f255370110a922792de6dabb))
* **SealSwitch:** update gap styling to use CSS variable ([0a34303](https://github.com/nayadev/seal_ui_react/commit/0a343036d65da7d1b6c51c7c6906509724ee4ac7))
* **SealTextButton:** keep button background transparent for gradient variants ([8eea17f](https://github.com/nayadev/seal_ui_react/commit/8eea17fec41742100ca30662507bc2674ae7c72b))
* **SealTextButton:** replace gap-3 with gap-dimension-sm token ([3c74592](https://github.com/nayadev/seal_ui_react/commit/3c74592eba16ab3df4102ad0265cd52f4bb0a6e6))
* **SealTextField:** remove what-comment from test ([72f552b](https://github.com/nayadev/seal_ui_react/commit/72f552b11b558a3e425ab32dacd24087696e7da7))
* **SealTimePicker:** derive PeriodSelect from SealSelect and align spacing ([533dbf0](https://github.com/nayadev/seal_ui_react/commit/533dbf04da5e7b3550e5194ca3b9a727ba517807))
* **SealTimePicker:** increase spacing between time fields and period select ([0b0ce5a](https://github.com/nayadev/seal_ui_react/commit/0b0ce5acf51a13f2b7b365643f0806977fae2ae0))
* **SealTimePicker:** replace AM/PM toggle with dropdown select ([04494cc](https://github.com/nayadev/seal_ui_react/commit/04494cc5beed435d597b51807166cf18112cba21))
* **SealTimePicker:** replace text-sm/font-medium with token classes; gap inline style in AllVariants ([b7fd51b](https://github.com/nayadev/seal_ui_react/commit/b7fd51bfb00bd7c4ae81dcf3d5949f59dadce8b2))
* **SealToast:** remove border to match Flutter reference ([c8a51cf](https://github.com/nayadev/seal_ui_react/commit/c8a51cf17488c0129d103e6fb4192aefdad77c00))
* **SealToast:** revert border to --seal-border-default ([2b62d11](https://github.com/nayadev/seal_ui_react/commit/2b62d11c5b14d1990041b6f85f98026f1d2ab63b))
* **SealToast:** use accent color for border and action button ([4a09890](https://github.com/nayadev/seal_ui_react/commit/4a09890a6d13981da731144503d7bb2a3729c1f2))
* **stories:** bring SealFilledButton stories into full compliance ([0fe089c](https://github.com/nayadev/seal_ui_react/commit/0fe089c5f39346652cf2cfc110bf8ec7b8755f43))
* **stories:** bring SealOutlineButton stories into full compliance ([6e93420](https://github.com/nayadev/seal_ui_react/commit/6e9342031dc05debb595f0b6fef51bc17458c18a))
* **stories:** bring SealTextButton stories into full compliance ([5e1b4b4](https://github.com/nayadev/seal_ui_react/commit/5e1b4b48809438f9de2c9865d7a389c8848496b0))
* **stories:** make AllVariants controls functional ([666b08c](https://github.com/nayadev/seal_ui_react/commit/666b08c495e31076eb3b0f806bc18d5d08fe6b8e))
* **stories:** replace var() workarounds with Tailwind token utility classes ([7197881](https://github.com/nayadev/seal_ui_react/commit/719788180978f0581b1f7f9d816b85148af5deda))
* **storybook:** mount SealSonner once globally to prevent multi-toaster firing ([cf25d65](https://github.com/nayadev/seal_ui_react/commit/cf25d65d579bc87708747c9fa4bf486ff0822140))
* theme and mode switching in Storybook toolbar ([19ecd71](https://github.com/nayadev/seal_ui_react/commit/19ecd713208b087874d8bb5eb6ee45a41616bccb))
* update border styles in SealCalendar, SealDatePicker, and SealSlider components ([851d6bb](https://github.com/nayadev/seal_ui_react/commit/851d6bb6260006ee45924525213a0edac617c9c7))
* update PreSelected variant to SealSelect stories with controlled state ([4a5437d](https://github.com/nayadev/seal_ui_react/commit/4a5437dc4e2c4a8a4f868bce2b9bd646616f772b))
* update SealCalendarDayButton props to remove unnecessary undefined types ([f9dc935](https://github.com/nayadev/seal_ui_react/commit/f9dc9352f527e7fbf70625e6b0814b6a25016bd3))
* use SealTextButton and SealFilledButton in SealCard story footer ([30a4d7e](https://github.com/nayadev/seal_ui_react/commit/30a4d7e3b524d598fa4710accb755a30459dbcc6))

## [0.0.10](https://github.com/nayadev/seal_ui_react/compare/v0.0.9...v0.0.10) (2026-05-24)


### Features

* add SealContextMenu component ([5ddaeef](https://github.com/nayadev/seal_ui_react/commit/5ddaeef2f9e2d66f4761c7fb8f257fdfcb69a1fe))
* add SealDialog component ([40f4662](https://github.com/nayadev/seal_ui_react/commit/40f4662423f6859fed044e639e1ad215983fa373))
* add SealPopover component ([541e082](https://github.com/nayadev/seal_ui_react/commit/541e082bac634256472a8fb2c70ec5b57835e8d5))
* add SealSheet component ([b3b67e4](https://github.com/nayadev/seal_ui_react/commit/b3b67e4598289fffb8a42b30e2e13e4e8dfabd0c))

## [0.0.9](https://github.com/nayadev/seal_ui_react/compare/v0.0.8...v0.0.9) (2026-05-24)


### Features

* add SealBadge component ([7ce0f42](https://github.com/nayadev/seal_ui_react/commit/7ce0f422e0ad96385268da6019c73fc218cccc6e))
* add SealBreadcrumb component ([c62902c](https://github.com/nayadev/seal_ui_react/commit/c62902c452293d69ad831d0af92adf12e3d5d482))
* add SealCard component ([91eae0d](https://github.com/nayadev/seal_ui_react/commit/91eae0dac1509b92ae2926527f3670298b0d8ae3))
* add SealContainer component ([9151875](https://github.com/nayadev/seal_ui_react/commit/9151875c972c1c4fa5421e8c369a91f74d5d4526))
* add SealMenubar component ([4cefb59](https://github.com/nayadev/seal_ui_react/commit/4cefb59e497d303b2d975a1906be0c5baf16bdda))
* add SealResizable component ([29d84f0](https://github.com/nayadev/seal_ui_react/commit/29d84f0119976d5550bac0d9b5e2322831667e5f))
* add SealSeparator component ([5de9ac9](https://github.com/nayadev/seal_ui_react/commit/5de9ac9c7a88471fed3a0ac339b7dbcd329d9d1b))
* add SealTable component ([0f6b365](https://github.com/nayadev/seal_ui_react/commit/0f6b3652321b20c61af4b779db49de3d6507ee66))


### Bug Fixes

* rename deprecated 'table' classname key to 'month_grid' in calendar primitive ([80f5e3f](https://github.com/nayadev/seal_ui_react/commit/80f5e3f426d64c66db09ace970932ad7070e095c))
* use SealTextButton and SealFilledButton in SealCard story footer ([6a3e26e](https://github.com/nayadev/seal_ui_react/commit/6a3e26e43105414bcca5e6e7523872c5e9ea09e7))

## [0.0.8](https://github.com/nayadev/seal_ui_react/compare/v0.0.7...v0.0.8) (2026-05-24)


### Bug Fixes

* **calendar:** align dropdown arrow inline with month/year label ([fcf2f08](https://github.com/nayadev/seal_ui_react/commit/fcf2f088415a6fdb345aa427b0a153cd0d93abeb))
* **calendar:** change week start from Monday to Sunday ([6a48ee7](https://github.com/nayadev/seal_ui_react/commit/6a48ee7f8dd428c73501709b2db896137b9ec37d))
* **deps:** update dependency lucide-react to v1 ([#30](https://github.com/nayadev/seal_ui_react/issues/30)) ([fdd24c5](https://github.com/nayadev/seal_ui_react/commit/fdd24c5212cf70551bed14fe5ced34a7c4550c7e))
* **deps:** update dependency react-day-picker to v10 ([#31](https://github.com/nayadev/seal_ui_react/issues/31)) ([3cc79ac](https://github.com/nayadev/seal_ui_react/commit/3cc79acd16897f679244f55e9408b9162fea0901))
* **deps:** update dependency tailwind-merge to v3 ([#32](https://github.com/nayadev/seal_ui_react/issues/32)) ([c3ffcbd](https://github.com/nayadev/seal_ui_react/commit/c3ffcbdbf5c957b9f5060467e07fc3d4aae902c1))

## [0.0.7](https://github.com/nayadev/seal_ui_react/compare/v0.0.6...v0.0.7) (2026-05-10)


### Features

* add SealAccordion component ([e98cc7d](https://github.com/nayadev/seal_ui_react/commit/e98cc7d3d5fc76faa1b0baedbd1756964d147746))
* add SealAvatar component ([eb6edd2](https://github.com/nayadev/seal_ui_react/commit/eb6edd2d9ffe0db5d6df4e367f39cb7e8f3a2a4f))


### Bug Fixes

* **accordion:** restore hover underline and add disabled item story ([9aa2cba](https://github.com/nayadev/seal_ui_react/commit/9aa2cbae1f9fb23f9603c7ef14b18d48aaa047a5))
* **accordion:** suppress hover underline on disabled items ([e4a85c4](https://github.com/nayadev/seal_ui_react/commit/e4a85c48fc4952d3853f487d2597f41271f3e7bb))
* bring existing components into full compliance with project rules ([6718f03](https://github.com/nayadev/seal_ui_react/commit/6718f03be3d7a8cd0d789b78df4835a69820bc11))
* **deps:** update dependency lucide-react to ^0.577.0 ([#21](https://github.com/nayadev/seal_ui_react/issues/21)) ([4318965](https://github.com/nayadev/seal_ui_react/commit/4318965e94ed727c2fa403614bfb54838e3967eb))

## [0.0.6](https://github.com/nayadev/seal_ui_react/compare/v0.0.5...v0.0.6) (2026-05-03)


### Features

* add SealTooltip component ([8d85a77](https://github.com/nayadev/seal_ui_react/commit/8d85a770da639a44a6188ead8c8f3f4a1090d3ad))
* **storybook:** sync docs page background with active Seal theme ([9c665f1](https://github.com/nayadev/seal_ui_react/commit/9c665f16572f11118ab2a3cb9f5353f16dbaafbc))

## [0.0.5](https://github.com/nayadev/seal_ui_react/compare/v0.0.4...v0.0.5) (2026-05-02)


### Features

* add copilot instructions for repository guidelines ([cd52f02](https://github.com/nayadev/seal_ui_react/commit/cd52f02df2b9060d2f959e9ce2a8b4cb53a120af))
* add SealCalendar component ([e28f4ec](https://github.com/nayadev/seal_ui_react/commit/e28f4ec7c65c5b2c280584f99c75c409e7eb7e5c))
* add SealCheckbox component ([01b4b92](https://github.com/nayadev/seal_ui_react/commit/01b4b92e6fc2db155bdde4f23d6b9566d491fd4e))
* add SealDatePicker component ([b45d0fc](https://github.com/nayadev/seal_ui_react/commit/b45d0fcbdb801241303b7347ce78b71d2a96fc24))
* add SealForm component ([38b4b6e](https://github.com/nayadev/seal_ui_react/commit/38b4b6e8517f05cb1776bcd8b2259ea9c1c1ce01))
* add SealInputOtp component ([72e0658](https://github.com/nayadev/seal_ui_react/commit/72e0658e5ee14864acfaeae4fcc3de69c6ee2b3f))
* add SealRadioGroup component ([d851b9e](https://github.com/nayadev/seal_ui_react/commit/d851b9ed54341d5c95a89031a60be3bba5c92415))
* add SealSelect component ([34015e7](https://github.com/nayadev/seal_ui_react/commit/34015e757803725227221cc257a166749e6171ba))
* add SealSlider component ([d797e55](https://github.com/nayadev/seal_ui_react/commit/d797e55b6aaf97d0d81ba7ad37e4099e624a623b))
* add SealSwitch component ([15c28a0](https://github.com/nayadev/seal_ui_react/commit/15c28a03136217f3cb67dc394b958219ced9c798))
* add SealTextarea component ([1197b33](https://github.com/nayadev/seal_ui_react/commit/1197b333f84f922e0c15378dd907bed04eafb66c))
* add SealTextField component ([c51521b](https://github.com/nayadev/seal_ui_react/commit/c51521b8ebf17b726908bb04a0107c36010439de))
* add SealTimePicker component ([9dd3008](https://github.com/nayadev/seal_ui_react/commit/9dd300894e64ee93917efae31c8e54ab8aa54505))
* exclude CHANGELOG.md from Prettier formatting ([ce2230a](https://github.com/nayadev/seal_ui_react/commit/ce2230acf777cc12e7ade8e72f94b7810de288f6))
* exclude src/components/ui/ from Prettier formatting ([b0a1184](https://github.com/nayadev/seal_ui_react/commit/b0a11841fce9508577421b7697fcc7c5f173d1f9))


### Bug Fixes

* align SealCalendar and SealDatePicker visuals with Flutter ([06a6be6](https://github.com/nayadev/seal_ui_react/commit/06a6be6948b49c5adf81c9a8c574200dac4c8c38))
* **README:** update version badge to release badge for consistency ([f886293](https://github.com/nayadev/seal_ui_react/commit/f88629339578689d4a8b261b4512cb618eed73ff))
* resolve sonarcloud issues in project foundation ([d68c5b2](https://github.com/nayadev/seal_ui_react/commit/d68c5b25b331bb5d2cb69f1856e8a953cbe0bebc))
* **SealInputOtp:** prevent input-otp timer from firing after jsdom teardown ([a675ae4](https://github.com/nayadev/seal_ui_react/commit/a675ae42678056e7866393f781d757611edc18b0))
* **SealInputOtp:** use brand primary focus ring and remove dot separator ([986a819](https://github.com/nayadev/seal_ui_react/commit/986a81914e0c6acd35cac7d21cf2e708db6e96c3))
* **SealTimePicker:** derive PeriodSelect from SealSelect and align spacing ([07ab312](https://github.com/nayadev/seal_ui_react/commit/07ab3121470cd55cb1efa3e8797b7d563bf9d495))
* **SealTimePicker:** increase spacing between time fields and period select ([7ae5325](https://github.com/nayadev/seal_ui_react/commit/7ae53256386201857eaa9ebb84a76615272ee961))
* **SealTimePicker:** replace AM/PM toggle with dropdown select ([0b80411](https://github.com/nayadev/seal_ui_react/commit/0b80411bbae872fbabe273eb851af50ae15cb1fc))
* update border styles in SealCalendar, SealDatePicker, and SealSlider components ([5911231](https://github.com/nayadev/seal_ui_react/commit/5911231d82e958ba255225c675c722e3e08a1051))
* update PreSelected variant to SealSelect stories with controlled state ([787487c](https://github.com/nayadev/seal_ui_react/commit/787487c4dc613d96dcf4a0bc6d02bdfbdd60cc9b))
* update SealCalendarDayButton props to remove unnecessary undefined types ([7b1b34a](https://github.com/nayadev/seal_ui_react/commit/7b1b34aa4f25bf6fc28de54e211648e653f91c4d))

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
