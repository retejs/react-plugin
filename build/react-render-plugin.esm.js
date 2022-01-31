/*!
* rete-react-render-plugin v0.2.1 
* (c) 2022  
* Released under the ISC license.
*/
function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

import React from 'react';
import ReactDOM from 'react-dom';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function kebab(str) {
  var replace = function replace(s) {
    return s.toLowerCase().replace(/ /g, '-');
  };

  return Array.isArray(str) ? str.map(replace) : replace(str);
}

var Control =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Control, _React$Component);

  function Control() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Control);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Control)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "createRef", function (el) {
      var _this$props = _this.props,
          innerRef = _this$props.innerRef,
          control = _this$props.control;
      el && innerRef(el, control);
    });

    return _this;
  }

  _createClass(Control, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          control = _this$props2.control;
      return React.createElement("div", {
        className: className,
        title: control.key,
        ref: this.createRef
      });
    }
  }]);

  return Control;
}(React.Component);

var Socket =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Socket, _React$Component);

  function Socket() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Socket);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Socket)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "createRef", function (el) {
      var _this$props = _this.props,
          innerRef = _this$props.innerRef,
          type = _this$props.type,
          io = _this$props.io;
      el && innerRef(el, type, io);
    });

    return _this;
  }

  _createClass(Socket, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          socket = _this$props2.socket,
          type = _this$props2.type;
      return React.createElement("div", {
        style: this.props.cssStyle,
        className: "socket ".concat(type, " ").concat(kebab(socket.name)),
        title: socket.name,
        ref: function ref(el) {
          return _this2.createRef(el);
        } // force update for new IO with a same key 

      });
    }
  }]);

  return Socket;
}(React.Component);

___$insertStyle(".node {\n  background: rgba(110, 136, 255, 0.8);\n  border: 2px solid #4e58bf;\n  border-radius: 10px;\n  cursor: pointer;\n  min-width: 180px;\n  height: auto;\n  padding-bottom: 6px;\n  box-sizing: content-box;\n  position: relative;\n  user-select: none;\n}\n.node:hover {\n  background: rgba(130, 153, 255, 0.8);\n}\n.node.selected {\n  background: #ffd92c;\n  border-color: #e3c000;\n}\n.node .title {\n  color: white;\n  font-family: sans-serif;\n  font-size: 18px;\n  padding: 8px;\n}\n.node .output {\n  text-align: right;\n}\n.node .input {\n  text-align: left;\n}\n.node .input-title, .node .output-title {\n  vertical-align: middle;\n  color: white;\n  display: inline-block;\n  font-family: sans-serif;\n  font-size: 14px;\n  margin: 6px;\n  line-height: 24px;\n}\n.node .input-control {\n  z-index: 1;\n  width: calc(100% - 36px);\n  vertical-align: middle;\n  display: inline-block;\n}\n.node .control {\n  padding: 6px 18px;\n}\n\n.socket {\n  display: inline-block;\n  cursor: pointer;\n  border: 1px solid white;\n  border-radius: 12px;\n  width: 24px;\n  height: 24px;\n  margin: 6px;\n  vertical-align: middle;\n  background: #96b38a;\n  z-index: 2;\n  box-sizing: border-box;\n}\n.socket:hover {\n  border-width: 4px;\n}\n.socket.multiple {\n  border-color: yellow;\n}\n.socket.output {\n  margin-right: -12px;\n}\n.socket.input {\n  margin-left: -12px;\n}");

var Node =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Node, _React$Component);

  function Node() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Node);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Node)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  _createClass(Node, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          node = _this$props.node,
          bindSocket = _this$props.bindSocket,
          bindControl = _this$props.bindControl;
      var _this$state = this.state,
          outputs = _this$state.outputs,
          controls = _this$state.controls,
          inputs = _this$state.inputs,
          selected = _this$state.selected;
      return React.createElement("div", {
        className: "node ".concat(selected, " ").concat(kebab(node.name))
      }, React.createElement("div", {
        className: "title"
      }, node.name), outputs.map(function (output) {
        return React.createElement("div", {
          className: "output",
          key: output.key
        }, React.createElement("div", {
          className: "output-title"
        }, output.name), React.createElement(Socket, {
          type: "output",
          socket: output.socket,
          io: output,
          innerRef: bindSocket
        }));
      }), controls.map(function (control) {
        return React.createElement(Control, {
          className: "control",
          key: control.key,
          control: control,
          innerRef: bindControl
        });
      }), inputs.map(function (input) {
        return React.createElement("div", {
          className: "input",
          key: input.key
        }, React.createElement(Socket, {
          type: "input",
          socket: input.socket,
          io: input,
          innerRef: bindSocket
        }), !input.showControl() && React.createElement("div", {
          className: "input-title"
        }, input.name), input.showControl() && React.createElement(Control, {
          className: "input-control",
          control: input.control,
          innerRef: bindControl
        }));
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref) {
      var node = _ref.node,
          editor = _ref.editor;
      return {
        outputs: Array.from(node.outputs.values()),
        controls: Array.from(node.controls.values()),
        inputs: Array.from(node.inputs.values()),
        selected: editor.selected.contains(node) ? 'selected' : ''
      };
    }
  }]);

  return Node;
}(React.Component);

/*!
* rete v1.4.5 
* (c) 2021 Vitaliy Stoliarov 
* Released under the MIT license.
*/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Component = function Component(name) {
  _classCallCheck$1(this, Component);

  _defineProperty$1(this, "name", void 0);

  _defineProperty$1(this, "data", {});

  _defineProperty$1(this, "engine", null);

  this.name = name;
};

var Node$1 =
/*#__PURE__*/
function () {
  function Node(name) {
    _classCallCheck$1(this, Node);

    _defineProperty$1(this, "name", void 0);

    _defineProperty$1(this, "id", void 0);

    _defineProperty$1(this, "position", [0.0, 0.0]);

    _defineProperty$1(this, "inputs", new Map());

    _defineProperty$1(this, "outputs", new Map());

    _defineProperty$1(this, "controls", new Map());

    _defineProperty$1(this, "data", {});

    _defineProperty$1(this, "meta", {});

    this.name = name;
    this.id = Node.incrementId();
  }

  _createClass$1(Node, [{
    key: "_add",
    value: function _add(list, item, prop) {
      if (list.has(item.key)) throw new Error("Item with key '".concat(item.key, "' already been added to the node"));
      if (item[prop] !== null) throw new Error('Item has already been added to some node');
      item[prop] = this;
      list.set(item.key, item);
    }
  }, {
    key: "addControl",
    value: function addControl(control) {
      this._add(this.controls, control, 'parent');

      return this;
    }
  }, {
    key: "removeControl",
    value: function removeControl(control) {
      control.parent = null;
      this.controls["delete"](control.key);
    }
  }, {
    key: "addInput",
    value: function addInput(input) {
      this._add(this.inputs, input, 'node');

      return this;
    }
  }, {
    key: "removeInput",
    value: function removeInput(input) {
      input.removeConnections();
      input.node = null;
      this.inputs["delete"](input.key);
    }
  }, {
    key: "addOutput",
    value: function addOutput(output) {
      this._add(this.outputs, output, 'node');

      return this;
    }
  }, {
    key: "removeOutput",
    value: function removeOutput(output) {
      output.removeConnections();
      output.node = null;
      this.outputs["delete"](output.key);
    }
  }, {
    key: "getConnections",
    value: function getConnections() {
      var ios = [].concat(_toConsumableArray(this.inputs.values()), _toConsumableArray(this.outputs.values()));
      var connections = ios.reduce(function (arr, io) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(io.connections));
      }, []);
      return connections;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "toJSON",
    value: function toJSON() {
      var reduceIO = function reduceIO(list) {
        return Array.from(list).reduce(function (obj, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              io = _ref2[1];

          obj[key] = io.toJSON();
          return obj;
        }, {});
      };

      return {
        'id': this.id,
        'data': this.data,
        'inputs': reduceIO(this.inputs),
        'outputs': reduceIO(this.outputs),
        'position': this.position,
        'name': this.name
      };
    }
  }], [{
    key: "incrementId",
    value: function incrementId() {
      if (!this.latestId) this.latestId = 1;else this.latestId++;
      return this.latestId;
    }
  }, {
    key: "resetId",
    value: function resetId() {
      this.latestId = 0;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var node = new Node(json.name);

      var _json$position = _slicedToArray(json.position, 2),
          x = _json$position[0],
          y = _json$position[1];

      node.id = json.id;
      node.data = json.data;
      node.position = [x, y];
      node.name = json.name;
      Node.latestId = Math.max(node.id, Node.latestId);
      return node;
    }
  }]);

  return Node;
}();

_defineProperty$1(Node$1, "latestId", 0);

var Component$1 =
/*#__PURE__*/
function (_ComponentWorker) {
  _inherits$1(Component, _ComponentWorker);

  function Component(name) {
    var _this;

    _classCallCheck$1(this, Component);

    _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(Component).call(this, name));

    _defineProperty$1(_assertThisInitialized$1(_this), "editor", null);

    _defineProperty$1(_assertThisInitialized$1(_this), "data", {});

    return _this;
  }

  _createClass$1(Component, [{
    key: "build",
    value: function () {
      var _build = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(node) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.builder(node);

              case 2:
                return _context.abrupt("return", node);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build(_x) {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: "createNode",
    value: function () {
      var _createNode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var data,
            node,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                node = new Node$1(this.name);
                node.data = data;
                _context2.next = 5;
                return this.build(node);

              case 5:
                return _context2.abrupt("return", node);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createNode() {
        return _createNode.apply(this, arguments);
      }

      return createNode;
    }()
  }]);

  return Component;
}(Component);

var Control$1 =
/*#__PURE__*/
function () {
  function Control(key) {
    _classCallCheck$1(this, Control);

    _defineProperty$1(this, "key", void 0);

    _defineProperty$1(this, "data", {});

    _defineProperty$1(this, "parent", null);

    if (this.constructor === Control) throw new TypeError('Can not construct abstract class');
    if (!key) throw new Error('The key parameter is missing in super() of Control ');
    this.key = key;
  }

  _createClass$1(Control, [{
    key: "getNode",
    value: function getNode() {
      if (this.parent === null) throw new Error('Control isn\'t added to Node/Input');
      if (this.parent instanceof Node$1) return this.parent;
      if (!this.parent.node) throw new Error('Control hasn\'t be added to Input or Node');
      return this.parent.node;
    }
  }, {
    key: "getData",
    value: function getData(key) {
      return this.getNode().data[key];
    }
  }, {
    key: "putData",
    value: function putData(key, data) {
      this.getNode().data[key] = data;
    }
  }]);

  return Control;
}();

function install(editor, _ref) {
  var _ref$component = _ref.component,
      NodeComponent = _ref$component === void 0 ? Node : _ref$component;
  editor.on('rendernode', function (_ref2) {
    var el = _ref2.el,
        node = _ref2.node,
        component = _ref2.component,
        bindSocket = _ref2.bindSocket,
        bindControl = _ref2.bindControl;
    if (component.render && component.render !== 'react') return;
    var Component = component.component || NodeComponent;

    node.update = function () {
      return new Promise(function (res) {
        ReactDOM.render(React.createElement(Component, {
          node: node,
          editor: editor,
          bindSocket: bindSocket,
          bindControl: bindControl
        }), el, res);
      });
    };

    node._reactComponent = true;
    node.update();
  });
  editor.on('rendercontrol', function (_ref3) {
    var el = _ref3.el,
        control = _ref3.control;
    if (control.render && control.render !== 'react') return;
    var Component = control.component;

    control.update = function () {
      return new Promise(function (res) {
        ReactDOM.render(React.createElement(Component, control.props), el, res);
      });
    };

    control.update();
  });
  editor.on('connectioncreated connectionremoved', function (connection) {
    connection.output.node.update();
    connection.input.node.update();
  });
  editor.on('nodeselected', function () {
    editor.nodes.filter(function (n) {
      return n._reactComponent;
    }).map(function (node) {
      return node.update();
    });
  });
}

var ReteReactControl =
/*#__PURE__*/
function (_Rete$Control) {
  _inherits(ReteReactControl, _Rete$Control);

  function ReteReactControl() {
    _classCallCheck(this, ReteReactControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReteReactControl).apply(this, arguments));
  }

  return ReteReactControl;
}(Control$1);

var ReteReactComponent =
/*#__PURE__*/
function (_Rete$Component) {
  _inherits(ReteReactComponent, _Rete$Component);

  function ReteReactComponent() {
    _classCallCheck(this, ReteReactComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReteReactComponent).apply(this, arguments));
  }

  return ReteReactComponent;
}(Component$1);
var index = {
  name: 'react-render',
  install: install
};

export default index;
export { Control, Node, ReteReactComponent, ReteReactControl, Socket };
//# sourceMappingURL=react-render-plugin.esm.js.map
