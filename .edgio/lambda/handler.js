"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate2(uuid2) {
      return typeof uuid2 === "string" && _regex.default.test(uuid2);
    }
    var _default = validate2;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify3(arr, offset = 0) {
      const uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid2;
    }
    var _default = stringify3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v12;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse5(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name, version2, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version2;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v32 = (0, _v.default)("v3", 48, _md.default);
    var _default = v32;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v42(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v42;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v52 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v52;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid2.substr(14, 1), 16);
    }
    var _default = version2;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/uuid/wrapper.mjs
var import_dist, v1, v3, v4, v5, NIL, version, validate, stringify, parse;
var init_wrapper = __esm({
  "node_modules/uuid/wrapper.mjs"() {
    import_dist = __toESM(require_dist(), 1);
    v1 = import_dist.default.v1;
    v3 = import_dist.default.v3;
    v4 = import_dist.default.v4;
    v5 = import_dist.default.v5;
    NIL = import_dist.default.NIL;
    version = import_dist.default.version;
    validate = import_dist.default.validate;
    stringify = import_dist.default.stringify;
    parse = import_dist.default.parse;
  }
});

// src/lambda/lambdaInstance.ts
var lambdaInstance_exports = {};
__export(lambdaInstance_exports, {
  LambdaInvocation: () => LambdaInvocation,
  default: () => LambdaInstance
});
var LambdaInstance, LambdaInvocation;
var init_lambdaInstance = __esm({
  "src/lambda/lambdaInstance.ts"() {
    "use strict";
    init_wrapper();
    LambdaInstance = class {
      constructor() {
        this._id = v4().toString();
        this._spawnedAt = Date.now();
        this._invocationCounter = 0;
        this._lifetimeDuration = 0;
      }
      get id() {
        return this._id;
      }
      get age() {
        return Date.now() - this._spawnedAt;
      }
      get invocationCounter() {
        return this._invocationCounter;
      }
      get lifetimeDuration() {
        return this._lifetimeDuration;
      }
      startInvocation() {
        ++this._invocationCounter;
      }
      stopInvocation(duration) {
        this._lifetimeDuration += duration;
      }
    };
    LambdaInvocation = class {
      constructor(lambda) {
        this._startTime = Date.now();
        this._isRunning = false;
        this._lambda = lambda;
        this._stopTime = this._startTime;
      }
      get lambda() {
        return this._lambda;
      }
      get duration() {
        return this._stopTime - this._startTime;
      }
      start() {
        if (!this._isRunning) {
          this._isRunning = true;
          this._lambda.startInvocation();
        }
      }
      stop() {
        if (this._isRunning) {
          this._isRunning = false;
          this._stopTime = Date.now();
          this._lambda.stopInvocation(this.duration);
        }
      }
    };
  }
});

// node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "node_modules/pino-std-serializers/lib/err.js"(exports, module2) {
    "use strict";
    module2.exports = errSerializer;
    var { toString } = Object.prototype;
    var seen = Symbol("circular-ref-tag");
    var rawSymbol = Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function errSerializer(err) {
      if (!(err instanceof Error)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      for (const key2 in err) {
        if (_err[key2] === void 0) {
          const val = err[key2];
          if (val instanceof Error) {
            if (!val.hasOwnProperty(seen)) {
              _err[key2] = errSerializer(val);
            }
          } else {
            _err[key2] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "node_modules/pino-std-serializers/lib/req.js"(exports, module2) {
    "use strict";
    module2.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
        _req.query = req.query;
        _req.params = req.params;
      } else {
        _req.url = req.path || (req.url ? req.url.path || req.url : void 0);
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
  }
});

// node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "node_modules/pino-std-serializers/lib/res.js"(exports, module2) {
    "use strict";
    module2.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.statusCode;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
  }
});

// node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "node_modules/pino-std-serializers/index.js"(exports, module2) {
    "use strict";
    var errSerializer = require_err();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module2.exports = {
      err: errSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer)
          return customSerializer;
        return function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        };
      },
      wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer)
          return customSerializer;
        return function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        };
      },
      wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer)
          return customSerializer;
        return function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        };
      }
    };
  }
});

// node_modules/fast-redact/lib/validator.js
var require_validator = __commonJS({
  "node_modules/fast-redact/lib/validator.js"(exports, module2) {
    "use strict";
    var { createContext, runInContext } = require("vm");
    module2.exports = validator;
    function validator(opts = {}) {
      const {
        ERR_PATHS_MUST_BE_STRINGS = () => "fast-redact - Paths must be (non-empty) strings",
        ERR_INVALID_PATH = (s) => `fast-redact \u2013 Invalid path (${s})`
      } = opts;
      return function validate2({ paths }) {
        paths.forEach((s) => {
          if (typeof s !== "string") {
            throw Error(ERR_PATHS_MUST_BE_STRINGS());
          }
          try {
            if (/〇/.test(s))
              throw Error();
            const proxy = new Proxy({}, { get: () => proxy, set: () => {
              throw Error();
            } });
            const expr = (s[0] === "[" ? "" : ".") + s.replace(/^\*/, "\u3007").replace(/\.\*/g, ".\u3007").replace(/\[\*\]/g, "[\u3007]");
            if (/\n|\r|;/.test(expr))
              throw Error();
            if (/\/\*/.test(expr))
              throw Error();
            runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, createContext({ o: proxy, "\u3007": null }), {
              codeGeneration: { strings: false, wasm: false }
            });
          } catch (e) {
            throw Error(ERR_INVALID_PATH(s));
          }
        });
      };
    }
  }
});

// node_modules/fast-redact/lib/rx.js
var require_rx = __commonJS({
  "node_modules/fast-redact/lib/rx.js"(exports, module2) {
    "use strict";
    module2.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
  }
});

// node_modules/fast-redact/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/fast-redact/lib/parse.js"(exports, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = parse5;
    function parse5({ paths }) {
      const wildcards = [];
      var wcLen = 0;
      const secret = paths.reduce(function(o, strPath, ix) {
        var path2 = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ""));
        const leadingBracket = strPath[0] === "[";
        path2 = path2.map((p) => {
          if (p[0] === "[")
            return p.substr(1, p.length - 2);
          else
            return p;
        });
        const star = path2.indexOf("*");
        if (star > -1) {
          const before = path2.slice(0, star);
          const beforeStr = before.join(".");
          const after = path2.slice(star + 1, path2.length);
          if (after.indexOf("*") > -1)
            throw Error("fast-redact \u2013 Only one wildcard per path is supported");
          const nested = after.length > 0;
          wcLen++;
          wildcards.push({
            before,
            beforeStr,
            after,
            nested
          });
        } else {
          o[strPath] = {
            path: path2,
            val: void 0,
            precensored: false,
            circle: "",
            escPath: JSON.stringify(strPath),
            leadingBracket
          };
        }
        return o;
      }, {});
      return { wildcards, wcLen, secret };
    }
  }
});

// node_modules/fast-redact/lib/redactor.js
var require_redactor = __commonJS({
  "node_modules/fast-redact/lib/redactor.js"(exports, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = redactor;
    function redactor({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
      const redact = Function("o", `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${resultTmpl(serialize)}
  `).bind(state);
      if (serialize === false) {
        redact.restore = (o) => state.restore(o);
      }
      return redact;
    }
    function redactTmpl(secret, isCensorFct, censorFctTakesPath) {
      return Object.keys(secret).map((path2) => {
        const { escPath, leadingBracket, path: arrPath } = secret[path2];
        const skip = leadingBracket ? 1 : 0;
        const delim = leadingBracket ? "" : ".";
        const hops = [];
        var match2;
        while ((match2 = rx.exec(path2)) !== null) {
          const [, ix] = match2;
          const { index, input } = match2;
          if (index > skip)
            hops.push(input.substring(0, index - (ix ? 0 : 1)));
        }
        var existence = hops.map((p) => `o${delim}${p}`).join(" && ");
        if (existence.length === 0)
          existence += `o${delim}${path2} != null`;
        else
          existence += ` && o${delim}${path2} != null`;
        const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join("\n")}
      }
    `;
        const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
        return `
      if (${existence}) {
        const val = o${delim}${path2}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path2} = ${isCensorFct ? `censor(${censorArgs})` : "censor"}
          ${circularDetection}
        }
      }
    `;
      }).join("\n");
    }
    function dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
      return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : "";
    }
    function resultTmpl(serialize) {
      return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
    }
    function strictImpl(strict, serialize) {
      return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
    }
  }
});

// node_modules/fast-redact/lib/modifiers.js
var require_modifiers = __commonJS({
  "node_modules/fast-redact/lib/modifiers.js"(exports, module2) {
    "use strict";
    module2.exports = {
      groupRedact,
      groupRestore,
      nestedRedact,
      nestedRestore
    };
    function groupRestore({ keys, values, target }) {
      if (target == null)
        return;
      const length = keys.length;
      for (var i = 0; i < length; i++) {
        const k = keys[i];
        target[k] = values[i];
      }
    }
    function groupRedact(o, path2, censor, isCensorFct, censorFctTakesPath) {
      const target = get2(o, path2);
      if (target == null)
        return { keys: null, values: null, target: null, flat: true };
      const keys = Object.keys(target);
      const keysLength = keys.length;
      const pathLength = path2.length;
      const pathWithKey = censorFctTakesPath ? [...path2] : void 0;
      const values = new Array(keysLength);
      for (var i = 0; i < keysLength; i++) {
        const key2 = keys[i];
        values[i] = target[key2];
        if (censorFctTakesPath) {
          pathWithKey[pathLength] = key2;
          target[key2] = censor(target[key2], pathWithKey);
        } else if (isCensorFct) {
          target[key2] = censor(target[key2]);
        } else {
          target[key2] = censor;
        }
      }
      return { keys, values, target, flat: true };
    }
    function nestedRestore(arr) {
      const length = arr.length;
      for (var i = 0; i < length; i++) {
        const { key: key2, target, value } = arr[i];
        target[key2] = value;
      }
    }
    function nestedRedact(store, o, path2, ns, censor, isCensorFct, censorFctTakesPath) {
      const target = get2(o, path2);
      if (target == null)
        return;
      const keys = Object.keys(target);
      const keysLength = keys.length;
      for (var i = 0; i < keysLength; i++) {
        const key2 = keys[i];
        const { value, parent, exists } = specialSet(target, key2, path2, ns, censor, isCensorFct, censorFctTakesPath);
        if (exists === true && parent !== null) {
          store.push({ key: ns[ns.length - 1], target: parent, value });
        }
      }
      return store;
    }
    function has(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function specialSet(o, k, path2, afterPath, censor, isCensorFct, censorFctTakesPath) {
      const afterPathLen = afterPath.length;
      const lastPathIndex = afterPathLen - 1;
      const originalKey = k;
      var i = -1;
      var n;
      var nv;
      var ov;
      var oov = null;
      var exists = true;
      ov = n = o[k];
      if (typeof n !== "object")
        return { value: null, parent: null, exists };
      while (n != null && ++i < afterPathLen) {
        k = afterPath[i];
        oov = ov;
        if (!(k in n)) {
          exists = false;
          break;
        }
        ov = n[k];
        nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path2, originalKey, ...afterPath]) : censor(ov) : censor;
        n[k] = has(n, k) && nv === ov || nv === void 0 && censor !== void 0 ? n[k] : nv;
        n = n[k];
        if (typeof n !== "object")
          break;
      }
      return { value: ov, parent: oov, exists };
    }
    function get2(o, p) {
      var i = -1;
      var l = p.length;
      var n = o;
      while (n != null && ++i < l) {
        n = n[p[i]];
      }
      return n;
    }
  }
});

// node_modules/fast-redact/lib/restorer.js
var require_restorer = __commonJS({
  "node_modules/fast-redact/lib/restorer.js"(exports, module2) {
    "use strict";
    var { groupRestore, nestedRestore } = require_modifiers();
    module2.exports = restorer;
    function restorer({ secret, wcLen }) {
      return function compileRestore() {
        if (this.restore)
          return;
        const paths = Object.keys(secret);
        const resetters = resetTmpl(secret, paths);
        const hasWildcards = wcLen > 0;
        const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
        this.restore = Function("o", restoreTmpl(resetters, paths, hasWildcards)).bind(state);
      };
    }
    function resetTmpl(secret, paths) {
      return paths.map((path2) => {
        const { circle, escPath, leadingBracket } = secret[path2];
        const delim = leadingBracket ? "" : ".";
        const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path2} = secret[${escPath}].val`;
        const clear = `secret[${escPath}].val = undefined`;
        return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
      }).join("");
    }
    function restoreTmpl(resetters, paths, hasWildcards) {
      const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : "";
      return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
    }
  }
});

// node_modules/fast-redact/lib/state.js
var require_state = __commonJS({
  "node_modules/fast-redact/lib/state.js"(exports, module2) {
    "use strict";
    module2.exports = state;
    function state(o) {
      const {
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      } = o;
      const builder = [{ secret, censor, compileRestore }];
      if (serialize !== false)
        builder.push({ serialize });
      if (wcLen > 0)
        builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
      return Object.assign(...builder);
    }
  }
});

// node_modules/fast-redact/index.js
var require_fast_redact = __commonJS({
  "node_modules/fast-redact/index.js"(exports, module2) {
    "use strict";
    var validator = require_validator();
    var parse5 = require_parse2();
    var redactor = require_redactor();
    var restorer = require_restorer();
    var { groupRedact, nestedRedact } = require_modifiers();
    var state = require_state();
    var rx = require_rx();
    var validate2 = validator();
    var noop = (o) => o;
    noop.restore = noop;
    var DEFAULT_CENSOR = "[REDACTED]";
    fastRedact.rx = rx;
    fastRedact.validator = validator;
    module2.exports = fastRedact;
    function fastRedact(opts = {}) {
      const paths = Array.from(new Set(opts.paths || []));
      const serialize = "serialize" in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === "function" ? opts.serialize : JSON.stringify : JSON.stringify;
      const remove = opts.remove;
      if (remove === true && serialize !== JSON.stringify) {
        throw Error("fast-redact \u2013 remove option may only be set when serializer is JSON.stringify");
      }
      const censor = remove === true ? void 0 : "censor" in opts ? opts.censor : DEFAULT_CENSOR;
      const isCensorFct = typeof censor === "function";
      const censorFctTakesPath = isCensorFct && censor.length > 1;
      if (paths.length === 0)
        return serialize || noop;
      validate2({ paths, serialize, censor });
      const { wildcards, wcLen, secret } = parse5({ paths, censor });
      const compileRestore = restorer({ secret, wcLen });
      const strict = "strict" in opts ? opts.strict : true;
      return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      }));
    }
  }
});

// node_modules/pino/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/pino/lib/symbols.js"(exports, module2) {
    "use strict";
    var setLevelSym = Symbol("pino.setLevel");
    var getLevelSym = Symbol("pino.getLevel");
    var levelValSym = Symbol("pino.levelVal");
    var useLevelLabelsSym = Symbol("pino.useLevelLabels");
    var useOnlyCustomLevelsSym = Symbol("pino.useOnlyCustomLevels");
    var mixinSym = Symbol("pino.mixin");
    var lsCacheSym = Symbol("pino.lsCache");
    var chindingsSym = Symbol("pino.chindings");
    var parsedChindingsSym = Symbol("pino.parsedChindings");
    var asJsonSym = Symbol("pino.asJson");
    var writeSym = Symbol("pino.write");
    var redactFmtSym = Symbol("pino.redactFmt");
    var timeSym = Symbol("pino.time");
    var timeSliceIndexSym = Symbol("pino.timeSliceIndex");
    var streamSym = Symbol("pino.stream");
    var stringifySym = Symbol("pino.stringify");
    var stringifiersSym = Symbol("pino.stringifiers");
    var endSym = Symbol("pino.end");
    var formatOptsSym = Symbol("pino.formatOpts");
    var messageKeySym = Symbol("pino.messageKey");
    var nestedKeySym = Symbol("pino.nestedKey");
    var wildcardFirstSym = Symbol("pino.wildcardFirst");
    var serializersSym = Symbol.for("pino.serializers");
    var formattersSym = Symbol.for("pino.formatters");
    var hooksSym = Symbol.for("pino.hooks");
    var needsMetadataGsym = Symbol.for("pino.metadata");
    module2.exports = {
      setLevelSym,
      getLevelSym,
      levelValSym,
      useLevelLabelsSym,
      mixinSym,
      lsCacheSym,
      chindingsSym,
      parsedChindingsSym,
      asJsonSym,
      writeSym,
      serializersSym,
      redactFmtSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifiersSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      nestedKeySym,
      wildcardFirstSym,
      needsMetadataGsym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym
    };
  }
});

// node_modules/pino/lib/redaction.js
var require_redaction = __commonJS({
  "node_modules/pino/lib/redaction.js"(exports, module2) {
    "use strict";
    var fastRedact = require_fast_redact();
    var { redactFmtSym, wildcardFirstSym } = require_symbols();
    var { rx, validator } = fastRedact;
    var validate2 = validator({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (s) => `pino \u2013 redact paths array contains an invalid path (${s})`
    });
    var CENSOR = "[Redacted]";
    var strict = false;
    function redaction(opts, serialize) {
      const { paths, censor } = handle(opts);
      const shape = paths.reduce((o, str) => {
        rx.lastIndex = 0;
        const first2 = rx.exec(str);
        const next = rx.exec(str);
        let ns = first2[1] !== void 0 ? first2[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : first2[0];
        if (ns === "*") {
          ns = wildcardFirstSym;
        }
        if (next === null) {
          o[ns] = null;
          return o;
        }
        if (o[ns] === null) {
          return o;
        }
        const { index } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        if (ns !== wildcardFirstSym && o[ns].length === 0) {
          o[ns].push(...o[wildcardFirstSym] || []);
        }
        if (ns === wildcardFirstSym) {
          Object.keys(o).forEach(function(k) {
            if (o[k]) {
              o[k].push(nextPath);
            }
          });
        }
        o[ns].push(nextPath);
        return o;
      }, {});
      const result = {
        [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
      };
      const topCensor = (...args) => {
        return typeof censor === "function" ? serialize(censor(...args)) : serialize(censor);
      };
      return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
        if (shape[k] === null) {
          o[k] = (value) => topCensor(value, [k]);
        } else {
          const wrappedCensor = typeof censor === "function" ? (value, path2) => {
            return censor(value, [k, ...path2]);
          } : censor;
          o[k] = fastRedact({
            paths: shape[k],
            censor: wrappedCensor,
            serialize,
            strict
          });
        }
        return o;
      }, result);
    }
    function handle(opts) {
      if (Array.isArray(opts)) {
        opts = { paths: opts, censor: CENSOR };
        validate2(opts);
        return opts;
      }
      let { paths, censor = CENSOR, remove } = opts;
      if (Array.isArray(paths) === false) {
        throw Error("pino \u2013 redact must contain an array of strings");
      }
      if (remove === true)
        censor = void 0;
      validate2({ paths, censor });
      return { paths, censor };
    }
    module2.exports = redaction;
  }
});

// node_modules/pino/lib/time.js
var require_time = __commonJS({
  "node_modules/pino/lib/time.js"(exports, module2) {
    "use strict";
    var nullTime = () => "";
    var epochTime = () => `,"time":${Date.now()}`;
    var unixTime = () => `,"time":${Math.round(Date.now() / 1e3)}`;
    var isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
    module2.exports = { nullTime, epochTime, unixTime, isoTime };
  }
});

// node_modules/flatstr/index.js
var require_flatstr = __commonJS({
  "node_modules/flatstr/index.js"(exports, module2) {
    "use strict";
    function flatstr(s) {
      s | 0;
      return s;
    }
    module2.exports = flatstr;
  }
});

// node_modules/atomic-sleep/index.js
var require_atomic_sleep = __commonJS({
  "node_modules/atomic-sleep/index.js"(exports, module2) {
    "use strict";
    if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        Atomics.wait(nil, 0, 0, Number(ms));
      };
      const nil = new Int32Array(new SharedArrayBuffer(4));
      module2.exports = sleep;
    } else {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        const target = Date.now() + Number(ms);
        while (target > Date.now()) {
        }
      };
      module2.exports = sleep;
    }
  }
});

// node_modules/sonic-boom/index.js
var require_sonic_boom = __commonJS({
  "node_modules/sonic-boom/index.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var EventEmitter = require("events");
    var flatstr = require_flatstr();
    var inherits = require("util").inherits;
    var BUSY_WRITE_TIMEOUT = 100;
    var sleep = require_atomic_sleep();
    var MAX_WRITE = 16 * 1024 * 1024;
    function openFile(file, sonic) {
      sonic._opening = true;
      sonic._writing = true;
      sonic._asyncDrainScheduled = false;
      function fileOpened(err, fd) {
        if (err) {
          sonic._reopening = false;
          sonic._writing = false;
          sonic._opening = false;
          if (sonic.sync) {
            process.nextTick(() => {
              if (sonic.listenerCount("error") > 0) {
                sonic.emit("error", err);
              }
            });
          } else {
            sonic.emit("error", err);
          }
          return;
        }
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) {
          process.nextTick(() => sonic.emit("ready"));
        } else {
          sonic.emit("ready");
        }
        if (sonic._reopening) {
          return;
        }
        const len = sonic._buf.length;
        if (len > 0 && len > sonic.minLength && !sonic.destroyed) {
          actualWrite(sonic);
        }
      }
      if (sonic.sync) {
        try {
          const fd = fs.openSync(file, "a");
          fileOpened(null, fd);
        } catch (err) {
          fileOpened(err);
          throw err;
        }
      } else {
        fs.open(file, "a", fileOpened);
      }
    }
    function SonicBoom(opts) {
      if (!(this instanceof SonicBoom)) {
        return new SonicBoom(opts);
      }
      let { fd, dest, minLength, sync } = opts || {};
      fd = fd || dest;
      this._buf = "";
      this.fd = -1;
      this._writing = false;
      this._writingBuf = "";
      this._ending = false;
      this._reopening = false;
      this._asyncDrainScheduled = false;
      this.file = null;
      this.destroyed = false;
      this.sync = sync || false;
      this.minLength = minLength || 0;
      if (typeof fd === "number") {
        this.fd = fd;
        process.nextTick(() => this.emit("ready"));
      } else if (typeof fd === "string") {
        openFile(fd, this);
      } else {
        throw new Error("SonicBoom supports only file descriptors and files");
      }
      this.release = (err, n) => {
        if (err) {
          if (err.code === "EAGAIN") {
            if (this.sync) {
              try {
                sleep(BUSY_WRITE_TIMEOUT);
                this.release(void 0, 0);
              } catch (err2) {
                this.release(err2);
              }
            } else {
              setTimeout(() => {
                fs.write(this.fd, this._writingBuf, "utf8", this.release);
              }, BUSY_WRITE_TIMEOUT);
            }
          } else {
            this._buf = this._writingBuf + this._buf;
            this._writingBuf = "";
            this._writing = false;
            this.emit("error", err);
          }
          return;
        }
        if (this._writingBuf.length !== n) {
          this._writingBuf = this._writingBuf.slice(n);
          if (this.sync) {
            try {
              do {
                n = fs.writeSync(this.fd, this._writingBuf, "utf8");
                this._writingBuf = this._writingBuf.slice(n);
              } while (this._writingBuf.length !== 0);
            } catch (err2) {
              this.release(err2);
              return;
            }
          } else {
            fs.write(this.fd, this._writingBuf, "utf8", this.release);
            return;
          }
        }
        this._writingBuf = "";
        if (this.destroyed) {
          return;
        }
        const len = this._buf.length;
        if (this._reopening) {
          this._writing = false;
          this._reopening = false;
          this.reopen();
        } else if (len > 0 && len > this.minLength) {
          actualWrite(this);
        } else if (this._ending) {
          if (len > 0) {
            actualWrite(this);
          } else {
            this._writing = false;
            actualClose(this);
          }
        } else {
          this._writing = false;
          if (this.sync) {
            if (!this._asyncDrainScheduled) {
              this._asyncDrainScheduled = true;
              process.nextTick(emitDrain, this);
            }
          } else {
            this.emit("drain");
          }
        }
      };
      this.on("newListener", function(name) {
        if (name === "drain") {
          this._asyncDrainScheduled = false;
        }
      });
    }
    function emitDrain(sonic) {
      const hasListeners = sonic.listenerCount("drain") > 0;
      if (!hasListeners)
        return;
      sonic._asyncDrainScheduled = false;
      sonic.emit("drain");
    }
    inherits(SonicBoom, EventEmitter);
    SonicBoom.prototype.write = function(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      this._buf += data;
      const len = this._buf.length;
      if (!this._writing && len > this.minLength) {
        actualWrite(this);
      }
      return len < 16384;
    };
    SonicBoom.prototype.flush = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._writing || this.minLength <= 0) {
        return;
      }
      actualWrite(this);
    };
    SonicBoom.prototype.reopen = function(file) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.reopen(file);
        });
        return;
      }
      if (this._ending) {
        return;
      }
      if (!this.file) {
        throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
      }
      this._reopening = true;
      if (this._writing) {
        return;
      }
      const fd = this.fd;
      this.once("ready", () => {
        if (fd !== this.fd) {
          fs.close(fd, (err) => {
            if (err) {
              return this.emit("error", err);
            }
          });
        }
      });
      openFile(file || this.file, this);
    };
    SonicBoom.prototype.end = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.end();
        });
        return;
      }
      if (this._ending) {
        return;
      }
      this._ending = true;
      if (!this._writing && this._buf.length > 0 && this.fd >= 0) {
        actualWrite(this);
        return;
      }
      if (this._writing) {
        return;
      }
      actualClose(this);
    };
    SonicBoom.prototype.flushSync = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      while (this._buf.length > 0) {
        try {
          fs.writeSync(this.fd, this._buf, "utf8");
          this._buf = "";
        } catch (err) {
          if (err.code !== "EAGAIN") {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
    };
    SonicBoom.prototype.destroy = function() {
      if (this.destroyed) {
        return;
      }
      actualClose(this);
    };
    function actualWrite(sonic) {
      sonic._writing = true;
      let buf = sonic._buf;
      const release = sonic.release;
      if (buf.length > MAX_WRITE) {
        buf = buf.slice(0, MAX_WRITE);
        sonic._buf = sonic._buf.slice(MAX_WRITE);
      } else {
        sonic._buf = "";
      }
      flatstr(buf);
      sonic._writingBuf = buf;
      if (sonic.sync) {
        try {
          const written = fs.writeSync(sonic.fd, buf, "utf8");
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(sonic.fd, buf, "utf8", release);
      }
    }
    function actualClose(sonic) {
      if (sonic.fd === -1) {
        sonic.once("ready", actualClose.bind(null, sonic));
        return;
      }
      fs.close(sonic.fd, (err) => {
        if (err) {
          sonic.emit("error", err);
          return;
        }
        if (sonic._ending && !sonic._writing) {
          sonic.emit("finish");
        }
        sonic.emit("close");
      });
      sonic.destroyed = true;
      sonic._buf = "";
    }
    module2.exports = SonicBoom;
  }
});

// node_modules/fastify-warning/index.js
var require_fastify_warning = __commonJS({
  "node_modules/fastify-warning/index.js"(exports, module2) {
    "use strict";
    var { format } = require("util");
    function build() {
      const codes = {};
      const emitted = /* @__PURE__ */ new Map();
      function create(name, code, message) {
        if (!name)
          throw new Error("Fastify warning name must not be empty");
        if (!code)
          throw new Error("Fastify warning code must not be empty");
        if (!message)
          throw new Error("Fastify warning message must not be empty");
        code = code.toUpperCase();
        if (codes[code] !== void 0) {
          throw new Error(`The code '${code}' already exist`);
        }
        function buildWarnOpts(a, b, c) {
          let formatted;
          if (a && b && c) {
            formatted = format(message, a, b, c);
          } else if (a && b) {
            formatted = format(message, a, b);
          } else if (a) {
            formatted = format(message, a);
          } else {
            formatted = message;
          }
          return {
            code,
            name,
            message: formatted
          };
        }
        emitted.set(code, false);
        codes[code] = buildWarnOpts;
        return codes[code];
      }
      function emit(code, a, b, c) {
        if (codes[code] === void 0)
          throw new Error(`The code '${code}' does not exist`);
        if (emitted.get(code) === true)
          return;
        emitted.set(code, true);
        const warning = codes[code](a, b, c);
        process.emitWarning(warning.message, warning.name, warning.code);
      }
      return {
        create,
        emit,
        emitted
      };
    }
    module2.exports = build;
  }
});

// node_modules/pino/lib/deprecations.js
var require_deprecations = __commonJS({
  "node_modules/pino/lib/deprecations.js"(exports, module2) {
    "use strict";
    var warning = require_fastify_warning()();
    module2.exports = warning;
    var warnName = "PinoWarning";
    warning.create(warnName, "PINODEP004", "bindings.serializers is deprecated, use options.serializers option instead");
    warning.create(warnName, "PINODEP005", "bindings.formatters is deprecated, use options.formatters option instead");
    warning.create(warnName, "PINODEP006", "bindings.customLevels is deprecated, use options.customLevels option instead");
    warning.create(warnName, "PINODEP007", "bindings.level is deprecated, use options.level option instead");
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module2) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module2.exports = format;
    function format(f, args, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1)
          return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args.length;
      if (argLen === 0)
        return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            case 102:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            case 111:
            case 106:
              if (a >= argLen)
                break;
              if (args[a] === void 0)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args[a];
              if (type === "string") {
                str += "'" + args[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "node_modules/fast-safe-stringify/index.js"(exports, module2) {
    module2.exports = stringify3;
    stringify3.default = stringify3;
    stringify3.stable = deterministicStringify;
    stringify3.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify3(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key2 = keys[i];
            decirc(val[key2], key2, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key2 = keys[i];
            deterministicDecirc(val[key2], key2, i, stack, val, depth, options);
            tmp[key2] = val[key2];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key2, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key2 && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key2, val);
      };
    }
  }
});

// node_modules/pino/lib/tools.js
var require_tools = __commonJS({
  "node_modules/pino/lib/tools.js"(exports, module2) {
    "use strict";
    var format = require_quick_format_unescaped();
    var { mapHttpRequest, mapHttpResponse } = require_pino_std_serializers();
    var SonicBoom = require_sonic_boom();
    var stringifySafe = require_fast_safe_stringify();
    var {
      lsCacheSym,
      chindingsSym,
      parsedChindingsSym,
      writeSym,
      serializersSym,
      formatOptsSym,
      endSym,
      stringifiersSym,
      stringifySym,
      wildcardFirstSym,
      needsMetadataGsym,
      redactFmtSym,
      streamSym,
      nestedKeySym,
      formattersSym,
      messageKeySym
    } = require_symbols();
    function noop() {
    }
    function genLog(level, hook) {
      if (!hook)
        return LOG;
      return function hookWrappedLog(...args) {
        hook.call(this, args, LOG, level);
      };
      function LOG(o, ...n) {
        if (typeof o === "object") {
          let msg = o;
          if (o !== null) {
            if (o.method && o.headers && o.socket) {
              o = mapHttpRequest(o);
            } else if (typeof o.setHeader === "function") {
              o = mapHttpResponse(o);
            }
          }
          if (this[nestedKeySym])
            o = { [this[nestedKeySym]]: o };
          let formatParams;
          if (msg === null && n.length === 0) {
            formatParams = [null];
          } else {
            msg = n.shift();
            formatParams = n;
          }
          this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
        } else {
          this[writeSym](null, format(o, n, this[formatOptsSym]), level);
        }
      }
    }
    function asString(str) {
      let result = "";
      let last = 0;
      let found = false;
      let point = 255;
      const l = str.length;
      if (l > 100) {
        return JSON.stringify(str);
      }
      for (var i = 0; i < l && point >= 32; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
          result += str.slice(last, i) + "\\";
          last = i;
          found = true;
        }
      }
      if (!found) {
        result = str;
      } else {
        result += str.slice(last);
      }
      return point < 32 ? JSON.stringify(str) : '"' + result + '"';
    }
    function asJson(obj, msg, num, time) {
      const stringify4 = this[stringifySym];
      const stringifiers = this[stringifiersSym];
      const end = this[endSym];
      const chindings = this[chindingsSym];
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const messageKey = this[messageKeySym];
      let data = this[lsCacheSym][num] + time;
      data = data + chindings;
      let value;
      const notHasOwnProperty = obj.hasOwnProperty === void 0;
      if (formatters.log) {
        obj = formatters.log(obj);
      }
      if (msg !== void 0) {
        obj[messageKey] = msg;
      }
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      for (const key2 in obj) {
        value = obj[key2];
        if ((notHasOwnProperty || obj.hasOwnProperty(key2)) && value !== void 0) {
          value = serializers[key2] ? serializers[key2](value) : value;
          const stringifier = stringifiers[key2] || wildcardStringifier;
          switch (typeof value) {
            case "undefined":
            case "function":
              continue;
            case "number":
              if (Number.isFinite(value) === false) {
                value = null;
              }
            case "boolean":
              if (stringifier)
                value = stringifier(value);
              break;
            case "string":
              value = (stringifier || asString)(value);
              break;
            default:
              value = (stringifier || stringify4)(value);
          }
          if (value === void 0)
            continue;
          data += ',"' + key2 + '":' + value;
        }
      }
      return data + end;
    }
    function asChindings(instance2, bindings) {
      let value;
      let data = instance2[chindingsSym];
      const stringify4 = instance2[stringifySym];
      const stringifiers = instance2[stringifiersSym];
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      const serializers = instance2[serializersSym];
      const formatter = instance2[formattersSym].bindings;
      bindings = formatter(bindings);
      for (const key2 in bindings) {
        value = bindings[key2];
        const valid = key2 !== "level" && key2 !== "serializers" && key2 !== "formatters" && key2 !== "customLevels" && bindings.hasOwnProperty(key2) && value !== void 0;
        if (valid === true) {
          value = serializers[key2] ? serializers[key2](value) : value;
          value = (stringifiers[key2] || wildcardStringifier || stringify4)(value);
          if (value === void 0)
            continue;
          data += ',"' + key2 + '":' + value;
        }
      }
      return data;
    }
    function getPrettyStream(opts, prettifier, dest, instance2) {
      if (prettifier && typeof prettifier === "function") {
        prettifier = prettifier.bind(instance2);
        return prettifierMetaWrapper(prettifier(opts), dest, opts);
      }
      try {
        const prettyFactory = require("pino-pretty").prettyFactory || require("pino-pretty");
        prettyFactory.asMetaWrapper = prettifierMetaWrapper;
        return prettifierMetaWrapper(prettyFactory(opts), dest, opts);
      } catch (e) {
        if (e.message.startsWith("Cannot find module 'pino-pretty'")) {
          throw Error("Missing `pino-pretty` module: `pino-pretty` must be installed separately");
        }
        ;
        throw e;
      }
    }
    function prettifierMetaWrapper(pretty, dest, opts) {
      opts = Object.assign({ suppressFlushSyncWarning: false }, opts);
      let warned = false;
      return {
        [needsMetadataGsym]: true,
        lastLevel: 0,
        lastMsg: null,
        lastObj: null,
        lastLogger: null,
        flushSync() {
          if (opts.suppressFlushSyncWarning || warned) {
            return;
          }
          warned = true;
          setMetadataProps(dest, this);
          dest.write(pretty(Object.assign({
            level: 40,
            msg: "pino.final with prettyPrint does not support flushing",
            time: Date.now()
          }, this.chindings())));
        },
        chindings() {
          const lastLogger = this.lastLogger;
          let chindings = null;
          if (!lastLogger) {
            return null;
          }
          if (lastLogger.hasOwnProperty(parsedChindingsSym)) {
            chindings = lastLogger[parsedChindingsSym];
          } else {
            chindings = JSON.parse("{" + lastLogger[chindingsSym].substr(1) + "}");
            lastLogger[parsedChindingsSym] = chindings;
          }
          return chindings;
        },
        write(chunk) {
          const lastLogger = this.lastLogger;
          const chindings = this.chindings();
          let time = this.lastTime;
          if (time.match(/^\d+/)) {
            time = parseInt(time);
          } else {
            time = time.slice(1, -1);
          }
          const lastObj = this.lastObj;
          const lastMsg = this.lastMsg;
          const errorProps = null;
          const formatters = lastLogger[formattersSym];
          const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj;
          const messageKey = lastLogger[messageKeySym];
          if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) {
            formattedObj[messageKey] = lastMsg;
          }
          const obj = Object.assign({
            level: this.lastLevel,
            time
          }, formattedObj, errorProps);
          const serializers = lastLogger[serializersSym];
          const keys = Object.keys(serializers);
          for (var i = 0; i < keys.length; i++) {
            const key2 = keys[i];
            if (obj[key2] !== void 0) {
              obj[key2] = serializers[key2](obj[key2]);
            }
          }
          for (const key2 in chindings) {
            if (!obj.hasOwnProperty(key2)) {
              obj[key2] = chindings[key2];
            }
          }
          const stringifiers = lastLogger[stringifiersSym];
          const redact = stringifiers[redactFmtSym];
          const formatted = pretty(typeof redact === "function" ? redact(obj) : obj);
          if (formatted === void 0)
            return;
          setMetadataProps(dest, this);
          dest.write(formatted);
        }
      };
    }
    function hasBeenTampered(stream) {
      return stream.write !== stream.constructor.prototype.write;
    }
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      return stream;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream.write = noop;
          stream.end = noop;
          stream.flushSync = noop;
          stream.destroy = noop;
          return;
        }
        stream.removeListener("error", filterBrokenPipe);
        stream.emit("error", err);
      }
    }
    function createArgsNormalizer(defaultOptions) {
      return function normalizeArgs(instance2, opts = {}, stream) {
        if (typeof opts === "string") {
          stream = buildSafeSonicBoom({ dest: opts, sync: true });
          opts = {};
        } else if (typeof stream === "string") {
          stream = buildSafeSonicBoom({ dest: stream, sync: true });
        } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
          stream = opts;
          opts = null;
        }
        opts = Object.assign({}, defaultOptions, opts);
        if ("extreme" in opts) {
          throw Error("The extreme option has been removed, use pino.destination({ sync: false }) instead");
        }
        if ("onTerminated" in opts) {
          throw Error("The onTerminated option has been removed, use pino.final instead");
        }
        if ("changeLevelName" in opts) {
          process.emitWarning("The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.", { code: "changeLevelName_deprecation" });
          opts.levelKey = opts.changeLevelName;
          delete opts.changeLevelName;
        }
        const { enabled, prettyPrint, prettifier, messageKey } = opts;
        if (enabled === false)
          opts.level = "silent";
        stream = stream || process.stdout;
        if (stream === process.stdout && stream.fd >= 0 && !hasBeenTampered(stream)) {
          stream = buildSafeSonicBoom({ fd: stream.fd, sync: true });
        }
        if (prettyPrint) {
          const prettyOpts = Object.assign({ messageKey }, prettyPrint);
          stream = getPrettyStream(prettyOpts, prettifier, stream, instance2);
        }
        return { opts, stream };
      };
    }
    function final(logger2, handler2) {
      if (typeof logger2 === "undefined" || typeof logger2.child !== "function") {
        throw Error("expected a pino logger instance");
      }
      const hasHandler = typeof handler2 !== "undefined";
      if (hasHandler && typeof handler2 !== "function") {
        throw Error("if supplied, the handler parameter should be a function");
      }
      const stream = logger2[streamSym];
      if (typeof stream.flushSync !== "function") {
        throw Error("final requires a stream that has a flushSync method, such as pino.destination");
      }
      const finalLogger = new Proxy(logger2, {
        get: (logger3, key2) => {
          if (key2 in logger3.levels.values) {
            return (...args) => {
              logger3[key2](...args);
              stream.flushSync();
            };
          }
          return logger3[key2];
        }
      });
      if (!hasHandler) {
        return finalLogger;
      }
      return (err = null, ...args) => {
        try {
          stream.flushSync();
        } catch (e) {
        }
        return handler2(err, finalLogger, ...args);
      };
    }
    function stringify3(obj) {
      try {
        return JSON.stringify(obj);
      } catch (_) {
        return stringifySafe(obj);
      }
    }
    function buildFormatters(level, bindings, log) {
      return {
        level,
        bindings,
        log
      };
    }
    function setMetadataProps(dest, that) {
      if (dest[needsMetadataGsym] === true) {
        dest.lastLevel = that.lastLevel;
        dest.lastMsg = that.lastMsg;
        dest.lastObj = that.lastObj;
        dest.lastTime = that.lastTime;
        dest.lastLogger = that.lastLogger;
      }
    }
    module2.exports = {
      noop,
      buildSafeSonicBoom,
      getPrettyStream,
      asChindings,
      asJson,
      genLog,
      createArgsNormalizer,
      final,
      stringify: stringify3,
      buildFormatters
    };
  }
});

// node_modules/pino/lib/levels.js
var require_levels = __commonJS({
  "node_modules/pino/lib/levels.js"(exports, module2) {
    "use strict";
    var flatstr = require_flatstr();
    var {
      lsCacheSym,
      levelValSym,
      useOnlyCustomLevelsSym,
      streamSym,
      formattersSym,
      hooksSym
    } = require_symbols();
    var { noop, genLog } = require_tools();
    var levels = {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60
    };
    var levelMethods = {
      fatal: (hook) => {
        const logFatal = genLog(levels.fatal, hook);
        return function(...args) {
          const stream = this[streamSym];
          logFatal.call(this, ...args);
          if (typeof stream.flushSync === "function") {
            try {
              stream.flushSync();
            } catch (e) {
            }
          }
        };
      },
      error: (hook) => genLog(levels.error, hook),
      warn: (hook) => genLog(levels.warn, hook),
      info: (hook) => genLog(levels.info, hook),
      debug: (hook) => genLog(levels.debug, hook),
      trace: (hook) => genLog(levels.trace, hook)
    };
    var nums = Object.keys(levels).reduce((o, k) => {
      o[levels[k]] = k;
      return o;
    }, {});
    var initialLsCache = Object.keys(nums).reduce((o, k) => {
      o[k] = flatstr('{"level":' + Number(k));
      return o;
    }, {});
    function genLsCache(instance2) {
      const formatter = instance2[formattersSym].level;
      const { labels } = instance2.levels;
      const cache = {};
      for (const label in labels) {
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
      }
      instance2[lsCacheSym] = cache;
      return instance2;
    }
    function isStandardLevel(level, useOnlyCustomLevels) {
      if (useOnlyCustomLevels) {
        return false;
      }
      switch (level) {
        case "fatal":
        case "error":
        case "warn":
        case "info":
        case "debug":
        case "trace":
          return true;
        default:
          return false;
      }
    }
    function setLevel(level) {
      const { labels, values } = this.levels;
      if (typeof level === "number") {
        if (labels[level] === void 0)
          throw Error("unknown level value" + level);
        level = labels[level];
      }
      if (values[level] === void 0)
        throw Error("unknown level " + level);
      const preLevelVal = this[levelValSym];
      const levelVal = this[levelValSym] = values[level];
      const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
      const hook = this[hooksSym].logMethod;
      for (const key2 in values) {
        if (levelVal > values[key2]) {
          this[key2] = noop;
          continue;
        }
        this[key2] = isStandardLevel(key2, useOnlyCustomLevelsVal) ? levelMethods[key2](hook) : genLog(values[key2], hook);
      }
      this.emit("level-change", level, levelVal, labels[preLevelVal], preLevelVal);
    }
    function getLevel(level) {
      const { levels: levels2, levelVal } = this;
      return levels2 && levels2.labels ? levels2.labels[levelVal] : "";
    }
    function isLevelEnabled(logLevel) {
      const { values } = this.levels;
      const logLevelVal = values[logLevel];
      return logLevelVal !== void 0 && logLevelVal >= this[levelValSym];
    }
    function mappings(customLevels = null, useOnlyCustomLevels = false) {
      const customNums = customLevels ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o;
      }, {}) : null;
      const labels = Object.assign(Object.create(Object.prototype, { Infinity: { value: "silent" } }), useOnlyCustomLevels ? null : nums, customNums);
      const values = Object.assign(Object.create(Object.prototype, { silent: { value: Infinity } }), useOnlyCustomLevels ? null : levels, customLevels);
      return { labels, values };
    }
    function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
      if (typeof defaultLevel === "number") {
        const values = [].concat(Object.keys(customLevels || {}).map((key2) => customLevels[key2]), useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level), Infinity);
        if (!values.includes(defaultLevel)) {
          throw Error(`default level:${defaultLevel} must be included in custom levels`);
        }
        return;
      }
      const labels = Object.assign(Object.create(Object.prototype, { silent: { value: Infinity } }), useOnlyCustomLevels ? null : levels, customLevels);
      if (!(defaultLevel in labels)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
    }
    function assertNoLevelCollisions(levels2, customLevels) {
      const { labels, values } = levels2;
      for (const k in customLevels) {
        if (k in values) {
          throw Error("levels cannot be overridden");
        }
        if (customLevels[k] in labels) {
          throw Error("pre-existing level values cannot be used for new levels");
        }
      }
    }
    module2.exports = {
      initialLsCache,
      genLsCache,
      levelMethods,
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      assertNoLevelCollisions,
      assertDefaultLevelFound
    };
  }
});

// node_modules/pino/package.json
var require_package = __commonJS({
  "node_modules/pino/package.json"(exports, module2) {
    module2.exports = {
      name: "pino",
      version: "6.13.3",
      description: "super fast, all natural json logger",
      main: "pino.js",
      browser: "./browser.js",
      files: [
        "pino.js",
        "bin.js",
        "browser.js",
        "pretty.js",
        "usage.txt",
        "test",
        "docs",
        "example.js",
        "lib"
      ],
      scripts: {
        docs: "docsify serve",
        "browser-test": "airtap --local 8080 test/browser*test.js",
        lint: "eslint .",
        test: "npm run lint && tap --100 test/*test.js test/*/*test.js",
        "test-ci": "npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly",
        "cov-ui": "tap --coverage-report=html test/*test.js test/*/*test.js",
        bench: "node benchmarks/utils/runbench all",
        "bench-basic": "node benchmarks/utils/runbench basic",
        "bench-object": "node benchmarks/utils/runbench object",
        "bench-deep-object": "node benchmarks/utils/runbench deep-object",
        "bench-multi-arg": "node benchmarks/utils/runbench multi-arg",
        "bench-longs-tring": "node benchmarks/utils/runbench long-string",
        "bench-child": "node benchmarks/utils/runbench child",
        "bench-child-child": "node benchmarks/utils/runbench child-child",
        "bench-child-creation": "node benchmarks/utils/runbench child-creation",
        "bench-formatters": "node benchmarks/utils/runbench formatters",
        "update-bench-doc": "node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md"
      },
      bin: {
        pino: "./bin.js"
      },
      precommit: "test",
      repository: {
        type: "git",
        url: "git+https://github.com/pinojs/pino.git"
      },
      keywords: [
        "fast",
        "logger",
        "stream",
        "json"
      ],
      author: "Matteo Collina <hello@matteocollina.com>",
      contributors: [
        "David Mark Clements <huperekchuno@googlemail.com>",
        "James Sumners <james.sumners@gmail.com>",
        "Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)"
      ],
      license: "MIT",
      bugs: {
        url: "https://github.com/pinojs/pino/issues"
      },
      homepage: "http://getpino.io",
      devDependencies: {
        airtap: "4.0.3",
        benchmark: "^2.1.4",
        bole: "^4.0.0",
        bunyan: "^1.8.14",
        "docsify-cli": "^4.4.1",
        eslint: "^7.17.0",
        "eslint-config-standard": "^16.0.2",
        "eslint-plugin-import": "^2.22.1",
        "eslint-plugin-node": "^11.1.0",
        "eslint-plugin-promise": "^5.1.0",
        execa: "^5.0.0",
        fastbench: "^1.0.1",
        "flush-write-stream": "^2.0.0",
        "import-fresh": "^3.2.1",
        log: "^6.0.0",
        loglevel: "^1.6.7",
        "pino-pretty": "^5.0.0",
        "pre-commit": "^1.2.2",
        proxyquire: "^2.1.3",
        pump: "^3.0.0",
        semver: "^7.0.0",
        split2: "^3.1.1",
        steed: "^1.1.3",
        "strip-ansi": "^6.0.0",
        tap: "^15.0.1",
        tape: "^5.0.0",
        through2: "^4.0.0",
        winston: "^3.3.3"
      },
      dependencies: {
        "fast-redact": "^3.0.0",
        "fast-safe-stringify": "^2.0.8",
        "fastify-warning": "^0.2.0",
        flatstr: "^1.0.12",
        "pino-std-serializers": "^3.1.0",
        "quick-format-unescaped": "^4.0.3",
        "sonic-boom": "^1.0.2"
      },
      _resolved: "https://registry.npmjs.org/pino/-/pino-6.13.3.tgz",
      _integrity: "sha512-tJy6qVgkh9MwNgqX1/oYi3ehfl2Y9H0uHyEEMsBe74KinESIjdMrMQDWpcZPpPicg3VV35d/GLQZmo4QgU2Xkg==",
      _from: "pino@6.13.3"
    };
  }
});

// node_modules/pino/lib/meta.js
var require_meta = __commonJS({
  "node_modules/pino/lib/meta.js"(exports, module2) {
    "use strict";
    var { version: version2 } = require_package();
    module2.exports = { version: version2 };
  }
});

// node_modules/pino/lib/proto.js
var require_proto = __commonJS({
  "node_modules/pino/lib/proto.js"(exports, module2) {
    "use strict";
    var { EventEmitter } = require("events");
    var SonicBoom = require_sonic_boom();
    var flatstr = require_flatstr();
    var warning = require_deprecations();
    var {
      lsCacheSym,
      levelValSym,
      setLevelSym,
      getLevelSym,
      chindingsSym,
      parsedChindingsSym,
      mixinSym,
      asJsonSym,
      writeSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      serializersSym,
      formattersSym,
      useOnlyCustomLevelsSym,
      needsMetadataGsym,
      redactFmtSym,
      stringifySym,
      formatOptsSym,
      stringifiersSym
    } = require_symbols();
    var {
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      initialLsCache,
      genLsCache,
      assertNoLevelCollisions
    } = require_levels();
    var {
      asChindings,
      asJson,
      buildFormatters,
      stringify: stringify3
    } = require_tools();
    var {
      version: version2
    } = require_meta();
    var redaction = require_redaction();
    var constructor = class Pino {
    };
    var prototype = {
      constructor,
      child,
      bindings,
      setBindings,
      flush,
      isLevelEnabled,
      version: version2,
      get level() {
        return this[getLevelSym]();
      },
      set level(lvl) {
        this[setLevelSym](lvl);
      },
      get levelVal() {
        return this[levelValSym];
      },
      set levelVal(n) {
        throw Error("levelVal is read-only");
      },
      [lsCacheSym]: initialLsCache,
      [writeSym]: write,
      [asJsonSym]: asJson,
      [getLevelSym]: getLevel,
      [setLevelSym]: setLevel
    };
    Object.setPrototypeOf(prototype, EventEmitter.prototype);
    module2.exports = function() {
      return Object.create(prototype);
    };
    var resetChildingsFormatter = (bindings2) => bindings2;
    function child(bindings2, options) {
      if (!bindings2) {
        throw Error("missing bindings for child Pino");
      }
      options = options || {};
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const instance2 = Object.create(this);
      if (bindings2.hasOwnProperty("serializers") === true) {
        warning.emit("PINODEP004");
        options.serializers = bindings2.serializers;
      }
      if (bindings2.hasOwnProperty("formatters") === true) {
        warning.emit("PINODEP005");
        options.formatters = bindings2.formatters;
      }
      if (bindings2.hasOwnProperty("customLevels") === true) {
        warning.emit("PINODEP006");
        options.customLevels = bindings2.customLevels;
      }
      if (bindings2.hasOwnProperty("level") === true) {
        warning.emit("PINODEP007");
        options.level = bindings2.level;
      }
      if (options.hasOwnProperty("serializers") === true) {
        instance2[serializersSym] = /* @__PURE__ */ Object.create(null);
        for (const k in serializers) {
          instance2[serializersSym][k] = serializers[k];
        }
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        for (var i = 0; i < parentSymbols.length; i++) {
          const ks = parentSymbols[i];
          instance2[serializersSym][ks] = serializers[ks];
        }
        for (const bk in options.serializers) {
          instance2[serializersSym][bk] = options.serializers[bk];
        }
        const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
        for (var bi = 0; bi < bindingsSymbols.length; bi++) {
          const bks = bindingsSymbols[bi];
          instance2[serializersSym][bks] = options.serializers[bks];
        }
      } else
        instance2[serializersSym] = serializers;
      if (options.hasOwnProperty("formatters")) {
        const { level, bindings: chindings, log } = options.formatters;
        instance2[formattersSym] = buildFormatters(level || formatters.level, chindings || resetChildingsFormatter, log || formatters.log);
      } else {
        instance2[formattersSym] = buildFormatters(formatters.level, resetChildingsFormatter, formatters.log);
      }
      if (options.hasOwnProperty("customLevels") === true) {
        assertNoLevelCollisions(this.levels, options.customLevels);
        instance2.levels = mappings(options.customLevels, instance2[useOnlyCustomLevelsSym]);
        genLsCache(instance2);
      }
      if (typeof options.redact === "object" && options.redact !== null || Array.isArray(options.redact)) {
        instance2.redact = options.redact;
        const stringifiers = redaction(instance2.redact, stringify3);
        const formatOpts = { stringify: stringifiers[redactFmtSym] };
        instance2[stringifySym] = stringify3;
        instance2[stringifiersSym] = stringifiers;
        instance2[formatOptsSym] = formatOpts;
      }
      instance2[chindingsSym] = asChindings(instance2, bindings2);
      const childLevel = options.level || this.level;
      instance2[setLevelSym](childLevel);
      return instance2;
    }
    function bindings() {
      const chindings = this[chindingsSym];
      const chindingsJson = `{${chindings.substr(1)}}`;
      const bindingsFromJson = JSON.parse(chindingsJson);
      delete bindingsFromJson.pid;
      delete bindingsFromJson.hostname;
      return bindingsFromJson;
    }
    function setBindings(newBindings) {
      const chindings = asChindings(this, newBindings);
      this[chindingsSym] = chindings;
      delete this[parsedChindingsSym];
    }
    function write(_obj, msg, num) {
      const t = this[timeSym]();
      const mixin = this[mixinSym];
      const objError = _obj instanceof Error;
      let obj;
      if (_obj === void 0 || _obj === null) {
        obj = mixin ? mixin({}) : {};
      } else {
        obj = Object.assign(mixin ? mixin(_obj) : {}, _obj);
        if (!msg && objError) {
          msg = _obj.message;
        }
        if (objError) {
          obj.stack = _obj.stack;
          if (!obj.type) {
            obj.type = "Error";
          }
        }
      }
      const s = this[asJsonSym](obj, msg, num, t);
      const stream = this[streamSym];
      if (stream[needsMetadataGsym] === true) {
        stream.lastLevel = num;
        stream.lastObj = obj;
        stream.lastMsg = msg;
        stream.lastTime = t.slice(this[timeSliceIndexSym]);
        stream.lastLogger = this;
      }
      if (stream instanceof SonicBoom)
        stream.write(s);
      else
        stream.write(flatstr(s));
    }
    function flush() {
      const stream = this[streamSym];
      if ("flush" in stream)
        stream.flush();
    }
  }
});

// node_modules/pino/pino.js
var require_pino = __commonJS({
  "node_modules/pino/pino.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var stdSerializers = require_pino_std_serializers();
    var redaction = require_redaction();
    var time = require_time();
    var proto = require_proto();
    var symbols = require_symbols();
    var { assertDefaultLevelFound, mappings, genLsCache } = require_levels();
    var {
      createArgsNormalizer,
      asChindings,
      final,
      stringify: stringify3,
      buildSafeSonicBoom,
      buildFormatters,
      noop
    } = require_tools();
    var { version: version2 } = require_meta();
    var {
      chindingsSym,
      redactFmtSym,
      serializersSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifiersSym,
      setLevelSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      nestedKeySym,
      mixinSym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym
    } = symbols;
    var { epochTime, nullTime } = time;
    var { pid } = process;
    var hostname = os.hostname();
    var defaultErrorSerializer = stdSerializers.err;
    var defaultOptions = {
      level: "info",
      messageKey: "msg",
      nestedKey: null,
      enabled: true,
      prettyPrint: false,
      base: { pid, hostname },
      serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
        err: defaultErrorSerializer
      }),
      formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
        bindings(bindings) {
          return bindings;
        },
        level(label, number) {
          return { level: number };
        }
      }),
      hooks: {
        logMethod: void 0
      },
      timestamp: epochTime,
      name: void 0,
      redact: null,
      customLevels: null,
      levelKey: void 0,
      useOnlyCustomLevels: false
    };
    var normalize = createArgsNormalizer(defaultOptions);
    var serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
    function pino2(...args) {
      const instance2 = {};
      const { opts, stream } = normalize(instance2, ...args);
      const {
        redact,
        crlf,
        serializers: serializers2,
        timestamp,
        messageKey,
        nestedKey,
        base,
        name,
        level,
        customLevels,
        useLevelLabels,
        changeLevelName,
        levelKey,
        mixin,
        useOnlyCustomLevels,
        formatters,
        hooks
      } = opts;
      const allFormatters = buildFormatters(formatters.level, formatters.bindings, formatters.log);
      if (useLevelLabels && !(changeLevelName || levelKey)) {
        process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead", "Warning", "PINODEP001");
        allFormatters.level = labelsFormatter;
      } else if ((changeLevelName || levelKey) && !useLevelLabels) {
        process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead", "Warning", "PINODEP002");
        allFormatters.level = levelNameFormatter(changeLevelName || levelKey);
      } else if ((changeLevelName || levelKey) && useLevelLabels) {
        process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead", "Warning", "PINODEP001");
        process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead", "Warning", "PINODEP002");
        allFormatters.level = levelNameLabelFormatter(changeLevelName || levelKey);
      }
      if (serializers2[Symbol.for("pino.*")]) {
        process.emitWarning("The pino.* serializer is deprecated, use the formatters.log options instead", "Warning", "PINODEP003");
        allFormatters.log = serializers2[Symbol.for("pino.*")];
      }
      if (!allFormatters.bindings) {
        allFormatters.bindings = defaultOptions.formatters.bindings;
      }
      if (!allFormatters.level) {
        allFormatters.level = defaultOptions.formatters.level;
      }
      const stringifiers = redact ? redaction(redact, stringify3) : {};
      const formatOpts = redact ? { stringify: stringifiers[redactFmtSym] } : { stringify: stringify3 };
      const end = "}" + (crlf ? "\r\n" : "\n");
      const coreChindings = asChindings.bind(null, {
        [chindingsSym]: "",
        [serializersSym]: serializers2,
        [stringifiersSym]: stringifiers,
        [stringifySym]: stringify3,
        [formattersSym]: allFormatters
      });
      let chindings = "";
      if (base !== null) {
        if (name === void 0) {
          chindings = coreChindings(base);
        } else {
          chindings = coreChindings(Object.assign({}, base, { name }));
        }
      }
      const time2 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
      const timeSliceIndex = time2().indexOf(":") + 1;
      if (useOnlyCustomLevels && !customLevels)
        throw Error("customLevels is required if useOnlyCustomLevels is set true");
      if (mixin && typeof mixin !== "function")
        throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
      assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
      const levels = mappings(customLevels, useOnlyCustomLevels);
      Object.assign(instance2, {
        levels,
        [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [streamSym]: stream,
        [timeSym]: time2,
        [timeSliceIndexSym]: timeSliceIndex,
        [stringifySym]: stringify3,
        [stringifiersSym]: stringifiers,
        [endSym]: end,
        [formatOptsSym]: formatOpts,
        [messageKeySym]: messageKey,
        [nestedKeySym]: nestedKey,
        [serializersSym]: serializers2,
        [mixinSym]: mixin,
        [chindingsSym]: chindings,
        [formattersSym]: allFormatters,
        [hooksSym]: hooks,
        silent: noop
      });
      Object.setPrototypeOf(instance2, proto());
      genLsCache(instance2);
      instance2[setLevelSym](level);
      return instance2;
    }
    function labelsFormatter(label, number) {
      return { level: label };
    }
    function levelNameFormatter(name) {
      return function(label, number) {
        return { [name]: number };
      };
    }
    function levelNameLabelFormatter(name) {
      return function(label, number) {
        return { [name]: label };
      };
    }
    module2.exports = pino2;
    module2.exports.extreme = (dest = process.stdout.fd) => {
      process.emitWarning("The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.", { code: "extreme_deprecation" });
      return buildSafeSonicBoom({ dest, minLength: 4096, sync: false });
    };
    module2.exports.destination = (dest = process.stdout.fd) => {
      if (typeof dest === "object") {
        dest.dest = dest.dest || process.stdout.fd;
        return buildSafeSonicBoom(dest);
      } else {
        return buildSafeSonicBoom({ dest, minLength: 0, sync: true });
      }
    };
    module2.exports.final = final;
    module2.exports.levels = mappings();
    module2.exports.stdSerializers = serializers;
    module2.exports.stdTimeFunctions = Object.assign({}, time);
    module2.exports.symbols = symbols;
    module2.exports.version = version2;
    module2.exports.default = pino2;
    module2.exports.pino = pino2;
  }
});

// src/lambda/consoleWrapper.ts
function pinoLogArgConcatenationMethod(args, method) {
  if (args.length >= 2) {
    method.apply(this, [
      args.map((arg) => typeof arg === "string" ? "%s" : "%j").join(" "),
      ...args
    ]);
  } else {
    method.apply(this, args);
  }
}
var awsCloudWatchTag, util, pino, edgioOriginalConsole, _timers, ConsoleWrapper;
var init_consoleWrapper = __esm({
  "src/lambda/consoleWrapper.ts"() {
    "use strict";
    awsCloudWatchTag = { awsTag: "userLogs" };
    util = require("util");
    pino = require_pino();
    edgioOriginalConsole = {
      assert: console.assert,
      debug: console.debug,
      dir: console.dir,
      error: console.error,
      info: console.info,
      log: console.log,
      time: console.time,
      timeEnd: console.timeEnd,
      timeLog: console.timeLog,
      trace: console.trace,
      warn: console.warn
    };
    _timers = {};
    ConsoleWrapper = class {
      static _assert(condition, ...args) {
        if (!condition) {
          console.info(...args);
        }
      }
      static _dir(...args) {
        console.info(util.inspect(...args));
      }
      static _time(label) {
        _timers[label] = Date.now();
      }
      static _timeEnd(label) {
        ConsoleWrapper._timeLog(label);
      }
      static _timeLog(label, ...args) {
        if (!_timers[label]) {
          console.warn(`Warning: No such label '${label}' for console.timeEnd()`);
          return;
        }
        const deltaTime = Date.now() - _timers[label];
        _timers[label] = Date.now();
        console.info(`${label}: ${deltaTime}ms`, ...args);
      }
      static enable({
        clientIp,
        requestId,
        wi
      } = {}) {
        _timers = {};
        let logger2 = pino({
          base: {
            ...awsCloudWatchTag,
            ...{ wi }
          },
          timestamp: true,
          hooks: {
            logMethod: pinoLogArgConcatenationMethod
          }
        });
        if (clientIp) {
          logger2 = logger2.child({ clientIp });
        }
        if (requestId) {
          logger2 = logger2.child({ requestId });
        }
        console.assert = ConsoleWrapper._assert;
        console.debug = logger2.debug.bind(logger2);
        console.dir = ConsoleWrapper._dir;
        console.error = logger2.error.bind(logger2);
        console.info = logger2.info.bind(logger2);
        console.log = logger2.info.bind(logger2);
        console.time = ConsoleWrapper._time;
        console.timeEnd = ConsoleWrapper._timeEnd;
        console.timeLog = ConsoleWrapper._timeLog;
        console.trace = logger2.trace.bind(logger2);
        console.warn = logger2.warn.bind(logger2);
      }
      static disable() {
        console.assert = edgioOriginalConsole.assert;
        console.debug = edgioOriginalConsole.debug;
        console.dir = edgioOriginalConsole.dir;
        console.error = edgioOriginalConsole.error;
        console.info = edgioOriginalConsole.info;
        console.log = edgioOriginalConsole.log;
        console.time = edgioOriginalConsole.time;
        console.timeEnd = edgioOriginalConsole.timeEnd;
        console.timeLog = edgioOriginalConsole.timeLog;
        console.trace = edgioOriginalConsole.trace;
        console.warn = edgioOriginalConsole.warn;
      }
    };
  }
});

// src/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ACTIONS: () => ACTIONS,
  BACKENDS: () => BACKENDS,
  BROTLI_ENCODING: () => BROTLI_ENCODING,
  CACHEABLE_METHODS: () => CACHEABLE_METHODS,
  CACHING_DEBUG_CACHEABLE: () => CACHING_DEBUG_CACHEABLE,
  CACHING_DEBUG_HEADERS: () => CACHING_DEBUG_HEADERS,
  CACHING_DEBUG_STATUS: () => CACHING_DEBUG_STATUS,
  CACHING_STATUS: () => CACHING_STATUS,
  DEVTOOLS_PREFETCH_QUERY_PARAM: () => DEVTOOLS_PREFETCH_QUERY_PARAM,
  EDGIO_ASSET_ALIASES_FILE: () => EDGIO_ASSET_ALIASES_FILE,
  EDGIO_CONFIG_FILE: () => EDGIO_CONFIG_FILE,
  EDGIO_DEPLOYMENT_TYPE_AWS: () => EDGIO_DEPLOYMENT_TYPE_AWS,
  EDGIO_ENV_VARIABLES: () => EDGIO_ENV_VARIABLES,
  EDGIO_EXCLUSIVE_COMPUTE: () => EDGIO_EXCLUSIVE_COMPUTE,
  EDGIO_HEADERS_PREFIX: () => EDGIO_HEADERS_PREFIX,
  EDGIO_IMAGE_OPTIMIZER_PATH: () => EDGIO_IMAGE_OPTIMIZER_PATH,
  EDGIO_MAX_USER_HEADERS_ALLOWED: () => EDGIO_MAX_USER_HEADERS_ALLOWED,
  EDGIO_SERVERLESS_HINTS: () => EDGIO_SERVERLESS_HINTS,
  EDGIO_SERVERLESS_HINT_HEADER: () => EDGIO_SERVERLESS_HINT_HEADER,
  EDGIO_TOO_MANY_HEADERS_STATUS_CODE: () => EDGIO_TOO_MANY_HEADERS_STATUS_CODE,
  EDGIO_UNCACHED_PREFETCH_STATUS: () => EDGIO_UNCACHED_PREFETCH_STATUS,
  FAR_FUTURE_TTL: () => FAR_FUTURE_TTL,
  GZIP_ENCODING: () => GZIP_ENCODING,
  HEAD_QUERY_PARAM: () => HEAD_QUERY_PARAM,
  HOSTS_NOINDEX_PERMALINK_REGEX: () => HOSTS_NOINDEX_PERMALINK_REGEX,
  HTTP_HEADERS: () => HTTP_HEADERS,
  HTTP_METHODS: () => HTTP_METHODS,
  IS_BROWSER: () => IS_BROWSER,
  JS_BACKEND_HOSTNAME: () => JS_BACKEND_HOSTNAME,
  METHOD_QUERY_PARAM: () => METHOD_QUERY_PARAM,
  POST_BODY_QUERY_PARAM: () => POST_BODY_QUERY_PARAM,
  PREFETCH_QUERY_PARAM: () => PREFETCH_QUERY_PARAM,
  PREFETCH_TTL_PARAM: () => PREFETCH_TTL_PARAM,
  ROUTES_CATCH_GROUP: () => ROUTES_CATCH_GROUP,
  ROUTES_FALLBACK: () => ROUTES_FALLBACK,
  ROUTES_NOINDEX_GROUP: () => ROUTES_NOINDEX_GROUP,
  THROTTLED_QUERY_PARAM: () => THROTTLED_QUERY_PARAM
});
var EDGIO_CONFIG_FILE, EDGIO_ASSET_ALIASES_FILE, EDGIO_ENV_VARIABLES, EDGIO_DEPLOYMENT_TYPE_AWS, EDGIO_HEADERS_PREFIX, EDGIO_SERVERLESS_HINT_HEADER, EDGIO_EXCLUSIVE_COMPUTE, EDGIO_SERVERLESS_HINTS, EDGIO_MAX_USER_HEADERS_ALLOWED, EDGIO_TOO_MANY_HEADERS_STATUS_CODE, EDGIO_UNCACHED_PREFETCH_STATUS, ACTIONS, BACKENDS, JS_BACKEND_HOSTNAME, HTTP_METHODS, HTTP_HEADERS, CACHING_STATUS, CACHEABLE_METHODS, CACHING_DEBUG_HEADERS, CACHING_DEBUG_STATUS, CACHING_DEBUG_CACHEABLE, THROTTLED_QUERY_PARAM, PREFETCH_QUERY_PARAM, PREFETCH_TTL_PARAM, DEVTOOLS_PREFETCH_QUERY_PARAM, HEAD_QUERY_PARAM, POST_BODY_QUERY_PARAM, METHOD_QUERY_PARAM, ROUTES_FALLBACK, ROUTES_CATCH_GROUP, ROUTES_NOINDEX_GROUP, HOSTS_NOINDEX_PERMALINK_REGEX, EDGIO_IMAGE_OPTIMIZER_PATH, IS_BROWSER, BROTLI_ENCODING, GZIP_ENCODING, FAR_FUTURE_TTL;
var init_constants = __esm({
  "src/constants.ts"() {
    "use strict";
    EDGIO_CONFIG_FILE = "edgio.config.js";
    EDGIO_ASSET_ALIASES_FILE = "asset-aliases.json";
    EDGIO_ENV_VARIABLES = {
      config: "EDGIO_CONFIG",
      internalConfig: "EDGIO_INTERNAL_CONFIG",
      deploymentType: "EDGIO_DEPLOYMENT_TYPE",
      versionOverride: "EDGIO_VERSION_OVERRIDE",
      productionBuild: "EDGIO_PRODUCTION_BUILD",
      local: "EDGIO_LOCAL",
      cache: "EDGIO_CACHE"
    };
    EDGIO_DEPLOYMENT_TYPE_AWS = "AWS";
    EDGIO_HEADERS_PREFIX = "x-edg-";
    EDGIO_SERVERLESS_HINT_HEADER = "x-edg-serverless-hint";
    EDGIO_EXCLUSIVE_COMPUTE = "exclusive";
    EDGIO_SERVERLESS_HINTS = {
      app: "app-" + EDGIO_EXCLUSIVE_COMPUTE,
      compute: "compute",
      computeExclusive: "compute-" + EDGIO_EXCLUSIVE_COMPUTE
    };
    EDGIO_MAX_USER_HEADERS_ALLOWED = 70;
    EDGIO_TOO_MANY_HEADERS_STATUS_CODE = 542;
    EDGIO_UNCACHED_PREFETCH_STATUS = 412;
    ACTIONS = {
      setHeader: "set-header",
      updateHeader: "update-header",
      removeHeader: "remove-header",
      syntheticRes: "synthetic-response",
      updatePath: "update-path",
      proxy: "proxy",
      addCookie: "add-cookie",
      updateCookie: "update-cookie",
      removeCookie: "remove-cookie"
    };
    BACKENDS = {
      js: "__js__",
      static: "__static__",
      permanentStatic: "__permanent_static__",
      imageOptimizer: "__image_optimizer__"
    };
    JS_BACKEND_HOSTNAME = "127.0.0.1";
    HTTP_METHODS = {
      head: "head",
      get: "get",
      post: "post",
      delete: "delete",
      put: "put",
      patch: "patch",
      options: "options"
    };
    HTTP_HEADERS = {
      acceptEncoding: "accept-encoding",
      authorization: "authorization",
      cacheControl: "cache-control",
      contentEncoding: "content-encoding",
      contentLength: "content-length",
      contentType: "content-type",
      cookie: "cookie",
      expires: "expires",
      host: "host",
      location: "location",
      range: "range",
      serverTiming: "server-timing",
      setCookie: "set-cookie",
      userAgent: "user-agent",
      vary: "vary",
      via: "via",
      xEcDebug: "x-ec-debug",
      xForwardedFor: "x-forwarded-for",
      xRequestId: "x-request-id",
      xSwCacheControl: "x-sw-cache-control",
      xEdgeBrowser: "x-edg-browser",
      xEdgeCacheControl: "x-edg-cache-control",
      xEdgeCachingStatus: "x-edg-caching-status",
      xEdgeClientIp: "x-edg-client-ip",
      xEdgeComponents: "x-edg-components",
      xEdgeDestination: "x-edg-destination",
      xEdgeDevice: "x-edg-device",
      xEdgeDeviceIsBot: "x-edg-device-is-bot",
      xEdgeGeoCity: "x-edg-geo-city",
      xEdgeGeoCountryCode: "x-edg-geo-country-code",
      xEdgeGeoLatitude: "x-edg-geo-latitude",
      xEdgeGeoLongitude: "x-edg-geo-longitude",
      xEdgeGeoPostalCode: "x-edg-geo-postal-code",
      xEdgeMatchedRoutes: "x-edg-matched-routes",
      xEdgeProtocol: "x-edg-protocol",
      xEdgeRoute: "x-edg-route",
      xEdgeStatus: "x-edg-status",
      xEdgeSurrogateKey: "x-edg-surrogate-key",
      xEdgeT: "x-edg-t",
      xEdgeUserT: "x-edg-user-t",
      xEdgeVendor: "x-edg-vendor",
      xEdgeVersion: "x-edg-version"
    };
    CACHING_STATUS = {
      cached: "cached",
      hit: "hit",
      bypassed: "bypassed",
      private: "private",
      method: "method",
      bodyTooBig: "body-too-big",
      code: "code",
      setCookie: "set-cookie",
      noMaxAge: "no-max-age"
    };
    CACHEABLE_METHODS = /* @__PURE__ */ new Set(["get", "head"]);
    CACHING_DEBUG_HEADERS = {
      cache: "x-ec-cache",
      checkCacheable: "x-ec-check-cacheable",
      cacheState: "x-ec-cache-state",
      cacheKey: "x-ec-cache-key"
    };
    CACHING_DEBUG_STATUS = {
      configNoCache: "CONFIG_NOCACHE",
      none: "NONE",
      tcpClientRefreshMiss: "TCP_CLIENT_REFRESH_MISS",
      tcpExpiredHit: "TCP_EXPIRED_HIT",
      tcpExpiredMiss: "TCP_EXPIRED_MISS",
      tcpHit: "TCP_HIT",
      tcpMiss: "TCP_MISS",
      tcpPartialHit: "TCP_PARTIAL_HIT",
      uncacheable: "UNCACHEABLE"
    };
    CACHING_DEBUG_CACHEABLE = {
      yes: "YES",
      no: "NO"
    };
    THROTTLED_QUERY_PARAM = "edgio_prefetch";
    PREFETCH_QUERY_PARAM = THROTTLED_QUERY_PARAM;
    PREFETCH_TTL_PARAM = "edgio_prefetch_ttl";
    DEVTOOLS_PREFETCH_QUERY_PARAM = "edgio_dt_pf";
    HEAD_QUERY_PARAM = "edgio_head";
    POST_BODY_QUERY_PARAM = "pref_edgio_body";
    METHOD_QUERY_PARAM = "pref_edgio_method";
    ROUTES_FALLBACK = "fallback";
    ROUTES_CATCH_GROUP = "catch";
    ROUTES_NOINDEX_GROUP = "noindex";
    HOSTS_NOINDEX_PERMALINK_REGEX = /\.layer0\.link|\.layer0-perma\.link|\.edgio\.link|\.edgio-perma\.link|\.layer0-limelight\.link/;
    EDGIO_IMAGE_OPTIMIZER_PATH = "/__layer0_image_optimizer";
    IS_BROWSER = typeof window !== "undefined";
    BROTLI_ENCODING = "br";
    GZIP_ENCODING = "gzip";
    FAR_FUTURE_TTL = 30758400;
  }
});

// src/environment.ts
var environment_exports = {};
__export(environment_exports, {
  isBrowser: () => isBrowser,
  isCloud: () => isCloud,
  isEdgioRunDev: () => isEdgioRunDev,
  isLocal: () => isLocal,
  isProductionBuild: () => isProductionBuild
});
function isCloud() {
  return process.env[EDGIO_ENV_VARIABLES.deploymentType] === EDGIO_DEPLOYMENT_TYPE_AWS;
}
function isLocal() {
  return process.env[EDGIO_ENV_VARIABLES.local] === "true";
}
function isProductionBuild() {
  return process.env.NODE_ENV === "production" || process.env[EDGIO_ENV_VARIABLES.productionBuild] === "true";
}
function isEdgioRunDev() {
  return !isCloud() && !isProductionBuild();
}
function isBrowser() {
  return typeof window !== "undefined";
}
var init_environment = __esm({
  "src/environment.ts"() {
    "use strict";
    init_constants();
  }
});

// src/lambda/stdStreamsWrapper.ts
var stdStreamsWrapper_exports = {};
__export(stdStreamsWrapper_exports, {
  deepRequestInspectionLogger: () => deepRequestInspectionLogger,
  default: () => stdStreamsWrapper_default
});
function isEdgioJsonLog(log) {
  return log.indexOf(JSON_LOG_IDENTIFIER) >= 0;
}
function deepRequestInspectionLogger(instance2) {
  function logHttpRequestInfo(data, level) {
    try {
      if (process.env.EDGIO_HTTP_REQUEST_LOGGING === "1") {
        edgioOriginalOutputs.stdoutWrite.apply(process.stdout, [
          JSON.stringify({
            level,
            time: Date.now(),
            wi: instance2.id,
            ...currentBaseJsonObject,
            data
          })
        ]);
        edgioOriginalOutputs.stdoutWrite.apply(process.stdout, ["\n"]);
      }
    } catch (e) {
      console.error(`Error while logging HTTP request info at level ${level}: ${e && e.message}`);
    }
  }
  function logDownstreamRequestInfo(data) {
    return logHttpRequestInfo(data, DOWNSTREAM_REQUEST_INFO_LEVEL);
  }
  function logDownstreamResponseInfo(data) {
    return logHttpRequestInfo(data, DOWNSTREAM_RESPONSE_INFO_LEVEL);
  }
  function logUpstreamRequestInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_REQUEST_INFO_LEVEL);
  }
  function logUpstreamResponseInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_RESPONSE_INFO_LEVEL);
  }
  function logUpstreamResponseBodyInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_RESPONSE_BODY_INFO_LEVEL);
  }
  return {
    logDownstreamRequestInfo,
    logDownstreamResponseInfo,
    logUpstreamRequestInfo,
    logUpstreamResponseInfo,
    logUpstreamResponseBodyInfo
  };
}
function jsonifyWriteStream(stream, baseJsonObject) {
  const originalWrite = stream.write;
  stream.write = function(chunk, ...otherArgs) {
    let convertedChunk;
    if (typeof chunk === "object") {
      convertedChunk = Buffer.from(chunk).toString();
    } else {
      convertedChunk = chunk;
    }
    const dynamicObject = {
      time: Date.now()
    };
    if (chunk && !isEdgioJsonLog(convertedChunk)) {
      chunk = JSON.stringify({
        ...baseJsonObject,
        ...dynamicObject,
        msg: convertedChunk
      }) + "\n";
    }
    return originalWrite.apply(stream, [chunk, ...otherArgs]);
  };
}
var environment, edgioOriginalOutputs, PINO_ERROR_LEVEL, PINO_INFO_LEVEL, edgioEnabledCount, JSON_LOG_IDENTIFIER, DOWNSTREAM_REQUEST_INFO_LEVEL, DOWNSTREAM_RESPONSE_INFO_LEVEL, UPSTREAM_REQUEST_INFO_LEVEL, UPSTREAM_RESPONSE_INFO_LEVEL, UPSTREAM_RESPONSE_BODY_INFO_LEVEL, currentBaseJsonObject, stdStreamsWrapper, stdStreamsWrapper_default;
var init_stdStreamsWrapper = __esm({
  "src/lambda/stdStreamsWrapper.ts"() {
    "use strict";
    init_consoleWrapper();
    environment = (init_environment(), __toCommonJS(environment_exports));
    edgioOriginalOutputs = {
      stdoutWrite: process.stdout.write,
      stderrWrite: process.stderr.write
    };
    PINO_ERROR_LEVEL = 50;
    PINO_INFO_LEVEL = 30;
    edgioEnabledCount = 0;
    JSON_LOG_IDENTIFIER = JSON.stringify(awsCloudWatchTag).replace("{", "").replace("}", "");
    DOWNSTREAM_REQUEST_INFO_LEVEL = 100;
    DOWNSTREAM_RESPONSE_INFO_LEVEL = 101;
    UPSTREAM_REQUEST_INFO_LEVEL = 102;
    UPSTREAM_RESPONSE_INFO_LEVEL = 103;
    UPSTREAM_RESPONSE_BODY_INFO_LEVEL = 104;
    currentBaseJsonObject = {};
    stdStreamsWrapper = {
      enable: ({
        clientIp,
        requestId,
        wi
      } = {}) => {
        if (!environment.isCloud()) {
          return;
        }
        if (edgioEnabledCount === 0) {
          let basePayload = awsCloudWatchTag;
          if (clientIp) {
            basePayload = {
              ...basePayload,
              clientIp
            };
          }
          if (requestId) {
            basePayload = {
              ...basePayload,
              requestId
            };
          }
          if (wi) {
            basePayload = {
              ...basePayload,
              wi
            };
          }
          currentBaseJsonObject = basePayload;
          jsonifyWriteStream(process.stdout, { level: PINO_INFO_LEVEL, ...basePayload });
          jsonifyWriteStream(process.stderr, { level: PINO_ERROR_LEVEL, ...basePayload });
          ConsoleWrapper.enable({ clientIp, requestId, wi });
        }
        edgioEnabledCount++;
      },
      disable: () => {
        if (!environment.isCloud()) {
          return;
        }
        edgioEnabledCount--;
        if (edgioEnabledCount === 0) {
          process.stdout.write = edgioOriginalOutputs.stdoutWrite;
          process.stderr.write = edgioOriginalOutputs.stderrWrite;
          currentBaseJsonObject = {};
          ConsoleWrapper.disable();
        }
      }
    };
    stdStreamsWrapper_default = stdStreamsWrapper;
  }
});

// src/lambda/getBodyLoggingData.ts
var getBodyLoggingData_exports = {};
__export(getBodyLoggingData_exports, {
  default: () => getBodyLoggingData
});
function base64encode(str) {
  return Buffer.from(str).toString("base64");
}
function getContentEncoding(headers) {
  if (!headers) {
    return void 0;
  }
  let encoding = headers[HTTP_HEADERS.contentEncoding];
  if (!encoding) {
    for (let name of Object.keys(headers)) {
      if (name.toLowerCase() === HTTP_HEADERS.contentEncoding) {
        encoding = headers[name];
        break;
      }
    }
  }
  if (Array.isArray(encoding)) {
    if (encoding.length) {
      encoding = encoding[0];
    } else {
      encoding = void 0;
    }
  }
  return encoding;
}
function getBodyLoggingData(rawBody, headers) {
  var _a2;
  try {
    if (!rawBody || rawBody.length === 0) {
      return {};
    }
    let body;
    if (typeof rawBody === "string") {
      body = Buffer.from(rawBody, "base64");
    } else if (Buffer.isBuffer(rawBody)) {
      body = rawBody;
    } else if (Array.isArray(rawBody)) {
      body = Buffer.concat(rawBody);
    } else {
      return {
        body: base64encode(`Unknown body format: ${typeof rawBody}`),
        bodyLength: rawBody.length,
        bodyTruncated: true
      };
    }
    let encoding = (_a2 = getContentEncoding(headers)) == null ? void 0 : _a2.toLowerCase();
    try {
      switch (encoding) {
        case GZIP_ENCODING: {
          body = (0, import_zlib.gunzipSync)(body);
          break;
        }
        case BROTLI_ENCODING: {
          body = (0, import_zlib.brotliDecompressSync)(body);
          break;
        }
        default: {
        }
      }
    } catch (e) {
      return {
        body: base64encode(`Error while decompressing the body [${encoding}]: ${e.message}`),
        bodyLength: body.length,
        bodyTruncated: true
      };
    }
    return {
      body: body.slice(0, MAX_BODY_LENGTH).toString("base64"),
      bodyLength: body.length,
      bodyTruncated: body.length > MAX_BODY_LENGTH
    };
  } catch (e) {
    return {
      body: base64encode(`Error while getting body logging data: ${e && e.message}`),
      bodyLength: rawBody.length,
      bodyTruncated: true
    };
  }
}
var import_zlib, MAX_BODY_LENGTH;
var init_getBodyLoggingData = __esm({
  "src/lambda/getBodyLoggingData.ts"() {
    "use strict";
    import_zlib = require("zlib");
    init_constants();
    MAX_BODY_LENGTH = 8 * 1024;
  }
});

// src/lambda/httpRequestInterceptor.js
var require_httpRequestInterceptor = __commonJS({
  "src/lambda/httpRequestInterceptor.js"(exports, module2) {
    "use strict";
    var { inherits } = require("util");
    var { deepRequestInspectionLogger: deepRequestInspectionLogger2 } = (init_stdStreamsWrapper(), __toCommonJS(stdStreamsWrapper_exports));
    var http2 = require("http");
    var https2 = require("https");
    var url2 = require("url");
    var { HTTP_HEADERS: HTTP_HEADERS2 } = (init_constants(), __toCommonJS(constants_exports));
    var getBodyLoggingData2 = (init_getBodyLoggingData(), __toCommonJS(getBodyLoggingData_exports)).default;
    var EDGIO_STATIC_BACKEND_DOMAIN_REGEX = /^xdn-user-assets-[a-zA-Z0-9-]+-[0-9]+\.s3\.amazonaws\.com$/;
    function urlToOptions(url3) {
      const options = {
        protocol: url3.protocol,
        hostname: typeof url3.hostname === "string" && url3.hostname.startsWith("[") ? url3.hostname.slice(1, -1) : url3.hostname,
        hash: url3.hash,
        search: url3.search,
        pathname: url3.pathname,
        path: `${url3.pathname || ""}${url3.search || ""}`,
        href: url3.href
      };
      if (url3.port !== "") {
        options.port = Number(url3.port);
      }
      if (url3.username || url3.password) {
        options.auth = `${url3.username}:${url3.password}`;
      }
      return options;
    }
    var urlWarningEmitted = false;
    var searchParams = Symbol("query");
    var searchParamsSymbol = searchParams;
    function normalizeClientRequestArgs(input, options, cb) {
      if (typeof input === "string") {
        const urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        } catch (err) {
          input = url2.parse(urlStr);
          if (!input.hostname) {
            throw err;
          }
          if (!urlWarningEmitted && !process.noDeprecation) {
            urlWarningEmitted = true;
            process.emitWarning(`The provided URL ${urlStr} is not a valid URL, and is supported in the http module solely for compatibility.`, "DeprecationWarning", "DEP0109");
          }
        }
      } else if (input && input[searchParamsSymbol] && input[searchParamsSymbol][searchParamsSymbol]) {
        input = urlToOptions(input);
      } else {
        cb = options;
        options = input;
        input = null;
      }
      if (typeof options === "function") {
        cb = options;
        options = input || {};
      } else {
        options = Object.assign(input || {}, options);
      }
      return { options, callback: cb };
    }
    var OriginalClientRequest = http2.ClientRequest;
    var upstreamRequestCounter = 0;
    var upstreamRequestStart = [];
    var upstreamRequestInterceptionOptions = {};
    var upstreamRequestViaHeaderValue = "Layer0";
    var downstreamX0CacheVersionHeaderValue = null;
    function getUpstreamRequestViaHeaderValue(event) {
      let upstreamViaHeaderValue = null;
      const headers = event && event.multiValueHeaders || {};
      for (const [key2, value] of Object.entries(headers)) {
        if (key2.toLowerCase() === HTTP_HEADERS2.via) {
          upstreamViaHeaderValue = value;
          break;
        }
      }
      if (!upstreamViaHeaderValue) {
        upstreamViaHeaderValue = "Layer0";
      }
      if (!/\bLayer0\b/.test(upstreamViaHeaderValue)) {
        upstreamViaHeaderValue = upstreamViaHeaderValue + ", Layer0";
      }
      return upstreamViaHeaderValue;
    }
    function getX0CacheVersionHeaderValue(event) {
      const headers = event && event.multiValueHeaders || {};
      for (const [key2, value] of Object.entries(headers)) {
        if (key2.toLowerCase() === HTTP_HEADERS2.x0CacheVersion) {
          return value;
        }
      }
    }
    function injectPlatformControlledHeaders(headers, viaHeaderValue, downstreamX0CacheVersionHeaderValue2) {
      for (let name of Object.keys(headers)) {
        const lowerCaseName = name.toLowerCase();
        if (lowerCaseName === HTTP_HEADERS2.via || lowerCaseName === HTTP_HEADERS2.x0CacheVersion) {
          delete headers[name];
        }
      }
      if (viaHeaderValue) {
        headers[HTTP_HEADERS2.via] = viaHeaderValue;
      }
      if (downstreamX0CacheVersionHeaderValue2) {
        headers[HTTP_HEADERS2.x0CacheVersion] = downstreamX0CacheVersionHeaderValue2;
      }
    }
    function EdgioClientRequest(...args) {
      const { options, callback } = normalizeClientRequestArgs(...args);
      if (!options.headers) {
        options.headers = {};
      }
      injectPlatformControlledHeaders(options.headers, upstreamRequestViaHeaderValue, downstreamX0CacheVersionHeaderValue);
      const host = options.hostname || options.host;
      const loggingDisabled = host && (["127.0.0.1", "0.0.0.0", "::1", "0:0:0:0:0:0:0:1", "localhost"].includes(host) || EDGIO_STATIC_BACKEND_DOMAIN_REGEX.test(host));
      if (loggingDisabled) {
        OriginalClientRequest.call(this, options, callback);
      } else {
        const wrappedCallback = patchClientRequest(this, options, callback);
        OriginalClientRequest.call(this, options, wrappedCallback);
      }
    }
    function patchClientRequest(clientRequest, options, callback) {
      const id = upstreamRequestCounter++;
      upstreamRequestStart[id] = Date.now();
      const upstreamRequestInfo = {
        method: options.method,
        protocol: options.protocol,
        host: options.hostname || options.host,
        port: options.port,
        path: options.path
      };
      const driLogger = new deepRequestInspectionLogger2(upstreamRequestInterceptionOptions.lambdaInstance);
      const wrappedCallback = (res) => {
        const bodyBuffers = [];
        res.once("end", () => {
          driLogger.logUpstreamResponseBodyInfo({
            id,
            ...upstreamRequestInfo,
            ...getBodyLoggingData2(bodyBuffers, res.headers)
          });
        });
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamResponseInfo({
            id,
            ...upstreamRequestInfo,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            duration: Date.now() - upstreamRequestStart[id]
          });
          let encoding;
          const { setEncoding } = res;
          res.setEncoding = function(newEncoding) {
            encoding = newEncoding;
            return setEncoding.apply(this, arguments);
          };
          const origResPush = res.push;
          res.push = function(data) {
            if (data) {
              if (encoding) {
                data = Buffer.from(data, encoding);
              }
              bodyBuffers.push(data);
            }
            return origResPush.call(res, data);
          };
        }
        if (callback) {
          callback(res);
        }
      };
      const requestBodyBuffers = [];
      const addRequestBodyBuffer = function(buffer, encoding) {
        if (Buffer.isBuffer(buffer) || typeof buffer === "string") {
          let internalBuffer = buffer;
          if (!Buffer.isBuffer(internalBuffer)) {
            if (typeof encoding !== "string") {
              encoding = null;
            }
            internalBuffer = Buffer.from(buffer, encoding);
          }
          requestBodyBuffers.push(internalBuffer);
        }
      };
      clientRequest.write = function(buffer, encoding, callback2) {
        addRequestBodyBuffer(buffer, encoding);
        return Object.getPrototypeOf(Object.getPrototypeOf(clientRequest)).write.call(clientRequest, buffer, encoding, callback2);
      }.bind(clientRequest);
      clientRequest.end = function(buffer, encoding, callback2) {
        addRequestBodyBuffer(buffer, encoding);
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamRequestInfo({
            id,
            ...upstreamRequestInfo,
            headers: options.headers,
            ...getBodyLoggingData2(requestBodyBuffers, options.headers)
          });
        }
        return Object.getPrototypeOf(Object.getPrototypeOf(clientRequest)).end.call(clientRequest, buffer, encoding, callback2);
      }.bind(clientRequest);
      clientRequest.once("error", (err) => {
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamResponseInfo({
            id,
            ...upstreamRequestInfo,
            duration: Date.now() - upstreamRequestStart[id],
            code: err && err.code,
            error: err && err.message
          });
        }
      });
      return wrappedCallback;
    }
    inherits(EdgioClientRequest, http2.ClientRequest);
    var CurrentClientRequest = OriginalClientRequest;
    http2.request = function request(url3, options, cb) {
      return new CurrentClientRequest(url3, options, cb);
    };
    https2.request = function request(...args) {
      const { options, callback } = normalizeClientRequestArgs(...args);
      options._defaultAgent = https2.globalAgent;
      return new CurrentClientRequest(options, callback);
    };
    CurrentClientRequest = EdgioClientRequest;
    http2.ClientRequest = EdgioClientRequest;
    function interceptRequests2(event, options) {
      upstreamRequestCounter = 0;
      upstreamRequestStart = [];
      upstreamRequestInterceptionOptions = options || {};
      upstreamRequestViaHeaderValue = getUpstreamRequestViaHeaderValue(event);
      downstreamX0CacheVersionHeaderValue = getX0CacheVersionHeaderValue(event);
    }
    module2.exports = {
      interceptRequests: interceptRequests2
    };
  }
});

// node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function() {
        if (typeof arguments[arguments.length - 1] === "function")
          fn.apply(this, arguments);
        else {
          return new Promise((resolve2, reject) => {
            arguments[arguments.length] = (err, res) => {
              if (err)
                return reject(err);
              resolve2(res);
            };
            arguments.length++;
            fn.apply(this, arguments);
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function() {
        const cb = arguments[arguments.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, arguments);
        else
          fn.apply(this, arguments).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    module2.exports = patch;
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (!fs.lchmod) {
        fs.lchmod = function(path2, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (!fs.lchown) {
        fs.lchown = function(path2, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = function(fs$rename) {
          return function(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          };
        }(fs.rename);
      }
      fs.read = function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback);
        }
        read.__proto__ = fs$read;
        return read;
      }(fs.read);
      fs.readSync = function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path2, mode, callback) {
          fs2.open(path2, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
            if (err) {
              if (callback)
                callback(err);
              return;
            }
            fs2.fchmod(fd, mode, function(err2) {
              fs2.close(fd, function(err22) {
                if (callback)
                  callback(err2 || err22);
              });
            });
          });
        };
        fs2.lchmodSync = function(path2, mode) {
          var fd = fs2.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs2.lutimes = function(path2, at, mt, cb) {
            fs2.open(path2, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path2, at, mt) {
            var fd = fs2.openSync(path2, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else {
          fs2.lutimes = function(_a2, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream3 = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path2, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path2, options);
        Stream3.call(this);
        var self2 = this;
        this.path = path2;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path2, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path2, options);
        Stream3.call(this);
        this.path = path2;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: obj.__proto__ };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key2) {
        Object.defineProperty(copy, key2, Object.getOwnPropertyDescriptor(obj, key2));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util2 = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    var debug = noop;
    if (util2.debuglog)
      debug = util2.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util2.format.apply(util2, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!global[gracefulQueue]) {
      queue = [];
      Object.defineProperty(global, gracefulQueue, {
        get: function() {
          return queue;
        }
      });
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err) {
            if (!err) {
              retry();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          retry();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(global[gracefulQueue]);
          require("assert").equal(global[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    module2.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module2.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path2, options, cb);
        function go$readFile(path3, options2, cb2) {
          return fs$readFile(path3, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path3, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path2, data, options, cb);
        function go$writeFile(path3, data2, options2, cb2) {
          return fs$writeFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path3, data2, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path2, data, options, cb);
        function go$appendFile(path3, data2, options2, cb2) {
          return fs$appendFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path3, data2, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
      function readdir(path2, options, cb) {
        var args = [path2];
        if (typeof options !== "function") {
          args.push(options);
        } else {
          cb = options;
        }
        args.push(go$readdir$cb);
        return go$readdir(args);
        function go$readdir$cb(err, files) {
          if (files && files.sort)
            files.sort();
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readdir, [args]]);
          else {
            if (typeof cb === "function")
              cb.apply(this, arguments);
            retry();
          }
        }
      }
      function go$readdir(args) {
        return fs$readdir.apply(fs2, args);
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path2, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path2, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path2, options) {
        return new fs2.ReadStream(path2, options);
      }
      function createWriteStream(path2, options) {
        return new fs2.WriteStream(path2, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
      function open(path2, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path2, flags, mode, cb);
        function go$open(path3, flags2, mode2, cb2) {
          return fs$open(path3, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path3, flags2, mode2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      global[gracefulQueue].push(elem);
    }
    function retry() {
      var elem = global[gracefulQueue].shift();
      if (elem) {
        debug("RETRY", elem[0].name, elem[1]);
        elem[0].apply(null, elem[1]);
      }
    }
  }
});

// node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchown",
      "lchmod",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "readFile",
      "readdir",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key2) => {
      return typeof fs[key2] === "function";
    });
    Object.keys(fs).forEach((key2) => {
      if (key2 === "promises") {
        return;
      }
      exports[key2] = fs[key2];
    });
    api.forEach((method) => {
      exports[method] = u(fs[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs.exists(filename, callback);
      }
      return new Promise((resolve2) => {
        return fs.exists(filename, resolve2);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve2, reject) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve2({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs.write(fd, buffer, ...args);
      }
      return new Promise((resolve2, reject) => {
        fs.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve2({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    if (typeof fs.realpath.native === "function") {
      exports.realpath.native = u(fs.realpath.native);
    }
  }
});

// node_modules/fs-extra/lib/mkdirs/win32.js
var require_win32 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/win32.js"(exports, module2) {
    "use strict";
    var path2 = require("path");
    function getRootPath(p) {
      p = path2.normalize(path2.resolve(p)).split(path2.sep);
      if (p.length > 0)
        return p[0];
      return null;
    }
    var INVALID_PATH_CHARS = /[<>:"|?*]/;
    function invalidWin32Path(p) {
      const rp = getRootPath(p);
      p = p.replace(rp, "");
      return INVALID_PATH_CHARS.test(p);
    }
    module2.exports = {
      getRootPath,
      invalidWin32Path
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirs(p, opts, callback, made) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        return callback(errInval);
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      callback = callback || function() {
      };
      p = path2.resolve(p);
      xfs.mkdir(p, mode, (er) => {
        if (!er) {
          made = made || p;
          return callback(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path2.dirname(p) === p)
              return callback(er);
            mkdirs(path2.dirname(p), opts, (er2, made2) => {
              if (er2)
                callback(er2, made2);
              else
                mkdirs(p, opts, callback, made2);
            });
            break;
          default:
            xfs.stat(p, (er2, stat) => {
              if (er2 || !stat.isDirectory())
                callback(er, made);
              else
                callback(null, made);
            });
            break;
        }
      });
    }
    module2.exports = mkdirs;
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js
var require_mkdirs_sync = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirsSync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        throw errInval;
      }
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      p = path2.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        if (err0.code === "ENOENT") {
          if (path2.dirname(p) === p)
            throw err0;
          made = mkdirsSync(path2.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
        } else {
          let stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0;
          }
          if (!stat.isDirectory())
            throw err0;
        }
      }
      return made;
    }
    module2.exports = mkdirsSync;
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs2 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var mkdirs = u(require_mkdirs());
    var mkdirsSync = require_mkdirs_sync();
    module2.exports = {
      mkdirs,
      mkdirsSync,
      mkdirp: mkdirs,
      mkdirpSync: mkdirsSync,
      ensureDir: mkdirs,
      ensureDirSync: mkdirsSync
    };
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var os = require("os");
    var path2 = require("path");
    function hasMillisResSync() {
      let tmpfile = path2.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path2.join(os.tmpdir(), tmpfile);
      const d = new Date(1435410243862);
      fs.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
      const fd = fs.openSync(tmpfile, "r+");
      fs.futimesSync(fd, d, d);
      fs.closeSync(fd);
      return fs.statSync(tmpfile).mtime > 1435410243e3;
    }
    function hasMillisRes(callback) {
      let tmpfile = path2.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path2.join(os.tmpdir(), tmpfile);
      const d = new Date(1435410243862);
      fs.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", (err) => {
        if (err)
          return callback(err);
        fs.open(tmpfile, "r+", (err2, fd) => {
          if (err2)
            return callback(err2);
          fs.futimes(fd, d, d, (err3) => {
            if (err3)
              return callback(err3);
            fs.close(fd, (err4) => {
              if (err4)
                return callback(err4);
              fs.stat(tmpfile, (err5, stats) => {
                if (err5)
                  return callback(err5);
                callback(null, stats.mtime > 1435410243e3);
              });
            });
          });
        });
      });
    }
    function timeRemoveMillis(timestamp) {
      if (typeof timestamp === "number") {
        return Math.floor(timestamp / 1e3) * 1e3;
      } else if (timestamp instanceof Date) {
        return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
      } else {
        throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
      }
    }
    function utimesMillis(path3, atime, mtime, callback) {
      fs.open(path3, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs.futimes(fd, atime, mtime, (futimesErr) => {
          fs.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path3, atime, mtime) {
      const fd = fs.openSync(path3, "r+");
      fs.futimesSync(fd, atime, mtime);
      return fs.closeSync(fd);
    }
    module2.exports = {
      hasMillisRes,
      hasMillisResSync,
      timeRemoveMillis,
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var NODE_VERSION_MAJOR_WITH_BIGINT = 10;
    var NODE_VERSION_MINOR_WITH_BIGINT = 5;
    var NODE_VERSION_PATCH_WITH_BIGINT = 0;
    var nodeVersion = process.versions.node.split(".");
    var nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
    var nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
    var nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);
    function nodeSupportsBigInt() {
      if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
        return true;
      } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
        if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
          return true;
        } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
          if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
            return true;
          }
        }
      }
      return false;
    }
    function getStats(src, dest, cb) {
      if (nodeSupportsBigInt()) {
        fs.stat(src, { bigint: true }, (err, srcStat) => {
          if (err)
            return cb(err);
          fs.stat(dest, { bigint: true }, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT")
                return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      } else {
        fs.stat(src, (err, srcStat) => {
          if (err)
            return cb(err);
          fs.stat(dest, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT")
                return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      }
    }
    function getStatsSync(src, dest) {
      let srcStat, destStat;
      if (nodeSupportsBigInt()) {
        srcStat = fs.statSync(src, { bigint: true });
      } else {
        srcStat = fs.statSync(src);
      }
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(dest, { bigint: true });
        } else {
          destStat = fs.statSync(dest);
        }
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, cb) {
      getStats(src, dest, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error("Source and destination must not be the same."));
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName) {
      const { srcStat, destStat } = getStatsSync(src, dest);
      if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error("Source and destination must not be the same.");
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return cb();
      if (nodeSupportsBigInt()) {
        fs.stat(destParent, { bigint: true }, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT")
              return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      } else {
        fs.stat(destParent, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT")
              return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      }
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return;
      let destStat;
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(destParent, { bigint: true });
        } else {
          destStat = fs.statSync(destParent);
        }
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path2.resolve(src).split(path2.sep).filter((i) => i);
      const destArr = path2.resolve(dest).split(path2.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir
    };
  }
});

// node_modules/fs-extra/lib/util/buffer.js
var require_buffer = __commonJS({
  "node_modules/fs-extra/lib/util/buffer.js"(exports, module2) {
    "use strict";
    module2.exports = function(size) {
      if (typeof Buffer.allocUnsafe === "function") {
        try {
          return Buffer.allocUnsafe(size);
        } catch (e) {
          return new Buffer(size);
        }
      }
      return new Buffer(size);
    };
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var mkdirpSync = require_mkdirs2().mkdirsSync;
    var utimesSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy");
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      return handleFilterAndCopy(destStat, src, dest, opts);
    }
    function handleFilterAndCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path2.dirname(dest);
      if (!fs.existsSync(destParent))
        mkdirpSync(destParent);
      return startCopy(destStat, src, dest, opts);
    }
    function startCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      if (typeof fs.copyFileSync === "function") {
        fs.copyFileSync(src, dest);
        fs.chmodSync(dest, srcStat.mode);
        if (opts.preserveTimestamps) {
          return utimesSync(dest, srcStat.atime, srcStat.mtime);
        }
        return;
      }
      return copyFileFallback(srcStat, src, dest, opts);
    }
    function copyFileFallback(srcStat, src, dest, opts) {
      const BUF_LENGTH = 64 * 1024;
      const _buff = require_buffer()(BUF_LENGTH);
      const fdr = fs.openSync(src, "r");
      const fdw = fs.openSync(dest, "w", srcStat.mode);
      let pos = 0;
      while (pos < srcStat.size) {
        const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, _buff, 0, bytesRead);
        pos += bytesRead;
      }
      if (opts.preserveTimestamps)
        fs.futimesSync(fdw, srcStat.atime, srcStat.mtime);
      fs.closeSync(fdr);
      fs.closeSync(fdw);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat, src, dest, opts);
      if (destStat && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcStat, src, dest, opts) {
      fs.mkdirSync(dest);
      copyDir(src, dest, opts);
      return fs.chmodSync(dest, srcStat.mode);
    }
    function copyDir(src, dest, opts) {
      fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path2.join(src, item);
      const destItem = path2.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy");
      return startCopy(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path2.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs.unlinkSync(dest);
      return fs.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy-sync/index.js
var require_copy_sync2 = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      copySync: require_copy_sync()
    };
  }
});

// node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    function pathExists(path2) {
      return fs.access(path2).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs.existsSync
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var mkdirp = require_mkdirs2().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimes = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      stat.checkPaths(src, dest, "copy", (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          if (opts.filter)
            return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
          return checkParentDir(destStat, src, dest, opts, cb);
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path2.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return startCopy(destStat, src, dest, opts, cb);
        mkdirp(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return startCopy(destStat, src, dest, opts, cb);
        });
      });
    }
    function handleFilter(onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then((include) => {
        if (include)
          return onInclude(destStat, src, dest, opts, cb);
        return cb();
      }, (error) => cb(error));
    }
    function startCopy(destStat, src, dest, opts, cb) {
      if (opts.filter)
        return handleFilter(getStats, destStat, src, dest, opts, cb);
      return getStats(destStat, src, dest, opts, cb);
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs.stat : fs.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      if (typeof fs.copyFile === "function") {
        return fs.copyFile(src, dest, (err) => {
          if (err)
            return cb(err);
          return setDestModeAndTimestamps(srcStat, dest, opts, cb);
        });
      }
      return copyFileFallback(srcStat, src, dest, opts, cb);
    }
    function copyFileFallback(srcStat, src, dest, opts, cb) {
      const rs = fs.createReadStream(src);
      rs.on("error", (err) => cb(err)).once("open", () => {
        const ws = fs.createWriteStream(dest, { mode: srcStat.mode });
        ws.on("error", (err) => cb(err)).on("open", () => rs.pipe(ws)).once("close", () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
      });
    }
    function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
      fs.chmod(dest, srcStat.mode, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps) {
          return utimes(dest, srcStat.atime, srcStat.mtime, cb);
        }
        return cb();
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat, src, dest, opts, cb);
      if (destStat && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
      }
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcStat, src, dest, opts, cb) {
      fs.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return fs.chmod(dest, srcStat.mode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path2.join(src, item);
      const destItem = path2.join(dest, item);
      stat.checkPaths(srcItem, destItem, "copy", (err, stats) => {
        if (err)
          return cb(err);
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, (err2) => {
          if (err2)
            return cb(err2);
          return copyDirItems(items, src, dest, opts, cb);
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs.symlink(resolvedSrc, dest, cb);
        } else {
          fs.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path2.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy())
    };
  }
});

// node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/fs-extra/lib/remove/rimraf.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var assert = require("assert");
    var isWindows = process.platform === "win32";
    function defaults(options) {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs[m];
        m = m + "Sync";
        options[m] = options[m] || fs[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
    }
    function rimraf(p, options, cb) {
      let busyTries = 0;
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      rimraf_(p, options, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            return setTimeout(() => rimraf_(p, options, CB), time);
          }
          if (er.code === "ENOENT")
            er = null;
        }
        cb(er);
      });
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT") {
          return cb(null);
        }
        if (er && er.code === "EPERM" && isWindows) {
          return fixWinEPERM(p, options, er, cb);
        }
        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb);
        }
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT") {
              return cb(null);
            }
            if (er2.code === "EPERM") {
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            }
            if (er2.code === "EISDIR") {
              return rmdir(p, options, er2, cb);
            }
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      if (er) {
        assert(er instanceof Error);
      }
      options.chmod(p, 438, (er2) => {
        if (er2) {
          cb(er2.code === "ENOENT" ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === "ENOENT" ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }
    function fixWinEPERMSync(p, options, er) {
      let stats;
      assert(p);
      assert(options);
      if (er) {
        assert(er instanceof Error);
      }
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      assert(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
          rmkids(p, options, cb);
        } else if (er && er.code === "ENOTDIR") {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n = files.length;
        let errState;
        if (n === 0)
          return options.rmdir(p, cb);
        files.forEach((f) => {
          rimraf(path2.join(p, f), options, (er2) => {
            if (errState) {
              return;
            }
            if (er2)
              return cb(errState = er2);
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }
    function rimrafSync(p, options) {
      let st;
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        }
        if (er.code === "EPERM" && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }
      try {
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        } else if (er.code === "EPERM") {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        } else if (er.code !== "EISDIR") {
          throw er;
        }
        rmdirSync(p, options, er);
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOTDIR") {
          throw originalEr;
        } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
          rmkidsSync(p, options);
        } else if (er.code !== "ENOENT") {
          throw er;
        }
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path2.join(p, f), options));
      if (isWindows) {
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret;
          } catch (er) {
          }
        } while (Date.now() - startTime < 500);
      } else {
        const ret = options.rmdirSync(p, options);
        return ret;
      }
    }
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var rimraf = require_rimraf();
    module2.exports = {
      remove: u(rimraf),
      removeSync: rimraf.sync
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path2 = require("path");
    var mkdir = require_mkdirs2();
    var remove = require_remove();
    var emptyDir = u(function emptyDir2(dir, callback) {
      callback = callback || function() {
      };
      fs.readdir(dir, (err, items) => {
        if (err)
          return mkdir.mkdirs(dir, callback);
        items = items.map((item) => path2.join(dir, item));
        deleteItem();
        function deleteItem() {
          const item = items.pop();
          if (!item)
            return callback();
          remove.remove(item, (err2) => {
            if (err2)
              return callback(err2);
            deleteItem();
          });
        }
      });
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs.readdirSync(dir);
      } catch (err) {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path2.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createFile(file, callback) {
      function makeFile() {
        fs.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path2.dirname(file);
        pathExists(dir, (err2, dirExists) => {
          if (err2)
            return callback(err2);
          if (dirExists)
            return makeFile();
          mkdir.mkdirs(dir, (err3) => {
            if (err3)
              return callback(err3);
            makeFile();
          });
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs.statSync(file);
      } catch (e) {
      }
      if (stats && stats.isFile())
        return;
      const dir = path2.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      pathExists(dstpath, (err, destinationExists) => {
        if (err)
          return callback(err);
        if (destinationExists)
          return callback(null);
        fs.lstat(srcpath, (err2) => {
          if (err2) {
            err2.message = err2.message.replace("lstat", "ensureLink");
            return callback(err2);
          }
          const dir = path2.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      try {
        fs.lstatSync(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path2.dirname(dstpath);
      const dirExists = fs.existsSync(dir);
      if (dirExists)
        return fs.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    "use strict";
    var path2 = require("path");
    var fs = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path2.isAbsolute(srcpath)) {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            "toCwd": srcpath,
            "toDst": srcpath
          });
        });
      } else {
        const dstdir = path2.dirname(dstpath);
        const relativeToDst = path2.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              "toCwd": relativeToDst,
              "toDst": srcpath
            });
          } else {
            return fs.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                "toCwd": srcpath,
                "toDst": path2.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path2.isAbsolute(srcpath)) {
        exists = fs.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          "toCwd": srcpath,
          "toDst": srcpath
        };
      } else {
        const dstdir = path2.dirname(dstpath);
        const relativeToDst = path2.join(dstdir, srcpath);
        exists = fs.existsSync(relativeToDst);
        if (exists) {
          return {
            "toCwd": relativeToDst,
            "toDst": srcpath
          };
        } else {
          exists = fs.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            "toCwd": srcpath,
            "toDst": path2.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs.lstatSync(srcpath);
      } catch (e) {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs = require_graceful_fs();
    var _mkdirs = require_mkdirs2();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      pathExists(dstpath, (err, destinationExists) => {
        if (err)
          return callback(err);
        if (destinationExists)
          return callback(null);
        symlinkPaths(srcpath, dstpath, (err2, relative) => {
          if (err2)
            return callback(err2);
          srcpath = relative.toDst;
          symlinkType(relative.toCwd, type, (err3, type2) => {
            if (err3)
              return callback(err3);
            const dir = path2.dirname(dstpath);
            pathExists(dir, (err4, dirExists) => {
              if (err4)
                return callback(err4);
              if (dirExists)
                return fs.symlink(srcpath, dstpath, type2, callback);
              mkdirs(dir, (err5) => {
                if (err5)
                  return callback(err5);
                fs.symlink(srcpath, dstpath, type2, callback);
              });
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path2.dirname(dstpath);
      const exists = fs.existsSync(dir);
      if (exists)
        return fs.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    "use strict";
    var file = require_file();
    var link = require_link();
    var symlink = require_symlink();
    module2.exports = {
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    function readFile(file, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      if (typeof options === "string") {
        options = { encoding: options };
      }
      options = options || {};
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      fs.readFile(file, options, function(err, data) {
        if (err)
          return callback(err);
        data = stripBom(data);
        var obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err2) {
          if (shouldThrow) {
            err2.message = file + ": " + err2.message;
            return callback(err2);
          } else {
            return callback(null, null);
          }
        }
        callback(null, obj);
      });
    }
    function readFileSync(file, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { encoding: options };
      }
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      try {
        var content = fs.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = file + ": " + err.message;
          throw err;
        } else {
          return null;
        }
      }
    }
    function stringify3(obj, options) {
      var spaces;
      var EOL = "\n";
      if (typeof options === "object" && options !== null) {
        if (options.spaces) {
          spaces = options.spaces;
        }
        if (options.EOL) {
          EOL = options.EOL;
        }
      }
      var str = JSON.stringify(obj, options ? options.replacer : null, spaces);
      return str.replace(/\n/g, EOL) + EOL;
    }
    function writeFile(file, obj, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      options = options || {};
      var fs = options.fs || _fs;
      var str = "";
      try {
        str = stringify3(obj, options);
      } catch (err) {
        if (callback)
          callback(err, null);
        return;
      }
      fs.writeFile(file, str, options, callback);
    }
    function writeFileSync(file, obj, options) {
      options = options || {};
      var fs = options.fs || _fs;
      var str = stringify3(obj, options);
      return fs.writeFileSync(file, str, options);
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      content = content.replace(/^\uFEFF/, "");
      return content;
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile();
    module2.exports = {
      readJson: u(jsonFile.readFile),
      readJsonSync: jsonFile.readFileSync,
      writeJson: u(jsonFile.writeFile),
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    "use strict";
    var path2 = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    var jsonFile = require_jsonfile2();
    function outputJson(file, data, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      const dir = path2.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return jsonFile.writeJson(file, data, options, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          jsonFile.writeJson(file, data, options, callback);
        });
      });
    }
    module2.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var mkdir = require_mkdirs2();
    var jsonFile = require_jsonfile2();
    function outputJsonSync(file, data, options) {
      const dir = path2.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      jsonFile.writeJsonSync(file, data, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/fs-extra/lib/move-sync/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move-sync/move-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var copySync = require_copy_sync2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs2().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat } = stat.checkPathsSync(src, dest, "move");
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      mkdirpSync(path2.dirname(dest));
      return doRename(src, dest, overwrite);
    }
    function doRename(src, dest, overwrite) {
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/fs-extra/lib/move-sync/index.js
var require_move_sync2 = __commonJS({
  "node_modules/fs-extra/lib/move-sync/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      moveSync: require_move_sync()
    };
  }
});

// node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path2 = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs2().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          mkdirp(path2.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, cb);
          });
        });
      });
    }
    function doRename(src, dest, overwrite, cb) {
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move())
    };
  }
});

// node_modules/fs-extra/lib/output/index.js
var require_output = __commonJS({
  "node_modules/fs-extra/lib/output/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path2 = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path2.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path2.dirname(file);
      if (fs.existsSync(dir)) {
        return fs.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = Object.assign({}, require_fs(), require_copy_sync2(), require_copy2(), require_empty(), require_ensure(), require_json(), require_mkdirs2(), require_move_sync2(), require_move2(), require_output(), require_path_exists(), require_remove());
    var fs = require("fs");
    if (Object.getOwnPropertyDescriptor(fs, "promises")) {
      Object.defineProperty(module2.exports, "promises", {
        get() {
          return fs.promises;
        }
      });
    }
  }
});

// src/deploy/paths.ts
function pathForBackend(backend) {
  return (0, import_path.join)("__backends__", `${backend}.js`);
}
function getConfigSrcPath() {
  const cwd = process.cwd();
  const result = [(0, import_path.join)(cwd, "edgio.config.js"), (0, import_path.join)(cwd, "edgio.config.cjs")].find(import_fs.existsSync);
  if (result == null) {
    throw new Error("Edgio config file not found. Please create edgio.config.js or edgio.config.cjs in the root directory of your project.");
  }
  return result;
}
var import_fs, import_path, EDGIO_DIR, JS_DIR, ASSETS_DIR, PERMANENT_ASSETS_DIR, SOURCES_DIR, ROUTES_FILE_NAME;
var init_paths = __esm({
  "src/deploy/paths.ts"() {
    "use strict";
    import_fs = require("fs");
    import_path = require("path");
    EDGIO_DIR = ".edgio";
    JS_DIR = (0, import_path.join)(EDGIO_DIR, "lambda");
    ASSETS_DIR = (0, import_path.join)(EDGIO_DIR, "s3");
    PERMANENT_ASSETS_DIR = (0, import_path.join)(EDGIO_DIR, "s3-permanent");
    SOURCES_DIR = (0, import_path.join)(EDGIO_DIR, "src");
    ROUTES_FILE_NAME = "routes.cjs";
  }
});

// node_modules/slash/index.js
var require_slash = __commonJS({
  "node_modules/slash/index.js"(exports, module2) {
    "use strict";
    module2.exports = (path2) => {
      const isExtendedLengthPath = /^\\\\\?\\/.test(path2);
      const hasNonAscii = /[^\u0000-\u0080]+/.test(path2);
      if (isExtendedLengthPath || hasNonAscii) {
        return path2;
      }
      return path2.replace(/\\/g, "/");
    };
  }
});

// src/utils/nonWebpackRequire.ts
function nonWebpackRequire(modulePath, { ignoreErrors = false } = {}) {
  try {
    return eval("require")((0, import_slash.default)(modulePath));
  } catch (e) {
    if (ignoreErrors) {
      return void 0;
    } else {
      throw e;
    }
  }
}
var import_slash;
var init_nonWebpackRequire = __esm({
  "src/utils/nonWebpackRequire.ts"() {
    "use strict";
    import_slash = __toESM(require_slash());
  }
});

// src/context.ts
function withContext(cb) {
  if (isLocal()) {
    return createClsNamespace().runAndReturn(cb);
  } else {
    global.__edgio_timings__ = new SingletonContext();
    return cb();
  }
}
function createClsNamespace() {
  const cls = nonWebpackRequire("cls-hooked");
  if (!clsNamespace) {
    clsNamespace = cls.createNamespace(CONTEXT);
  }
  return clsNamespace;
}
var CONTEXT, clsNamespace, SingletonContext;
var init_context = __esm({
  "src/context.ts"() {
    "use strict";
    init_environment();
    init_nonWebpackRequire();
    CONTEXT = "edgio";
    SingletonContext = class {
      constructor() {
        this.values = {};
      }
      get(key2) {
        return this.values[key2];
      }
      set(key2, value) {
        this.values[key2] = value;
      }
    };
  }
});

// src/timing.ts
function withTimings(handler2) {
  return (...args) => {
    return withContext(() => {
      return handler2(...args);
    });
  };
}
var init_timing = __esm({
  "src/timing.ts"() {
    "use strict";
    init_constants();
    init_context();
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module2) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first2 = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first2 === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first2 !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match2, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match2;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first2 = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first2 === '"' || first2 === "'" || first2 === "`" || (last === '"' || last === "'" || last === "`")) && first2 !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(func, "length", { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) });
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var match2 = String.prototype.match;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    var inspectCustom = require_util_inspect().custom;
    var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
    var toStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag !== "undefined" ? Symbol.toStringTag : null;
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        return String(obj);
      }
      if (typeof obj === "bigint") {
        return String(obj) + "n";
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = seen.slice();
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function") {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + keys.join(", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + String(obj.nodeName).toLowerCase() + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + xs.join(", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + parts.join(", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function") {
          return obj[inspectSymbol]();
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function(value, key2) {
          mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
        });
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function(value) {
          setParts.push(inspect(value, obj));
        });
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString2(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + [].concat(stringTag || [], protoTag || []).join(": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + ys.join(", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return String(s).replace(/"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString2(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key2) {
      return key2 in this;
    };
    function has(obj, key2) {
      return hasOwn.call(obj, key2);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = match2.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
      }
      var s = str.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(" ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + xs.join("," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key2 in obj) {
        if (!has(obj, key2)) {
          continue;
        }
        if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
          continue;
        } else if (/[^\w$]/.test(key2)) {
          xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
        } else {
          xs.push(key2 + ": " + inspect(obj[key2], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key2) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key2) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key2) {
      var node = listGetNode(objects, key2);
      return node && node.value;
    };
    var listSet = function(objects, key2, value) {
      var node = listGetNode(objects, key2);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key: key2,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key2) {
      return !!listGetNode(objects, key2);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key2) {
          if (!channel.has(key2)) {
            throw new $TypeError("Side channel does not contain " + inspect(key2));
          }
        },
        get: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key2);
            }
          } else {
            if ($o) {
              return listGet($o, key2);
            }
          }
        },
        has: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key2);
            }
          } else {
            if ($o) {
              return listHas($o, key2);
            }
          }
          return false;
        },
        set: function(key2, value) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key2, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key2, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key2, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key2) {
        var value = source[key2];
        if (has.call(acc, key2)) {
          acc[key2] = merge2(acc[key2], value, options);
        } else {
          acc[key2] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key2) {
        acc[key2] = source[key2];
        return acc;
      }, target);
    };
    var decode2 = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key2 = keys[j];
          var val = obj[key2];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key2 });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode: decode2,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key2) {
        return prefix + "[" + key2 + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify3 = function stringify4(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i = 0; i < valuesArray.length; ++i) {
              valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + (commaRoundTrip && isArray(obj) && valuesArray.length === 1 ? "[]" : "") + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key2 = objKeys[j];
        var value = typeof key2 === "object" && typeof key2.value !== "undefined" ? key2.value : obj[key2];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key2) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key2 : "[" + key2 + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify4(value, keyPrefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key2 = objKeys[i];
        if (options.skipNulls && obj[key2] === null) {
          continue;
        }
        pushToArray(keys, stringify3(obj[key2], key2, generateArrayPrefix, commaRoundTrip, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse3 = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key2, val;
        if (pos === -1) {
          key2 = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key2 = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
            return options.decoder(encodedVal, defaults.decoder, charset, "value");
          });
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key2)) {
          obj[key2] = utils.combine(obj[key2], val);
        } else {
          obj[key2] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key2 = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key2);
      var parent = segment ? key2.slice(0, segment.index) : key2;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key2)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key2.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key2 = keys[i];
        var newObj = parseKeys(key2, tempObj[key2], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module2) {
    "use strict";
    var stringify3 = require_stringify2();
    var parse5 = require_parse3();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse: parse5,
      stringify: stringify3
    };
  }
});

// node_modules/content-type/index.js
var require_content_type = __commonJS({
  "node_modules/content-type/index.js"(exports) {
    "use strict";
    var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
    var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    exports.format = format;
    exports.parse = parse5;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || !TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = type;
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          if (!TOKEN_REGEXP.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse5(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      var header = typeof string === "object" ? getcontenttype(string) : string;
      if (typeof header !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = header.indexOf(";");
      var type = index !== -1 ? header.substr(0, index).trim() : header.trim();
      if (!TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid media type");
      }
      var obj = new ContentType(type.toLowerCase());
      if (index !== -1) {
        var key2;
        var match2;
        var value;
        PARAM_REGEXP.lastIndex = index;
        while (match2 = PARAM_REGEXP.exec(header)) {
          if (match2.index !== index) {
            throw new TypeError("invalid parameter format");
          }
          index += match2[0].length;
          key2 = match2[1].toLowerCase();
          value = match2[2];
          if (value[0] === '"') {
            value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
          }
          obj.parameters[key2] = value;
        }
        if (index !== header.length) {
          throw new TypeError("invalid parameter format");
        }
      }
      return obj;
    }
    function getcontenttype(obj) {
      var header;
      if (typeof obj.getHeader === "function") {
        header = obj.getHeader("content-type");
      } else if (typeof obj.headers === "object") {
        header = obj.headers && obj.headers["content-type"];
      }
      if (typeof header !== "string") {
        throw new TypeError("content-type header is missing from object");
      }
      return header;
    }
    function qstring(val) {
      var str = String(val);
      if (TOKEN_REGEXP.test(str)) {
        return str;
      }
      if (str.length > 0 && !TEXT_REGEXP.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ContentType(type) {
      this.parameters = /* @__PURE__ */ Object.create(null);
      this.type = type;
    }
  }
});

// src/utils/isEmpty.ts
function isEmpty(value) {
  if (!value) {
    return true;
  }
  if (typeof value.length === "number") {
    return !value.length;
  }
  if (typeof value === "object" && Object.keys(value).length) {
    return false;
  }
  return true;
}
var init_isEmpty = __esm({
  "src/utils/isEmpty.ts"() {
    "use strict";
  }
});

// src/utils/isString.ts
function isString(x) {
  return typeof x === "string";
}
var init_isString = __esm({
  "src/utils/isString.ts"() {
    "use strict";
  }
});

// src/utils/decode.ts
function decode(response) {
  var _a2;
  const contentEncoding = (_a2 = response.getHeader(HTTP_HEADERS.contentEncoding)) == null ? void 0 : _a2.toLowerCase();
  if (!contentEncoding) {
    return true;
  }
  switch (contentEncoding) {
    case GZIP_ENCODING: {
      if (!Buffer.isBuffer(response.body)) {
        return false;
      }
      response.body = (0, import_zlib2.gunzipSync)(response.body);
      response.removeHeader(HTTP_HEADERS.contentEncoding);
      response.setHeader(HTTP_HEADERS.contentLength, Buffer.byteLength(response.body).toString());
      return true;
    }
    case BROTLI_ENCODING: {
      if (!Buffer.isBuffer(response.body)) {
        return false;
      }
      response.body = (0, import_zlib2.brotliDecompressSync)(response.body);
      response.removeHeader(HTTP_HEADERS.contentEncoding);
      response.setHeader(HTTP_HEADERS.contentLength, Buffer.byteLength(response.body).toString());
      return true;
    }
    default: {
      return false;
    }
  }
}
var import_zlib2;
var init_decode = __esm({
  "src/utils/decode.ts"() {
    "use strict";
    import_zlib2 = require("zlib");
    init_constants();
  }
});

// src/lambda/adaptResponseEncodingToDownstream.ts
var import_zlib3, import_content_type, COMPRESSIBLE_TYPES, adaptResponseEncodingToDownstream, adaptResponseEncodingToDownstream_default;
var init_adaptResponseEncodingToDownstream = __esm({
  "src/lambda/adaptResponseEncodingToDownstream.ts"() {
    "use strict";
    import_zlib3 = require("zlib");
    init_constants();
    import_content_type = __toESM(require_content_type());
    init_isEmpty();
    init_isString();
    init_decode();
    COMPRESSIBLE_TYPES = /* @__PURE__ */ new Set([
      "application/atom_xml",
      "application/javascript",
      "application/json",
      "application/rss+xml",
      "application/vnd.ms-fontobject",
      "application/x-font-opentype",
      "application/x-font-ttf",
      "application/x-javascript",
      "application/xhtml+xml",
      "application/xml",
      "application/xml+rss",
      "font/eot",
      "font/opentype",
      "font/otf",
      "image/svg+xml",
      "image/x-icon",
      "text/css",
      "text/html",
      "text/javascript",
      "text/js",
      "text/plain"
    ]);
    adaptResponseEncodingToDownstream = (acceptEncoding, response, responseData) => {
      let contentEncoding = response.getHeader(HTTP_HEADERS.contentEncoding);
      if (isEmpty(acceptEncoding)) {
        if (!isEmpty(contentEncoding)) {
          decode(response);
          responseData.body = response.body;
        }
        return;
      }
      const BROTLI_ENCODING_REGEX = /\bbr\b/;
      const GZIP_ENCODING_REGEX = /\bgzip\b/;
      const downstreamIsGzipCompatible = GZIP_ENCODING_REGEX.test(acceptEncoding);
      const downstreamIsBrotliCompatible = BROTLI_ENCODING_REGEX.test(acceptEncoding);
      if (downstreamIsGzipCompatible && contentEncoding === GZIP_ENCODING) {
        return;
      }
      if (downstreamIsBrotliCompatible && contentEncoding === BROTLI_ENCODING) {
        return;
      }
      if (!decode(response)) {
        return;
      }
      let contentType = response.getHeader(HTTP_HEADERS.contentType);
      contentType = isString(contentType) ? [contentType] : contentType;
      if (!contentType) {
        return;
      }
      const parsedType = (0, import_content_type.parse)(contentType[0]).type;
      if (!parsedType || !COMPRESSIBLE_TYPES.has(parsedType.toLowerCase())) {
        return;
      }
      let targetContentEncoding;
      if (downstreamIsGzipCompatible) {
        targetContentEncoding = GZIP_ENCODING;
      } else if (downstreamIsBrotliCompatible) {
        targetContentEncoding = BROTLI_ENCODING;
      }
      let encodedBody;
      switch (targetContentEncoding) {
        case BROTLI_ENCODING: {
          encodedBody = (0, import_zlib3.brotliCompressSync)(Buffer.from(responseData.body));
          break;
        }
        case GZIP_ENCODING: {
          encodedBody = (0, import_zlib3.gzipSync)(Buffer.from(responseData.body));
          break;
        }
        default: {
          return;
        }
      }
      response.setHeader(HTTP_HEADERS.contentLength, Buffer.byteLength(encodedBody));
      response.setHeader(HTTP_HEADERS.contentEncoding, targetContentEncoding);
      responseData.body = encodedBody;
    };
    adaptResponseEncodingToDownstream_default = adaptResponseEncodingToDownstream;
  }
});

// src/runtime/LambdaResponse.ts
var import_stream, LambdaResponse;
var init_LambdaResponse = __esm({
  "src/runtime/LambdaResponse.ts"() {
    "use strict";
    import_stream = require("stream");
    LambdaResponse = class extends import_stream.Stream {
      constructor() {
        super();
        this.body = Buffer.from("");
        this.lambdaBody = Buffer.from("");
        this.statusCode = 200;
        this.statusMessage = "OK";
        this.headers = {};
      }
      writeHead(status, statusMessage, headers) {
        this.statusCode = status;
        if (typeof statusMessage === "string") {
          this.statusMessage = statusMessage;
        } else {
          if (typeof statusMessage === "object") {
            this.headers = statusMessage;
            this.statusMessage = void 0;
          }
        }
        if (typeof headers === "object") {
          Object.entries(headers).forEach(([name, value]) => this.setHeader(name, value));
        }
      }
      write(chunk) {
        this.lambdaBody = Buffer.concat([
          this.lambdaBody,
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        ]);
      }
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value;
      }
      removeHeader(name) {
        delete this.headers[name.toLowerCase()];
      }
      getHeader(name) {
        return this.headers[name.toLowerCase()];
      }
      getHeaders() {
        return this.headers;
      }
      getData() {
        return {
          body: this.lambdaBody,
          statusCode: this.statusCode,
          statusMessage: this.statusMessage,
          headers: this.headers
        };
      }
      end(body) {
        if (body instanceof Buffer) {
          this.body = body.toString("utf-8");
        } else if (typeof body === "string") {
          this.body = body;
        }
      }
    };
  }
});

// package.json
var require_package2 = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "@edgio/core",
      version: "7.0.8",
      main: "./index.js",
      license: "UNLICENSED",
      scripts: {
        docs: "typedoc",
        build: "rm -rf ./dist; mkdir ./dist; cp -r package.json README.md serverless.yml default-app src/schema ./dist; tsc; npm run bundle-handler;",
        "bundle-handler": "esbuild src/lambda/handler.ts --bundle  --platform=node --target=node14.0 --outfile=dist/lambda/handler.js --log-level=error --sourcemap",
        watch: "npm-watch",
        "ts:watch": "tsc --watch",
        "push-build": "npm run build && cd dist && yalc push --force && cd ..",
        release: "cd ./dist; npm publish --access public",
        "release:next": "npm run release -- --tag next",
        test: "jest --watchAll=false --runInBand --forceExit",
        "create-types": "node schemas/createTypes.js schemas/edgecontrol-scl-schema.json src/types.ts"
      },
      dependencies: {
        "@babel/parser": "^7.18.9",
        "@babel/traverse": "^7.18.9",
        "@types/lodash.clonedeep": "^4.5.6",
        ajv: "8.12.0",
        "babel-loader": "^8.2.2",
        "cache-control-parser": "^2.0.2",
        chalk: "^4.1.2",
        chardet: "^1.4.0",
        chokidar: "^3.5.1",
        "cls-hooked": "^4.2.2",
        "content-type": "^1.0.4",
        cookie: "^0.4.1",
        "cross-spawn": "^7.0.3",
        "decode-uri-component": "^0.2.0",
        deepmerge: "^4.2.2",
        esbuild: "^0.14.49",
        express: "^4.17.3",
        "fluentvalidation-ts": "^2.2.2",
        "fs-extra": "^8.1.0",
        globby: "^11.0.2",
        "http-proxy": "^1.18.1",
        "lodash.clonedeep": "^4.5.0",
        "lru-cache": "^7.14.0",
        "mime-types": "^2.1.35",
        "node-fetch": "^2.6.1",
        "path-to-regexp": "^6.2.0",
        pino: "^6.13.3",
        qs: "^6.11.0",
        "resolve-package-path": "^4.0.3",
        semver: "^7.3.5",
        shelljs: "^0.8.5",
        slash: "^3.0.0",
        "tcp-port-used": "^1.0.2",
        "ts-loader": "^8.2.0",
        unixify: "^1.0.0",
        uuid: "^8.3.2",
        "workbox-build": "^6.5.4"
      },
      publishConfig: {
        directory: "dist"
      },
      watch: {
        "push-build": {
          patterns: [
            "src",
            "bin",
            "serverless.yml",
            "default-app",
            "package.json"
          ],
          extensions: [
            "js",
            "ts"
          ],
          quiet: false
        }
      },
      jest: {
        maxWorkers: "50%",
        clearMocks: true,
        collectCoverage: true,
        collectCoverageFrom: [
          "src/**/*.{ts,js}",
          "!**/node_modules/**",
          "!**/mocks/**",
          "!**/index.ts"
        ],
        testMatch: [
          "**/test/**/*.test.js"
        ],
        transform: {
          "^.+\\.(t|j)sx?$": "@swc/jest"
        },
        moduleFileExtensions: [
          "ts",
          "js",
          "json"
        ],
        setupFilesAfterEnv: [
          "<rootDir>/test/jest.js"
        ],
        transformIgnorePatterns: [
          "<rootDir>/node_modules/"
        ],
        moduleNameMapper: {
          "../package.json": "<rootDir>/package.json",
          "^@edgio/core(.*)$": "<rootDir>/src/$1"
        }
      },
      devDependencies: {
        "@swc/core": "^1.3.5",
        "@swc/jest": "^0.2.23",
        "@types/cls-hooked": "^4.3.1",
        "@types/content-type": "^1.1.3",
        "@types/cookie": "^0.3.3",
        "@types/cross-spawn": "^6.0.2",
        "@types/decode-uri-component": "^0.2.0",
        "@types/express": "^4.17.7",
        "@types/fs-extra": "^8.1.1",
        "@types/http-proxy": "^1.17.4",
        "@types/jest": "^26.0.23",
        "@types/lodash": "^4.14.162",
        "@types/lru-cache": "^5.1.0",
        "@types/mime-types": "^2.1.0",
        "@types/node": "^14.6.4",
        "@types/route-parser": "^0.1.3",
        "@types/semver": "^7.3.9",
        "@types/shelljs": "^0.8.8",
        "@types/tcp-port-used": "^1.0.0",
        "@types/unixify": "^1.0.0",
        "@types/uuid": "^8.0.1",
        "@types/webpack-bundle-analyzer": "^3.9.0",
        "@types/workbox-build": "^5.0.1",
        camelcase: "^7.0.0",
        json2ts: "0.0.7",
        jsonschema: "^1.4.1",
        lodash: "^4.17.21",
        nock: "^13.2.8",
        stripe: "^9.12.0",
        webpack: "^5.27.0",
        "webpack-bundle-analyzer": "^3.9.0",
        "webpack-dev-middleware": "^4.1.0"
      }
    };
  }
});

// src/lambda/reqResMapper.ts
function getEdgioVersion() {
  return process.env[EDGIO_ENV_VARIABLES.versionOverride] || require_package2().version;
}
function logStatusCode(response) {
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeStatus, `w=${response.statusCode}`);
}
function logExecutionTime(response, invocation) {
  const lambda = invocation.lambda;
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeT, `wt=${invocation.duration},wc=${lambda.invocationCounter},wg=${lambda.age},wl=${lambda.lifetimeDuration}`);
}
function logComponentVersion(response, version2, lambdaId) {
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeComponents, `w=${version2},wi=${lambdaId}`);
}
function prefixResponseHeader(response, headerName, prefixValue) {
  const headerValue = response.multiValueHeaders[headerName];
  if (headerValue) {
    if (Array.isArray(headerValue)) {
      headerValue[0] = `${prefixValue},${headerValue[0]}`;
    } else {
      response.multiValueHeaders[headerName] = `${prefixValue},${headerValue}`;
    }
  } else {
    response.multiValueHeaders[headerName] = `${prefixValue}`;
  }
}
var import_qs, import_stream2, reqResMapper_default;
var init_reqResMapper = __esm({
  "src/lambda/reqResMapper.ts"() {
    "use strict";
    init_constants();
    import_qs = __toESM(require_lib2());
    init_wrapper();
    init_adaptResponseEncodingToDownstream();
    import_stream2 = __toESM(require("stream"));
    init_environment();
    init_LambdaResponse();
    reqResMapper_default = (event, invocation) => {
      let responsePromise;
      const req = new import_stream2.default.Readable();
      req.url = event.path;
      req.path = event.path;
      req.query = {};
      req.method = event.httpMethod;
      req.rawHeaders = [];
      req.headers = {};
      if (event.multiValueQueryStringParameters && Object.keys(event.multiValueQueryStringParameters).length) {
        Object.keys(event.multiValueQueryStringParameters).forEach((key2) => {
          const curVal = event.multiValueQueryStringParameters[key2];
          if (Array.isArray(curVal) && curVal.length === 1) {
            event.multiValueQueryStringParameters[key2] = curVal[0];
          }
        });
        const qs3 = (0, import_qs.stringify)(event.multiValueQueryStringParameters, {
          indices: false
        });
        req.url += `?${qs3}`;
        req.query = (0, import_qs.parse)(qs3);
      }
      const headers = event.multiValueHeaders || {};
      for (const key2 of Object.keys(headers)) {
        for (const value of headers[key2]) {
          req.rawHeaders.push(key2);
          req.rawHeaders.push(value);
        }
        req.headers[key2.toLowerCase()] = headers[key2].toString();
      }
      req.getHeader = (name) => req.headers[name.toLowerCase()];
      req.getHeaders = () => req.headers;
      req.setHeader = (name, value) => {
        req.headers[name.toLowerCase()] = value;
      };
      req.removeHeader = (name) => {
        delete req.headers[name.toLowerCase()];
      };
      req.connection = {};
      const downstreamAcceptEncoding = req.getHeader(HTTP_HEADERS.acceptEncoding);
      req.socket = { remoteAddress: req.getHeader["x-edg-client-ip"] };
      req.secure = !isLocal() && req.getHeader(HTTP_HEADERS.xEdgeProtocol) !== "http";
      req.socket = {
        encrypted: req.secure
      };
      req.connection = {
        encrypted: req.secure
      };
      req.protocol = req.secure ? "https" : "http";
      let newRequestId;
      if (!req.headers[HTTP_HEADERS.xRequestId]) {
        newRequestId = v4();
        req.headers[HTTP_HEADERS.xRequestId] = newRequestId;
      }
      const res = new LambdaResponse();
      const onResEnd = (resolve2) => (text) => {
        text && res.write(text);
        newRequestId && res.setHeader(HTTP_HEADERS.xRequestId, newRequestId);
        const responseData = res.getData();
        adaptResponseEncodingToDownstream_default(downstreamAcceptEncoding, res, responseData);
        responseData.body = responseData.body.toString("base64");
        responseData.isBase64Encoded = true;
        responseData.multiValueHeaders = res.headers;
        invocation.stop();
        logStatusCode(responseData);
        logExecutionTime(responseData, invocation);
        logComponentVersion(responseData, getEdgioVersion(), invocation.lambda.id);
        fixApiGatewayMultipleHeaders(responseData);
        resolve2(responseData);
      };
      responsePromise = new Promise((resolve2) => {
        res.end = onResEnd(resolve2);
      });
      if (event.body) {
        req.push(event.body, event.isBase64Encoded ? "base64" : void 0);
        req._rawBodyBase64 = event.body;
      }
      req.push(null);
      function fixApiGatewayMultipleHeaders(responseData) {
        for (const key2 of Object.keys(responseData.multiValueHeaders)) {
          if (!Array.isArray(responseData.multiValueHeaders[key2])) {
            responseData.multiValueHeaders[key2] = [responseData.multiValueHeaders[key2]];
          }
        }
      }
      return { req, res, responsePromise };
    };
  }
});

// src/utils/index.ts
var init_utils = __esm({
  "src/utils/index.ts"() {
    "use strict";
    init_nonWebpackRequire();
  }
});

// src/log.ts
var LogLevel, _a, key, configuredLogLevel, logger, log_default;
var init_log = __esm({
  "src/log.ts"() {
    "use strict";
    LogLevel = /* @__PURE__ */ ((LogLevel2) => {
      LogLevel2[LogLevel2["TRACE"] = 0] = "TRACE";
      LogLevel2[LogLevel2["DEBUG"] = 1] = "DEBUG";
      LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
      return LogLevel2;
    })(LogLevel || {});
    key = (_a = process.env.LOG_LEVEL) == null ? void 0 : _a.toUpperCase();
    configuredLogLevel = key ? LogLevel[key] : null;
    logger = {
      trace(...params) {
        logger.log(0 /* TRACE */, ...params);
      },
      debug(...params) {
        logger.log(1 /* DEBUG */, ...params);
      },
      info(...params) {
        logger.log(2 /* INFO */, ...params);
      },
      warn(...params) {
        logger.log(3 /* WARN */, ...params);
      },
      error(...params) {
        logger.log(3 /* WARN */, ...params);
      },
      log(level, ...params) {
        if (params.length === 1 && typeof params[0] === "function") {
          params = [params[0]()];
        }
        if (configuredLogLevel != null && configuredLogLevel <= level) {
          console.log(`${LogLevel[level].padEnd(5, " ")}`, ...params);
        }
      }
    };
    log_default = logger;
  }
});

// src/config.ts
function getConfig(reload = false) {
  if (!config || reload) {
    const srcPath = getConfigSrcPath();
    if (reload) {
      delete require.cache[srcPath];
    }
    config = nonWebpackRequire(srcPath);
    const environment2 = process.env.EDGIO_ENVIRONMENT_NAME;
    if (environment2 && config.environments && config.environments[environment2]) {
      log_default.info(`using config overrides for ${environment2}`);
      Object.assign(config, config.environments[environment2]);
    }
  }
  return config;
}
var config;
var init_config = __esm({
  "src/config.ts"() {
    "use strict";
    init_paths();
    init_utils();
    init_log();
  }
});

// src/utils/mapValues.ts
function mapValues(obj, callback) {
  const result = {};
  for (let [key2, value] of Object.entries(obj)) {
    result[key2] = callback(value, key2);
  }
  return result;
}
var init_mapValues = __esm({
  "src/utils/mapValues.ts"() {
    "use strict";
  }
});

// src/router/CacheManifersRegexp.ts
var CacheManifestRegexp;
var init_CacheManifersRegexp = __esm({
  "src/router/CacheManifersRegexp.ts"() {
    "use strict";
    CacheManifestRegexp = class extends RegExp {
      constructor(pattern, flags, isNot) {
        super(pattern, flags);
        this.isNot = isNot;
      }
      test(value) {
        const res = super.test(value);
        return this.isNot === true ? !res : res;
      }
    };
  }
});

// src/utils/universalRouteUtils.ts
function matchCriteriaRegexObjectWithRequestObject(criteriaObj, requestObj, criteriaObjKeyNameFn = identity) {
  let params = {};
  return Object.entries(criteriaObj).every(([name, regex]) => {
    const value = requestObj[criteriaObjKeyNameFn(name)];
    if (regex === null) {
      return value === void 0;
    } else if (typeof regex === "string") {
      if (typeof value === "string" && isParamMatcher(regex)) {
        const paramName = paramMatcherToParam(regex);
        params[paramName] = value;
        return true;
      }
      regex = new RegExp(`^${regex}$`, "i");
    }
    return testRegExp(regex, value);
  }) && params;
}
function isParamMatcher(value) {
  return typeof value === "string" && /^:\w+$/.test(value);
}
function paramMatcherToParam(value) {
  return value.slice(1);
}
function testRegExp(regexp, value) {
  if (value == null) {
    return false;
  }
  if (regexp.global) {
    regexp = new CacheManifestRegexp(regexp, regexp.flags, regexp.isNot);
  }
  if (Array.isArray(value)) {
    return value.some((v) => regexp.test(v));
  } else {
    return regexp.test(value);
  }
}
var identity;
var init_universalRouteUtils = __esm({
  "src/utils/universalRouteUtils.ts"() {
    "use strict";
    init_CacheManifersRegexp();
    identity = (x) => x;
  }
});

// src/router/CacheManifest.ts
var CacheManifest;
var init_CacheManifest = __esm({
  "src/router/CacheManifest.ts"() {
    "use strict";
    init_mapValues();
    init_universalRouteUtils();
    init_CacheManifersRegexp();
    CacheManifest = class {
      constructor(entries) {
        this.entries = entries || [];
      }
      get cacheableEntries() {
        return this.entries.filter(CacheManifest.isEntryCacheable);
      }
      get spaRoutes() {
        return this.cacheableEntries.filter(({ cacheOptions }) => cacheOptions.browser && cacheOptions.browser.spa).map(({ route }) => new RegExp(route, "i"));
      }
      shouldPrefetch(url2) {
        let doPrefetch = false;
        this.entries.some((entry) => {
          const matches = CacheManifest.entryMatches(entry, url2);
          if (matches) {
            doPrefetch = CacheManifest.isEntryCacheable(entry) || !!entry.cacheOptions.prefetchUpstreamRequests;
            return doPrefetch;
          }
          return false;
        });
        return doPrefetch;
      }
      static entryMatches(entry, url2) {
        const matchRoute = new RegExp(entry.route, "i").test(url2.pathname);
        if (!matchRoute)
          return false;
        const matchParams = matchCriteriaRegexObjectWithRequestObject(mapValues(entry.query || {}, (value) => value ? new CacheManifestRegexp(value.value, "i", value.isNot) : null), Object.fromEntries(Array.from(url2.searchParams.entries())));
        if (!matchParams)
          return false;
        const matchProtocol = entry.protocol ? new CacheManifestRegexp(entry.protocol.value, "i", entry.protocol.isNot).test(url2.protocol) : true;
        return matchProtocol;
      }
      static isEntryCacheable({ cacheOptions }) {
        return !!(cacheOptions.browser && (cacheOptions.browser.serviceWorkerSeconds || 0) > 0 && cacheOptions.edge && (cacheOptions.edge.maxAgeSeconds || 0) > 0);
      }
      static fromEntries(entries) {
        return new CacheManifest(entries);
      }
      static matchRegex(pattern, value, regexOptions) {
        const res = new RegExp(pattern.value, regexOptions).test(value);
        return pattern.isNot === true ? !res : res;
      }
      toJSON() {
        return JSON.stringify(this.entries);
      }
    };
  }
});

// src/source.ts
function getSourceDir() {
  return process.env.EDGIO_ROOT_SOURCE_DIR || process.cwd();
}
var init_source = __esm({
  "src/source.ts"() {
    "use strict";
  }
});

// src/utils/requireInternal.ts
function requireInternal(packagePath) {
  try {
    const resolved = require.resolve(packagePath, {
      paths: [require.resolve("@edgio/core")]
    });
    return nonWebpackRequire(resolved);
  } catch (e) {
    return nonWebpackRequire(packagePath);
  }
}
var init_requireInternal = __esm({
  "src/utils/requireInternal.ts"() {
    "use strict";
    init_nonWebpackRequire();
  }
});

// src/utils/exact.ts
function exact(path2) {
  return new ExactPath(path2);
}
var ExactPath;
var init_exact = __esm({
  "src/utils/exact.ts"() {
    "use strict";
    ExactPath = class {
      constructor(value) {
        this.value = value;
      }
      toString() {
        return this.value;
      }
    };
  }
});

// src/router/addBuildInRoutes.ts
var CACHE_MANIFEST_PATH;
var init_addBuildInRoutes = __esm({
  "src/router/addBuildInRoutes.ts"() {
    "use strict";
    init_environment();
    init_exact();
    CACHE_MANIFEST_PATH = "/__edgio__/cache-manifest.js";
  }
});

// src/utils/regExpEscape.ts
function regExpEscape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var init_regExpEscape = __esm({
  "src/utils/regExpEscape.ts"() {
    "use strict";
  }
});

// src/utils/toEdgeRegex.ts
function toEdgeRegex(regex, prefix = "") {
  let source = `${regex.source.slice(0).replace(/\\\//g, "/")}`;
  if (source.startsWith("^")) {
    source = `^${regExpEscape(prefix)}${source.slice(1)}`;
  } else {
    source = `${regExpEscape(prefix)}${source}`;
  }
  return `${regex.ignoreCase ? "(?i)" : ""}${source}`;
}
function fromEdgeRegex(edgeRegex) {
  const ignoreCase = edgeRegex.indexOf("(?i)") === 0;
  if (ignoreCase) {
    edgeRegex = edgeRegex.slice("(?i)".length);
  }
  return new RegExp(edgeRegex.replace(/\//g, "/"), ignoreCase ? "i" : "");
}
var init_toEdgeRegex = __esm({
  "src/utils/toEdgeRegex.ts"() {
    "use strict";
    init_regExpEscape();
  }
});

// node_modules/path-to-regexp/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/path-to-regexp/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pathToRegexp = exports.tokensToRegexp = exports.regexpToFunction = exports.match = exports.tokensToFunction = exports.compile = exports.parse = void 0;
    function lexer(str) {
      var tokens = [];
      var i = 0;
      while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
          tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
          continue;
        }
        if (char === "\\") {
          tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
          continue;
        }
        if (char === "{") {
          tokens.push({ type: "OPEN", index: i, value: str[i++] });
          continue;
        }
        if (char === "}") {
          tokens.push({ type: "CLOSE", index: i, value: str[i++] });
          continue;
        }
        if (char === ":") {
          var name = "";
          var j = i + 1;
          while (j < str.length) {
            var code = str.charCodeAt(j);
            if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
              name += str[j++];
              continue;
            }
            break;
          }
          if (!name)
            throw new TypeError("Missing parameter name at " + i);
          tokens.push({ type: "NAME", index: i, value: name });
          i = j;
          continue;
        }
        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j = i + 1;
          if (str[j] === "?") {
            throw new TypeError('Pattern cannot start with "?" at ' + j);
          }
          while (j < str.length) {
            if (str[j] === "\\") {
              pattern += str[j++] + str[j++];
              continue;
            }
            if (str[j] === ")") {
              count--;
              if (count === 0) {
                j++;
                break;
              }
            } else if (str[j] === "(") {
              count++;
              if (str[j + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at " + j);
              }
            }
            pattern += str[j++];
          }
          if (count)
            throw new TypeError("Unbalanced pattern at " + i);
          if (!pattern)
            throw new TypeError("Missing pattern at " + i);
          tokens.push({ type: "PATTERN", index: i, value: pattern });
          i = j;
          continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
      }
      tokens.push({ type: "END", index: i, value: "" });
      return tokens;
    }
    function parse5(str, options) {
      if (options === void 0) {
        options = {};
      }
      var tokens = lexer(str);
      var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key2 = 0;
      var i = 0;
      var path2 = "";
      var tryConsume = function(type) {
        if (i < tokens.length && tokens[i].type === type)
          return tokens[i++].value;
      };
      var mustConsume = function(type) {
        var value2 = tryConsume(type);
        if (value2 !== void 0)
          return value2;
        var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
      };
      var consumeText = function() {
        var result2 = "";
        var value2;
        while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result2 += value2;
        }
        return result2;
      };
      while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
          var prefix = char || "";
          if (prefixes.indexOf(prefix) === -1) {
            path2 += prefix;
            prefix = "";
          }
          if (path2) {
            result.push(path2);
            path2 = "";
          }
          result.push({
            name: name || key2++,
            prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
          path2 += value;
          continue;
        }
        if (path2) {
          result.push(path2);
          path2 = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key2++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix,
            suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        mustConsume("END");
      }
      return result;
    }
    exports.parse = parse5;
    function compile(str, options) {
      return tokensToFunction(parse5(str, options), options);
    }
    exports.compile = compile;
    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }
      var reFlags = flags(options);
      var _a2 = options.encode, encode = _a2 === void 0 ? function(x) {
        return x;
      } : _a2, _b = options.validate, validate2 = _b === void 0 ? true : _b;
      var matches = tokens.map(function(token) {
        if (typeof token === "object") {
          return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
      });
      return function(data) {
        var path2 = "";
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (typeof token === "string") {
            path2 += token;
            continue;
          }
          var value = data ? data[token.name] : void 0;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";
          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
            }
            if (value.length === 0) {
              if (optional)
                continue;
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
            for (var j = 0; j < value.length; j++) {
              var segment = encode(value[j], token);
              if (validate2 && !matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
              }
              path2 += token.prefix + segment + token.suffix;
            }
            continue;
          }
          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);
            if (validate2 && !matches[i].test(segment)) {
              throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
            }
            path2 += token.prefix + segment + token.suffix;
            continue;
          }
          if (optional)
            continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
        }
        return path2;
      };
    }
    exports.tokensToFunction = tokensToFunction;
    function match2(str, options) {
      var keys = [];
      var re = pathToRegexp4(str, keys, options);
      return regexpToFunction(re, keys, options);
    }
    exports.match = match2;
    function regexpToFunction(re, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.decode, decode2 = _a2 === void 0 ? function(x) {
        return x;
      } : _a2;
      return function(pathname) {
        var m = re.exec(pathname);
        if (!m)
          return false;
        var path2 = m[0], index = m.index;
        var params = /* @__PURE__ */ Object.create(null);
        var _loop_1 = function(i2) {
          if (m[i2] === void 0)
            return "continue";
          var key2 = keys[i2 - 1];
          if (key2.modifier === "*" || key2.modifier === "+") {
            params[key2.name] = m[i2].split(key2.prefix + key2.suffix).map(function(value) {
              return decode2(value, key2);
            });
          } else {
            params[key2.name] = decode2(m[i2], key2);
          }
        };
        for (var i = 1; i < m.length; i++) {
          _loop_1(i);
        }
        return { path: path2, index, params };
      };
    }
    exports.regexpToFunction = regexpToFunction;
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path2, keys) {
      if (!keys)
        return path2;
      var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
      var index = 0;
      var execResult = groupsRegex.exec(path2.source);
      while (execResult) {
        keys.push({
          name: execResult[1] || index++,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
        execResult = groupsRegex.exec(path2.source);
      }
      return path2;
    }
    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function(path2) {
        return pathToRegexp4(path2, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    function stringToRegexp(path2, keys, options) {
      return tokensToRegexp(parse5(path2, options), keys, options);
    }
    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
        return x;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
      var route = start ? "^" : "";
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
          route += escapeString(encode(token));
        } else {
          var prefix = escapeString(encode(token.prefix));
          var suffix = escapeString(encode(token.suffix));
          if (token.pattern) {
            if (keys)
              keys.push(token);
            if (prefix || suffix) {
              if (token.modifier === "+" || token.modifier === "*") {
                var mod = token.modifier === "*" ? "?" : "";
                route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
              } else {
                route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
              }
            } else {
              route += "(" + token.pattern + ")" + token.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token.modifier;
          }
        }
      }
      if (end) {
        if (!strict)
          route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }
      return new RegExp(route, flags(options));
    }
    exports.tokensToRegexp = tokensToRegexp;
    function pathToRegexp4(path2, keys, options) {
      if (path2 instanceof RegExp)
        return regexpToRegexp(path2, keys);
      if (Array.isArray(path2))
        return arrayToRegexp(path2, keys, options);
      return stringToRegexp(path2, keys, options);
    }
    exports.pathToRegexp = pathToRegexp4;
  }
});

// src/errors/InvalidRoutePatternError.ts
var InvalidRoutePatternError;
var init_InvalidRoutePatternError = __esm({
  "src/errors/InvalidRoutePatternError.ts"() {
    "use strict";
    InvalidRoutePatternError = class extends Error {
      constructor(pattern) {
        super(`Route pattern "${pattern}" contains invalid syntax. To force exact matching, wrap the path in the 'exact' function.
See https://docs.edg.io/guides/performance/cdn_as_code/common_routing_patterns for more information.`);
        this.isUserError = true;
      }
    };
  }
});

// src/utils/toPathRegexp.ts
function toPathRegexp(path2) {
  if (path2) {
    try {
      return (0, import_path_to_regexp.pathToRegexp)(path2);
    } catch (e) {
      throw new InvalidRoutePatternError(path2);
    }
  } else {
    return /^.*$/;
  }
}
var import_path_to_regexp;
var init_toPathRegexp = __esm({
  "src/utils/toPathRegexp.ts"() {
    "use strict";
    import_path_to_regexp = __toESM(require_dist2());
    init_InvalidRoutePatternError();
  }
});

// src/router/RouteCriteria.ts
var isNegation;
var init_RouteCriteria = __esm({
  "src/router/RouteCriteria.ts"() {
    "use strict";
    isNegation = (value) => {
      return typeof value === "object" && value !== null && "not" in value;
    };
  }
});

// src/router/converters/toCondition.ts
var toCondition;
var init_toCondition = __esm({
  "src/router/converters/toCondition.ts"() {
    "use strict";
    init_exact();
    init_toEdgeRegex();
    init_toPathRegexp();
    init_RouteCriteria();
    toCondition = (property, value) => {
      if (isNegation(value)) {
        if (typeof value.not === "string") {
          if (property.request === "path" && toPathRegexp(value.not)) {
            return { ["!="]: [property, value.not] };
          }
          return { ["!=="]: [property, value.not] };
        } else if (value.not instanceof RegExp) {
          return { ["!~"]: [property, toEdgeRegex(value.not)] };
        }
      } else {
        if (typeof value === "string") {
          if (property.request === "path" && toPathRegexp(value)) {
            return { ["=="]: [property, value] };
          }
          return { ["==="]: [property, value] };
        } else if (value instanceof RegExp) {
          return { ["=~"]: [property, toEdgeRegex(value)] };
        } else if (value instanceof ExactPath) {
          return { ["==="]: [property, value.value] };
        }
      }
      throw new Error(`Invalid type for match condition: ${typeof value}`);
    };
  }
});

// src/router/createMatchers.ts
function createMatchers(criteria) {
  var _a2;
  const rules = [];
  const add = (property, value) => {
    const condition = toCondition(property, value);
    rules.push(condition);
  };
  if (criteria.protocol) {
    add({ request: "scheme" }, criteria.protocol);
  }
  if (criteria.path) {
    add({ request: "path" }, criteria.path);
  }
  if (criteria.method) {
    add({ request: "method" }, typeof criteria.method === "string" ? criteria.method.toUpperCase() : criteria.method);
  }
  if (criteria.headers) {
    Object.entries(criteria.headers).forEach(([name, value]) => {
      add({ "request.header": name }, value);
    });
  }
  if (criteria.query) {
    Object.entries(criteria.query).forEach(([name, value]) => {
      add({ "request.origin_query": name }, typeof value === "string" && value.startsWith(":") ? new RegExp(".+") : value);
    });
  }
  if (criteria.cookies) {
    Object.entries(criteria.cookies).forEach(([name, value]) => {
      add({ "request.cookie": name }, value);
    });
  }
  if (criteria.device) {
    Object.entries(criteria.device).forEach(([name, value]) => {
      add({ device: name }, value);
    });
  }
  if (criteria.location) {
    Object.entries(criteria.location).forEach(([name, value]) => {
      add({ location: name }, value);
    });
  }
  if (criteria.variable) {
    Object.entries(criteria.variable).forEach(([name, value]) => {
      add({ variable: name }, value);
    });
  }
  if ((_a2 = criteria.response) == null ? void 0 : _a2.statusCode) {
    throw new Error("Matching response status is not yet supported.");
  }
  return rules;
}
var init_createMatchers = __esm({
  "src/router/createMatchers.ts"() {
    "use strict";
    init_toCondition();
  }
});

// src/router/converters/toRule.ts
var toRule, toInRule;
var init_toRule = __esm({
  "src/router/converters/toRule.ts"() {
    "use strict";
    init_createMatchers();
    toRule = (criteria, features) => {
      let matchers = createMatchers(criteria);
      if (matchers.length === 0) {
        return features;
      }
      matchers = matchers.length == 1 ? matchers[0] : { and: matchers };
      const rule = {
        if: [matchers, features]
      };
      return rule;
    };
    toInRule = (paths, features) => {
      let matchers = { in: [{ request: "path" }, paths] };
      const rule = {
        if: [matchers, features]
      };
      return rule;
    };
  }
});

// src/utils/regexUtils.ts
function removeRegexLineMatchers(regexSource) {
  return regexSource.replace(/(?<!\\)((?:\\{2})*)(\^|\$)/g, "");
}
function toExactRegex(regex) {
  return new RegExp(`^${removeRegexLineMatchers(regex.source)}$`, regex.flags);
}
function substituteParams(regex, source, destination) {
  return bindRegexParams(destination, regex.exec(source) || []);
}
function bindRegexParams(destination, params) {
  var _a2;
  return ((_a2 = destination.match(/(?<!\\)((?:\\{2})*)(\$[0-9]*)/g)) == null ? void 0 : _a2.reduce((output, substitutionParam) => {
    const index = parseInt(substitutionParam.substring(1));
    return output.replace(substitutionParam, params[index] || "");
  }, destination)) || destination;
}
var init_regexUtils = __esm({
  "src/utils/regexUtils.ts"() {
    "use strict";
  }
});

// src/utils/bindParams.ts
var bindParams_default;
var init_bindParams = __esm({
  "src/utils/bindParams.ts"() {
    "use strict";
    init_regexUtils();
    bindParams_default = (path2, params) => {
      let p = path2;
      if (/(^|[^$]){/.test(path2)) {
        throw new Error(`{variable} syntax in the path option is no longer supported, use :variable instead (${path2})`);
      }
      for (let paramName in params) {
        let value = params[paramName];
        if (Array.isArray(value)) {
          value = value.join("/");
        }
        const pattern = new RegExp(`:${paramName}(\\([^)]*\\))?[?*+]?`, "g");
        const replacement = value === void 0 ? "" : value;
        p = p.replace(pattern, replacement.replace(/\$/g, "$$$"));
      }
      p = p.replace(/:\w+(\*|\+|\?)?/, "");
      p = p.replace("\\?", "?");
      p = p.replace(/\/+/g, "/").replace(/^([^:]+:)\//gi, "$1//");
      p = (params == null ? void 0 : params.$) ? bindRegexParams(p, params.$) : p;
      return p;
    };
  }
});

// src/runtime/toRegExp.ts
function toRegExp(pattern, flags = "g") {
  if (pattern.startsWith("(?i)")) {
    pattern = pattern.substring(4);
    flags += "i";
  }
  return new RegExp(pattern, flags);
}
var init_toRegExp = __esm({
  "src/runtime/toRegExp.ts"() {
    "use strict";
  }
});

// src/router/path.ts
function rewritePath(sourcePath, destPath, skipQuery) {
  if (sourcePath == null)
    return { destination: destPath };
  return {
    source: `${sourcePath}:optionalSlash(\\/?)?:optionalQuery(\\?.*)?`,
    syntax: "path-to-regexp",
    destination: `${destPath}${skipQuery ? "" : ":optionalSlash:optionalQuery"}`
  };
}
function mapURL(url2, source, destination, syntax) {
  let targetSource;
  let targetDest = destination;
  if (source) {
    if (syntax === "regexp") {
      targetSource = toRegExp(source, "");
    } else {
      targetSource = (0, import_path_to_regexp2.pathToRegexp)(source);
      targetDest = bindParams_default(destination, getBackReferences(source));
    }
    return url2.replace(targetSource, targetDest);
  } else {
    return targetDest;
  }
}
function getBackReferences(path2) {
  const absolutePathMatch = path2.match(/https?:\/\/[^/]+(.*)/);
  if (absolutePathMatch) {
    path2 = `/${absolutePathMatch[1]}`;
  }
  let backReferenceCounter = 1;
  const references = {};
  (0, import_path_to_regexp2.parse)(path2).forEach((token) => {
    if (typeof token !== "string") {
      references[token.name] = `$${backReferenceCounter++}`;
    }
  });
  return references;
}
var import_path_to_regexp2;
var init_path = __esm({
  "src/router/path.ts"() {
    "use strict";
    import_path_to_regexp2 = __toESM(require_dist2());
    init_bindParams();
    init_toEdgeRegex();
    init_toRegExp();
  }
});

// src/origins.ts
function getEdgioOrigins(forEdgeControl = false) {
  return [
    createStaticOrigin(),
    createPermanentStaticOrigin(),
    createServerlessOrigin(forEdgeControl),
    createImageOptimizerOrigin()
  ];
}
function getPathPrefix(origin) {
  var _a2, _b, _c;
  return ((_c = (_b = (_a2 = internalConfig == null ? void 0 : internalConfig.origins) == null ? void 0 : _a2.find((o) => o.name === origin)) == null ? void 0 : _b.hosts[0]) == null ? void 0 : _c.path_prefix) || "";
}
function createStaticOrigin() {
  return getOriginFromConfig(STATIC_ORIGIN_NAME) || {
    name: STATIC_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3002" }]
  };
}
function createPermanentStaticOrigin() {
  return getOriginFromConfig(PERMANENT_STATIC_ORIGIN_NAME) || {
    name: PERMANENT_STATIC_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3002" }]
  };
}
function createServerlessOrigin(forEdgeControl = false) {
  const originFromConfig = forEdgeControl ? getOriginFromConfig(SERVERLESS_ORIGIN_NAME) : null;
  return originFromConfig || {
    name: SERVERLESS_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3001" }]
  };
}
function createImageOptimizerOrigin() {
  return {
    name: IMAGE_OPTIMIZER_ORIGIN_NAME,
    hosts: !isLocal() ? getOriginFromConfig(SERVERLESS_ORIGIN_NAME).hosts : [{ location: "127.0.0.1:3003" }]
  };
}
var STATIC_ORIGIN_NAME, PERMANENT_STATIC_ORIGIN_NAME, SERVERLESS_ORIGIN_NAME, IMAGE_OPTIMIZER_ORIGIN_NAME, internalConfig, getOriginFromConfig;
var init_origins = __esm({
  "src/origins.ts"() {
    "use strict";
    init_constants();
    init_environment();
    STATIC_ORIGIN_NAME = "edgio_static";
    PERMANENT_STATIC_ORIGIN_NAME = "edgio_permanent_static";
    SERVERLESS_ORIGIN_NAME = "edgio_serverless";
    IMAGE_OPTIMIZER_ORIGIN_NAME = "edgio_image_optimizer";
    internalConfig = process.env[EDGIO_ENV_VARIABLES.internalConfig] ? JSON.parse(process.env[EDGIO_ENV_VARIABLES.internalConfig] || "{}") : {};
    getOriginFromConfig = (name) => {
      var _a2;
      const origin = (_a2 = internalConfig == null ? void 0 : internalConfig.origins) == null ? void 0 : _a2.find((origin2) => origin2.name === name);
      if (origin) {
        for (let host of origin.hosts) {
          delete host.path_prefix;
        }
      }
      return origin;
    };
  }
});

// src/router/RedirectOptions.ts
var import_url, import_querystring, normalizeRedirectOptions;
var init_RedirectOptions = __esm({
  "src/router/RedirectOptions.ts"() {
    "use strict";
    import_url = __toESM(require("url"));
    import_querystring = __toESM(require("querystring"));
    normalizeRedirectOptions = (to, options) => {
      const { statusCode = 302, query = {} } = typeof options === "number" ? { statusCode: options } : options;
      let toQuery = {};
      const parsedTo = import_url.default.parse(to);
      if (parsedTo == null ? void 0 : parsedTo.search) {
        to = to.substr(0, to.length - parsedTo.search.length);
        toQuery = import_querystring.default.parse(parsedTo.query);
      }
      return {
        to,
        statusCode,
        query: {
          ...toQuery,
          ...query
        }
      };
    };
  }
});

// src/errors/BackendFetchError.ts
var BackendFetchError;
var init_BackendFetchError = __esm({
  "src/errors/BackendFetchError.ts"() {
    "use strict";
    BackendFetchError = class extends Error {
      constructor(cause) {
        super(cause.message);
        this.type = "BackendFetchError";
        this.cause = cause;
      }
    };
  }
});

// src/runtime/random.ts
function getRandomElement(source) {
  const index = getRandomInt(source.length);
  return source[index];
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
var init_random = __esm({
  "src/runtime/random.ts"() {
    "use strict";
  }
});

// src/utils/mergeQueryString.ts
function mergeQueryString(requestUrl, targetRedirectOrPath) {
  const requestSearchParams = new URL(requestUrl, `https://${PLACEHOLDER_HOSTNAME}`).searchParams;
  const targetUrl = new URL(targetRedirectOrPath, `https://${PLACEHOLDER_HOSTNAME}`);
  requestSearchParams.forEach((value, key2) => {
    if (!targetUrl.searchParams.get(key2)) {
      targetUrl.searchParams.set(key2, value);
    }
  });
  return targetUrl.hostname === PLACEHOLDER_HOSTNAME ? `${targetUrl.pathname}${targetUrl.search}` : targetUrl.toString();
}
var PLACEHOLDER_HOSTNAME;
var init_mergeQueryString = __esm({
  "src/utils/mergeQueryString.ts"() {
    "use strict";
    PLACEHOLDER_HOSTNAME = "__";
  }
});

// src/runtime/Backend.ts
var import_url2, import_http, import_https, IGNORE_RESPONSE_HEADERS, Backend, impl;
var init_Backend = __esm({
  "src/runtime/Backend.ts"() {
    "use strict";
    import_url2 = require("url");
    import_http = __toESM(require("http"));
    import_https = __toESM(require("https"));
    init_BackendFetchError();
    init_constants();
    init_random();
    init_log();
    init_bindParams();
    init_mergeQueryString();
    IGNORE_RESPONSE_HEADERS = ["transfer-encoding", "content-length"];
    Backend = class {
      static setImpl(implementation) {
        impl = implementation;
      }
      static create(config2, origin) {
        return new impl(config2, origin);
      }
      constructor(config2, origin) {
        this.config = config2;
        this.origin = origin;
        this.hostHeader = origin.override_host_header;
      }
      async fetch(req, res, options = {}) {
        const url2 = this.getProxyTarget(req);
        const requestOptions = this.getProxyRequestOptions(url2, req, options);
        return new Promise((resolve2, reject) => {
          const lib = url2.protocol === "https:" ? import_https.default : import_http.default;
          const upstreamReq = lib.request(requestOptions, (upstreamRes) => {
            let buf = [];
            upstreamRes.on("data", (chunk) => buf.push(chunk)).on("end", () => {
              if (upstreamRes.complete) {
                Object.entries(upstreamRes.headers).filter(([name]) => !IGNORE_RESPONSE_HEADERS.includes(name.toLowerCase())).forEach(([name, value]) => {
                  try {
                    res.setHeader(name, value);
                  } catch (e) {
                    log_default.warn(`Could not relay upstream response header ${name} with value ${value}`, e);
                  }
                });
                res.statusCode = upstreamRes.statusCode;
                res.statusMessage = upstreamRes.statusMessage;
                res.body = Buffer.concat(buf);
                log_default.debug("proxy", `[${res.statusCode} ${res.statusMessage}]`, url2);
                resolve2(void 0);
              }
            }).on("error", (e) => {
              reject(new BackendFetchError(e));
            }).on("close", () => {
              if (!upstreamRes.complete) {
                reject(new BackendFetchError(new Error("The connection was terminated while the message was still being sent")));
              }
            });
          });
          upstreamReq.on("error", (e) => reject(new BackendFetchError(e)));
          upstreamReq.end(req.rawBody);
        });
      }
      getProxyTarget(req) {
        let location;
        if (Array.isArray(this.config.location)) {
          location = getRandomElement(this.config.location);
        } else {
          location = this.config.location;
        }
        if (typeof location === "string") {
          location = { hostname: location };
        }
        const { hostname, port } = location;
        const protocol = hostname.match(/^(127.0.0.1|localhost)(:\d+)?$/) ? "http" : "https";
        const host = `${hostname}${port ? `:${port}` : ""}`;
        const parsed = (0, import_url2.parse)(`${protocol}://${host}${req.url}`, true);
        if (req.getHeader(HTTP_HEADERS.xEdgeProtocol) === "http") {
          parsed.protocol = "http:";
        }
        return parsed;
      }
      isLocal(url2) {
        return url2.hostname === JS_BACKEND_HOSTNAME;
      }
      getProxyRequestOptions(url2, req, options = {}) {
        var _a2;
        let agent = null;
        if (((_a2 = this.origin.tls_verify) == null ? void 0 : _a2.allow_self_signed_certs) && url2.protocol === "https:") {
          agent = new import_https.default.Agent({ rejectUnauthorized: false });
        }
        let pathWithQuery = url2.path ?? "/";
        if (options == null ? void 0 : options.path) {
          const updatedPathWithQuery = bindParams_default(typeof options.path === "function" ? options.path() || "" : options.path, req.params);
          pathWithQuery = mergeQueryString(pathWithQuery ?? "", updatedPathWithQuery);
        }
        if ((options == null ? void 0 : options.removeEmptySearchParamValues) && url2.path) {
          pathWithQuery = pathWithQuery == null ? void 0 : pathWithQuery.replace(/=(?=&|$)/gm, "");
        }
        const upstreamHeaders = {
          ...req.headers,
          ...(options == null ? void 0 : options.headers) ?? {},
          host: this.hostHeader || req.headers.host
        };
        if (this.isLocal(url2)) {
          upstreamHeaders["x-forwarded-proto"] = req.secure ? "https" : "http";
        }
        return {
          ...url2,
          path: pathWithQuery,
          method: req.method,
          timeout: this.config.firstByteTimeout || 0,
          agent,
          body: req.rawBody,
          headers: upstreamHeaders
        };
      }
    };
    impl = Backend;
  }
});

// src/runtime/Origin.ts
var Origin;
var init_Origin = __esm({
  "src/runtime/Origin.ts"() {
    "use strict";
    init_log();
    init_Backend();
    init_random();
    Origin = class {
      constructor(config2) {
        this.config = config2;
      }
      async fetch(request, response, options = {}) {
        const hostConfig = this.selectHost();
        const host = Backend.create(hostConfig, this.config);
        return host.fetch(request, response, options);
      }
      selectHost() {
        const { balancer } = this.config;
        if ("static_weighted" === balancer) {
          return this.config.hosts[0];
        } else if ("round_robin" === balancer) {
          return getRandomElement(this.config.hosts);
        } else {
          if (balancer) {
            log_default.warn(`balancer type "${balancer}" is not supported during local development, falling back to "static".`);
          }
          return this.config.hosts[0];
        }
      }
    };
  }
});

// src/runtime/url.ts
function parseURL(url2) {
  const parsed = new URL(url2, "http://host");
  return {
    url: url2,
    path: parsed.pathname,
    query: (0, import_qs2.parse)(parsed.search.replace("?", ""))
  };
}
function setURL(req, url2) {
  Object.assign(req, parseURL(url2));
}
var import_qs2;
var init_url = __esm({
  "src/runtime/url.ts"() {
    "use strict";
    import_qs2 = __toESM(require_lib2());
  }
});

// src/utils/setHeaders.ts
function setHeaders(obj, headers, removeOldHeaders = false) {
  if (removeOldHeaders)
    Object.keys(obj.getHeaders()).forEach((name) => obj.removeHeader(name));
  Object.keys(headers).forEach((name) => obj.setHeader(name, headers[name]));
}
var init_setHeaders = __esm({
  "src/utils/setHeaders.ts"() {
    "use strict";
  }
});

// src/runtime/OriginFetcher.ts
var OriginFetcher;
var init_OriginFetcher = __esm({
  "src/runtime/OriginFetcher.ts"() {
    "use strict";
    init_Origin();
    init_url();
    init_setHeaders();
    init_BackendFetchError();
    init_constants();
    OriginFetcher = class {
      constructor(propertyContext) {
        this.propertyContext = propertyContext;
      }
      async fetch(req, res, options, providedOriginName) {
        var _a2, _b;
        options = {
          followRedirects: false,
          maxRedirects: 21,
          allowRelativeRedirectLocations: false,
          ...options
        };
        const originName = providedOriginName || this.propertyContext.getDefaultOrigin(req);
        const originConfig = this.propertyContext.getOrigin(originName);
        if (!originConfig) {
          throw new Error(`No origin was found with id=${originName}.`);
        }
        const originalHeaders = res.getHeaders();
        try {
          await new Origin(originConfig).fetch(req, res, options);
        } catch (e) {
          if (e instanceof BackendFetchError) {
            res.statusCode = 504;
            res.statusMessage = "Gateway Timeout";
            res.body = "504 - Gateway Timeout";
            return;
          }
          throw e;
        }
        if (res.statusCode === 416 && options.ignoreUnsatisfiableRanges) {
          req.removeHeader(HTTP_HEADERS.range);
          return this.fetch(req, res, options);
        }
        if (!(options == null ? void 0 : options.followRedirects) || !res.getHeaders().location)
          return;
        if ((options == null ? void 0 : options.followRedirects) && ((options == null ? void 0 : options.maxRedirects) ?? 0) <= 0) {
          throw new Error(`The origin fetch request has been redirected too many times.`);
        }
        const redirectLocation = res.getHeaders().location;
        const isAbsoluteUrl = redirectLocation.startsWith("http://") || redirectLocation.startsWith("https://");
        if (!isAbsoluteUrl && !(options == null ? void 0 : options.allowRelativeRedirectLocations))
          return;
        const redirectHostname = isAbsoluteUrl ? new URL(redirectLocation).hostname : (_a2 = req.getHeaders()) == null ? void 0 : _a2.host;
        const redirectUrl = isAbsoluteUrl ? redirectLocation.replace(new RegExp(`(https|http)://${redirectHostname}`), "") : redirectLocation;
        setURL(req, redirectUrl);
        if (isAbsoluteUrl)
          req.setHeader("host", redirectHostname);
        const newOriginName = isAbsoluteUrl ? this.propertyContext.getDefaultOrigin(req) : originName;
        if (redirectHostname !== ((_b = req.getHeaders()) == null ? void 0 : _b.host))
          this.removeSensitiveHeaders(req);
        setHeaders(res, originalHeaders, true);
        return this.fetch(req, res, {
          ...options,
          maxRedirects: ((options == null ? void 0 : options.maxRedirects) ?? 1) - 1
        }, newOriginName);
      }
      removeSensitiveHeaders(req) {
        req.removeHeader("authorization");
        req.removeHeader("cookie");
      }
    };
  }
});

// src/router/ParamsExtractor.ts
var import_path_to_regexp3, ParamsExtractor;
var init_ParamsExtractor = __esm({
  "src/router/ParamsExtractor.ts"() {
    "use strict";
    import_path_to_regexp3 = __toESM(require_dist2());
    init_universalRouteUtils();
    ParamsExtractor = class {
      constructor(routeCriteria) {
        this.routeCriteria = {};
        this.updateRouteCriteria(routeCriteria);
      }
      updateRouteCriteria(routeCriteria) {
        this.routeCriteria = {
          path: routeCriteria == null ? void 0 : routeCriteria.path,
          query: routeCriteria == null ? void 0 : routeCriteria.query
        };
      }
      extract(request) {
        var _a2, _b;
        return {
          ...((_a2 = this.routeCriteria) == null ? void 0 : _a2.path) ? ParamsExtractor.getMatchedPathParams(this.routeCriteria.path, request.path) : {},
          ...((_b = this.routeCriteria) == null ? void 0 : _b.query) ? ParamsExtractor.getMatchedQueryParams(this.routeCriteria.query, request.query) : {}
        };
      }
      static getMatchedPathParams(criteriaPath, requestPath) {
        if (criteriaPath instanceof RegExp)
          return {
            $: criteriaPath.exec(requestPath) || []
          };
        const pathMatcher = (0, import_path_to_regexp3.match)(criteriaPath.toString(), { decode: decodeURIComponent });
        const result = pathMatcher(requestPath);
        return result ? result.params : void 0;
      }
      static getMatchedQueryParams(criteriaQuery, requestQuery) {
        let extractedParams = {};
        if (typeof requestQuery !== "object")
          return extractedParams;
        for (const criteriaQueryKey in criteriaQuery) {
          const criteriaQueryValue = criteriaQuery[criteriaQueryKey];
          if (typeof criteriaQueryValue !== "string" || !isParamMatcher(criteriaQueryValue))
            continue;
          const paramName = paramMatcherToParam(criteriaQueryValue);
          extractedParams = {
            ...extractedParams,
            [paramName]: requestQuery[paramName]
          };
        }
        return extractedParams;
      }
    };
  }
});

// src/utils/cookieUtils.ts
function serializeCookie(name, value, options = {}) {
  return Object.keys(options).reduce((output, key2) => {
    const opt = options[key2];
    if (typeof opt === "boolean" && opt)
      return `${output}; ${key2}`;
    return `${output}; ${key2}=${opt}`;
  }, `${name}=${value}`);
}
var init_cookieUtils = __esm({
  "src/utils/cookieUtils.ts"() {
    "use strict";
  }
});

// src/router/RouteHelper.ts
var import_qs3, RouteHelper;
var init_RouteHelper = __esm({
  "src/router/RouteHelper.ts"() {
    "use strict";
    init_constants();
    init_path();
    init_origins();
    init_constants();
    init_RedirectOptions();
    init_OriginFetcher();
    init_isEmpty();
    init_bindParams();
    init_ParamsExtractor();
    import_qs3 = __toESM(require_lib2());
    init_toEdgeRegex();
    init_cookieUtils();
    init_exact();
    RouteHelper = class {
      constructor(criteria, router) {
        this.features = {};
        this.serviceWorker = (filePath) => {
          this.cache({ edge: { maxAgeSeconds: FAR_FUTURE_TTL }, browser: false });
          if (filePath) {
            this.serveStatic(filePath);
          } else {
            this.setOrigin(STATIC_ORIGIN_NAME);
            this.rewritePath(void 0, `${getPathPrefix(STATIC_ORIGIN_NAME)}/service-worker.js`);
          }
        };
        this.cache = (options) => {
          this.features.caching = this.features.caching || {};
          const { caching } = this.features;
          if (options.edge) {
            if (options.edge.maxAgeSeconds) {
              caching.max_age = `${options.edge.maxAgeSeconds}s`;
            }
            if (options.edge.staleWhileRevalidateSeconds) {
              caching.stale_while_revalidate = `${options.edge.staleWhileRevalidateSeconds}s`;
            }
            if (options.edge.forcePrivateCaching) {
              caching.ignore_origin_no_cache = [200];
            }
          } else if (options.edge === false) {
            caching.bypass_cache = true;
          }
          if (options && options.cacheableStatusCodes) {
            caching.cacheable_status_codes = options.cacheableStatusCodes;
          }
          if (options && options.enableCachingMethods) {
            caching.enable_caching_for_methods = options.enableCachingMethods;
          }
          if (options.browser) {
            if (options.browser.serviceWorkerSeconds == null && options.browser.maxAgeSeconds == null) {
              throw new Error("The browser cache setting should specify serviceWorkerSeconds or maxAgeSeconds.");
            }
            if (options.browser.serviceWorkerSeconds) {
              this.setResponseHeader(HTTP_HEADERS.xSwCacheControl, `max-age=${options.browser.serviceWorkerSeconds}`);
              caching.service_worker_max_age = `${options.browser.serviceWorkerSeconds}s`;
            }
            if (options.browser.maxAgeSeconds === 0) {
              caching.bypass_client_cache = true;
            } else if (options.browser.maxAgeSeconds) {
              caching.client_max_age = `${options.browser.maxAgeSeconds}s`;
            }
          } else if (options.browser === false) {
            caching.bypass_client_cache = true;
          }
        };
        this.serveStatic = (path2, options = {}) => {
          this.cache({ edge: { maxAgeSeconds: FAR_FUTURE_TTL } });
          const origin = options.permanent ? PERMANENT_STATIC_ORIGIN_NAME : STATIC_ORIGIN_NAME;
          this.setOrigin(origin);
          const pathPrefix = getPathPrefix(origin);
          path2 = path2.startsWith("/") ? path2.slice(1) : path2;
          this.rewritePath(this.routeCriteria.path ?? "/:path*", `${pathPrefix}/${path2}`, true);
        };
        this.renderWithApp = () => {
          this.sendToServerless(EDGIO_SERVERLESS_HINTS.app);
        };
        this.compute = (fn, isExclusive) => {
          const index = this.router.addFunction(async (req, res, propertyContext) => {
            req.params = this.paramsExtractor.extract(req);
            await fn(req, res, propertyContext);
          });
          this.sendToServerless(isExclusive ? EDGIO_SERVERLESS_HINTS.computeExclusive : EDGIO_SERVERLESS_HINTS.compute, index);
        };
        this.proxy = (backend, options) => {
          this.setOrigin(backend);
          if ((options == null ? void 0 : options.transformRequest) || (options == null ? void 0 : options.transformResponse)) {
            this.compute(async (req, res, propertyContext) => {
              if (options == null ? void 0 : options.transformRequest) {
                options.transformRequest(req);
              }
              await new OriginFetcher(propertyContext).fetch(req, res, {
                headers: options == null ? void 0 : options.headers,
                removeEmptySearchParamValues: options == null ? void 0 : options.removeEmptySearchParamValues,
                path: options == null ? void 0 : options.path,
                followRedirects: options == null ? void 0 : options.followRedirects,
                allowRelativeRedirectLocations: true
              }, backend);
              if (options == null ? void 0 : options.transformResponse) {
                options.transformResponse(res, req);
              }
            }, true);
          } else if (options) {
            if (options.path) {
              const destination = typeof options.path === "string" ? options.path : options.path();
              if (destination) {
                this.rewritePath(this.routeCriteria.path, destination);
              }
            }
            if (options == null ? void 0 : options.headers) {
              for (const [key2, value] of Object.entries(options.headers)) {
                this.setRequestHeader(key2, value);
              }
            }
            if ((options == null ? void 0 : options.followRedirects) != null) {
              if (!this.features.url)
                this.features.url = {};
              this.features.url.follow_redirects = options == null ? void 0 : options.followRedirects;
            }
          }
        };
        this.setResponseHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.set_response_headers) {
            this.features.headers.set_response_headers = {};
          }
          const headers = this.features.headers.set_response_headers;
          headers[name] = value;
        };
        this.addResponseHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.add_response_headers) {
            this.features.headers.add_response_headers = {};
          }
          const headers = this.features.headers.add_response_headers;
          headers[name] = value;
        };
        this.updateResponseHeader = (name, match2, replace) => {
          this.setResponseHeader(name, `%{resp_${name}/${match2.global ? "/" : ""}${toEdgeRegex(match2)}/${replace}}`);
        };
        this.removeResponseHeader = (name) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.remove_response_headers) {
            this.features.headers.remove_response_headers = [];
          }
          this.features.headers.remove_response_headers.push(name);
        };
        this.removeUpstreamResponseHeader = (name) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.remove_origin_response_headers) {
            this.features.headers.remove_origin_response_headers = [];
          }
          this.features.headers.remove_origin_response_headers.push(name);
        };
        this.setRequestHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.set_request_headers) {
            this.features.headers.set_request_headers = {};
          }
          const headers = this.features.headers.set_request_headers;
          headers[name] = value;
        };
        this.updateRequestHeader = (name, match2, replace) => {
          this.setRequestHeader(name, `%{http_${name}/${match2.global ? "/" : ""}${toEdgeRegex(match2)}/${replace}}`);
        };
        this.setResponseBody = (body, code, done) => {
          if (!this.features.response) {
            this.features.response = {};
          }
          this.features.response.set_done = !!done;
          this.features.response.set_response_body = body;
          if (code)
            this.features.response.set_status_code = code;
        };
        this.setResponseCode = (code) => {
          if (!this.features.response) {
            this.features.response = {};
          }
          this.features.response.set_status_code = code;
        };
        this.allowCors = (config2 = {}) => {
          this.setResponseHeader("Access-Control-Allow-Origin", config2.origin || "*");
          if (config2.methods) {
            this.setResponseHeader("Access-Control-Allow-Methods", config2.methods.join(", "));
          }
          if (config2.headers) {
            this.setResponseHeader("Access-Control-Allow-Headers", config2.headers.join(", "));
          }
          if (config2.maxAge) {
            this.setResponseHeader("Access-Control-Max-Age", config2.maxAge.toString());
          }
          if (config2.credentials != null) {
            this.setResponseHeader("Access-Control-Allow-Credentials", config2.credentials.toString());
          }
        };
        this.rewritePath = (source, destination, skipOptionalQuery) => {
          if (!this.features.url) {
            this.features.url = {};
          }
          if (!this.features.url.url_rewrite) {
            this.features.url.url_rewrite = [];
          }
          if (source instanceof ExactPath) {
            source = source.toString();
          }
          if (typeof source === "string") {
            this.features.url.url_rewrite.push(rewritePath(source, destination, skipOptionalQuery));
          } else {
            this.features.url.url_rewrite.push({
              syntax: "regexp",
              source: source ? toEdgeRegex(source) : void 0,
              destination
            });
          }
        };
        this.updatePath = (destination) => {
          this.paramsExtractor.updateRouteCriteria({
            path: destination
          });
          this.rewritePath(this.routeCriteria.path ?? "/:path*", destination);
        };
        this.send = (content, statusCode) => {
          if (typeof content === "function") {
            this.compute(async (req, res) => {
              res.body = content();
              res.statusCode = statusCode;
            }, true);
            return;
          }
          this.setResponseBody(content, statusCode, true);
        };
        this.removeRequestHeader = (name) => {
          this.features.headers = !this.features.headers ? {} : this.features.headers;
          this.features.headers.set_request_headers = !this.features.headers.set_request_headers ? {} : this.features.headers.set_request_headers;
          const headers = this.features.headers.set_request_headers;
          headers[name] = "";
        };
        this.appShell = (indexHtmlPath) => {
          this.setResponseHeader(HTTP_HEADERS.contentType, "text/html");
          this.serveStatic(indexHtmlPath);
        };
        this.redirect = (to, options = {}) => {
          var _a2, _b, _c, _d;
          const { to: toPath, statusCode, query } = normalizeRedirectOptions(to, options);
          const isMatchOnlyQuery = () => !Object.values(this.routeCriteria.query ?? {}).find((value) => typeof value === "string" && value.startsWith(":"));
          if (isEmpty(query) && isMatchOnlyQuery()) {
            this.features.url = this.features.url ?? {};
            this.features.url.url_redirect = this.features.url.url_redirect ?? {};
            this.features.url.url_redirect.code = statusCode;
            if (((_a2 = this.routeCriteria) == null ? void 0 : _a2.path) instanceof RegExp) {
              this.features.url.url_redirect.source = toEdgeRegex((_b = this.routeCriteria) == null ? void 0 : _b.path);
              this.features.url.url_redirect.destination = toPath;
              this.features.url.url_redirect.syntax = "regexp";
              return;
            }
            this.features.url.url_redirect = {
              ...this.features.url.url_redirect,
              ...rewritePath((_d = (_c = this.routeCriteria) == null ? void 0 : _c.path) == null ? void 0 : _d.toString(), toPath, true)
            };
            return;
          }
          this.compute(async (req, res, ...others) => {
            let queryWithReplacedParams = {};
            for (const queryKey in query) {
              queryWithReplacedParams = {
                ...queryWithReplacedParams,
                [bindParams_default(queryKey, req.params)]: bindParams_default(query[queryKey], req.params)
              };
            }
            res.setHeader(HTTP_HEADERS.location, `${bindParams_default(toPath, req.params)}${Object.keys(queryWithReplacedParams).length > 0 ? "?" + import_qs3.default.stringify(queryWithReplacedParams) : ""}`);
            res.statusCode = statusCode;
            res.body = "";
          });
          this.cache({
            cacheableStatusCodes: [301, 302, 303, 304, 305, 306, 307, 308],
            edge: {
              maxAgeSeconds: FAR_FUTURE_TTL
            }
          });
        };
        this.addResponseCookie = (name, value, options) => {
          this.addResponseHeader(HTTP_HEADERS.setCookie, serializeCookie(name, value, options));
        };
        this.setOrigin = (name) => {
          if (!this.features.origin)
            this.features.origin = {};
          this.features.origin.set_origin = name;
        };
        this.setComment = (message, append = false) => {
          if (!append)
            this.features.comment = "";
          this.features.comment += message;
        };
        this.routeCriteria = criteria;
        this.paramsExtractor = new ParamsExtractor(criteria);
        this.router = router;
      }
      evaluate(creator) {
        creator(this);
        return this.features;
      }
      sendToServerless(hint, value) {
        this.setRequestHeader(`+${EDGIO_SERVERLESS_HINT_HEADER}`, value !== void 0 ? `${hint}:${value}` : hint);
        this.setOrigin(SERVERLESS_ORIGIN_NAME);
      }
    };
  }
});

// src/router/converters/toFeature.ts
var toFeature;
var init_toFeature = __esm({
  "src/router/converters/toFeature.ts"() {
    "use strict";
    init_RouteHelper();
    toFeature = (criteria, features, router) => {
      if (typeof features === "function") {
        return new RouteHelper(criteria, router).evaluate(features);
      } else {
        return features;
      }
    };
  }
});

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module2) {
    (function() {
      var undefined2;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key2, collection2) {
          if (predicate(value, key2, collection2)) {
            result = key2;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key2) {
        return function(object) {
          return object == null ? undefined2 : object[key2];
        };
      }
      function basePropertyOf(object) {
        return function(key2) {
          return object == null ? undefined2 : object[key2];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key2) {
          return [key2, object[key2]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key2) {
          return object[key2];
        });
      }
      function cacheHas(cache, key2) {
        return cache.has(key2);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key2) {
        return object == null ? undefined2 : object[key2];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key2) {
          result[++index] = [key2, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView2 = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          "escape": reEscape,
          "evaluate": reEvaluate,
          "interpolate": reInterpolate,
          "variable": "",
          "imports": {
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key2) {
          var result2 = this.has(key2) && delete this.__data__[key2];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key2) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key2];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key2) ? data[key2] : undefined2;
        }
        function hashHas(key2) {
          var data = this.__data__;
          return nativeCreate ? data[key2] !== undefined2 : hasOwnProperty.call(data, key2);
        }
        function hashSet(key2, value) {
          var data = this.__data__;
          this.size += this.has(key2) ? 0 : 1;
          data[key2] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key2) {
          var data = this.__data__, index = assocIndexOf(data, key2);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key2) {
          var data = this.__data__, index = assocIndexOf(data, key2);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key2) {
          return assocIndexOf(this.__data__, key2) > -1;
        }
        function listCacheSet(key2, value) {
          var data = this.__data__, index = assocIndexOf(data, key2);
          if (index < 0) {
            ++this.size;
            data.push([key2, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key2) {
          var result2 = getMapData(this, key2)["delete"](key2);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key2) {
          return getMapData(this, key2).get(key2);
        }
        function mapCacheHas(key2) {
          return getMapData(this, key2).has(key2);
        }
        function mapCacheSet(key2, value) {
          var data = getMapData(this, key2), size2 = data.size;
          data.set(key2, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key2) {
          var data = this.__data__, result2 = data["delete"](key2);
          this.size = data.size;
          return result2;
        }
        function stackGet(key2) {
          return this.__data__.get(key2);
        }
        function stackHas(key2) {
          return this.__data__.has(key2);
        }
        function stackSet(key2, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key2, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key2, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key2 in value) {
            if ((inherited || hasOwnProperty.call(value, key2)) && !(skipIndexes && (key2 == "length" || isBuff && (key2 == "offset" || key2 == "parent") || isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || isIndex(key2, length)))) {
              result2.push(key2);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key2, value) {
          if (value !== undefined2 && !eq(object[key2], value) || value === undefined2 && !(key2 in object)) {
            baseAssignValue(object, key2, value);
          }
        }
        function assignValue(object, key2, value) {
          var objValue = object[key2];
          if (!(hasOwnProperty.call(object, key2) && eq(objValue, value)) || value === undefined2 && !(key2 in object)) {
            baseAssignValue(object, key2, value);
          }
        }
        function assocIndexOf(array, key2) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key2)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key2, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key2, value) {
          if (key2 == "__proto__" && defineProperty) {
            defineProperty(object, key2, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key2] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get2(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key2, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key2, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key3) {
              result2.set(key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key3) {
            if (props) {
              key3 = subValue;
              subValue = value[key3];
            }
            assignValue(result2, key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key2 = props[length], predicate = source[key2], value = object[key2];
            if (value === undefined2 && !(key2 in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key2) {
            return isFunction(object[key2]);
          });
        }
        function baseGet(object, path2) {
          path2 = castPath(path2, object);
          var index = 0, length = path2.length;
          while (object != null && index < length) {
            object = object[toKey(path2[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key2) {
          return object != null && hasOwnProperty.call(object, key2);
        }
        function baseHasIn(object, key2) {
          return object != null && key2 in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key2, object2) {
            setter(accumulator, iteratee2(value), key2, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path2, args) {
          path2 = castPath(path2, object);
          object = parent(object, path2);
          var func = object == null ? object : object[toKey(last(path2))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key2 = data[0], objValue = object[key2], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key2 in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key2, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity2;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key2 in Object2(object)) {
            if (hasOwnProperty.call(object, key2) && key2 != "constructor") {
              result2.push(key2);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key2 in object) {
            if (!(key2 == "constructor" && (isProto || !hasOwnProperty.call(object, key2)))) {
              result2.push(key2);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key2, collection2) {
            result2[++index] = iteratee2(value, key2, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path2, srcValue) {
          if (isKey(path2) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path2), srcValue);
          }
          return function(object) {
            var objValue = get2(object, path2);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key2) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key2, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key2), srcValue, key2 + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key2, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key2, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key2), srcValue = safeGet(source, key2), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key2, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key2 + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key2, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity2];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key2, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path2) {
            return hasIn(object, path2);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path2 = paths[index], value = baseGet(object, path2);
            if (predicate(value, path2)) {
              baseSet(result2, castPath(path2, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path2) {
          return function(object) {
            return baseGet(object, path2);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity2), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path2, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path2 = castPath(path2, object);
          var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key2 = toKey(path2[index]), newValue = value;
            if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key2];
              newValue = customizer ? customizer(objValue, key2, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path2[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key2, newValue);
            nested = nested[key2];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity2 : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity2 : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity2, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path2) {
          path2 = castPath(path2, object);
          object = parent(object, path2);
          return object == null || delete object[toKey(last(path2))];
        }
        function baseUpdate(object, path2, updater, customizer) {
          return baseSet(object, path2, updater(baseGet(object, path2)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity2;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key2 = props[index];
            var newValue = customizer ? customizer(object[key2], source[key2], key2, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key2];
            }
            if (isNew) {
              baseAssignValue(object, key2, newValue);
            } else {
              assignValue(object, key2, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key2 = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key2], key2, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key2) {
                return iteratee2(iterable[key2], key2, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key2, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key2]) && !hasOwnProperty.call(object, key2)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key2, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key2 = objProps[index];
            if (!(isPartial ? key2 in other : hasOwnProperty.call(other, key2))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key2 = objProps[index];
            var objValue = object[key2], othValue = other[key2];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key2, other, object, stack) : customizer(objValue, othValue, key2, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key2 == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key2) {
          var data = map2.__data__;
          return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key2 = result2[length], value = object[key2];
            result2[length] = [key2, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key2) {
          var value = getValue(object, key2);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match2 = source.match(reWrapDetails);
          return match2 ? match2[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path2, hasFunc) {
          path2 = castPath(path2, object);
          var index = -1, length = path2.length, result2 = false;
          while (++index < length) {
            var key2 = toKey(path2[index]);
            if (!(result2 = object != null && hasFunc(object, key2))) {
              break;
            }
            object = object[key2];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key2, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key2, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key2] === srcValue && (srcValue !== undefined2 || key2 in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key2) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key2;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key2 in Object2(object)) {
              result2.push(key2);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path2) {
          return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key2) {
          if (key2 === "constructor" && typeof object[key2] === "function") {
            return;
          }
          if (key2 == "__proto__") {
            return;
          }
          return object[key2];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match2, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join5(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key2) {
          if (hasOwnProperty.call(result2, key2)) {
            ++result2[key2];
          } else {
            baseAssignValue(result2, key2, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key2) {
          if (hasOwnProperty.call(result2, key2)) {
            result2[key2].push(value);
          } else {
            baseAssignValue(result2, key2, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path2, args) {
          var index = -1, isFunc = typeof path2 == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path2, value, args) : baseInvoke(value, path2, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key2) {
          baseAssignValue(result2, key2, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key2) {
          result2[key2 ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key2, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key2, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key2 = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key2)) {
              return cache.get(key2);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key2, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep2(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty2(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key2 in value) {
            if (hasOwnProperty.call(value, key2)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key2 in source) {
            if (hasOwnProperty.call(source, key2)) {
              assignValue(object, key2, source[key2]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key2 = props[propsIndex];
              var value = object[key2];
              if (value === undefined2 || eq(value, objectProto[key2]) && !hasOwnProperty.call(object, key2)) {
                object[key2] = source[key2];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get2(object, path2, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path2);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path2) {
          return object != null && hasPath(object, path2, baseHas);
        }
        function hasIn(object, path2) {
          return object != null && hasPath(object, path2, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key2) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key2;
        }, constant(identity2));
        var invertBy = createInverter(function(result2, value, key2) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key2);
          } else {
            result2[value] = [key2];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key2, object2) {
            baseAssignValue(result2, iteratee2(value, key2, object2), value);
          });
          return result2;
        }
        function mapValues3(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key2, object2) {
            baseAssignValue(result2, key2, iteratee2(value, key2, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path2) {
            path2 = castPath(path2, object);
            isDeep || (isDeep = path2.length > 1);
            return path2;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path2) {
            return predicate(value, path2[0]);
          });
        }
        function result(object, path2, defaultValue) {
          path2 = castPath(path2, object);
          var index = -1, length = path2.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path2[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path2, value) {
          return object == null ? object : baseSet(object, path2, value);
        }
        function setWith(object, path2, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path2, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path2) {
          return object == null ? true : baseUnset(object, path2);
        }
        function update(object, path2, updater) {
          return object == null ? object : baseUpdate(object, path2, castFunction(updater));
        }
        function updateWith(object, path2, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path2, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape2(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate2 = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate2.source + "|" + (interpolate2 === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match2.length;
            return match2;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match2, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match2 = separator.exec(substring)) {
                var newEnd = match2.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape2(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key2) {
            key2 = toKey(key2);
            baseAssignValue(object, key2, bind(object[key2], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity2(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path2, srcValue) {
          return baseMatchesProperty(path2, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path2, args) {
          return function(object) {
            return baseInvoke(object, path2, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path2) {
            return baseInvoke(object, path2, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path2) {
          return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
        }
        function propertyOf(object) {
          return function(path2) {
            return object == null ? undefined2 : baseGet(object, path2);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity2, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity2);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity2, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity2) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues3;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep2;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape2;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get2;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity2;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty2;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite2;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString2;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join5;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape2;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity2);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path2, args) {
          if (typeof path2 == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path2, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key2 = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key2)) {
              realNames[key2] = [];
            }
            realNames[key2].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _ = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(exports);
  }
});

// src/router/converters/toSeconds.ts
var convertSailfishTimeIntervalToSeconds, toSeconds;
var init_toSeconds = __esm({
  "src/router/converters/toSeconds.ts"() {
    "use strict";
    convertSailfishTimeIntervalToSeconds = (timeInterval) => {
      const regex = /^([0-9]+)(s|m|h|d|w|y)$/g;
      const res = regex.exec(timeInterval);
      if (res == null)
        throw new Error(`Unsupported time interval "${timeInterval}".`);
      const value = parseInt(res[1]);
      const timeUnit = res[2];
      switch (timeUnit) {
        case "s":
          return value;
        case "m":
          return value * 60;
        case "h":
          return value * 60 * 60;
        case "d":
          return value * 60 * 60 * 24;
        case "w":
          return value * 60 * 60 * 24 * 7;
        case "y":
          return value * 60 * 60 * 24 * 365;
        default:
          throw new Error(`Unsupported time unit "${timeUnit}".`);
      }
    };
    toSeconds = (maxAge, code) => {
      if (typeof maxAge === "string") {
        return convertSailfishTimeIntervalToSeconds(maxAge);
      } else {
        return convertSailfishTimeIntervalToSeconds(maxAge[code]);
      }
    };
  }
});

// src/router/converters/toCacheOptions.ts
var toCacheOptions;
var init_toCacheOptions = __esm({
  "src/router/converters/toCacheOptions.ts"() {
    "use strict";
    init_toSeconds();
    toCacheOptions = (features) => {
      var _a2, _b, _c, _d, _e, _f;
      let cacheOptions = {};
      if ((_a2 = features.caching) == null ? void 0 : _a2.client_max_age) {
        cacheOptions = {
          browser: {
            maxAgeSeconds: toSeconds((_b = features.caching) == null ? void 0 : _b.client_max_age)
          }
        };
      }
      if (((_c = features == null ? void 0 : features.caching) == null ? void 0 : _c.service_worker_max_age) !== void 0) {
        cacheOptions = {
          browser: {
            ...cacheOptions.browser,
            serviceWorkerSeconds: toSeconds((_d = features == null ? void 0 : features.caching) == null ? void 0 : _d.service_worker_max_age)
          }
        };
      }
      if ((_e = features.caching) == null ? void 0 : _e.max_age) {
        const max_age = (_f = features.caching) == null ? void 0 : _f.max_age;
        if (typeof max_age === "string" || typeof max_age === "object" && "200" in max_age) {
          cacheOptions = {
            ...cacheOptions,
            edge: {
              maxAgeSeconds: toSeconds(max_age, 200)
            }
          };
        }
      }
      return cacheOptions;
    };
  }
});

// src/router/converters/toCacheManifestEntry.ts
var import_lodash, import_path_to_regexp4, serializeCriteriaValue, toCacheManifestEntry, toCacheManifestEntryFromPath;
var init_toCacheManifestEntry = __esm({
  "src/router/converters/toCacheManifestEntry.ts"() {
    "use strict";
    import_lodash = __toESM(require_lodash());
    import_path_to_regexp4 = __toESM(require_dist2());
    init_toCacheOptions();
    serializeCriteriaValue = (criteria) => {
      var _a2;
      if (criteria === void 0 || criteria === null) {
        return void 0;
      } else if (criteria instanceof RegExp) {
        return { value: criteria.source };
      } else if (criteria.not) {
        return {
          value: (_a2 = serializeCriteriaValue(criteria.not)) == null ? void 0 : _a2.value,
          isNot: true
        };
      } else {
        return { value: criteria };
      }
    };
    toCacheManifestEntry = (criteria, features) => {
      var _a2;
      const entry = {
        criteriaPath: criteria.path instanceof RegExp ? criteria.path.source : (_a2 = criteria.path) == null ? void 0 : _a2.toString(),
        route: (0, import_path_to_regexp4.pathToRegexp)(criteria.path instanceof RegExp ? criteria.path : criteria.path.toString()).source,
        method: serializeCriteriaValue(criteria.method),
        protocol: serializeCriteriaValue(criteria.protocol),
        cacheOptions: toCacheOptions(features),
        query: criteria.query ? (0, import_lodash.mapValues)(criteria.query, (v) => serializeCriteriaValue(v)) : void 0
      };
      return entry;
    };
    toCacheManifestEntryFromPath = (path2, features) => {
      const entry = {
        criteriaPath: path2,
        route: (0, import_path_to_regexp4.pathToRegexp)(path2).source,
        cacheOptions: toCacheOptions(features)
      };
      return entry;
    };
  }
});

// src/router/Router.ts
var import_path3, import_slash2, STATIC_ASSET_MANIFEST_FILE, Router;
var init_Router = __esm({
  "src/router/Router.ts"() {
    "use strict";
    import_path3 = require("path");
    import_slash2 = __toESM(require_slash());
    init_constants();
    init_environment();
    init_CacheManifest();
    init_source();
    init_utils();
    init_requireInternal();
    init_addBuildInRoutes();
    init_toRule();
    init_toFeature();
    init_toCacheManifestEntry();
    init_regexUtils();
    init_exact();
    STATIC_ASSET_MANIFEST_FILE = "static-asset-manifest.json";
    Router = class {
      constructor() {
        this.cacheManifest = new CacheManifest();
        this.rules = [];
        this.rulesCriteraMap = /* @__PURE__ */ new Map();
        this.functions = [];
        this.staticAssetManifest = {};
      }
      static load(routerPath) {
        const routerModule = nonWebpackRequire(routerPath);
        return routerModule.default || routerModule;
      }
      get(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.get, criteria, features, options);
      }
      put(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.put, criteria, features, options);
      }
      patch(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.patch, criteria, features, options);
      }
      post(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.post, criteria, features, options);
      }
      head(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.head, criteria, features, options);
      }
      delete(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.delete, criteria, features, options);
      }
      options(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.options, criteria, features, options);
      }
      match(criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof ExactPath) {
          return this.matchInternal({ path: criteria }, features, options);
        } else if (criteria instanceof Array) {
          return this.matchArrayInternal(criteria, features, options);
        } else {
          return this.matchInternal(criteria, features, options);
        }
      }
      conditional(criteria) {
        this.rules.push(criteria);
        return this;
      }
      use(plugin) {
        plugin.onRegister(this);
        return this;
      }
      matchInternal(criteria, featuresParam, options) {
        if (criteria.path instanceof RegExp) {
          criteria.path = toExactRegex(criteria.path);
        }
        const features = toFeature(criteria, featuresParam, this);
        const rule = toRule(criteria, features);
        this.rules.push(rule);
        this.rulesCriteraMap.set(rule, criteria);
        if (features.caching && criteria.path && criteria.path.toString() !== CACHE_MANIFEST_PATH) {
          const entry = toCacheManifestEntry(criteria, features);
          this.cacheManifest.entries.push(entry);
        }
        return this;
      }
      matchArrayInternal(paths, featuresParam, options) {
        const criteria = { path: "/:path*" };
        const features = toFeature(criteria, featuresParam, this);
        const rule = toInRule(paths, features);
        this.rules.push(rule);
        this.rulesCriteraMap.set(rule, criteria);
        if (features.caching) {
          paths.forEach((path2) => {
            const entry = toCacheManifestEntryFromPath(path2, features);
            this.cacheManifest.entries.push(entry);
          });
        }
        return this;
      }
      matchMethod(method, criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof ExactPath) {
          return this.match({
            method,
            path: criteria
          }, features);
        }
        if (criteria == null ? void 0 : criteria.method) {
          throw new Error(`Invalid criteria property method passed to call to Router#${method}. Specifying a method in the criteria is redundant.`);
        }
        return this.match({ ...criteria, method }, features, options);
      }
      dir(sourcePath, fileHandler, options) {
        const directory = (0, import_path3.join)(getSourceDir(), sourcePath);
        const manifest = this.staticAssetManifest[(0, import_slash2.default)(sourcePath)] = [];
        let { ignore, label } = options;
        if (typeof ignore === "string") {
          ignore = [ignore];
        }
        let files = isCloud() ? this.staticAssetsForPath(sourcePath) : requireInternal("globby").sync(options.glob || "**/*", {
          cwd: directory,
          onlyFiles: true,
          ignore: ignore || []
        });
        if (options.sort) {
          files = options.sort(files);
        }
        for (const file of files) {
          const paths = options.paths && options.paths(file) || [`/${file}`];
          if (!isCloud()) {
            manifest.push((0, import_slash2.default)(file));
          }
          for (const path2 of paths) {
            if (path2 instanceof RegExp) {
              this.match(path2, fileHandler(file), { label });
              continue;
            }
            let route = path2.toString().replace(/\/index.html$/, "");
            if (route.length === 0)
              route = "/";
            this.match(path2 instanceof ExactPath ? exact(route) : route, fileHandler(file), { label });
          }
        }
        return this;
      }
      static(sourcePath, options) {
        const fileHandler = (file) => (helper) => {
          helper.serveStatic(`${sourcePath}/${file}`);
          if (!(options == null ? void 0 : options.handler))
            return;
          options == null ? void 0 : options.handler(file)(helper);
        };
        return this.dir(sourcePath, fileHandler, {
          ...options,
          label: `static('${sourcePath}')`
        });
      }
      staticAssetsForPath(path2) {
        return nonWebpackRequire((0, import_path3.join)(process.cwd(), STATIC_ASSET_MANIFEST_FILE))[path2];
      }
      addFunction(fn) {
        this.functions.push(fn);
        return this.functions.length - 1;
      }
    };
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports, module2) {
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var hasAbortController = typeof AbortController === "function";
    var AC = hasAbortController ? AbortController : class AbortController {
      constructor() {
        this.signal = new AS();
      }
      abort() {
        this.signal.dispatchEvent("abort");
      }
    };
    var hasAbortSignal = typeof AbortSignal === "function";
    var hasACAbortSignal = typeof AC.AbortSignal === "function";
    var AS = hasAbortSignal ? AbortSignal : hasACAbortSignal ? AC.AbortController : class AbortSignal {
      constructor() {
        this.aborted = false;
        this._listeners = [];
      }
      dispatchEvent(type) {
        if (type === "abort") {
          this.aborted = true;
          const e = { type, target: this };
          this.onabort(e);
          this._listeners.forEach((f) => f(e), this);
        }
      }
      onabort() {
      }
      addEventListener(ev, fn) {
        if (ev === "abort") {
          this._listeners.push(fn);
        }
      }
      removeEventListener(ev, fn) {
        if (ev === "abort") {
          this._listeners = this._listeners.filter((f) => f !== fn);
        }
      }
    };
    var warned = /* @__PURE__ */ new Set();
    var deprecatedOption = (opt, instead) => {
      const code = `LRU_CACHE_OPTION_${opt}`;
      if (shouldWarn(code)) {
        warn(code, `${opt} option`, `options.${instead}`, LRUCache);
      }
    };
    var deprecatedMethod = (method, instead) => {
      const code = `LRU_CACHE_METHOD_${method}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, method);
        warn(code, `${method} method`, `cache.${instead}()`, get2);
      }
    };
    var deprecatedProperty = (field, instead) => {
      const code = `LRU_CACHE_PROPERTY_${field}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, field);
        warn(code, `${field} property`, `cache.${instead}`, get2);
      }
    };
    var emitWarning = (...a) => {
      typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(...a) : console.error(...a);
    };
    var shouldWarn = (code) => !warned.has(code);
    var warn = (code, what, instead, fn) => {
      warned.add(code);
      const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
      emitWarning(msg, "DeprecationWarning", code, fn);
    };
    var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    var Stack = class {
      constructor(max) {
        if (max === 0) {
          return [];
        }
        const UintArray = getUintArray(max);
        this.heap = new UintArray(max);
        this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    var LRUCache = class {
      constructor(options = {}) {
        const {
          max = 0,
          ttl,
          ttlResolution = 1,
          ttlAutopurge,
          updateAgeOnGet,
          updateAgeOnHas,
          allowStale,
          dispose,
          disposeAfter,
          noDisposeOnSet,
          noUpdateTTL,
          maxSize = 0,
          maxEntrySize = 0,
          sizeCalculation,
          fetchMethod,
          fetchContext,
          noDeleteOnFetchRejection,
          noDeleteOnStaleGet
        } = options;
        const { length, maxAge, stale } = options instanceof LRUCache ? {} : options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.max = max;
        this.maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.maxSize;
        this.sizeCalculation = sizeCalculation || length;
        if (this.sizeCalculation) {
          if (!this.maxSize && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        this.fetchMethod = fetchMethod || null;
        if (this.fetchMethod && typeof this.fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.fetchContext = fetchContext;
        if (!this.fetchMethod && fetchContext !== void 0) {
          throw new TypeError("cannot set fetchContext without fetchMethod");
        }
        this.keyMap = /* @__PURE__ */ new Map();
        this.keyList = new Array(max).fill(null);
        this.valList = new Array(max).fill(null);
        this.next = new UintArray(max);
        this.prev = new UintArray(max);
        this.head = 0;
        this.tail = 0;
        this.free = new Stack(max);
        this.initialFill = 1;
        this.size = 0;
        if (typeof dispose === "function") {
          this.dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.disposeAfter = disposeAfter;
          this.disposed = [];
        } else {
          this.disposeAfter = null;
          this.disposed = null;
        }
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        if (this.maxEntrySize !== 0) {
          if (this.maxSize !== 0) {
            if (!isPosInt(this.maxSize)) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          this.initializeSizeTracking();
        }
        this.allowStale = !!allowStale || !!stale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || maxAge || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.initializeTTLTracking();
        }
        if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.max && !this.maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, LRUCache);
          }
        }
        if (stale) {
          deprecatedOption("stale", "allowStale");
        }
        if (maxAge) {
          deprecatedOption("maxAge", "ttl");
        }
        if (length) {
          deprecatedOption("length", "sizeCalculation");
        }
      }
      getRemainingTTL(key2) {
        return this.has(key2, { updateAgeOnHas: false }) ? Infinity : 0;
      }
      initializeTTLTracking() {
        this.ttls = new ZeroArray(this.max);
        this.starts = new ZeroArray(this.max);
        this.setItemTTL = (index, ttl, start = perf.now()) => {
          this.starts[index] = ttl !== 0 ? start : 0;
          this.ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t = setTimeout(() => {
              if (this.isStale(index)) {
                this.delete(this.keyList[index]);
              }
            }, ttl + 1);
            if (t.unref) {
              t.unref();
            }
          }
        };
        this.updateItemAge = (index) => {
          this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
        };
        let cachedNow = 0;
        const getNow = () => {
          const n = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n;
            const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t.unref) {
              t.unref();
            }
          }
          return n;
        };
        this.getRemainingTTL = (key2) => {
          const index = this.keyMap.get(key2);
          if (index === void 0) {
            return 0;
          }
          return this.ttls[index] === 0 || this.starts[index] === 0 ? Infinity : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
        };
        this.isStale = (index) => {
          return this.ttls[index] !== 0 && this.starts[index] !== 0 && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
        };
      }
      updateItemAge(index) {
      }
      setItemTTL(index, ttl, start) {
      }
      isStale(index) {
        return false;
      }
      initializeSizeTracking() {
        this.calculatedSize = 0;
        this.sizes = new ZeroArray(this.max);
        this.removeItemSize = (index) => {
          this.calculatedSize -= this.sizes[index];
          this.sizes[index] = 0;
        };
        this.requireSize = (k, v, size, sizeCalculation) => {
          if (!isPosInt(size)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size = sizeCalculation(v, k);
              if (!isPosInt(size)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer)");
            }
          }
          return size;
        };
        this.addItemSize = (index, size) => {
          this.sizes[index] = size;
          const maxSize = this.maxSize - this.sizes[index];
          while (this.calculatedSize > maxSize) {
            this.evict(true);
          }
          this.calculatedSize += this.sizes[index];
        };
      }
      removeItemSize(index) {
      }
      addItemSize(index, size) {
      }
      requireSize(k, v, size, sizeCalculation) {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
      }
      *indexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.tail; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.head) {
              break;
            } else {
              i = this.prev[i];
            }
          }
        }
      }
      *rindexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.head; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.tail) {
              break;
            } else {
              i = this.next[i];
            }
          }
        }
      }
      isValidIndex(index) {
        return this.keyMap.get(this.keyList[index]) === index;
      }
      *entries() {
        for (const i of this.indexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *rentries() {
        for (const i of this.rindexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *keys() {
        for (const i of this.indexes()) {
          yield this.keyList[i];
        }
      }
      *rkeys() {
        for (const i of this.rindexes()) {
          yield this.keyList[i];
        }
      }
      *values() {
        for (const i of this.indexes()) {
          yield this.valList[i];
        }
      }
      *rvalues() {
        for (const i of this.rindexes()) {
          yield this.valList[i];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      find(fn, getOptions = {}) {
        for (const i of this.indexes()) {
          if (fn(this.valList[i], this.keyList[i], this)) {
            return this.get(this.keyList[i], getOptions);
          }
        }
      }
      forEach(fn, thisp = this) {
        for (const i of this.indexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      rforEach(fn, thisp = this) {
        for (const i of this.rindexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      get prune() {
        deprecatedMethod("prune", "purgeStale");
        return this.purgeStale;
      }
      purgeStale() {
        let deleted = false;
        for (const i of this.rindexes({ allowStale: true })) {
          if (this.isStale(i)) {
            this.delete(this.keyList[i]);
            deleted = true;
          }
        }
        return deleted;
      }
      dump() {
        const arr = [];
        for (const i of this.indexes({ allowStale: true })) {
          const key2 = this.keyList[i];
          const v = this.valList[i];
          const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          const entry = { value };
          if (this.ttls) {
            entry.ttl = this.ttls[i];
            const age = perf.now() - this.starts[i];
            entry.start = Math.floor(Date.now() - age);
          }
          if (this.sizes) {
            entry.size = this.sizes[i];
          }
          arr.unshift([key2, entry]);
        }
        return arr;
      }
      load(arr) {
        this.clear();
        for (const [key2, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key2, entry.value, entry);
        }
      }
      dispose(v, k, reason) {
      }
      set(k, v, {
        ttl = this.ttl,
        start,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL
      } = {}) {
        size = this.requireSize(k, v, size, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize) {
          return this;
        }
        let index = this.size === 0 ? void 0 : this.keyMap.get(k);
        if (index === void 0) {
          index = this.newIndex();
          this.keyList[index] = k;
          this.valList[index] = v;
          this.keyMap.set(k, index);
          this.next[this.tail] = index;
          this.prev[index] = this.tail;
          this.tail = index;
          this.size++;
          this.addItemSize(index, size);
          noUpdateTTL = false;
        } else {
          const oldVal = this.valList[index];
          if (v !== oldVal) {
            if (this.isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort();
            } else {
              if (!noDisposeOnSet) {
                this.dispose(oldVal, k, "set");
                if (this.disposeAfter) {
                  this.disposed.push([oldVal, k, "set"]);
                }
              }
            }
            this.removeItemSize(index);
            this.valList[index] = v;
            this.addItemSize(index, size);
          }
          this.moveToTail(index);
        }
        if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
          this.initializeTTLTracking();
        }
        if (!noUpdateTTL) {
          this.setItemTTL(index, ttl, start);
        }
        if (this.disposeAfter) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return this;
      }
      newIndex() {
        if (this.size === 0) {
          return this.tail;
        }
        if (this.size === this.max && this.max !== 0) {
          return this.evict(false);
        }
        if (this.free.length !== 0) {
          return this.free.pop();
        }
        return this.initialFill++;
      }
      pop() {
        if (this.size) {
          const val = this.valList[this.head];
          this.evict(true);
          return val;
        }
      }
      evict(free) {
        const head = this.head;
        const k = this.keyList[head];
        const v = this.valList[head];
        if (this.isBackgroundFetch(v)) {
          v.__abortController.abort();
        } else {
          this.dispose(v, k, "evict");
          if (this.disposeAfter) {
            this.disposed.push([v, k, "evict"]);
          }
        }
        this.removeItemSize(head);
        if (free) {
          this.keyList[head] = null;
          this.valList[head] = null;
          this.free.push(head);
        }
        this.head = this.next[head];
        this.keyMap.delete(k);
        this.size--;
        return head;
      }
      has(k, { updateAgeOnHas = this.updateAgeOnHas } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          if (!this.isStale(index)) {
            if (updateAgeOnHas) {
              this.updateItemAge(index);
            }
            return true;
          }
        }
        return false;
      }
      peek(k, { allowStale = this.allowStale } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0 && (allowStale || !this.isStale(index))) {
          const v = this.valList[index];
          return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        }
      }
      backgroundFetch(k, index, options, context) {
        const v = index === void 0 ? void 0 : this.valList[index];
        if (this.isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const fetchOpts = {
          signal: ac.signal,
          options,
          context
        };
        const cb = (v2) => {
          if (!ac.signal.aborted) {
            this.set(k, v2, fetchOpts.options);
          }
          return v2;
        };
        const eb = (er) => {
          if (this.valList[index] === p) {
            const del = !options.noDeleteOnFetchRejection || p.__staleWhileFetching === void 0;
            if (del) {
              this.delete(k);
            } else {
              this.valList[index] = p.__staleWhileFetching;
            }
          }
          if (p.__returned === p) {
            throw er;
          }
        };
        const pcall = (res) => res(this.fetchMethod(k, v, fetchOpts));
        const p = new Promise(pcall).then(cb, eb);
        p.__abortController = ac;
        p.__staleWhileFetching = v;
        p.__returned = null;
        if (index === void 0) {
          this.set(k, p, fetchOpts.options);
          index = this.keyMap.get(k);
        } else {
          this.valList[index] = p;
        }
        return p;
      }
      isBackgroundFetch(p) {
        return p && typeof p === "object" && typeof p.then === "function" && Object.prototype.hasOwnProperty.call(p, "__staleWhileFetching") && Object.prototype.hasOwnProperty.call(p, "__returned") && (p.__returned === p || p.__returned === null);
      }
      async fetch(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        noDeleteOnStaleGet = this.noDeleteOnStaleGet,
        ttl = this.ttl,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL,
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
        fetchContext = this.fetchContext,
        forceRefresh = false
      } = {}) {
        if (!this.fetchMethod) {
          return this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection
        };
        let index = this.keyMap.get(k);
        if (index === void 0) {
          const p = this.backgroundFetch(k, index, options, fetchContext);
          return p.__returned = p;
        } else {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            return allowStale && v.__staleWhileFetching !== void 0 ? v.__staleWhileFetching : v.__returned = v;
          }
          if (!forceRefresh && !this.isStale(index)) {
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return v;
          }
          const p = this.backgroundFetch(k, index, options, fetchContext);
          return allowStale && p.__staleWhileFetching !== void 0 ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      get(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        noDeleteOnStaleGet = this.noDeleteOnStaleGet
      } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          const value = this.valList[index];
          const fetching = this.isBackgroundFetch(value);
          if (this.isStale(index)) {
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                this.delete(k);
              }
              return allowStale ? value : void 0;
            } else {
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (fetching) {
              return void 0;
            }
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return value;
          }
        }
      }
      connect(p, n) {
        this.prev[n] = p;
        this.next[p] = n;
      }
      moveToTail(index) {
        if (index !== this.tail) {
          if (index === this.head) {
            this.head = this.next[index];
          } else {
            this.connect(this.prev[index], this.next[index]);
          }
          this.connect(this.tail, index);
          this.tail = index;
        }
      }
      get del() {
        deprecatedMethod("del", "delete");
        return this.delete;
      }
      delete(k) {
        let deleted = false;
        if (this.size !== 0) {
          const index = this.keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.size === 1) {
              this.clear();
            } else {
              this.removeItemSize(index);
              const v = this.valList[index];
              if (this.isBackgroundFetch(v)) {
                v.__abortController.abort();
              } else {
                this.dispose(v, k, "delete");
                if (this.disposeAfter) {
                  this.disposed.push([v, k, "delete"]);
                }
              }
              this.keyMap.delete(k);
              this.keyList[index] = null;
              this.valList[index] = null;
              if (index === this.tail) {
                this.tail = this.prev[index];
              } else if (index === this.head) {
                this.head = this.next[index];
              } else {
                this.next[this.prev[index]] = this.next[index];
                this.prev[this.next[index]] = this.prev[index];
              }
              this.size--;
              this.free.push(index);
            }
          }
        }
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return deleted;
      }
      clear() {
        for (const index of this.rindexes({ allowStale: true })) {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            v.__abortController.abort();
          } else {
            const k = this.keyList[index];
            this.dispose(v, k, "delete");
            if (this.disposeAfter) {
              this.disposed.push([v, k, "delete"]);
            }
          }
        }
        this.keyMap.clear();
        this.valList.fill(null);
        this.keyList.fill(null);
        if (this.ttls) {
          this.ttls.fill(0);
          this.starts.fill(0);
        }
        if (this.sizes) {
          this.sizes.fill(0);
        }
        this.head = 0;
        this.tail = 0;
        this.initialFill = 1;
        this.free.length = 0;
        this.calculatedSize = 0;
        this.size = 0;
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
      }
      get reset() {
        deprecatedMethod("reset", "clear");
        return this.clear;
      }
      get length() {
        deprecatedProperty("length", "size");
        return this.size;
      }
      static get AbortController() {
        return AC;
      }
      static get AbortSignal() {
        return AS;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/lodash.clonedeep/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.clonedeep/index.js"(exports, module2) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object, key2) {
      return object == null ? void 0 : object[key2];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key2) {
        result[++index] = [key2, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key2) {
      return this.has(key2) && delete this.__data__[key2];
    }
    function hashGet(key2) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key2];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key2) ? data[key2] : void 0;
    }
    function hashHas(key2) {
      var data = this.__data__;
      return nativeCreate ? data[key2] !== void 0 : hasOwnProperty.call(data, key2);
    }
    function hashSet(key2, value) {
      var data = this.__data__;
      data[key2] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key2) {
      return assocIndexOf(this.__data__, key2) > -1;
    }
    function listCacheSet(key2, value) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        data.push([key2, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key2) {
      return getMapData(this, key2)["delete"](key2);
    }
    function mapCacheGet(key2) {
      return getMapData(this, key2).get(key2);
    }
    function mapCacheHas(key2) {
      return getMapData(this, key2).has(key2);
    }
    function mapCacheSet(key2, value) {
      getMapData(this, key2).set(key2, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key2) {
      return this.__data__["delete"](key2);
    }
    function stackGet(key2) {
      return this.__data__.get(key2);
    }
    function stackHas(key2) {
      return this.__data__.has(key2);
    }
    function stackSet(key2, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key2, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key2, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key2 in value) {
        if ((inherited || hasOwnProperty.call(value, key2)) && !(skipIndexes && (key2 == "length" || isIndex(key2, length)))) {
          result.push(key2);
        }
      }
      return result;
    }
    function assignValue(object, key2, value) {
      var objValue = object[key2];
      if (!(hasOwnProperty.call(object, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object)) {
        object[key2] = value;
      }
    }
    function assocIndexOf(array, key2) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key2)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key2, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key2, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key3) {
        if (props) {
          key3 = subValue;
          subValue = value[key3];
        }
        assignValue(result, key3, baseClone(subValue, isDeep, isFull, customizer, key3, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key2 in Object(object)) {
        if (hasOwnProperty.call(object, key2) && key2 != "constructor") {
          result.push(key2);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key2 = props[index];
        var newValue = customizer ? customizer(object[key2], source[key2], key2, object, source) : void 0;
        assignValue(object, key2, newValue === void 0 ? source[key2] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key2) {
      var data = map.__data__;
      return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key2) {
      var value = getValue(object, key2);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length, result = array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep2(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module2.exports = cloneDeep2;
  }
});

// src/runtime/Cache.ts
function isCacheEnabled() {
  return process.env[EDGIO_ENV_VARIABLES.cache] === "true";
}
function convertToCachedResponse(response, ttl, serveStaleUntil) {
  return {
    cachedAt: Date.now(),
    ttl,
    statusCode: response.statusCode,
    statusMessage: response.statusMessage,
    headers: JSON.parse(JSON.stringify(response.getHeaders())),
    body: response.body,
    serveStaleUntil,
    someObject: { key: "value" }
  };
}
var import_lru_cache, import_lodash2, Cache;
var init_Cache = __esm({
  "src/runtime/Cache.ts"() {
    "use strict";
    import_lru_cache = __toESM(require_lru_cache());
    import_lodash2 = __toESM(require_lodash2());
    init_constants();
    Cache = class {
      constructor() {
        this.cache = new import_lru_cache.default({
          ttl: 1,
          allowStale: true,
          ttlAutopurge: false,
          max: 1e5
        });
        this.revalidationCache = new import_lru_cache.default({
          ttl: 500,
          allowStale: false,
          ttlAutopurge: false,
          max: 1e4
        });
      }
      clear() {
        this.cache.clear();
      }
      get(key2) {
        const keyValue = key2.toString();
        const response = this.cache.get(keyValue, { allowStale: true, noDeleteOnStaleGet: true });
        const remainingTtl = this.cache.getRemainingTTL(keyValue);
        const stale = remainingTtl <= 0;
        if (!response) {
          return void 0;
        }
        const now = Date.now();
        const { serveStaleUntil } = response;
        if (stale && (serveStaleUntil == null || serveStaleUntil < now)) {
          return void 0;
        }
        return {
          response: (0, import_lodash2.default)(response),
          revalidate: stale
        };
      }
      put(cacheKey, response, { ttl, staleWhileRevalidate }) {
        let serveStaleUntil = void 0;
        if (staleWhileRevalidate) {
          serveStaleUntil = new Date().getTime() + ttl * 1e3 + staleWhileRevalidate * 1e3;
        }
        const cached = convertToCachedResponse(response, ttl, serveStaleUntil);
        this.cache.set(cacheKey.toString(), cached, {
          ttl: ttl * 1e3
        });
      }
      isRevalidating(cacheKey) {
        return !!this.revalidationCache.get(cacheKey.toString());
      }
      setRevalidating(cacheKey, value) {
        this.revalidationCache.set(cacheKey.toString(), value);
      }
      dump() {
        return this.cache.dump();
      }
    };
  }
});

// src/runtime/PropertyContext.ts
var PropertyContext;
var init_PropertyContext = __esm({
  "src/runtime/PropertyContext.ts"() {
    "use strict";
    PropertyContext = class {
      constructor(property) {
        this.accountID = process.env.ACCOUNT_ID || "development";
        this.property = property;
        this.origins = this.property.origins ?? [];
        this.originsByName = this.createOriginMap();
        this.defaultOrigins = this.createDefaultOriginMap();
      }
      getOrigin(name) {
        return this.originsByName[name];
      }
      getDefaultOrigin(request) {
        let hostname = request.getHeader("host").toLowerCase();
        const defaultOrigin = this.defaultOrigins[hostname];
        const origins = this.origins;
        if (defaultOrigin && defaultOrigin.name) {
          return defaultOrigin.name;
        }
        return origins[0].name;
      }
      createOriginMap() {
        const originGroups = {};
        const origins = this.origins;
        for (const origin of origins) {
          originGroups[origin.name] = origin;
        }
        return originGroups;
      }
      createDefaultOriginMap() {
        const defaultOriginMap = {};
        const { hostnames } = this.property;
        if (hostnames) {
          for (const hostname of hostnames) {
            if (hostname.default_origin_name) {
              const origin = this.originsByName[hostname.default_origin_name];
              if (origin) {
                defaultOriginMap[hostname.hostname] = origin;
              } else {
                throw new Error(`No origin with id="${hostname.default_origin_name}" was found.`);
              }
            }
          }
        }
        return defaultOriginMap;
      }
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize;
    var decode2 = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode2;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key2 = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }
        if (void 0 == obj[key2]) {
          obj[key2] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode3) {
      try {
        return decode3(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// src/runtime/CacheKey.ts
function hash(data) {
  if (!data)
    return null;
  const hash2 = import_crypto.default.createHash("sha256");
  hash2.update(data);
  return hash2.digest("hex");
}
var import_crypto, CacheKey;
var init_CacheKey = __esm({
  "src/runtime/CacheKey.ts"() {
    "use strict";
    init_constants();
    import_crypto = __toESM(require("crypto"));
    CacheKey = class {
      constructor(request) {
        this.cookies = {};
        var _a2;
        const { host } = request.headers;
        this.method = (_a2 = request.method) == null ? void 0 : _a2.toLowerCase();
        this.query = this.excludeEdgioQueryParams(request.query || {});
        this.pathname = new URL(request.url, `http://${host}`).pathname;
        this.body = request.body;
        this.headers = this.getDefaultHeaders(request.headers);
      }
      resetQueryParams(request) {
        this.query = this.excludeEdgioQueryParams(request.query);
      }
      excludeEdgioQueryParams(query) {
        const result = {};
        for (let name in query) {
          if (!name.startsWith("edgio_")) {
            result[name] = query[name];
          }
        }
        return result;
      }
      toSortedArray(source) {
        return Object.keys(source).sort().map((key2) => [key2, source[key2]]);
      }
      getDefaultHeaders(headers) {
        return {
          [HTTP_HEADERS.host]: headers[HTTP_HEADERS.host],
          [HTTP_HEADERS.acceptEncoding]: headers[HTTP_HEADERS.acceptEncoding],
          [HTTP_HEADERS.xEdgeDestination]: headers[HTTP_HEADERS.xEdgeDestination],
          [HTTP_HEADERS.xEdgeProtocol]: headers[HTTP_HEADERS.xEdgeProtocol]
        };
      }
      toString() {
        return JSON.stringify({
          pathname: this.pathname,
          method: this.method,
          query: this.toSortedArray(this.query),
          body: hash(this.body),
          headers: this.toSortedArray(this.headers),
          cookies: this.toSortedArray(this.cookies)
        });
      }
    };
  }
});

// src/runtime/EarlyReturn.ts
var EarlyReturn;
var init_EarlyReturn = __esm({
  "src/runtime/EarlyReturn.ts"() {
    "use strict";
    EarlyReturn = class {
      constructor(reason) {
        this.reason = reason;
      }
    };
  }
});

// src/utils/first.ts
function first(value) {
  if (Array.isArray(value)) {
    return value[0];
  } else {
    return value;
  }
}
var init_first = __esm({
  "src/utils/first.ts"() {
    "use strict";
  }
});

// src/runtime/Phase.ts
var Phase, Phase_default;
var init_Phase = __esm({
  "src/runtime/Phase.ts"() {
    "use strict";
    Phase = /* @__PURE__ */ ((Phase2) => {
      Phase2[Phase2["UriRaw"] = 0] = "UriRaw";
      Phase2[Phase2["UriClean"] = 1] = "UriClean";
      Phase2[Phase2["HandleDocRoot"] = 2] = "HandleDocRoot";
      Phase2[Phase2["SendRequestContent"] = 3] = "SendRequestContent";
      Phase2[Phase2["HandleResponseDone"] = 4] = "HandleResponseDone";
      return Phase2;
    })(Phase || {});
    Phase_default = Phase;
  }
});

// src/runtime/mods/Mod.ts
var Mod;
var init_Mod = __esm({
  "src/runtime/mods/Mod.ts"() {
    "use strict";
    Mod = class {
      constructor(context) {
        this.context = context;
      }
    };
  }
});

// src/utils/decodeUnreservedURIChars.ts
function decodeUnreservedURIChars(input) {
  const symbols = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"];
  const symbolsEncoded = [
    "%61",
    "%62",
    "%63",
    "%64",
    "%65",
    "%66",
    "%67",
    "%68",
    "%69",
    "%6A",
    "%6B",
    "%6C",
    "%6D",
    "%6E",
    "%6F",
    "%70",
    "%71",
    "%72",
    "%73",
    "%74",
    "%75",
    "%76",
    "%77",
    "%78",
    "%79",
    "%7A",
    "%41",
    "%42",
    "%43",
    "%44",
    "%45",
    "%46",
    "%47",
    "%48",
    "%49",
    "%4A",
    "%4B",
    "%4C",
    "%4D",
    "%4E",
    "%4F",
    "%50",
    "%51",
    "%52",
    "%53",
    "%54",
    "%55",
    "%56",
    "%57",
    "%58",
    "%59",
    "%5A",
    "%30",
    "%31",
    "%32",
    "%33",
    "%34",
    "%35",
    "%36",
    "%37",
    "%38",
    "%39",
    "%2D",
    "%2E",
    "%5F",
    "%7E"
  ];
  return symbolsEncoded.reduce((output, symbolEncoded, index) => output.replace(symbolEncoded, symbols[index]), input);
}
var init_decodeUnreservedURIChars = __esm({
  "src/utils/decodeUnreservedURIChars.ts"() {
    "use strict";
  }
});

// src/runtime/evaluators/EvaluatorGroup.ts
var EvaluatorGroup;
var init_EvaluatorGroup = __esm({
  "src/runtime/evaluators/EvaluatorGroup.ts"() {
    "use strict";
    EvaluatorGroup = class {
      constructor(evaluators = [], matcher = /(.*)/) {
        this.evaluators = [...evaluators];
        this.matcher = matcher;
      }
      execute(input, values) {
        if (!this.matcher.test(input))
          return void 0;
        for (const evaluator of this.evaluators) {
          const result = evaluator.execute(input, values);
          if (typeof result === "string")
            return result;
        }
        return void 0;
      }
      add(evaluator) {
        this.evaluators.push(evaluator);
      }
    };
  }
});

// src/runtime/evaluators/Evaluator.ts
var Evaluator;
var init_Evaluator = __esm({
  "src/runtime/evaluators/Evaluator.ts"() {
    "use strict";
    Evaluator = class {
      constructor(action, matcher) {
        this.action = action;
        this.matcher = matcher;
      }
      execute(input, values) {
        const result = this.matcher.exec(input);
        if (!result)
          return void 0;
        const [_, valueName, ...others] = result.values();
        return this.action({
          values,
          matched: [valueName.toLowerCase(), ...others]
        });
      }
    };
  }
});

// src/runtime/evaluators/index.ts
var assignOnNullEvaluator, assignOnNotNullEvaluator, removeLeadingEvaluator, removeTrailingEvaluator, substringEvaluator, findReplaceEvaluator, toLowercaseEvaluator, toUppercaseEvaluator, simpleEvaluator;
var init_evaluators = __esm({
  "src/runtime/evaluators/index.ts"() {
    "use strict";
    init_Evaluator();
    init_toEdgeRegex();
    init_regexUtils();
    assignOnNullEvaluator = new Evaluator((params) => {
      const [lowerCaseName, colon, newValue] = params.matched;
      if (lowerCaseName in params.values && (!colon || params.values[lowerCaseName].length > 0))
        return params.values[lowerCaseName];
      params.values[lowerCaseName] = newValue;
      return newValue;
    }, /^([A-Za-z0-9_-]+)(:?)=(.*)$/);
    assignOnNotNullEvaluator = new Evaluator((params) => {
      const [lowerCaseName, colon, newValue] = params.matched;
      if (!(lowerCaseName in params.values) || colon && params.values[lowerCaseName].length === 0)
        return "";
      params.values[lowerCaseName] = newValue;
      return newValue;
    }, /^([A-Za-z0-9_-]+)(:?)\+(.*)$/);
    removeLeadingEvaluator = new Evaluator((params) => {
      const [lowerCaseName, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      return params.values[lowerCaseName].replace(new RegExp(`^${pattern}`), "");
    }, /^([A-Za-z0-9_-]+)#(.+)$/);
    removeTrailingEvaluator = new Evaluator((params) => {
      const [lowerCaseName, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      return params.values[lowerCaseName].replace(new RegExp(`${pattern}$`), "");
    }, /^([A-Za-z0-9_-]+)%(.+)$/);
    substringEvaluator = new Evaluator((params) => {
      const [lowerCaseName, offsetString, lengthString] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const valueLength = params.values[lowerCaseName].length;
      const offset = parseInt(offsetString);
      const length = !lengthString ? valueLength : parseInt(lengthString);
      const startIndex = offset < 0 && length >= 0 ? valueLength + offset : offset;
      const endIndex = (startIndex < 0 ? 0 : startIndex) + length;
      return params.values[lowerCaseName].slice(startIndex, endIndex);
    }, /^([A-Za-z0-9_-]+):(-?[0-9]+):(-?[0-9]*)$/);
    findReplaceEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, searchValue, replaceValue] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = fromEdgeRegex(searchValue);
      if (delimiter === "/=")
        return substituteParams(patternRegex, params.values[lowerCaseName], replaceValue);
      return params.values[lowerCaseName].replace(new RegExp(patternRegex.source, `${patternRegex.flags}${delimiter === "//" ? "g" : ""}`), replaceValue);
    }, /^([A-Za-z0-9_-]+)(\/\/?=?)(.+)\/(.*)$/);
    toLowercaseEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = new RegExp(`(${!pattern ? "(.*)" : pattern})`, `i${delimiter === ",," ? "g" : ""}`);
      return params.values[lowerCaseName].replace(patternRegex, (match2) => match2.toLowerCase());
    }, /^([A-Za-z0-9_-]+)(,,?)(.*)$/);
    toUppercaseEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = new RegExp(`(${!pattern ? "(.*)" : pattern})`, `i${delimiter === "^^" ? "g" : ""}`);
      return params.values[lowerCaseName].replace(patternRegex, (match2) => match2.toUpperCase());
    }, /^([A-Za-z0-9_-]+)(\^\^?)(.*)$/);
    simpleEvaluator = new Evaluator((params) => {
      const [lowerCaseName] = params.matched;
      if (lowerCaseName in params.values)
        return params.values[lowerCaseName];
      return /(http|resp|arg|cookie)_[A-Za-z0-9_-]+/g.test(lowerCaseName) ? "" : void 0;
    }, /(.+)/);
  }
});

// src/runtime/interpolate.ts
var import_path4, import_qs4, interpolate, interpolate_default, interpolateObject, defaultInterpolationValues, extractInterpolationValues, extractValuesFromObject;
var init_interpolate = __esm({
  "src/runtime/interpolate.ts"() {
    "use strict";
    init_constants();
    init_decodeUnreservedURIChars();
    import_path4 = __toESM(require("path"));
    import_qs4 = __toESM(require_lib2());
    init_EvaluatorGroup();
    init_evaluators();
    interpolate = (value, context, values = extractInterpolationValues(context)) => {
      const expressionEvaluator = new EvaluatorGroup([
        assignOnNullEvaluator,
        assignOnNotNullEvaluator,
        removeLeadingEvaluator,
        removeTrailingEvaluator,
        substringEvaluator,
        findReplaceEvaluator,
        toLowercaseEvaluator,
        toUppercaseEvaluator,
        simpleEvaluator
      ]);
      const matches = value.matchAll(/%{(.*?)}/g);
      for (const match2 of matches) {
        const [expressionFull, expression] = match2;
        const result = expressionEvaluator.execute(expression, values);
        if (typeof result !== "string")
          continue;
        value = value.replace(expressionFull, result);
      }
      return value;
    };
    interpolate_default = interpolate;
    interpolateObject = (target, context) => {
      const values = extractInterpolationValues(context);
      const newObject = {};
      Object.entries(target).forEach((p) => {
        const [key2, value] = p;
        newObject[key2] = value !== void 0 ? interpolate(value, context, values) : value;
      });
      return newObject;
    };
    defaultInterpolationValues = {
      is_origin_shield: "N/A",
      is_subrequest: "N/A",
      physical_path: "N/A",
      physical_rel_path: "N/A",
      physical_doc_root: "N/A",
      referring_domain: "N/A",
      virt_dst_country: "N/A",
      virt_dst_continent: "N/A",
      virt_dst_asnum: "N/A",
      virt_dst_port: "N/A",
      geo_country: "N/A",
      virt_ssl_protocol: "N/A",
      virt_ssl_cipher: "N/A",
      virt_ssl_client_ciphers: "N/A",
      virt_ssl_client_cipher_codes: "N/A",
      virt_ssl_client_tlsext_ids: "N/A",
      virt_http_version: "N/A"
    };
    extractInterpolationValues = (context) => {
      var _a2, _b;
      const { cookies, interpolationValues } = context;
      const request = context.getRequest();
      const response = context.getResponse();
      const host = request.getHeader("host") ?? "";
      const fullUrl = new URL(`${request.protocol}://${host}${request.url}`);
      const values = {
        ...defaultInterpolationValues,
        ...interpolationValues
      };
      values.host = host;
      values.is_args = fullUrl.search !== "" ? "?" : "NULL";
      values.is_amp = fullUrl.search !== "" ? "&" : "NULL";
      values.query_string = fullUrl.search.substring(1);
      values.request_url = request.url;
      values.request_protocol = `HTTP/${request.httpVersion}`;
      values.request_method = request.method;
      values.request_uri = fullUrl.toString();
      values.request_header = ((_a2 = request.rawHeaders) == null ? void 0 : _a2.join(", ")) ?? "NULL";
      values.request = values["request_url"];
      values.path = request.path;
      values.normalized_path = decodeUnreservedURIChars(import_path4.default.normalize(values["path"]));
      values.normalized_query = fullUrl.searchParams.toString();
      values.normalized_uri = `${values.normalized_path}?${values.normalized_query}`;
      values.scheme = request.secure ? "https" : "http";
      values.server_name = host;
      values.server_port = request.port;
      values.server_socket_port = request.port;
      values.status = ((_b = response.statusCode) == null ? void 0 : _b.toString()) ?? "";
      values.http_status = values.status;
      values.cache_status = response.getHeader(HTTP_HEADERS.xEdgeCachingStatus) ?? "";
      values.virt_dst_addr = (request.getHeader("x-forwarded-for") || request.socket.remoteAddress) ?? "";
      const undecodedQuery = import_qs4.default.parse(fullUrl.search, {
        ignoreQueryPrefix: true,
        decoder: (value, defaultEncoder, charset, type) => type === "key" ? value.toLowerCase() : value
      });
      extractValuesFromObject("http_", request.getHeaders() ?? {}, values);
      extractValuesFromObject("resp_", response.getHeaders() ?? {}, values);
      extractValuesFromObject("arg_", undecodedQuery ?? {}, values);
      extractValuesFromObject("cookie_", cookies ?? {}, values);
      return values;
    };
    extractValuesFromObject = (prefix, srcObj, destObj) => {
      Object.keys(srcObj).forEach((srcKey) => {
        const destKey = `${prefix}${srcKey}`.toLowerCase();
        const srcValues = typeof srcObj[srcKey] === "string" ? [srcObj[srcKey]] : srcObj[srcKey];
        const destValues = destObj[destKey] ? [[destObj[destKey]]] : [];
        destObj[destKey] = [...destValues, ...srcValues].join(", ");
      });
    };
  }
});

// src/runtime/mods/ModRewrite.ts
var ModRewrite;
var init_ModRewrite = __esm({
  "src/runtime/mods/ModRewrite.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_url();
    init_interpolate();
    init_path();
    ModRewrite = class extends Mod {
      async execute(phase) {
        if (phase === Phase_default.UriRaw) {
          this.context.forLastMatchingRule((rule) => this.applyFeatures(rule, phase));
        }
      }
      applyFeatures(features, _phase) {
        var _a2;
        if ((_a2 = features.url) == null ? void 0 : _a2.url_rewrite) {
          const request = this.context.getRequest();
          for (let { source, destination, syntax } of features.url.url_rewrite) {
            if (!destination) {
              throw new Error("url.url_rewrite.destination is required but was not provided.");
            }
            setURL(request, mapURL(request.url, source, interpolate_default(destination, this.context), syntax));
          }
          return true;
        }
        return false;
      }
      toString() {
        return "ModRewrite";
      }
    };
  }
});

// node_modules/cache-control-parser/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/cache-control-parser/dist/index.js"(exports, module2) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.cacheControl = t() : e.cacheControl = t();
    }(exports, function() {
      return function(e) {
        var t = {};
        function r(n) {
          if (t[n])
            return t[n].exports;
          var o = t[n] = { i: n, l: false, exports: {} };
          return e[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
        }
        return r.m = e, r.c = t, r.d = function(e2, t2, n) {
          r.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: n });
        }, r.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, r.t = function(e2, t2) {
          if (1 & t2 && (e2 = r(e2)), 8 & t2)
            return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
            return e2;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2)
            for (var o in e2)
              r.d(n, o, function(t3) {
                return e2[t3];
              }.bind(null, o));
          return n;
        }, r.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return r.d(t2, "a", t2), t2;
        }, r.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, r.p = "", r(r.s = 1);
      }([function(e, t) {
      }, function(e, t, r) {
        "use strict";
        function n(e2) {
          return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function o(e2, t2) {
          return function(e3) {
            if (Array.isArray(e3))
              return e3;
          }(e2) || function(e3, t3) {
            if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)))
              return;
            var r2 = [], n2 = true, o2 = false, a2 = void 0;
            try {
              for (var i2, u2 = e3[Symbol.iterator](); !(n2 = (i2 = u2.next()).done) && (r2.push(i2.value), !t3 || r2.length !== t3); n2 = true)
                ;
            } catch (e4) {
              o2 = true, a2 = e4;
            } finally {
              try {
                n2 || null == u2.return || u2.return();
              } finally {
                if (o2)
                  throw a2;
              }
            }
            return r2;
          }(e2, t2) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }();
        }
        r.r(t);
        var a = ["max-age", "s-maxage", "stale-while-revalidate", "stale-if-error", "public", "private", "no-store", "no-cache", "must-revalidate", "proxy-revalidate", "immutable", "no-transform"], i = function(e2) {
          var t2 = {}, r2 = e2.toLowerCase().split(",").map(function(e3) {
            return e3.trim().split("=").map(function(e4) {
              return e4.trim();
            });
          }), n2 = true, a2 = false, i2 = void 0;
          try {
            for (var u2, c2 = r2[Symbol.iterator](); !(n2 = (u2 = c2.next()).done); n2 = true) {
              var l = o(u2.value, 2), f = l[0], s = l[1];
              switch (f) {
                case "max-age":
                  var p = parseInt(s, 10);
                  if (isNaN(p))
                    continue;
                  t2["max-age"] = p;
                  break;
                case "s-maxage":
                  var b = parseInt(s, 10);
                  if (isNaN(b))
                    continue;
                  t2["s-maxage"] = b;
                  break;
                case "stale-while-revalidate":
                  var y = parseInt(s, 10);
                  if (isNaN(y))
                    continue;
                  t2["stale-while-revalidate"] = y;
                  break;
                case "stale-if-error":
                  var m = parseInt(s, 10);
                  if (isNaN(m))
                    continue;
                  t2["stale-if-error"] = m;
                  break;
                case "public":
                  t2.public = true;
                  break;
                case "private":
                  t2.private = true;
                  break;
                case "no-store":
                  t2["no-store"] = true;
                  break;
                case "no-cache":
                  t2["no-cache"] = true;
                  break;
                case "must-revalidate":
                  t2["must-revalidate"] = true;
                  break;
                case "proxy-revalidate":
                  t2["proxy-revalidate"] = true;
                  break;
                case "immutable":
                  t2.immutable = true;
                  break;
                case "no-transform":
                  t2["no-transform"] = true;
              }
            }
          } catch (e3) {
            a2 = true, i2 = e3;
          } finally {
            try {
              n2 || null == c2.return || c2.return();
            } finally {
              if (a2)
                throw i2;
            }
          }
          return t2;
        }, u = function(e2) {
          for (var t2 = [], r2 = 0, i2 = Object.entries(e2); r2 < i2.length; r2++) {
            var u2 = o(i2[r2], 2), c2 = u2[0], l = u2[1];
            if (a.includes(c2))
              switch (n(l)) {
                case "boolean":
                  t2.push("".concat(c2));
                  break;
                case "number":
                  t2.push("".concat(c2, "=").concat(l));
              }
          }
          return t2.join(", ");
        }, c = r(0);
        r.d(t, "parse", function() {
          return i;
        }), r.d(t, "stringify", function() {
          return u;
        }), r.d(t, "CacheControl", function() {
          return c.CacheControl;
        });
      }]);
    });
  }
});

// src/router/converters/toTimeUnitAbbrev.ts
var toTimeUnitAbbrev;
var init_toTimeUnitAbbrev = __esm({
  "src/router/converters/toTimeUnitAbbrev.ts"() {
    "use strict";
    toTimeUnitAbbrev = (seconds) => {
      const hours = 60 * 60;
      const days = hours * 24;
      const months = days * 30.437;
      const years = months * 12;
      if (seconds >= years) {
        return Math.floor(seconds / years) + "y";
      } else if (seconds >= months) {
        return Math.floor(seconds / months) + "m";
      } else if (seconds >= days) {
        return Math.floor(seconds / days) + "d";
      } else if (seconds >= hours) {
        return Math.floor(seconds / hours) + "h";
      }
      return seconds + "s";
    };
  }
});

// src/runtime/mods/ModCache.ts
var import_cache_control_parser, ModCache;
var init_ModCache = __esm({
  "src/runtime/mods/ModCache.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_toRegExp();
    init_log();
    init_interpolate();
    init_constants();
    import_cache_control_parser = __toESM(require_dist3());
    init_toSeconds();
    init_toTimeUnitAbbrev();
    ModCache = class extends Mod {
      constructor() {
        super(...arguments);
        this.cachingFeatures = { caching: {} };
      }
      async execute(phase) {
        if (Phase_default.UriClean === phase) {
          this.context.forEachMatchingRule((rule) => this.applyCacheReadFeatures(rule));
        } else if (Phase_default.HandleDocRoot === phase) {
          this.readCachedResponse();
        } else if (Phase_default.HandleResponseDone === phase) {
          this.context.forEachMatchingRule((rule) => this.applyCacheWriteFeatures(rule));
          this.maybeWriteCachedResponse();
          this.maybeApplyAdditionalCachingHeaders();
          this.ensureAge();
          this.context.forEachMatchingRule((rule) => {
            this.applyDebugHeaderFeatures(rule);
            this.applyExternalMaxAge(rule);
          });
        }
      }
      readCachedResponse() {
        const response = this.context.getResponse();
        if (!this.context.cache) {
          return;
        }
        if (this.context.bypassCache || this.context.bypassCacheByHonor) {
          log_default.info(() => `[pass] ${this.context.summarize()}`);
          this.setCachingStatus(CACHING_STATUS.bypassed);
        } else {
          const result = this.context.cache.get(this.context.cacheKey);
          if (result) {
            response.statusCode = result.response.statusCode;
            response.statusMessage = result.response.statusMessage;
            response.body = result.response.body;
            for (let name in result.response.headers) {
              const value = result.response.headers[name];
              response.setHeader(name, value);
            }
            this.setCachingStatus(CACHING_STATUS.hit);
            let age = parseInt(response.getHeader("age") || "0");
            const timeSinceCached = Math.floor((Date.now() - result.response.cachedAt) / 1e3);
            response.setHeader("age", (age + timeSinceCached).toString());
            this.context.bypassOrigin = true;
            this.context.bypassCache = true;
            if (result.revalidate && !this.context.cache.isRevalidating(this.context.cacheKey)) {
              this.context.cache.setRevalidating(this.context.cacheKey, true);
              this.context.revalidate = true;
            } else {
              this.context.revalidate = false;
            }
            if (result.revalidate) {
              log_default.info(() => `[stale]  ${this.context.summarize()}`);
            } else {
              log_default.info(() => `[hit]  ${this.context.summarize()}`);
            }
          } else {
            log_default.info(() => `[miss] ${this.context.summarize()}`);
          }
        }
      }
      applyExternalMaxAge(features) {
        var _a2, _b, _c;
        if ((_a2 = features.caching) == null ? void 0 : _a2.client_max_age) {
          const response = this.context.getResponse();
          const setHeaders2 = (headerName, treatment, setHeader) => {
            switch (treatment) {
              case "pass":
                break;
              case "if_missing":
                !response.getHeader(headerName) && setHeader();
                break;
              case "remove":
                response.removeHeader(headerName);
                break;
              default:
                setHeader();
            }
          };
          const maxAgeSeconds = toSeconds(features.caching.client_max_age);
          setHeaders2(HTTP_HEADERS.cacheControl, (_b = features.caching) == null ? void 0 : _b.cache_control_header_treatment, () => this.context.setResponseHeader({
            [HTTP_HEADERS.cacheControl]: `max-age=${maxAgeSeconds}`
          }));
          setHeaders2(HTTP_HEADERS.expires, (_c = features.caching) == null ? void 0 : _c.expires_header_treatment, () => {
            var _a3;
            const cacheState = ((_a3 = this.context.cache) == null ? void 0 : _a3.get(this.context.cacheKey)) ?? {
              response: { cachedAt: Date.now() }
            };
            this.context.setResponseHeader({
              [HTTP_HEADERS.expires]: new Date(cacheState.response.cachedAt + maxAgeSeconds * 1e3).toUTCString()
            });
          });
        }
      }
      applyCacheReadFeatures(features) {
        const { caching } = features;
        const request = this.context.getRequest();
        if (!caching) {
          return;
        }
        if (caching.bypass_cache) {
          this.context.bypassCache = true;
        }
        const reqCacheControl = {
          ...(0, import_cache_control_parser.parse)(request.getHeader("pragma") || ""),
          ...(0, import_cache_control_parser.parse)(request.getHeader("cache-control") || "")
        };
        if (reqCacheControl["no-cache"] && caching.honor_no_cache_request_header) {
          this.context.bypassCacheByHonor = true;
        }
        if (caching.cache_key_rewrite) {
          const { source, destination } = caching.cache_key_rewrite;
          const newDestination = destination ? interpolate_default(destination, this.context) : destination;
          if (source && destination) {
            this.context.cacheKey.pathname = this.context.cacheKey.pathname.replace(toRegExp(source), newDestination);
          } else if (destination) {
            this.context.cacheKey.pathname = newDestination;
          }
        }
        if (caching.cache_key_query_string) {
          const { include, include_all_except, exclude_all, include_all } = caching.cache_key_query_string;
          if (include_all_except) {
            for (let param of include_all_except) {
              delete this.context.cacheKey.query[param];
            }
          }
          if (include) {
            const params = new Set(include);
            for (let param in this.context.cacheKey.query) {
              if (!params.has(param)) {
                delete this.context.cacheKey.query[param];
              }
            }
          }
          if (exclude_all) {
            this.context.cacheKey.query = {};
          }
          if (include_all) {
            this.context.cacheKey.resetQueryParams(this.context.getRequest());
          }
        }
      }
      applyCacheWriteFeatures(features) {
        if (features.caching) {
          const { caching } = this.cachingFeatures;
          Object.assign(caching, features.caching);
        }
      }
      maybeWriteCachedResponse() {
        const { caching } = this.cachingFeatures;
        if (!caching || !this.context.cache) {
          return;
        }
        if (this.context.bypassCache) {
          return;
        }
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        let maxAge = 0;
        const resCacheControl = {
          ...(0, import_cache_control_parser.parse)(response.getHeader("pragma") || ""),
          ...(0, import_cache_control_parser.parse)(response.getHeader("cache-control") || "")
        };
        const staleWhileRevalidate = this.getStaleWhileRevalidate(resCacheControl);
        staleWhileRevalidate && this.context.cache.setRevalidating(this.context.cacheKey, false);
        if ((resCacheControl.private || resCacheControl["no-store"] || resCacheControl["no-cache"]) && !caching.ignore_origin_no_cache) {
          return this.setCachingStatus(CACHING_STATUS.private);
        } else if (!caching.enable_caching_for_methods && request.method.toUpperCase() !== "GET") {
          return this.setCachingStatus(CACHING_STATUS.method);
        }
        if (caching.enable_caching_for_methods && !caching.enable_caching_for_methods.includes(request.method.toUpperCase()) && request.method.toUpperCase() !== "GET") {
          return this.setCachingStatus(CACHING_STATUS.method);
        } else if (caching.cacheable_status_codes && !caching.cacheable_status_codes.includes(response.statusCode) && response.statusCode !== 200) {
          return this.setCachingStatus(CACHING_STATUS.code);
        } else if (!response.statusCode || response.statusCode !== 200 && !caching.cacheable_status_codes) {
          return this.setCachingStatus(CACHING_STATUS.code);
        } else if (typeof caching.max_age === "string") {
          maxAge = toSeconds(caching.max_age) ?? 0;
        } else if (caching.max_age && response.statusCode != null) {
          maxAge = toSeconds(caching.max_age, response.statusCode) ?? 0;
        } else if (resCacheControl["s-maxage"]) {
          maxAge = resCacheControl["s-maxage"];
        } else if (resCacheControl["max-age"]) {
          maxAge = resCacheControl["max-age"];
        }
        if (maxAge > 0) {
          this.context.cache.put(this.context.cacheKey, response, {
            ttl: maxAge,
            staleWhileRevalidate
          });
          this.setCachingStatus(CACHING_STATUS.cached);
        } else {
          return this.setCachingStatus(CACHING_STATUS.noMaxAge);
        }
      }
      applyDebugHeaderFeatures(features) {
        var _a2, _b;
        if ((_a2 = features.headers) == null ? void 0 : _a2.debug_header) {
          const request = this.context.getRequest();
          const response = this.context.getResponse();
          const debugHeader = request.headers[HTTP_HEADERS.xEcDebug];
          if (typeof debugHeader === "string") {
            const debugChecks = debugHeader.replace(/ /g, "").split(",").reduce((prev, cur) => {
              prev[cur] = true;
              return prev;
            }, {});
            const cachingStatus = response.getHeader(HTTP_HEADERS.xEdgeCachingStatus);
            if (debugChecks[CACHING_DEBUG_HEADERS.cache]) {
              let statusCode = CACHING_DEBUG_STATUS.uncacheable;
              if (cachingStatus == CACHING_STATUS.hit)
                statusCode = CACHING_DEBUG_STATUS.tcpHit;
              if (cachingStatus == CACHING_STATUS.cached && !this.context.bypassCacheByHonor)
                statusCode = CACHING_DEBUG_STATUS.tcpMiss;
              if (cachingStatus == CACHING_STATUS.cached && this.context.bypassCacheByHonor)
                statusCode = CACHING_DEBUG_STATUS.tcpClientRefreshMiss;
              response.setHeader(CACHING_DEBUG_HEADERS.cache, `${statusCode} from SIMULATOR`);
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.cacheKey]) {
              response.setHeader(CACHING_DEBUG_HEADERS.cacheKey, this.context.cacheKey.toString());
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.cacheState]) {
              const cacheState = ((_b = this.context.cache) == null ? void 0 : _b.get(this.context.cacheKey)) ?? {
                response: { cachedAt: Date.now(), ttl: 0 }
              };
              const cacheAge = Math.floor((Date.now() - cacheState.response.cachedAt) / 1e3);
              const remainingTtl = Math.floor(cacheState.response.ttl - cacheAge);
              let outputState = `max-age=${cacheState.response.ttl} (${toTimeUnitAbbrev(cacheState.response.ttl)}); `;
              outputState += `cache-ts=${cacheState.response.cachedAt} (${new Date(cacheState.response.cachedAt).toUTCString()}); `;
              outputState += `cache-age=${cacheAge} (${toTimeUnitAbbrev(cacheAge)}); `;
              outputState += `remaining-ttl=${remainingTtl} (${toTimeUnitAbbrev(remainingTtl)}); `;
              outputState += `expires-delta=none;`;
              response.setHeader(CACHING_DEBUG_HEADERS.cacheState, outputState);
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.checkCacheable]) {
              response.setHeader(CACHING_DEBUG_HEADERS.checkCacheable, !features.caching || cachingStatus === CACHING_STATUS.noMaxAge ? CACHING_DEBUG_CACHEABLE.no : CACHING_DEBUG_CACHEABLE.yes);
            }
          }
        }
      }
      getStaleWhileRevalidate(cacheControl) {
        const { caching } = this.cachingFeatures;
        if (caching) {
          if (caching.stale_while_revalidate) {
            return toSeconds(caching.stale_while_revalidate);
          } else if (cacheControl["stale-while-revalidate"]) {
            return cacheControl["stale-while-revalidate"];
          }
        }
      }
      setCachingStatus(status) {
        this.context.getResponse().setHeader(HTTP_HEADERS.xEdgeCachingStatus, status);
      }
      ensureAge() {
        const response = this.context.getResponse();
        response.getHeader("age") || response.setHeader("age", "0");
      }
      maybeApplyAdditionalCachingHeaders() {
        const { caching } = this.cachingFeatures;
        if (caching == null ? void 0 : caching.bypass_client_cache) {
          this.context.getResponse().setHeader(HTTP_HEADERS.cacheControl, "private, no-cache, no-store, must-revalidate");
        }
        if (caching == null ? void 0 : caching.service_worker_max_age) {
          const maxAgeSeconds = toSeconds(caching == null ? void 0 : caching.service_worker_max_age);
          this.context.getResponse().setHeader(HTTP_HEADERS.xSwCacheControl, `max-age=${maxAgeSeconds}`);
        }
      }
      toString() {
        return "ModCache";
      }
    };
  }
});

// src/runtime/mods/ModAccess.ts
var import_http2, ModAccess;
var init_ModAccess = __esm({
  "src/runtime/mods/ModAccess.ts"() {
    "use strict";
    init_Mod();
    init_EarlyReturn();
    import_http2 = require("http");
    ModAccess = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, _phase) {
        var _a2;
        if ((_a2 = features.access) == null ? void 0 : _a2.deny_access) {
          const response = this.context.getResponse();
          response.statusCode = 403;
          response.statusMessage = import_http2.STATUS_CODES[403];
          throw new EarlyReturn("deny_access");
        }
      }
      toString() {
        return "ModAccess";
      }
    };
  }
});

// src/runtime/mods/ModSetEnv.ts
var ModSetEnv;
var init_ModSetEnv = __esm({
  "src/runtime/mods/ModSetEnv.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_EarlyReturn();
    ModSetEnv = class extends Mod {
      async execute(phase) {
        if (Phase_default.UriClean === phase || Phase_default.SendRequestContent === phase || Phase_default.HandleResponseDone === phase) {
          this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
        }
      }
      applyFeatures(features, _phase) {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        const response = this.context.getResponse();
        if (_phase === Phase_default.UriClean) {
          ((_a2 = features.headers) == null ? void 0 : _a2.set_request_headers) && this.context.setRequestHeader(features.headers.set_request_headers);
        }
        if (_phase === Phase_default.SendRequestContent) {
          (_c = (_b = features.headers) == null ? void 0 : _b.remove_origin_response_headers) == null ? void 0 : _c.forEach((header) => response.removeHeader(header));
        }
        if (_phase === Phase_default.HandleResponseDone || ((_d = features.response) == null ? void 0 : _d.set_done)) {
          ((_e = features.headers) == null ? void 0 : _e.set_response_headers) && this.context.setResponseHeader(features.headers.set_response_headers);
          ((_f = features.headers) == null ? void 0 : _f.add_response_headers) && this.context.setResponseHeader((_g = features.headers) == null ? void 0 : _g.add_response_headers, true);
          (_i = (_h = features.headers) == null ? void 0 : _h.remove_response_headers) == null ? void 0 : _i.forEach((header) => response.removeHeader(header));
          if ((_j = features.response) == null ? void 0 : _j.set_status_code)
            response.statusCode = features.response.set_status_code;
          if ((_k = features.response) == null ? void 0 : _k.set_response_body)
            response.body = features.response.set_response_body;
        }
        if (features.set_variables) {
          Object.entries(features.set_variables).forEach(([name, value]) => {
            this.context.variables[name] = value;
          });
        }
        if ((_l = features.response) == null ? void 0 : _l.set_done) {
          throw new EarlyReturn("set_done on response is set to true");
        }
      }
      toString() {
        return "ModSetEnv";
      }
    };
  }
});

// src/runtime/mods/ModProxyCore.ts
var ModProxyCore;
var init_ModProxyCore = __esm({
  "src/runtime/mods/ModProxyCore.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_OriginFetcher();
    init_origins();
    ModProxyCore = class extends Mod {
      async execute(phase) {
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        if (Phase_default.SendRequestContent === phase) {
          const originName = this.getOriginName();
          if (this.context.bypassOrigin) {
            return;
          } else if (originName === SERVERLESS_ORIGIN_NAME && await this.context.executeServerless()) {
            return;
          } else {
            const originConfig = this.context.propertyContext.getOrigin(originName);
            if (!originConfig) {
              throw new Error(`No origin was found with id=${originName}.`);
            }
            await new OriginFetcher(this.context.propertyContext).fetch(request, response, {
              followRedirects: this.context.followRedirects,
              ignoreUnsatisfiableRanges: this.context.ignoreUnsatisfiableRanges
            }, originName);
          }
        }
      }
      getOriginName() {
        let originName = this.context.propertyContext.getDefaultOrigin(this.context.getRequest());
        this.context.forEachMatchingRule((rule) => {
          var _a2;
          if ((_a2 = rule == null ? void 0 : rule.origin) == null ? void 0 : _a2.set_origin)
            originName = rule.origin.set_origin;
        });
        return originName;
      }
      toString() {
        return "ModProxyCore";
      }
    };
  }
});

// src/runtime/mods/ModProxyFeatures.ts
var ModProxyFeatures;
var init_ModProxyFeatures = __esm({
  "src/runtime/mods/ModProxyFeatures.ts"() {
    "use strict";
    init_Mod();
    ModProxyFeatures = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, _phase) {
        var _a2, _b;
        this.context.followRedirects = ((_a2 = features == null ? void 0 : features.url) == null ? void 0 : _a2.follow_redirects) ?? this.context.followRedirects;
        this.context.ignoreUnsatisfiableRanges = ((_b = features == null ? void 0 : features.caching) == null ? void 0 : _b.ignore_unsatisfiable_ranges) ?? this.context.ignoreUnsatisfiableRanges;
      }
      toString() {
        return "ModProxyFollowRedirect";
      }
    };
  }
});

// src/runtime/mods/ModRedirect.ts
var ModRedirect;
var init_ModRedirect = __esm({
  "src/runtime/mods/ModRedirect.ts"() {
    "use strict";
    init_Mod();
    init_EarlyReturn();
    init_interpolate();
    init_path();
    ModRedirect = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, _phase) {
        if (!features.url || !features.url.url_redirect) {
          return;
        }
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        const { url_redirect } = features.url;
        response.statusCode = url_redirect.code || 302;
        if (url_redirect) {
          let { source, destination, syntax } = url_redirect;
          if (!destination) {
            throw new Error("url.url_redirect.destination is required but was not provided.");
          }
          const requestUrl = request.url;
          response.setHeader("location", mapURL(requestUrl, source, interpolate_default(destination, this.context), syntax));
        } else {
          throw new Error("url.url_redirect is required but was not provided.");
        }
        throw new EarlyReturn("redirect");
      }
      toString() {
        return "ModRedirect";
      }
    };
  }
});

// src/runtime/RequestContext.ts
var import_cookie, EQUALS_EXPRESS, EQUALS, AND, OR, NOT_EQUALS_EXPRESS, NOT_EQUALS, MATCHES, NOT_MATCHES, GREATER_THAN, GREATER_THAN_OR_EQUALS, LESS_THAN, LESS_THAN_OR_EQUALS, IN, NOT_IN, RequestContext;
var init_RequestContext = __esm({
  "src/runtime/RequestContext.ts"() {
    "use strict";
    import_cookie = __toESM(require_cookie());
    init_toRegExp();
    init_CacheKey();
    init_EarlyReturn();
    init_first();
    init_Phase();
    init_ModRewrite();
    init_ModCache();
    init_ModAccess();
    init_ModSetEnv();
    init_ModProxyCore();
    init_ModProxyFeatures();
    init_ModRedirect();
    init_log();
    init_constants();
    init_origins();
    init_Origin();
    init_interpolate();
    init_LambdaResponse();
    init_toPathRegexp();
    EQUALS_EXPRESS = "==";
    EQUALS = "===";
    AND = "and";
    OR = "or";
    NOT_EQUALS_EXPRESS = "!=";
    NOT_EQUALS = "!==";
    MATCHES = "=~";
    NOT_MATCHES = "!~";
    GREATER_THAN = ">";
    GREATER_THAN_OR_EQUALS = ">=";
    LESS_THAN = "<";
    LESS_THAN_OR_EQUALS = "<=";
    IN = "in";
    NOT_IN = "not_in";
    RequestContext = class {
      constructor({
        request,
        response,
        propertyContext,
        rules,
        cache,
        functions,
        interpolationValues,
        variables,
        location,
        device
      }) {
        this.functions = [];
        this.bypassOrigin = false;
        this.bypassCache = false;
        this.bypassCacheByHonor = false;
        this.revalidate = false;
        this.followRedirects = false;
        this.ignoreUnsatisfiableRanges = false;
        this.revalidation = null;
        this.revalidateResponse = null;
        this.request = request;
        this.cacheKey = new CacheKey(request);
        this.response = response;
        this.propertyContext = propertyContext;
        this.rules = rules;
        this.cookies = (0, import_cookie.parse)(first(request.headers["cookie"] || ""));
        this.variables = variables ?? {};
        this.cache = cache;
        this.originalPath = this.request.path;
        this.originalQuery = this.request.query;
        this.originalQueryString = new URL(request.url, "http://localhost").search;
        this.functions = functions;
        this.interpolationValues = interpolationValues;
        this.device = device ?? {
          device_os: "iOS",
          brand_name: "Apple",
          dual_orientation: "true",
          html_preferred_dtd: "html5",
          image_inlining: "partial",
          is_android: "false",
          is_app: "true",
          is_full_desktop: "false",
          is_html_preferred: "true",
          is_ios: "true",
          is_largescreen: "true",
          is_mobile: "false",
          is_robot: "false",
          is_smartphone: "false",
          is_smarttv: "false",
          is_tablet: "false",
          is_touchscreen: "false",
          is_windows_phone: "false",
          is_wireless_device: "false",
          is_wml_preferred: "false",
          marketing_name: "iPhone",
          mobile_browser: "Safari",
          model_name: "iPhone",
          pointing_method: "touchscreen",
          preferred_markup: "html_wi_w3_xhtmlbasic",
          progressive_download: "true",
          release_date: "2011",
          resolution_height: "1136",
          resolution_width: "640",
          ux_full_desktop: "false",
          xhtml_support_level: "1"
        };
        this.location = location ?? {
          asn: "Telia Eesti",
          city: "Tallinn",
          continent: "Europe",
          dms_code: "",
          country: "EE",
          latitude: "59.433",
          longitude: "24.7323",
          postal_code: "11911",
          region_code: "EU"
        };
        const modRewrite = new ModRewrite(this);
        const modCache = new ModCache(this);
        const modAccess = new ModAccess(this);
        const modSetEnv = new ModSetEnv(this);
        const modProxyCore = new ModProxyCore(this);
        const modProxyFollowRedirects = new ModProxyFeatures(this);
        const modRedirect = new ModRedirect(this);
        this.revalidatePlan = [
          {
            phase: Phase_default.SendRequestContent,
            modules: [modProxyCore, modSetEnv]
          },
          {
            phase: Phase_default.HandleResponseDone,
            modules: [modCache, modSetEnv]
          }
        ];
        this.plan = [
          {
            phase: Phase_default.UriRaw,
            modules: [modRewrite]
          },
          {
            phase: Phase_default.UriClean,
            modules: [modAccess, modRedirect, modSetEnv, modCache, modProxyFollowRedirects]
          },
          {
            phase: Phase_default.HandleDocRoot,
            modules: [modCache]
          },
          ...this.revalidatePlan
        ];
      }
      async execute() {
        await this.executePlan();
        this.revalidation = new Promise((resolve2) => this.executeRevalidate().then(resolve2));
      }
      async executeServerless() {
        const hintHeader = this.request.getHeader(EDGIO_SERVERLESS_HINT_HEADER);
        if (!hintHeader) {
          log_default.trace("No serverless hints found.");
          return false;
        }
        const hintsWithValue = hintHeader.split(",");
        let exclusiveFound = false;
        const hintsToRun = [];
        const exclusiveRegexp = new RegExp(EDGIO_EXCLUSIVE_COMPUTE);
        for (let i = hintsWithValue.length - 1; i >= 0; i--) {
          const targetHint = hintsWithValue[i];
          const isExclusive = !!targetHint.match(exclusiveRegexp);
          if (!isExclusive || !exclusiveFound) {
            exclusiveFound = exclusiveFound || isExclusive;
            hintsToRun.unshift(targetHint);
          }
        }
        for (const hint of hintsToRun) {
          log_default.trace("Serverless hint", hint);
          await this.handleHint(hint);
        }
        return true;
      }
      async handleHint(hintWithValue) {
        const hint = hintWithValue.split(":").shift() || "";
        const value = hintWithValue.split(":").pop() || "";
        if (hint === EDGIO_SERVERLESS_HINTS.app) {
          await this.executeApp();
          return true;
        }
        if (hint === EDGIO_SERVERLESS_HINTS.compute || hint === EDGIO_SERVERLESS_HINTS.computeExclusive) {
          await this.executeCompute(Number(value));
          return true;
        }
        log_default.trace(`Serverless hint with name '${hint}' was not found.`);
        return false;
      }
      async executeApp() {
        log_default.debug(`skipping to app`);
        const appOrigin = this.propertyContext.getOrigin(SERVERLESS_ORIGIN_NAME);
        await new Origin(appOrigin).fetch(this.request, this.response);
      }
      async executeCompute(functionIndex) {
        const fn = this.functions[functionIndex];
        if (!fn) {
          throw new Error(`Serverless function with index ${functionIndex} not found.`);
        }
        log_default.debug(`skipping to compute, function #${functionIndex}`);
        await fn(this.request, this.response, this.propertyContext);
      }
      async executePlan() {
        try {
          for (let step of this.plan) {
            for (let mod of step.modules) {
              await mod.execute(step.phase);
            }
          }
        } catch (e) {
          if (!(e instanceof EarlyReturn)) {
            throw e;
          }
        }
      }
      async executeRevalidate() {
        if (this.revalidate) {
          try {
            this.revalidateResponse = new LambdaResponse();
            this.bypassOrigin = false;
            this.bypassCache = false;
            for (let step of this.revalidatePlan) {
              for (let mod of step.modules) {
                await mod.execute(step.phase);
              }
            }
          } catch (e) {
            return log_default.error(`An error occurred while revalidating ${this.request.url}`, e);
          }
          log_default.debug(`Revalidated ${this.originalPath}.`);
        }
      }
      forEachMatchingRule(callback) {
        this.rules.forEach((rule, i) => {
          this.callIfMatched(rule, callback, i);
        });
      }
      forLastMatchingRule(callback) {
        let isBreak = false;
        for (let i = this.rules.length - 1; i >= 0; i--) {
          const rule = this.rules[i];
          this.callIfMatched(rule, (features) => {
            if (callback(features)) {
              isBreak = true;
            }
          }, i);
          if (isBreak) {
            break;
          }
        }
      }
      callIfMatched(rule, callback, index) {
        let matches = rule;
        if (matches.if) {
          const conditional = matches.if[0];
          if (this.isTrue(conditional)) {
            this.callIfMatched(matches.if[1], callback, index);
          } else if (matches.if[2]) {
            this.callIfMatched(matches.if[2], callback, index);
          }
        } else {
          callback(rule, index);
        }
      }
      isTrue(conditional) {
        const operators = Object.keys(conditional);
        if (operators.length !== 1) {
          throw new Error(`Conditional statements must contain a single operator. The following operators were found: ${operators.join(", ")}`);
        } else if (conditional[OR]) {
          if (conditional[OR].every((c) => !this.isTrue(c))) {
            return false;
          }
        } else if (conditional[AND]) {
          if (conditional[AND].some((c) => !this.isTrue(c))) {
            return false;
          }
        } else if (conditional[EQUALS_EXPRESS]) {
          const [left, right] = conditional[EQUALS_EXPRESS].map((v) => this.eval(v));
          if (!toPathRegexp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[EQUALS]) {
          const [left, right] = conditional[EQUALS].map((v) => this.eval(v));
          if (left != right) {
            return false;
          }
        } else if (conditional[NOT_EQUALS_EXPRESS]) {
          const [left, right] = conditional[NOT_EQUALS_EXPRESS].map((v) => this.eval(v));
          if (toPathRegexp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[NOT_EQUALS]) {
          const [left, right] = conditional[NOT_EQUALS].map((v) => this.eval(v));
          if (left === right) {
            return false;
          }
        } else if (conditional[LESS_THAN]) {
          const [left, right] = conditional[LESS_THAN].map((v) => this.eval(v));
          if (!(Number(left) < Number(right))) {
            return false;
          }
        } else if (conditional[LESS_THAN_OR_EQUALS]) {
          const [left, right] = conditional[LESS_THAN_OR_EQUALS].map((v) => this.eval(v));
          if (!(Number(left) <= Number(right))) {
            return false;
          }
        } else if (conditional[GREATER_THAN]) {
          const [left, right] = conditional[GREATER_THAN].map((v) => this.eval(v));
          if (!(Number(left) > Number(right))) {
            return false;
          }
        } else if (conditional[GREATER_THAN_OR_EQUALS]) {
          const [left, right] = conditional[GREATER_THAN_OR_EQUALS].map((v) => this.eval(v));
          if (!(Number(left) >= Number(right))) {
            return false;
          }
        } else if (conditional[MATCHES]) {
          const [left, right] = conditional[MATCHES].map((v) => this.eval(v));
          if (!toRegExp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[NOT_MATCHES]) {
          const [left, right] = conditional[NOT_MATCHES].map((v) => this.eval(v));
          if (toRegExp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[IN]) {
          const left = this.eval(conditional[IN][0]);
          const right = conditional[IN][1];
          if (!right.some((v) => v === left))
            return false;
        } else if (conditional[NOT_IN]) {
          const left = this.eval(conditional[IN][0]);
          const right = conditional[IN][1];
          if (right.some((v) => v === left))
            return false;
        } else {
          throw new Error(`Unsupported operator "${Object.keys(conditional)[0]}".`);
        }
        return true;
      }
      eval(operand) {
        if (operand == null) {
          return operand;
        } else if (typeof operand === "string") {
          return operand;
        } else if (typeof operand === "boolean") {
          return operand;
        } else if (typeof operand === "number") {
          return operand;
        } else {
          return this.evalVariable(operand);
        }
      }
      evalVariable(variable) {
        if (variable.request) {
          switch (variable.request) {
            case "client_ip":
              return this.request.socket.remoteAddress;
            case "pop_code":
              return process.env.POP_CODE;
            case "method":
              return this.request.method.toUpperCase();
            case "origin_path":
              return this.request.path;
            case "path":
              return this.originalPath;
            case "origin_query_string":
              return this.request.url.split("?")[1];
            case "query":
              return this.originalQueryString;
            case "scheme":
              return this.request.secure ? "https" : "http";
            default: {
              throw new Error(`Unsupported request property "${variable.request}".`);
            }
          }
        } else if (variable["request.header"]) {
          const header = variable["request.header"];
          return first(this.request.headers[header]);
        } else if (variable["request.cookie"]) {
          const cookieName = variable["request.cookie"];
          return this.cookies[cookieName];
        } else if (variable["request.origin_query"]) {
          const param = variable["request.origin_query"];
          return this.request.query && this.request.query[param];
        } else if (variable.variable) {
          return this.variables[variable.variable];
        } else if (variable["request.path"]) {
          const param = variable["request.path"];
          return this.originalQuery && this.originalQuery[param];
        } else if (variable.location) {
          return this.location[variable.location];
        } else if (variable.random) {
          return Math.floor(Math.random() * (variable["random"] + 1));
        } else if (variable.device) {
          return this.device[variable.device];
        } else {
          throw new Error(`Unsupported variable "${Object.keys(variable)[0]}".`);
        }
      }
      getRequest() {
        return this.request;
      }
      getResponse() {
        return this.revalidateResponse ?? this.response;
      }
      setRequestHeader(feature, forceAppend) {
        return this.setHeader(this.getRequest(), feature, forceAppend);
      }
      setResponseHeader(feature, forceAppend) {
        return this.setHeader(this.getResponse(), feature, forceAppend);
      }
      setHeader(target, feature, allowMultiple) {
        var _a2;
        const targetFeature = interpolateObject(feature, this);
        for (let [name, value] of Object.entries(targetFeature)) {
          const evaluatedValue = (_a2 = this.eval(value)) == null ? void 0 : _a2.toString();
          if (evaluatedValue) {
            let outputHeader = evaluatedValue;
            if (name.startsWith("+")) {
              name = name.substring(1);
              const curVal = target.getHeader(name);
              if (curVal) {
                outputHeader = Array.isArray(curVal) ? curVal.map((value2) => value2 + "," + evaluatedValue) : curVal + "," + evaluatedValue;
              }
            } else {
              const curVal = target.getHeader(name);
              if (curVal && allowMultiple) {
                outputHeader = Array.isArray(curVal) ? [...curVal, evaluatedValue] : [curVal, evaluatedValue];
              }
            }
            target.setHeader(name, outputHeader);
          } else {
            target.removeHeader(name);
          }
        }
      }
      summarize() {
        return `${this.request.method.toUpperCase()} ${this.originalPath}${this.originalQueryString || ""}`;
      }
    };
  }
});

// src/runtime/createEdgeConfig.ts
function createEdgeConfig(context, router) {
  return JSON.stringify(createEdgeConfigObject(context, router), null, 2);
}
function createEdgeConfigObject(context, router) {
  const edgeConfig = {
    name: context.property.name,
    hostnames: context.property.hostnames,
    origins: context.origins,
    rules: router.rules
  };
  const rulesClone = JSON.parse(JSON.stringify(edgeConfig.rules));
  const rules = rulesClone.map((rule) => {
    var _a2;
    const then = rule.if[1];
    if ((_a2 = then == null ? void 0 : then.response) == null ? void 0 : _a2.set_response_body) {
      then.response.set_response_body = Buffer.from(then.response.set_response_body).toString("base64");
    }
    return rule;
  });
  return {
    ...edgeConfig,
    rules
  };
}
var init_createEdgeConfig = __esm({
  "src/runtime/createEdgeConfig.ts"() {
    "use strict";
  }
});

// src/runtime/RequestHandler.ts
var import_path7, RequestHandler;
var init_RequestHandler = __esm({
  "src/runtime/RequestHandler.ts"() {
    "use strict";
    import_path7 = require("path");
    init_config();
    init_Router();
    init_Cache();
    init_PropertyContext();
    init_RequestContext();
    init_environment();
    init_paths();
    init_createEdgeConfig();
    init_constants();
    RequestHandler = class {
      constructor(basedir, injectOrigins = []) {
        this.basedir = basedir;
        this.injectOrigins = injectOrigins;
        this.config = {};
        if (isCacheEnabled()) {
          this.cache = new Cache();
        }
        if (isProductionBuild()) {
          this.reload();
        }
      }
      reload() {
        this.config = this.withOrigins(getConfig(!isProductionBuild()));
        this.propertyContext = new PropertyContext(this.config);
        const routerPath = (0, import_path7.resolve)((0, import_path7.join)(this.basedir, ROUTES_FILE_NAME));
        delete require.cache[routerPath];
        this.router = Router.load(routerPath);
        if (this.cache) {
          this.cache.clear();
        }
      }
      withOrigins(config2) {
        return {
          ...config2,
          origins: [...config2.origins ?? [], ...this.injectOrigins]
        };
      }
      async handle(request, response) {
        try {
          if (this.router && this.propertyContext) {
            const context = new RequestContext({
              request,
              response,
              propertyContext: this.propertyContext,
              rules: this.router.rules,
              cache: this.cache,
              functions: this.router.functions,
              interpolationValues: this.config.intrepolationValues
            });
            const shouldRunServerless = request.getHeader(EDGIO_SERVERLESS_HINT_HEADER) !== void 0;
            if (shouldRunServerless) {
              await context.executeServerless();
            } else {
              await context.execute();
            }
            response.statusCode && response.writeHead(response.statusCode, response.statusMessage);
            response.end(response.body);
          } else {
            throw new Error("Server not yet initialized.");
          }
        } catch (e) {
          response.writeHead(500, "Internal Server Error");
          response.end(JSON.stringify({ error: e.stack }));
        }
      }
      createEdgeConfig() {
        if (this.router && this.propertyContext) {
          return createEdgeConfig(this.propertyContext, this.router);
        } else {
          throw new Error("Not yet initialized.");
        }
      }
      createPreloadConfig() {
        throw new Error("createPreloadConfig is not yet implemented.");
      }
    };
  }
});

// src/lambda/innerHandler.ts
var innerHandler_exports = {};
__export(innerHandler_exports, {
  default: () => innerHandler
});
async function innerHandler(event, instance2) {
  const invocation = new LambdaInvocation(instance2);
  invocation.start();
  const driLogger = deepRequestInspectionLogger(instance2);
  await ensureAppStarted(3001);
  switch (event.action) {
    case "getEdgeConfig":
      return new RequestHandler(process.cwd(), getEdgioOrigins(true)).createEdgeConfig();
    case "getPreloadConfig":
      return withLogging(() => requestHandler.createPreloadConfig());
  }
  let req, res, responsePromise;
  try {
    const reqResResult = reqResMapper_default(event, invocation);
    req = reqResResult.req;
    res = reqResResult.res;
    responsePromise = reqResResult.responsePromise;
  } catch (e) {
    return withLogging(() => {
      console.log("Failed to parse the event to get request and response data:", e.message, e.stack);
      return {
        body: Buffer.from('{"error":"Failed to parse the event to get request and response data"}'),
        isBase64Encoded: true,
        statusCode: 530,
        statusMessage: "Internal Edgio Error",
        multiValueHeaders: {}
      };
    });
  }
  return await withLogging(async () => {
    const headers = req.headers || {};
    driLogger.logDownstreamRequestInfo({
      method: req.method,
      path: req.url,
      host: headers["host"],
      headers,
      protocol: `${headers["x-edg-protocol"] || "https"}:`,
      ...getBodyLoggingData(req._rawBodyBase64, req.headers)
    });
    try {
      await ensureAppStarted(3001);
    } catch (error) {
      console.error(error);
      throw error;
    }
    withTimings(() => {
      return requestHandler.handle(req, res);
    })();
    return responsePromise.then((result) => {
      const headers2 = res.headers || {};
      driLogger.logDownstreamResponseInfo({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: headers2,
        ...getBodyLoggingData(result.body, res.headers)
      });
      return result;
    });
  }, req, instance2);
}
async function startApp(port) {
  const modulePath2 = (0, import_path8.join)(process.cwd(), pathForBackend(BACKENDS.js));
  if ((0, import_fs_extra.existsSync)(modulePath2)) {
    let prod = nonWebpackRequire(modulePath2);
    if (prod.default) {
      prod = prod.default;
    }
    const workingDir = process.cwd();
    await prod(port);
    process.chdir(workingDir);
  }
}
async function ensureAppStarted(port) {
  if (!appStartedPromise) {
    appStartedPromise = startApp(port);
  }
  return appStartedPromise;
}
function startLogging(req, lambdaInstance) {
  if (process.env.EDGIO_LOCAL !== "true" || process.env.EDGIO_LOCAL_CONSOLE_WRAP === "true") {
    stdStreamsWrapper_default.enable({
      clientIp: req && req.headers[HTTP_HEADERS.xEdgeClientIp],
      requestId: req && req.headers[HTTP_HEADERS.xRequestId],
      wi: lambdaInstance == null ? void 0 : lambdaInstance.id
    });
  }
}
function stopLogging() {
  stdStreamsWrapper_default.disable();
}
async function withLogging(action, req, lambdaInstance) {
  try {
    startLogging(req, lambdaInstance);
    return await action();
  } finally {
    stopLogging();
  }
}
var import_fs_extra, import_path8, requestHandler, appStartedPromise;
var init_innerHandler = __esm({
  "src/lambda/innerHandler.ts"() {
    "use strict";
    init_constants();
    import_fs_extra = __toESM(require_lib());
    import_path8 = require("path");
    init_paths();
    init_timing();
    init_nonWebpackRequire();
    init_reqResMapper();
    init_stdStreamsWrapper();
    init_getBodyLoggingData();
    init_lambdaInstance();
    init_RequestHandler();
    init_origins();
    requestHandler = new RequestHandler(process.cwd(), getEdgioOrigins());
  }
});

// src/lambda/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);
var { default: LambdaInstance3 } = (init_lambdaInstance(), __toCommonJS(lambdaInstance_exports));
var instance = new LambdaInstance3();
var { interceptRequests } = require_httpRequestInterceptor();
async function handler(event) {
  interceptRequests(event, {
    enableHttpRequestLogging: process.env.EDGIO_HTTP_REQUEST_LOGGING === "1",
    lambdaInstance: instance
  });
  return (async () => await (init_innerHandler(), __toCommonJS(innerHandler_exports)).default(event, instance))();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
//# sourceMappingURL=handler.js.map
