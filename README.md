React Render
====
#### Rete.js plugin

```js
import ReactRenderPlugin from 'rete-react-render-plugin';

editor.use(ReactRenderPlugin);
```

Create control:
```jsx
class MyReactControl extends React.Component {

  componentDidMount() {
      // this.props.getData
      // this.props.putData
  }

  render() {
    return (
        <div>Hello ${this.props.name}!</div>
    )
  }
}

class MyControl extends Rete.Control {
  constructor(emitter, key, name) {
    super(key);
    this.render = 'react';
    this.component = MyReactControl;
    this.props = { emitter, name };
  }
}
```

Customize node: 
```jsx
import ReactRenderPlugin, { Node, Socket, Control } from 'rete-react-render-plugin';


export class MyNode extends Node {
  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    return (
      <div className={`node ${selected}`}>
        <div className="title">{node.name}</div>
        {/* Outputs */}
        {outputs.map((output) => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket type="output" socket={output.socket} io={output} innerRef={bindSocket} />
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control className="control" key={control.key} control={control} innerRef={bindControl} />
        ))}
        {/* Inputs */}
        {inputs.map(input => (
          <div className="input" key={input.key}>
            <Socket type="input" socket={input.socket} io={input} innerRef={bindSocket} />
            {!input.showControl() && <div className="input-title">{input.name}</div>}
            {input.showControl() && <Control className="input-control" control={input.control} innerRef={bindControl} />}
          </div>
        ))}
      </div>
    )
  }
}

editor.use(ReactRenderPlugin, {
    component: MyNode
}
```