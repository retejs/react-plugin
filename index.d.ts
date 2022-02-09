import * as React from 'react';
import { Plugin as RetePlugin } from 'rete/types/core/plugin';
import * as Rete from 'rete';

export type bindControl = (el: HTMLElement, control: Rete.Control) => void;
export type bindSocket = (el: HTMLElement, type: string, io: Rete.IO) => void;

export interface NodeState {
    outputs: Array<Rete.Output>
    controls: Array<Rete.Control>
    inputs: Array<Rete.Input>,
    selected: string
}

export interface NodeProps {
    node: Rete.Node,
    editor: Rete.NodeEditor,
    bindSocket: bindSocket,
    bindControl: bindControl
}

export interface SocketProps {
    type: string,
    socket: Rete.Socket,
    io: Rete.IO,
    innerRef: bindSocket,
    cssStyle?: React.CSSProperties
}

export interface ControlProps {
    className: string,
    key?: string, // not used where control is a child of an input
    control: Rete.Control,
    innerRef: bindControl
}

export declare class Node extends React.Component<NodeProps, NodeState> {
    render(): JSX.Element;
}  

export declare class Socket<T extends SocketProps> extends React.Component<T> {
    createRef(el: HTMLElement): void;
    render(): JSX.Element;
}

export declare class Control extends React.Component<ControlProps> {
    render(): JSX.Element;
}


/* 
rete react plugin implementation of rete control
- `component` must be set as the react component to render
- `props` must be the props passed to react component
*/
export declare abstract class ReteReactControl extends Rete.Control {
  props: any;
  update?: () => Promise<void>; // update() is declared at load time by rete react render plugin implementation
  render?: "react"; // render should be set to "react" or left as undefined for react render plugin
  abstract component: typeof React.Component; // "component" React property used to render Control with "props" variable
}


/*
rete react plugin implementation of rete component
- "data" has an optional "component" attribute used to render
*/
export interface DataObject {
  component?: typeof React.Component;
  render?: "react";
}
export declare abstract class ReteReactComponent extends Rete.Component {
  /** 
   * "data" property passed to renderer by rete
   * react renderer uses "component" if not null for rendering
   * */ 
  abstract data: DataObject;
}



export interface ReactRenderPlugin extends RetePlugin {
  install: (editor: Rete.NodeEditor, options: {
    component?: typeof Node
  }) => void
}
declare const _default: ReactRenderPlugin;
export default _default;