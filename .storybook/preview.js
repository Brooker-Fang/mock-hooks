import { configure } from '@storybook/react';
//排列目录的顺序
const loaderFn = () => {
  const allExports = [
      require('../src/welcome.stories.tsx'),
  ];
  const req = require.context('../src/hooks', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};
configure(loaderFn, module);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}