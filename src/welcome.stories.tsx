import { storiesOf } from "@storybook/react";
storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <div>
        <h2>模仿ahooks</h2>
        <div>
          官网 <a href="https://ahooks.js.org/">https://ahooks.js.org/</a>
        </div>
      </div>
      
    )
  }, {
    info: {disable: true}
  })