﻿var away;
(function (away) {
    (function (errors) {
        var Error = (function () {
            function Error(message, id, _name) {
                if (typeof message === "undefined") { message = ''; }
                if (typeof id === "undefined") { id = 0; }
                if (typeof _name === "undefined") { _name = ''; }
                this._errorID = 0;
                this._messsage = '';
                this._name = '';
                this._messsage = message;
                this._name = name;
                this._errorID = id;
            }
            Object.defineProperty(Error.prototype, "message", {
                get: /**
                *
                * @returns {string}
                */
                function () {
                    return this._messsage;
                },
                set: /**
                *
                * @param value
                */
                function (value) {
                    this._messsage = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Error.prototype, "name", {
                get: /**
                *
                * @returns {string}
                */
                function () {
                    return this._name;
                },
                set: /**
                *
                * @param value
                */
                function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Error.prototype, "errorID", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._errorID;
                },
                enumerable: true,
                configurable: true
            });
            return Error;
        })();
        errors.Error = Error;
    })(away.errors || (away.errors = {}));
    var errors = away.errors;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * Base event class
    * @class kurst.events.Event
    *
    * @author Karim Beyrouti
    */
    (function (events) {
        var Event = (function () {
            function Event(type) {
                /**
                * Type of event
                * @property type
                * @type String
                */
                this.type = undefined;
                /**
                * Reference to target object
                * @property target
                * @type Object
                */
                this.target = undefined;
                this.type = type;
            }
            /**
            * Clones the current event.
            * @return An exact duplicate of the current event.
            */
            Event.prototype.clone = function () {
                return new Event(this.type);
            };
            Event.COMPLETE = 'Event_Complete';
            Event.OPEN = 'Event_Open';

            Event.RESIZE = "resize";
            Event.CONTEXT3D_CREATE = "context3DCreate";
            Event.ERROR = "error";
            return Event;
        })();
        events.Event = Event;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        var LoaderEvent = (function (_super) {
            __extends(LoaderEvent, _super);
            /**
            * Create a new LoaderEvent object.
            * @param type The event type.
            * @param resource The loaded or parsed resource.
            * @param url The url of the loaded resource.
            */
            function LoaderEvent(type, url, isDependency, errmsg) {
                if (typeof url === "undefined") { url = null; }
                if (typeof isDependency === "undefined") { isDependency = false; }
                if (typeof errmsg === "undefined") { errmsg = null; }
                _super.call(this, type);

                this._url = url;
                this._message = errmsg;
                this._isDependency = isDependency;
            }
            Object.defineProperty(LoaderEvent.prototype, "url", {
                get: /**
                * The url of the loaded resource.
                */
                function () {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(LoaderEvent.prototype, "message", {
                get: /**
                * The error string on loadError.
                */
                function () {
                    return this._message;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(LoaderEvent.prototype, "isDependency", {
                get: /**
                * Indicates whether the event occurred while loading a dependency, as opposed
                * to the base file. Dependencies can be textures or other files that are
                * referenced by the base file.
                */
                function () {
                    return this._isDependency;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Clones the current event.
            * @return An exact duplicate of the current event.
            */
            LoaderEvent.prototype.clone = function () {
                return new LoaderEvent(this.type, this._url, this._isDependency, this._message);
            };
            LoaderEvent.LOAD_ERROR = "loadError";

            LoaderEvent.RESOURCE_COMPLETE = "resourceComplete";

            LoaderEvent.DEPENDENCY_COMPLETE = "dependencyComplete";
            return LoaderEvent;
        })(away.events.Event);
        events.LoaderEvent = LoaderEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    /*
    * Author: mr.doob / https://github.com/mrdoob/eventdispatcher.js/
    * TypeScript Conversion : Karim Beyrouti ( karim@kurst.co.uk )
    */
    ///<reference path="Event.ts" />
    /**
    * @module kurst.events
    */
    (function (events) {
        /**
        * Base class for dispatching events
        *
        * @class kurst.events.EventDispatcher
        *
        */
        var EventDispatcher = (function () {
            function EventDispatcher() {
                this.listeners = new Array();
            }
            /**
            * Add an event listener
            * @method addEventListener
            * @param {String} Name of event to add a listener for
            * @param {Function} Callback function
            * @param {Object} Target object listener is added to
            */
            EventDispatcher.prototype.addEventListener = function (type, listener, target) {
                if (this.listeners[type] === undefined) {
                    this.listeners[type] = new Array();
                }

                if (this.getEventListenerIndex(type, listener, target) === -1) {
                    var d = new EventData();
                    d.listener = listener;
                    d.type = type;
                    d.target = target;

                    this.listeners[type].push(d);
                }
            };

            /**
            * Remove an event listener
            * @method removeEventListener
            * @param {String} Name of event to remove a listener for
            * @param {Function} Callback function
            * @param {Object} Target object listener is added to
            */
            EventDispatcher.prototype.removeEventListener = function (type, listener, target) {
                var index = this.getEventListenerIndex(type, listener, target);

                if (index !== -1) {
                    this.listeners[type].splice(index, 1);
                }
            };

            /**
            * Dispatch an event
            * @method dispatchEvent
            * @param {Event} Event to dispatch
            */
            EventDispatcher.prototype.dispatchEvent = function (event) {
                var listenerArray = this.listeners[event.type];

                if (listenerArray !== undefined) {
                    this.lFncLength = listenerArray.length;
                    event.target = this;

                    var eventData;

                    for (var i = 0, l = this.lFncLength; i < l; i++) {
                        eventData = listenerArray[i];
                        eventData.listener.call(eventData.target, event);
                    }
                }
            };

            /**
            * get Event Listener Index in array. Returns -1 if no listener is added
            * @method getEventListenerIndex
            * @param {String} Name of event to remove a listener for
            * @param {Function} Callback function
            * @param {Object} Target object listener is added to
            */
            EventDispatcher.prototype.getEventListenerIndex = function (type, listener, target) {
                if (this.listeners[type] !== undefined) {
                    var a = this.listeners[type];
                    var l = a.length;
                    var d;

                    for (var c = 0; c < l; c++) {
                        d = a[c];

                        if (target == d.target && listener == d.listener) {
                            return c;
                        }
                    }
                }

                return -1;
            };

            /**
            * check if an object has an event listener assigned to it
            * @method hasListener
            * @param {String} Name of event to remove a listener for
            * @param {Function} Callback function
            * @param {Object} Target object listener is added to
            */
            EventDispatcher.prototype.hasEventListener = function (type, listener, target) {
                return (this.getEventListenerIndex(type, listener, target) !== -1);
            };
            return EventDispatcher;
        })();
        events.EventDispatcher = EventDispatcher;

        /**
        * Event listener data container
        */
        var EventData = (function () {
            function EventData() {
            }
            return EventData;
        })();
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        //import flash.events.Event;
        var ParserEvent = (function (_super) {
            __extends(ParserEvent, _super);
            function ParserEvent(type, message) {
                if (typeof message === "undefined") { message = ''; }
                _super.call(this, type);

                this._message = message;
            }
            Object.defineProperty(ParserEvent.prototype, "message", {
                get: /**
                * Additional human-readable message. Usually supplied for ParserEvent.PARSE_ERROR events.
                */
                function () {
                    return this._message;
                },
                enumerable: true,
                configurable: true
            });

            ParserEvent.prototype.clone = function () {
                return new away.events.ParserEvent(this.type, this.message);
            };
            ParserEvent.PARSE_COMPLETE = 'parseComplete';

            ParserEvent.PARSE_ERROR = 'parseError';

            ParserEvent.READY_FOR_DEPENDENCIES = 'readyForDependencies';
            return ParserEvent;
        })(away.events.Event);
        events.ParserEvent = ParserEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    (function (loaders) {
        var AssetLoaderContext = (function () {
            /**
            * AssetLoaderContext provides configuration for the AssetLoader load() and parse() operations.
            * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
            * embedded data.
            *
            * @see away3d.loading.AssetLoader
            */
            function AssetLoaderContext(includeDependencies, dependencyBaseUrl) {
                if (typeof includeDependencies === "undefined") { includeDependencies = true; }
                if (typeof dependencyBaseUrl === "undefined") { dependencyBaseUrl = null; }
                this._includeDependencies = includeDependencies;
                this._dependencyBaseUrl = dependencyBaseUrl || '';
                this._embeddedDataByUrl = {};
                this._remappedUrls = {};
                this._materialMode = AssetLoaderContext.UNDEFINED;
            }
            Object.defineProperty(AssetLoaderContext.prototype, "includeDependencies", {
                get: /**
                * Defines whether dependencies (all files except the one at the URL given to the load() or
                * parseData() operations) should be automatically loaded. Defaults to true.
                */
                function () {
                    return this._includeDependencies;
                },
                set: function (val) {
                    this._includeDependencies = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLoaderContext.prototype, "materialMode", {
                get: /**
                * MaterialMode defines, if the Parser should create SinglePass or MultiPass Materials
                * Options:
                * 0 (Default / undefined) - All Parsers will create SinglePassMaterials, but the AWD2.1parser will create Materials as they are defined in the file
                * 1 (Force SinglePass) - All Parsers create SinglePassMaterials
                * 2 (Force MultiPass) - All Parsers will create MultiPassMaterials
                *
                */
                function () {
                    return this._materialMode;
                },
                set: function (materialMode) {
                    this._materialMode = materialMode;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLoaderContext.prototype, "dependencyBaseUrl", {
                get: /**
                * A base URL that will be prepended to all relative dependency URLs found in a loaded resource.
                * Absolute paths will not be affected by the value of this property.
                */
                function () {
                    return this._dependencyBaseUrl;
                },
                set: function (val) {
                    this._dependencyBaseUrl = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLoaderContext.prototype, "overrideAbsolutePaths", {
                get: /**
                * Defines whether absolute paths (defined as paths that begin with a "/") should be overridden
                * with the dependencyBaseUrl defined in this context. If this is true, and the base path is
                * "base", /path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
                */
                function () {
                    return this._overrideAbsPath;
                },
                set: function (val) {
                    this._overrideAbsPath = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLoaderContext.prototype, "overrideFullURLs", {
                get: /**
                * Defines whether "full" URLs (defined as a URL that includes a scheme, e.g. http://) should be
                * overridden with the dependencyBaseUrl defined in this context. If this is true, and the base
                * path is "base", http://example.com/path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
                */
                function () {
                    return this._overrideFullUrls;
                },
                set: function (val) {
                    this._overrideFullUrls = val;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * Map a URL to another URL, so that files that are referred to by the original URL will instead
            * be loaded from the new URL. Use this when your file structure does not match the one that is
            * expected by the loaded file.
            *
            * @param originalUrl The original URL which is referenced in the loaded resource.
            * @param newUrl The URL from which Away3D should load the resource instead.
            *
            * @see mapUrlToData()
            */
            AssetLoaderContext.prototype.mapUrl = function (originalUrl, newUrl) {
                this._remappedUrls[originalUrl] = newUrl;
            };

            /**
            * Map a URL to embedded data, so that instead of trying to load a dependency from the URL at
            * which it's referenced, the dependency data will be retrieved straight from the memory instead.
            *
            * @param originalUrl The original URL which is referenced in the loaded resource.
            * @param data The embedded data. Can be ByteArray or a class which can be used to create a bytearray.
            */
            AssetLoaderContext.prototype.mapUrlToData = function (originalUrl, data) {
                this._embeddedDataByUrl[originalUrl] = data;
            };

            /**
            * @private
            * Defines whether embedded data has been mapped to a particular URL.
            */
            AssetLoaderContext.prototype._iHasDataForUrl = function (url) {
                return this._embeddedDataByUrl.hasOwnProperty(url);
            };

            /**
            * @private
            * Returns embedded data for a particular URL.
            */
            AssetLoaderContext.prototype._iGetDataForUrl = function (url) {
                return this._embeddedDataByUrl[url];
            };

            /**
            * @private
            * Defines whether a replacement URL has been mapped to a particular URL.
            */
            AssetLoaderContext.prototype._iHasMappingForUrl = function (url) {
                return this._remappedUrls.hasOwnProperty(url);
            };

            /**
            * @private
            * Returns new (replacement) URL for a particular original URL.
            */
            AssetLoaderContext.prototype._iGetRemappedUrl = function (originalUrl) {
                return this._remappedUrls[originalUrl];
            };
            AssetLoaderContext.UNDEFINED = 0;
            AssetLoaderContext.SINGLEPASS_MATERIALS = 1;
            AssetLoaderContext.MULTIPASS_MATERIALS = 2;
            return AssetLoaderContext;
        })();
        loaders.AssetLoaderContext = AssetLoaderContext;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../AssetLoader.ts" />
    (function (loaders) {
        //import away3d.arcane;
        //import away3d.events.AssetEvent;
        //import away3d.events.LoaderEvent;
        //import away3d.loaders.AssetLoader;
        //import flash.events.Event;
        //import flash.events.EventDispatcher;
        //use namespace arcane;
        /**
        * Dispatched when any asset finishes parsing. Also see specific events for each
        * individual asset type (meshes, materials et c.)
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="assetComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a full resource (including dependencies) finishes loading.
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="resourceComplete", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when a single dependency (which may be the main file of a resource)
        * finishes loading.
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="dependencyComplete", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when an error occurs during loading. I
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="loadError", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when an error occurs during parsing.
        *
        * @eventType away3d.events.ParserEvent
        */
        //[Event(name="parseError", type="away3d.events.ParserEvent")]
        /**
        * Dispatched when a skybox asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skyboxComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a camera3d asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="cameraComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a mesh asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="meshComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a geometry asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="geometryComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a skeleton asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skeletonComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a skeleton pose asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skeletonPoseComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a container asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="containerComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a texture asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="textureComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a texture projector asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="textureProjectorComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a material asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="materialComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a animator asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animatorComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation set has been constructed from a group of animation state resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationSetComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation state has been constructed from a group of animation node resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationStateComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation node has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationNodeComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation state transition has been constructed from a group of animation node resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="stateTransitionComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an light asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="lightComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an light picker asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="lightPickerComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an effect method asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="effectMethodComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an shadow map method asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="shadowMapMethodComplete", type="away3d.events.AssetEvent")]
        /**
        * Instances of this class are returned as tokens by loading operations
        * to provide an object on which events can be listened for in cases where
        * the actual asset loader is not directly available (e.g. when using the
        * AssetLibrary to perform the load.)
        *
        * By listening for events on this class instead of directly on the
        * AssetLibrary, one can distinguish different loads from each other.
        *
        * The token will dispatch all events that the original AssetLoader dispatches,
        * while not providing an interface to obstruct the load and is as such a
        * safer return value for loader wrappers than the loader itself.
        */
        var AssetLoaderToken = (function (_super) {
            __extends(AssetLoaderToken, _super);
            function AssetLoaderToken(loader) {
                _super.call(this);

                this._iLoader = loader;
            }
            AssetLoaderToken.prototype.addEventListener = function (type, listener, target) {
                this._iLoader.addEventListener(type, listener, target);
            };

            AssetLoaderToken.prototype.removeEventListener = function (type, listener, target) {
                this._iLoader.removeEventListener(type, listener, target);
            };

            AssetLoaderToken.prototype.hasEventListener = function (type, listener, target) {
                return this._iLoader.hasEventListener(type, listener, target);
            };
            return AssetLoaderToken;
        })(away.events.EventDispatcher);
        loaders.AssetLoaderToken = AssetLoaderToken;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        var IOErrorEvent = (function (_super) {
            __extends(IOErrorEvent, _super);
            function IOErrorEvent(type) {
                _super.call(this, type);
            }
            IOErrorEvent.IO_ERROR = "IOErrorEvent_IO_ERROR";
            return IOErrorEvent;
        })(away.events.Event);
        events.IOErrorEvent = IOErrorEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    (function (net) {
        var URLRequestMethod = (function () {
            function URLRequestMethod() {
            }
            URLRequestMethod.POST = 'POST';

            URLRequestMethod.GET = 'GET';
            return URLRequestMethod;
        })();
        net.URLRequestMethod = URLRequestMethod;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../events/EventDispatcher.ts" />
    (function (net) {
        var URLVariables = (function () {
            /**
            *
            * @param source
            */
            function URLVariables(source) {
                if (typeof source === "undefined") { source = null; }
                this._variables = new Object();
                if (source !== null) {
                    this.decode(source);
                }
            }
            /**
            *
            * @param source
            */
            URLVariables.prototype.decode = function (source) {
                source = source.split("+").join(" ");

                var tokens, re = /[?&]?([^=]+)=([^&]*)/g;

                while (tokens = re.exec(source)) {
                    this._variables[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
                }
            };

            /**
            *
            * @returns {string}
            */
            URLVariables.prototype.toString = function () {
                return '';
            };

            Object.defineProperty(URLVariables.prototype, "variables", {
                get: /**
                *
                * @returns {Object}
                */
                function () {
                    return this._variables;
                },
                set: /**
                *
                * @returns {Object}
                */
                function (obj) {
                    this._variables = obj;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(URLVariables.prototype, "formData", {
                get: /**
                *
                * @returns {Object}
                */
                function () {
                    var fd = new FormData();

                    for (var s in this._variables) {
                        fd.append(s, this._variables[s]);
                    }

                    return fd;
                },
                enumerable: true,
                configurable: true
            });

            return URLVariables;
        })();
        net.URLVariables = URLVariables;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="URLRequestMethod.ts" />
    ///<reference path="URLVariables.ts" />
    (function (net) {
        /**
        *
        */
        var URLRequest = (function () {
            /**
            
            * @param url
            */
            function URLRequest(url) {
                if (typeof url === "undefined") { url = null; }
                /**
                *
                * away.net.URLRequestMethod.GET
                * away.net.URLRequestMethod.POST
                *
                * @type {string}
                */
                this.method = away.net.URLRequestMethod.GET;
                /**
                * Use asynchronous XMLHttpRequest
                * @type {boolean}
                */
                this.async = true;
                this._url = url;
            }
            Object.defineProperty(URLRequest.prototype, "url", {
                get: /**
                *
                * @returns {string}
                */
                function () {
                    return this._url;
                },
                set: /**
                *
                * @param value
                */
                function (value) {
                    this._url = value;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * dispose
            */
            URLRequest.prototype.dispose = function () {
                this.data = null;
                this._url = null;
                this.method = null;
                this.async = null;
            };
            return URLRequest;
        })();
        net.URLRequest = URLRequest;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="../events/Event.ts" />
    ///<reference path="../events/IOErrorEvent.ts" />
    ///<reference path="URLRequest.ts" />
    (function (net) {
        // TODO: implement / test cross domain policy
        var IMGLoader = (function (_super) {
            __extends(IMGLoader, _super);
            function IMGLoader(imageName) {
                if (typeof imageName === "undefined") { imageName = ''; }
                _super.call(this);
                this._name = '';
                this._loaded = false;
                this._name = imageName;
                this.initImage();
            }
            // Public
            /**
            * load an image
            * @param request {away.net.URLRequest}
            */
            IMGLoader.prototype.load = function (request) {
                this._loaded = false;
                this._request = request;

                if (this._crossOrigin) {
                    if (this._image['crossOrigin'] != null) {
                        this._image['crossOrigin'] = this._crossOrigin;
                    }
                }

                this._image.src = this._request.url;
            };

            /**
            *
            */
            IMGLoader.prototype.dispose = function () {
                if (this._image) {
                    this._image.onabort = null;
                    this._image.onerror = null;
                    this._image.onload = null;
                    this._image = null;
                }

                if (this._request) {
                    this._request = null;
                }
            };

            Object.defineProperty(IMGLoader.prototype, "image", {
                get: // Get / Set
                /**
                * Get reference to image if it is loaded
                * @returns {HTMLImageElement}
                */
                function () {
                    return this._image;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IMGLoader.prototype, "loaded", {
                get: /**
                * Get image width. Returns null is image is not loaded
                * @returns {number}
                */
                function () {
                    return this._loaded;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IMGLoader.prototype, "crossOrigin", {
                get: function () {
                    return this._crossOrigin;
                },
                set: function (value) {
                    this._crossOrigin = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IMGLoader.prototype, "width", {
                get: /**
                * Get image width. Returns null is image is not loaded
                * @returns {number}
                */
                function () {
                    if (this._image) {
                        return this._image.width;
                    }

                    return null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IMGLoader.prototype, "height", {
                get: /**
                * Get image height. Returns null is image is not loaded
                * @returns {number}
                */
                function () {
                    if (this._image) {
                        return this._image.height;
                    }

                    return null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IMGLoader.prototype, "request", {
                get: /**
                * return URL request used to load image
                * @returns {away.net.URLRequest}
                */
                function () {
                    return this._request;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IMGLoader.prototype, "name", {
                get: /**
                * get name of HTMLImageElement
                * @returns {string}
                */
                function () {
                    if (this._image) {
                        return this._image.name;
                    }

                    return this._name;
                },
                set: /**
                * set name of HTMLImageElement
                * @returns {string}
                */
                function (value) {
                    if (this._image) {
                        this._image.name = value;
                    }

                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });


            // Private
            /**
            * intialise the image object
            */
            IMGLoader.prototype.initImage = function () {
                var _this = this;
                if (!this._image) {
                    this._image = new Image();
                    this._image.onabort = function (event) {
                        return _this.onAbort(event);
                    };
                    this._image.onerror = function (event) {
                        return _this.onError(event);
                    };
                    this._image.onload = function (event) {
                        return _this.onLoadComplete(event);
                    };
                    this._image.name = this._name;
                }
            };

            // Image - event handlers
            /**
            * Loading of an image is interrupted
            * @param event
            */
            IMGLoader.prototype.onAbort = function (event) {
                this.dispatchEvent(new away.events.Event(away.events.IOErrorEvent.IO_ERROR));
            };

            /**
            * An error occured when loading the image
            * @param event
            */
            IMGLoader.prototype.onError = function (event) {
                this.dispatchEvent(new away.events.Event(away.events.IOErrorEvent.IO_ERROR));
            };

            /**
            * image is finished loading
            * @param event
            */
            IMGLoader.prototype.onLoadComplete = function (event) {
                this._loaded = true;
                this.dispatchEvent(new away.events.Event(away.events.Event.COMPLETE));
            };
            return IMGLoader;
        })(away.events.EventDispatcher);
        net.IMGLoader = IMGLoader;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        geom.Point = Point;
    })(away.geom || (away.geom = {}));
    var geom = away.geom;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="Point.ts" />
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "topLeft", {
                get: function () {
                    return new away.geom.Point(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "bottomRight", {
                get: function () {
                    return new away.geom.Point(this.x + this.width, this.y + this.height);
                },
                enumerable: true,
                configurable: true
            });

            Rectangle.prototype.clone = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            return Rectangle;
        })();
        geom.Rectangle = Rectangle;
    })(away.geom || (away.geom = {}));
    var geom = away.geom;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * @author Gary Paluk
    * @created 6/29/13
    * @module away.geom
    */
    (function (geom) {
        var Vector3D = (function () {
            /**
            * Creates an instance of a Vector3D object.
            */
            function Vector3D(x, y, z, w) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                if (typeof w === "undefined") { w = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            Object.defineProperty(Vector3D.prototype, "length", {
                get: /**
                * [read-only] The length, magnitude, of the current Vector3D object from the origin (0,0,0) to the object's
                * x, y, and z coordinates.
                * @returns The length of the Vector3D
                */
                function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Vector3D.prototype, "lengthSquared", {
                get: /**
                * [read-only] The square of the length of the current Vector3D object, calculated using the x, y, and z
                * properties.
                * @returns The squared length of the vector
                */
                function () {
                    return (this.x * this.x + this.y * this.y + this.z + this.z);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Adds the value of the x, y, and z elements of the current Vector3D object to the values of the x, y, and z
            * elements of another Vector3D object.
            */
            Vector3D.prototype.add = function (a) {
                return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
            };

            Vector3D.angleBetween = /**
            * [static] Returns the angle in radians between two vectors.
            */
            function (a, b) {
                return Math.acos(a.dotProduct(b) / (a.length * b.length));
            };

            /**
            * Returns a new Vector3D object that is an exact copy of the current Vector3D object.
            */
            Vector3D.prototype.clone = function () {
                return new Vector3D(this.x, this.y, this.z, this.w);
            };

            /**
            * Copies all of vector data from the source Vector3D object into the calling Vector3D object.
            */
            Vector3D.prototype.copyFrom = function (src) {
                return new Vector3D(src.x, src.y, src.z, src.w);
            };

            /**
            * Returns a new Vector3D object that is perpendicular (at a right angle) to the current Vector3D and another
            * Vector3D object.
            */
            Vector3D.prototype.crossProduct = function (a) {
                return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
            };

            /**
            * Decrements the value of the x, y, and z elements of the current Vector3D object by the values of the x, y,
            * and z elements of specified Vector3D object.
            */
            Vector3D.prototype.decrementBy = function (a) {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
            };

            Vector3D.distance = /**
            * [static] Returns the distance between two Vector3D objects.
            */
            function (pt1, pt2) {
                var x = (pt1.x - pt2.x);
                var y = (pt1.y - pt2.y);
                var z = (pt1.z - pt2.z);
                return Math.sqrt(x * x + y * y + z * z);
            };

            /**
            * If the current Vector3D object and the one specified as the parameter are unit vertices, this method returns
            * the cosine of the angle between the two vertices.
            */
            Vector3D.prototype.dotProduct = function (a) {
                return this.x * a.x + this.y * a.y + this.z * a.z;
            };

            /**
            * Determines whether two Vector3D objects are equal by comparing the x, y, and z elements of the current
            * Vector3D object with a specified Vector3D object.
            */
            Vector3D.prototype.equals = function (cmp, allFour) {
                if (typeof allFour === "undefined") { allFour = false; }
                return (this.x == cmp.x && this.y == cmp.y && this.z == cmp.z && (!allFour || this.w == cmp.w));
            };

            /**
            * Increments the value of the x, y, and z elements of the current Vector3D object by the values of the x, y,
            * and z elements of a specified Vector3D object.
            */
            Vector3D.prototype.incrementBy = function (a) {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            };

            /**
            * Compares the elements of the current Vector3D object with the elements of a specified Vector3D object to
            * determine whether they are nearly equal.
            */
            Vector3D.prototype.nearEquals = function (cmp, epsilon, allFour) {
                if (typeof allFour === "undefined") { allFour = true; }
                return ((Math.abs(this.x - cmp.x) < epsilon) && (Math.abs(this.y - cmp.y) < epsilon) && (Math.abs(this.z - cmp.z) < epsilon) && (!allFour || Math.abs(this.w - cmp.w) < epsilon));
            };

            /**
            * Sets the current Vector3D object to its inverse.
            */
            Vector3D.prototype.negate = function () {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
            };

            /**
            * Converts a Vector3D object to a unit vector by dividing the first three elements (x, y, z) by the length of
            * the vector.
            */
            Vector3D.prototype.normalize = function () {
                var invLength = 1 / this.length;
                if (invLength != 0) {
                    this.x *= invLength;
                    this.y *= invLength;
                    this.z *= invLength;
                    return;
                }
                throw "Cannot divide by zero.";
            };

            /**
            * Divides the value of the x, y, and z properties of the current Vector3D object by the value of its w
            * property.
            */
            Vector3D.prototype.project = function () {
                this.x /= this.w;
                this.y /= this.w;
                this.z /= this.w;
            };

            /**
            * Scales the current Vector3D object by a scalar, a magnitude.
            */
            Vector3D.prototype.scaleBy = function (s) {
                this.x *= s;
                this.y *= s;
                this.z *= s;
            };

            /**
            * Sets the members of Vector3D to the specified values
            */
            Vector3D.prototype.setTo = function (xa, ya, za) {
                this.x = xa;
                this.y = ya;
                this.z = za;
            };

            /**
            * Subtracts the value of the x, y, and z elements of the current Vector3D object from the values of the x, y,
            * and z elements of another Vector3D object.
            */
            Vector3D.prototype.subtract = function (a) {
                return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
            };

            /**
            * Returns a string representation of the current Vector3D object.
            */
            Vector3D.prototype.toString = function () {
                return "[Vector3D] (x:" + this.x + " ,y:" + this.y + ", z" + this.z + ", w:" + this.w + ")";
            };
            return Vector3D;
        })();
        geom.Vector3D = Vector3D;
    })(away.geom || (away.geom = {}));
    var geom = away.geom;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Error.ts" />
    (function (errors) {
        /**
        * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
        * by a concrete subclass.
        */
        var ArgumentError = (function (_super) {
            __extends(ArgumentError, _super);
            /**
            * Create a new AbstractMethodError.
            * @param message An optional message to override the default error message.
            * @param id The id of the error.
            */
            function ArgumentError(message, id) {
                if (typeof message === "undefined") { message = null; }
                if (typeof id === "undefined") { id = 0; }
                _super.call(this, message || "ArgumentError", id);
            }
            return ArgumentError;
        })(errors.Error);
        errors.ArgumentError = ArgumentError;
    })(away.errors || (away.errors = {}));
    var errors = away.errors;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Point.ts" />
    ///<reference path="Vector3D.ts" />
    ///<reference path="../errors/ArgumentError.ts" />
    (function (geom) {
        var Matrix = (function () {
            function Matrix(a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
            }
            /**
            *
            * @returns {away.geom.Matrix}
            */
            Matrix.prototype.clone = function () {
                return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            };

            /**
            *
            * @param m
            */
            Matrix.prototype.concat = function (m) {
                var a1 = this.a * m.a + this.b * m.c;
                this.b = this.a * m.b + this.b * m.d;
                this.a = a1;

                var c1 = this.c * m.a + this.d * m.c;
                this.d = this.c * m.b + this.d * m.d;

                this.c = c1;

                var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
                this.ty = this.tx * m.b + this.ty * m.d + m.ty;
                this.tx = tx1;
            };

            /**
            *
            * @param column
            * @param vector3D
            */
            Matrix.prototype.copyColumnFrom = function (column, vector3D) {
                if (column > 2) {
                    throw "Column " + column + " out of bounds (2)";
                } else if (column == 0) {
                    this.a = vector3D.x;
                    this.c = vector3D.y;
                } else if (column == 1) {
                    this.b = vector3D.x;
                    this.d = vector3D.y;
                } else {
                    this.tx = vector3D.x;
                    this.ty = vector3D.y;
                }
            };

            /**
            *
            * @param column
            * @param vector3D
            */
            Matrix.prototype.copyColumnTo = function (column, vector3D) {
                if (column > 2) {
                    throw new away.errors.ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 2]");
                } else if (column == 0) {
                    vector3D.x = this.a;
                    vector3D.y = this.c;
                    vector3D.z = 0;
                } else if (column == 1) {
                    vector3D.x = this.b;
                    vector3D.y = this.d;
                    vector3D.z = 0;
                } else {
                    vector3D.x = this.tx;
                    vector3D.y = this.ty;
                    vector3D.z = 1;
                }
            };

            /**
            *
            * @param other
            */
            Matrix.prototype.copyFrom = function (other) {
                this.a = other.a;
                this.b = other.b;
                this.c = other.c;
                this.d = other.d;
                this.tx = other.tx;
                this.ty = other.ty;
            };

            /**
            *
            * @param row
            * @param vector3D
            */
            Matrix.prototype.copyRowFrom = function (row, vector3D) {
                if (row > 2) {
                    throw new away.errors.ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
                } else if (row == 0) {
                    this.a = vector3D.x;
                    this.c = vector3D.y;
                } else if (row == 1) {
                    this.b = vector3D.x;
                    this.d = vector3D.y;
                } else {
                    this.tx = vector3D.x;
                    this.ty = vector3D.y;
                }
            };

            /**
            *
            * @param row
            * @param vector3D
            */
            Matrix.prototype.copyRowTo = function (row, vector3D) {
                if (row > 2) {
                    throw new away.errors.ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
                } else if (row == 0) {
                    vector3D.x = this.a;
                    vector3D.y = this.b;
                    vector3D.z = this.tx;
                } else if (row == 1) {
                    vector3D.x = this.c;
                    vector3D.y = this.d;
                    vector3D.z = this.ty;
                } else {
                    vector3D.setTo(0, 0, 1);
                }
            };

            /**
            *
            * @param scaleX
            * @param scaleY
            * @param rotation
            * @param tx
            * @param ty
            */
            Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = scaleX;
                this.d = scaleY;
                this.b = rotation;
                this.tx = tx;
                this.ty = ty;
            };

            /**
            *
            * @param width
            * @param height
            * @param rotation
            * @param tx
            * @param ty
            */
            Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = width / 1638.4;
                this.d = height / 1638.4;

                if (rotation != 0.0) {
                    var cos = Math.cos(rotation);
                    var sin = Math.sin(rotation);

                    this.b = sin * this.d;
                    this.c = -sin * this.a;
                    this.a *= cos;
                    this.d *= cos;
                } else {
                    this.b = this.c = 0;
                }

                this.tx = tx + width / 2;
                this.ty = ty + height / 2;
            };

            /**
            *
            * @param point
            * @returns {away.geom.Point}
            */
            Matrix.prototype.deltaTransformPoint = function (point) {
                return new away.geom.Point(point.x * this.a + point.y * this.c, point.x * this.b + point.y * this.d);
            };

            /**
            *
            */
            Matrix.prototype.identity = function () {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
            };

            /**
            *
            * @returns {away.geom.Matrix}
            */
            Matrix.prototype.invert = function () {
                var norm = this.a * this.d - this.b * this.c;

                if (norm == 0) {
                    this.a = this.b = this.c = this.d = 0;
                    this.tx = -this.tx;
                    this.ty = -this.ty;
                } else {
                    norm = 1.0 / norm;
                    var a1 = this.d * norm;
                    this.d = this.a * norm;
                    this.a = a1;
                    this.b *= -norm;
                    this.c *= -norm;

                    var tx1 = -this.a * this.tx - this.c * this.ty;
                    this.ty = -this.b * this.tx - this.d * this.ty;
                    this.tx = tx1;
                }

                return this;
            };

            /**
            *
            * @param m
            * @returns {away.geom.Matrix}
            */
            Matrix.prototype.mult = function (m) {
                var result = new Matrix();

                result.a = this.a * m.a + this.b * m.c;
                result.b = this.a * m.b + this.b * m.d;
                result.c = this.c * m.a + this.d * m.c;
                result.d = this.c * m.b + this.d * m.d;

                result.tx = this.tx * m.a + this.ty * m.c + m.tx;
                result.ty = this.tx * m.b + this.ty * m.d + m.ty;

                return result;
            };

            /**
            *
            * @param angle
            */
            Matrix.prototype.rotate = function (angle) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);

                var a1 = this.a * cos - this.b * sin;
                this.b = this.a * sin + this.b * cos;
                this.a = a1;

                var c1 = this.c * cos - this.d * sin;
                this.d = this.c * sin + this.d * cos;
                this.c = c1;

                var tx1 = this.tx * cos - this.ty * sin;
                this.ty = this.tx * sin + this.ty * cos;
                this.tx = tx1;
            };

            /**
            *
            * @param x
            * @param y
            */
            Matrix.prototype.scale = function (x, y) {
                this.a *= x;
                this.b *= y;

                this.c *= x;
                this.d *= y;

                this.tx *= x;
                this.ty *= y;
            };

            /**
            *
            * @param angle
            * @param scale
            */
            Matrix.prototype.setRotation = function (angle, scale) {
                if (typeof scale === "undefined") { scale = 1; }
                this.a = Math.cos(angle) * scale;
                this.c = Math.sin(angle) * scale;
                this.b = -this.c;
                this.d = this.a;
            };

            /**
            *
            * @param a
            * @param b
            * @param c
            * @param d
            * @param tx
            * @param ty
            */
            Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
            };

            /**
            *
            * @returns {string}
            */
            Matrix.prototype.toString = function () {
                return "[Matrix] (a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
            };

            /**
            *
            * @param point
            * @returns {away.geom.Point}
            */
            Matrix.prototype.transformPoint = function (point) {
                return new away.geom.Point(point.x * this.a + point.y * this.c + this.tx, point.x * this.b + point.y * this.d + this.ty);
            };

            /**
            *
            * @param x
            * @param y
            */
            Matrix.prototype.translate = function (x, y) {
                this.tx += x;
                this.ty += y;
            };
            return Matrix;
        })();
        geom.Matrix = Matrix;
    })(away.geom || (away.geom = {}));
    var geom = away.geom;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../net/IMGLoader.ts" />
    ///<reference path="../geom/Rectangle.ts" />
    ///<reference path="../geom/Point.ts" />
    ///<reference path="../geom/Matrix.ts" />
    (function (display) {
        /**
        *
        */
        var BitmapData = (function () {
            /**
            *
            * @param width
            * @param height
            * @param transparent
            * @param fillColor
            */
            function BitmapData(width, height, transparent, fillColor) {
                if (typeof transparent === "undefined") { transparent = true; }
                if (typeof fillColor === "undefined") { fillColor = null; }
                this._locked = false;
                this._transparent = transparent;
                this._imageCanvas = document.createElement("canvas");
                this._imageCanvas.width = width;
                this._imageCanvas.height = height;
                this._context = this._imageCanvas.getContext("2d");
                this._rect = new away.geom.Rectangle(0, 0, width, height);

                if (fillColor) {
                    this.fillRect(this._rect, fillColor);
                }
            }
            // Public
            /*
            public draw ( source : BitmapData, matrix : away.geom.Matrix = null ) //, colorTransform, blendMode, clipRect, smoothing) {
            {
            
            var sourceMatrix : away.geom.Matrix     = ( matrix === null ) ? matrix : new  away.geom.Matrix();
            var sourceRect : away.geom.Rectangle    = new away.geom.Rectangle(0, 0, source.width, source.height);
            
            this._imageCanvas.width     = source.width;
            this._imageCanvas.height    = source.height;
            
            this._context.transform(
            sourceMatrix.a,
            sourceMatrix.b,
            sourceMatrix.c,
            sourceMatrix.d,
            sourceMatrix.tx,
            sourceMatrix.ty);
            
            this.copyPixels(source , source.rect , source.rect );
            }
            */
            /**
            *
            */
            BitmapData.prototype.dispose = function () {
                this._context = null;
                this._imageCanvas = null;
                this._imageData = null;
                this._rect = null;
                this._transparent = null;
                this._locked = null;
            };

            /**
            *
            */
            BitmapData.prototype.lock = function () {
                this._locked = true;
                this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
            };

            /**
            *
            */
            BitmapData.prototype.unlock = function () {
                this._locked = false;

                if (this._imageData) {
                    this._context.putImageData(this._imageData, 0, 0);
                    this._imageData = null;
                }
            };

            /**
            *
            * @param x
            * @param y
            * @param r
            * @param g
            * @param b
            * @param a
            */
            BitmapData.prototype.setPixel = function (x, y, r, g, b, a) {
                if (!this._locked) {
                    this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
                }

                if (this._imageData) {
                    var index = (x + y * this._imageCanvas.width) * 4;

                    this._imageData.data[index + 0] = r;
                    this._imageData.data[index + 1] = g;
                    this._imageData.data[index + 2] = b;
                    this._imageData.data[index + 3] = a;
                }

                if (!this._locked) {
                    this._context.putImageData(this._imageData, 0, 0);
                    this._imageData = null;
                }
            };

            /**
            *
            * @param img
            * @param sourceRect
            * @param destRect
            */
            BitmapData.prototype.copyImage = function (img, sourceRect, destRect) {
                if (this._locked) {
                    if (this._imageData) {
                        this._context.putImageData(this._imageData, 0, 0);
                    }

                    this._context.drawImage(img, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);

                    if (this._imageData) {
                        this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
                    }
                } else {
                    this._context.drawImage(img, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
                }
            };

            /**
            *
            * @param bmpd
            * @param sourceRect
            * @param destRect
            */
            BitmapData.prototype.copyPixels = function (bmpd, sourceRect, destRect) {
                if (this._locked) {
                    if (this._imageData) {
                        this._context.putImageData(this._imageData, 0, 0);
                    }

                    this._context.drawImage(bmpd.canvas, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);

                    if (this._imageData) {
                        this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
                    }
                } else {
                    this._context.drawImage(bmpd.canvas, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
                }
            };

            /**
            *
            * @param rect
            * @param color
            */
            BitmapData.prototype.fillRect = function (rect, color) {
                if (this._locked) {
                    if (this._imageData) {
                        this._context.putImageData(this._imageData, 0, 0);
                    }

                    this._context.fillStyle = '#' + this.decimalToHex(color, 6);
                    this._context.fillRect(rect.x, rect.y, rect.width, rect.height);

                    if (this._imageData) {
                        this._imageData = this._context.getImageData(0, 0, this._rect.width, this._rect.height);
                    }
                } else {
                    this._context.fillStyle = '#' + this.decimalToHex(color, 6);
                    this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
                }
            };


            Object.defineProperty(BitmapData.prototype, "imageData", {
                get: /**
                *
                * @returns {ImageData}
                */
                function () {
                    return this._context.getImageData(0, 0, this._rect.width, this._rect.height);
                },
                set: // Get / Set
                /**
                *
                * @param {ImageData}
                */
                function (value) {
                    this._context.putImageData(value, 0, 0);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BitmapData.prototype, "width", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._imageCanvas.width;
                },
                set: /**
                *
                * @param {number}
                */
                function (value) {
                    this._rect.width = value;
                    this._imageCanvas.width = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(BitmapData.prototype, "height", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._imageCanvas.height;
                },
                set: /**
                *
                * @param {number}
                */
                function (value) {
                    this._rect.height = value;
                    this._imageCanvas.height = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(BitmapData.prototype, "rect", {
                get: /**
                *
                * @param {away.geom.Rectangle}
                */
                function () {
                    return this._rect;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BitmapData.prototype, "canvas", {
                get: /**
                *
                * @returns {HTMLCanvasElement}
                */
                function () {
                    return this._imageCanvas;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BitmapData.prototype, "context", {
                get: /**
                *
                * @returns {HTMLCanvasElement}
                */
                function () {
                    return this._context;
                },
                enumerable: true,
                configurable: true
            });

            // Private
            /**
            * convert decimal value to Hex
            */
            BitmapData.prototype.decimalToHex = function (d, padding) {
                // TODO - bitwise replacement would be better / Extract alpha component of 0xffffffff ( currently no support for alpha )
                var hex = d.toString(16).toUpperCase();
                padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

                while (hex.length < padding) {
                    hex = "0" + hex;
                }

                return hex;
            };
            return BitmapData;
        })();
        display.BitmapData = BitmapData;
    })(away.display || (away.display = {}));
    var display = away.display;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    ///<reference path="../library/assets/IAsset.ts" />
    (function (events) {
        //import away3d.library.assets.IAsset;
        //import flash.events.Event;
        var AssetEvent = (function (_super) {
            __extends(AssetEvent, _super);
            function AssetEvent(type, asset, prevName) {
                if (typeof asset === "undefined") { asset = null; }
                if (typeof prevName === "undefined") { prevName = null; }
                _super.call(this, type);

                this._asset = asset;
                this._prevName = prevName || (this._asset ? this._asset.name : null);
            }
            Object.defineProperty(AssetEvent.prototype, "asset", {
                get: function () {
                    return this._asset;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AssetEvent.prototype, "assetPrevName", {
                get: function () {
                    return this._prevName;
                },
                enumerable: true,
                configurable: true
            });

            AssetEvent.prototype.clone = function () {
                return new away.events.AssetEvent(this.type, this.asset, this.assetPrevName);
            };
            AssetEvent.ASSET_COMPLETE = "assetComplete";
            AssetEvent.ENTITY_COMPLETE = "entityComplete";
            AssetEvent.SKYBOX_COMPLETE = "skyboxComplete";
            AssetEvent.CAMERA_COMPLETE = "cameraComplete";
            AssetEvent.MESH_COMPLETE = "meshComplete";
            AssetEvent.GEOMETRY_COMPLETE = "geometryComplete";
            AssetEvent.SKELETON_COMPLETE = "skeletonComplete";
            AssetEvent.SKELETON_POSE_COMPLETE = "skeletonPoseComplete";
            AssetEvent.CONTAINER_COMPLETE = "containerComplete";
            AssetEvent.TEXTURE_COMPLETE = "textureComplete";
            AssetEvent.TEXTURE_PROJECTOR_COMPLETE = "textureProjectorComplete";
            AssetEvent.MATERIAL_COMPLETE = "materialComplete";
            AssetEvent.ANIMATOR_COMPLETE = "animatorComplete";
            AssetEvent.ANIMATION_SET_COMPLETE = "animationSetComplete";
            AssetEvent.ANIMATION_STATE_COMPLETE = "animationStateComplete";
            AssetEvent.ANIMATION_NODE_COMPLETE = "animationNodeComplete";
            AssetEvent.STATE_TRANSITION_COMPLETE = "stateTransitionComplete";
            AssetEvent.SEGMENT_SET_COMPLETE = "segmentSetComplete";
            AssetEvent.LIGHT_COMPLETE = "lightComplete";
            AssetEvent.LIGHTPICKER_COMPLETE = "lightPickerComplete";
            AssetEvent.EFFECTMETHOD_COMPLETE = "effectMethodComplete";
            AssetEvent.SHADOWMAPMETHOD_COMPLETE = "shadowMapMethodComplete";

            AssetEvent.ASSET_RENAME = 'assetRename';
            AssetEvent.ASSET_CONFLICT_RESOLVED = 'assetConflictResolved';

            AssetEvent.TEXTURE_SIZE_ERROR = 'textureSizeError';
            return AssetEvent;
        })(away.events.Event);
        events.AssetEvent = AssetEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        var TimerEvent = (function (_super) {
            __extends(TimerEvent, _super);
            function TimerEvent(type) {
                _super.call(this, type);
            }
            TimerEvent.TIMER = "timer";
            TimerEvent.TIMER_COMPLETE = "timerComplete";
            return TimerEvent;
        })(away.events.Event);
        events.TimerEvent = TimerEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    (function (library) {
        var AssetType = (function () {
            function AssetType() {
            }
            AssetType.ENTITY = 'entity';
            AssetType.SKYBOX = 'skybox';
            AssetType.CAMERA = 'camera';
            AssetType.SEGMENT_SET = 'segmentSet';
            AssetType.MESH = 'mesh';
            AssetType.GEOMETRY = 'geometry';
            AssetType.SKELETON = 'skeleton';
            AssetType.SKELETON_POSE = 'skeletonPose';
            AssetType.CONTAINER = 'container';
            AssetType.TEXTURE = 'texture';
            AssetType.TEXTURE_PROJECTOR = 'textureProjector';
            AssetType.MATERIAL = 'material';
            AssetType.ANIMATION_SET = 'animationSet';
            AssetType.ANIMATION_STATE = 'animationState';
            AssetType.ANIMATION_NODE = 'animationNode';
            AssetType.ANIMATOR = 'animator';
            AssetType.STATE_TRANSITION = 'stateTransition';
            AssetType.LIGHT = 'light';
            AssetType.LIGHT_PICKER = 'lightPicker';
            AssetType.SHADOW_MAP_METHOD = 'shadowMapMethod';
            AssetType.EFFECTS_METHOD = 'effectsMethod';
            return AssetType;
        })();
        library.AssetType = AssetType;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="../events/TimerEvent.ts" />
    ///<reference path="../errors/Error.ts" />
    (function (utils) {
        //[native(cls="TimerClass", gc="exact", instance="TimerObject", methods="auto")]
        //[Event(name="timerComplete", type="flash.events.TimerEvent")]
        //[Event(name="timer", type="flash.events.TimerEvent")]
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(delay, repeatCount) {
                if (typeof repeatCount === "undefined") { repeatCount = 0; }
                _super.call(this);
                this._repeatCount = 0;
                this._currentCount = 0;
                this._running = false;

                this._delay = delay;
                this._repeatCount = repeatCount;

                if (isNaN(delay) || delay < 0) {
                    throw new away.errors.Error("Delay is negative or not a number");
                }
            }
            Object.defineProperty(Timer.prototype, "currentCount", {
                get: function () {
                    return this._currentCount;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Timer.prototype, "delay", {
                get: function () {
                    return this._delay;
                },
                set: function (value) {
                    this._delay = value;

                    if (this._running) {
                        this.stop();
                        this.start();
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Timer.prototype, "repeatCount", {
                get: function () {
                    return this._repeatCount;
                },
                set: function (value) {
                    this._repeatCount = value;
                },
                enumerable: true,
                configurable: true
            });


            Timer.prototype.reset = function () {
                if (this._running) {
                    this.stop();
                }

                this._currentCount = 0;
            };

            Object.defineProperty(Timer.prototype, "running", {
                get: function () {
                    return this._running;
                },
                enumerable: true,
                configurable: true
            });

            Timer.prototype.start = function () {
                var _this = this;
                this._running = true;
                clearInterval(this._iid);
                this._iid = setInterval(function () {
                    return _this.tick();
                }, this._delay);
            };

            Timer.prototype.stop = function () {
                this._running = false;
                clearInterval(this._iid);
            };

            Timer.prototype.tick = function () {
                this._currentCount++;

                if ((this._repeatCount > 0) && this._currentCount >= this._repeatCount) {
                    this.stop();
                    this.dispatchEvent(new away.events.TimerEvent(away.events.TimerEvent.TIMER));
                    this.dispatchEvent(new away.events.TimerEvent(away.events.TimerEvent.TIMER_COMPLETE));
                } else {
                    this.dispatchEvent(new away.events.TimerEvent(away.events.TimerEvent.TIMER));
                }
            };
            return Timer;
        })(away.events.EventDispatcher);
        utils.Timer = Timer;
    })(away.utils || (away.utils = {}));
    var utils = away.utils;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="../events/TimerEvent.ts" />
    (function (utils) {
        //[native(cls="TimerClass", gc="exact", instance="TimerObject", methods="auto")]
        //[Event(name="timerComplete", type="flash.events.TimerEvent")]
        //[Event(name="timer", type="flash.events.TimerEvent")]
        function getTimer() {
            // number milliseconds of 1970/01/01
            // this different to AS3 implementation which gets the number of milliseconds
            // since instance of Flash player was initialised
            return Date.now();
        }
        utils.getTimer = getTimer;
    })(away.utils || (away.utils = {}));
    var utils = away.utils;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../../events/AssetEvent.ts" />
    ///<reference path="../../events/TimerEvent.ts" />
    ///<reference path="../../events/ParserEvent.ts" />
    ///<reference path="../../library/assets/IAsset.ts" />
    ///<reference path="../../library/assets/AssetType.ts" />
    ///<reference path="../../loaders/misc/ResourceDependency.ts" />
    ///<reference path="../../utils/Timer.ts" />
    ///<reference path="../../utils/getTimer.ts" />
    (function (loaders) {
        var ParserLoaderType = (function () {
            function ParserLoaderType() {
            }
            ParserLoaderType.URL_LOADER = 'ParserLoaderType_URLLoader';
            ParserLoaderType.IMG_LOADER = 'ParserLoaderType_IMGLoader';
            return ParserLoaderType;
        })();
        loaders.ParserLoaderType = ParserLoaderType;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../display/BitmapData.ts" />
    (function (utils) {
        //import flash.display.BitmapData;
        var TextureUtils = (function () {
            function TextureUtils() {
            }
            TextureUtils.isBitmapDataValid = function (bitmapData) {
                if (bitmapData == null) {
                    return true;
                }

                return TextureUtils.isDimensionValid(bitmapData.width) && TextureUtils.isDimensionValid(bitmapData.height);
            };

            TextureUtils.isHTMLImageElementValid = function (image) {
                if (image == null) {
                    return true;
                }

                return TextureUtils.isDimensionValid(image.width) && TextureUtils.isDimensionValid(image.height);
            };

            TextureUtils.isDimensionValid = function (d) {
                return d >= 1 && d <= TextureUtils.MAX_SIZE && TextureUtils.isPowerOfTwo(d);
            };

            TextureUtils.isPowerOfTwo = function (value) {
                return value ? ((value & -value) == value) : false;
            };

            TextureUtils.getBestPowerOf2 = function (value) {
                var p = 1;

                while (p < value)
                    p <<= 1;

                if (p > TextureUtils.MAX_SIZE)
                    p = TextureUtils.MAX_SIZE;

                return p;
            };
            TextureUtils.MAX_SIZE = 2048;
            return TextureUtils;
        })();
        utils.TextureUtils = TextureUtils;
    })(away.utils || (away.utils = {}));
    var utils = away.utils;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Error.ts" />
    (function (errors) {
        /**
        * AbstractMethodError is thrown when an abstract method is called. The method in question should be overridden
        * by a concrete subclass.
        */
        var AbstractMethodError = (function (_super) {
            __extends(AbstractMethodError, _super);
            /**
            * Create a new AbstractMethodError.
            * @param message An optional message to override the default error message.
            * @param id The id of the error.
            */
            function AbstractMethodError(message, id) {
                if (typeof message === "undefined") { message = null; }
                if (typeof id === "undefined") { id = 0; }
                _super.call(this, message || "An abstract method was called! Either an instance of an abstract class was created, or an abstract method was not overridden by the subclass.", id);
            }
            return AbstractMethodError;
        })(errors.Error);
        errors.AbstractMethodError = AbstractMethodError;
    })(away.errors || (away.errors = {}));
    var errors = away.errors;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../../display/BitmapData.ts" />
    ///<reference path="../../events/AssetEvent.ts" />
    ///<reference path="../../events/TimerEvent.ts" />
    ///<reference path="../../events/ParserEvent.ts" />
    ///<reference path="../../library/assets/IAsset.ts" />
    ///<reference path="../../library/assets/AssetType.ts" />
    ///<reference path="../../loaders/misc/ResourceDependency.ts" />
    ///<reference path="../../loaders/parsers/ParserLoaderType.ts" />
    ///<reference path="../../utils/Timer.ts" />
    ///<reference path="../../utils/getTimer.ts" />
    ///<reference path="../../utils/TextureUtils.ts" />
    ///<reference path="../../errors/AbstractMethodError.ts" />
    (function (loaders) {
        /**
        * <code>ParserBase</code> provides an abstract base class for objects that convert blocks of data to data structures
        * supported by Away3D.
        *
        * If used by <code>AssetLoader</code> to automatically determine the parser type, two public static methods should
        * be implemented, with the following signatures:
        *
        * <code>public static supportsType(extension : string) : boolean</code>
        * Indicates whether or not a given file extension is supported by the parser.
        *
        * <code>public static supportsData(data : *) : boolean</code>
        * Tests whether a data block can be parsed by the parser.
        *
        * Furthermore, for any concrete subtype, the method <code>initHandle</code> should be overridden to immediately
        * create the object that will contain the parsed data. This allows <code>ResourceManager</code> to return an object
        * handle regardless of whether the object was loaded or not.
        *
        * @see away3d.loading.parsers.AssetLoader
        * @see away3d.loading.ResourceManager
        */
        var ParserBase = (function (_super) {
            __extends(ParserBase, _super);
            /**
            * Creates a new ParserBase object
            * @param format The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>, and should be provided by the concrete subtype.
            * @param loaderType The type of loader required by the parser
            *
            * @see away3d.loading.parsers.ParserDataFormat
            */
            function ParserBase(format, loaderType) {
                if (typeof loaderType === "undefined") { loaderType = null; }
                _super.call(this);
                this._loaderType = away.loaders.ParserLoaderType.URL_LOADER;

                if (loaderType) {
                    this._loaderType = loaderType;
                }

                this._materialMode = 0;
                this._dataFormat = format;
                this._dependencies = new Array();
            }
            ParserBase.supportsType = //----------------------------------------------------------------------------------------------------------------------------------------------------------------
            // TODO: add error checking for the following ( could cause a problem if this function is not implemented )
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------
            // Needs to be implemented in all Parsers (
            //<code>public static supportsType(extension : string) : boolean</code>
            //* Indicates whether or not a given file extension is supported by the parser.
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------
            function (extension) {
                throw new away.errors.AbstractMethodError();
                return false;
            };

            /**
            * Validates a bitmapData loaded before assigning to a default BitmapMaterial
            */
            ParserBase.prototype.isBitmapDataValid = function (bitmapData) {
                var isValid = away.utils.TextureUtils.isBitmapDataValid(bitmapData);

                if (!isValid) {
                    console.log(">> Bitmap loaded is not having power of 2 dimensions or is higher than 2048");
                }

                return isValid;
            };


            Object.defineProperty(ParserBase.prototype, "parsingFailure", {
                get: function () {
                    return this._parsingFailure;
                },
                set: function (b) {
                    this._parsingFailure = b;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ParserBase.prototype, "parsingPaused", {
                get: function () {
                    return this._parsingPaused;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ParserBase.prototype, "parsingComplete", {
                get: function () {
                    return this._parsingComplete;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ParserBase.prototype, "materialMode", {
                get: function () {
                    return this._materialMode;
                },
                set: function (newMaterialMode) {
                    this._materialMode = newMaterialMode;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ParserBase.prototype, "loaderType", {
                get: function () {
                    return this._loaderType;
                },
                set: function (value) {
                    this._loaderType = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ParserBase.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ParserBase.prototype, "dataFormat", {
                get: /**
                * The data format of the file data to be parsed. Can be either <code>ParserDataFormat.BINARY</code> or <code>ParserDataFormat.PLAIN_TEXT</code>.
                */
                function () {
                    return this._dataFormat;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Parse data (possibly containing bytearry, plain text or BitmapAsset) asynchronously, meaning that
            * the parser will periodically stop parsing so that the AVM may proceed to the
            * next frame.
            *
            * @param data The untyped data object in which the loaded data resides.
            * @param frameLimit number of milliseconds of parsing allowed per frame. The
            * actual time spent on a frame can exceed this number since time-checks can
            * only be performed between logical sections of the parsing procedure.
            */
            ParserBase.prototype.parseAsync = function (data, frameLimit) {
                if (typeof frameLimit === "undefined") { frameLimit = 30; }
                this._data = data;
                this.startParsing(frameLimit);
            };

            Object.defineProperty(ParserBase.prototype, "dependencies", {
                get: /**
                * A list of dependencies that need to be loaded and resolved for the object being parsed.
                */
                function () {
                    return this._dependencies;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Resolve a dependency when it's loaded. For example, a dependency containing an ImageResource would be assigned
            * to a Mesh instance as a BitmapMaterial, a scene graph object would be added to its intended parent. The
            * dependency should be a member of the dependencies property.
            *
            * @param resourceDependency The dependency to be resolved.
            */
            ParserBase.prototype._iResolveDependency = function (resourceDependency) {
                throw new away.errors.AbstractMethodError();
            };

            /**
            * Resolve a dependency loading failure. Used by parser to eventually provide a default map
            *
            * @param resourceDependency The dependency to be resolved.
            */
            ParserBase.prototype._iResolveDependencyFailure = function (resourceDependency) {
                throw new away.errors.AbstractMethodError();
            };

            /**
            * Resolve a dependency name
            *
            * @param resourceDependency The dependency to be resolved.
            */
            ParserBase.prototype._iResolveDependencyName = function (resourceDependency, asset) {
                return asset.name;
            };

            ParserBase.prototype._iResumeParsingAfterDependencies = function () {
                this._parsingPaused = false;

                if (this._timer) {
                    this._timer.start();
                }
            };

            ParserBase.prototype._pFinalizeAsset = function (asset, name) {
                if (typeof name === "undefined") { name = null; }
                var type_event;
                var type_name;

                if (name != null) {
                    asset.name = name;
                }

                switch (asset.assetType) {
                    case away.library.AssetType.LIGHT_PICKER:
                        type_name = 'lightPicker';
                        type_event = away.events.AssetEvent.LIGHTPICKER_COMPLETE;
                        break;
                    case away.library.AssetType.LIGHT:
                        type_name = 'light';
                        type_event = away.events.AssetEvent.LIGHT_COMPLETE;
                        break;
                    case away.library.AssetType.ANIMATOR:
                        type_name = 'animator';
                        type_event = away.events.AssetEvent.ANIMATOR_COMPLETE;
                        break;
                    case away.library.AssetType.ANIMATION_SET:
                        type_name = 'animationSet';
                        type_event = away.events.AssetEvent.ANIMATION_SET_COMPLETE;
                        break;
                    case away.library.AssetType.ANIMATION_STATE:
                        type_name = 'animationState';
                        type_event = away.events.AssetEvent.ANIMATION_STATE_COMPLETE;
                        break;
                    case away.library.AssetType.ANIMATION_NODE:
                        type_name = 'animationNode';
                        type_event = away.events.AssetEvent.ANIMATION_NODE_COMPLETE;
                        break;
                    case away.library.AssetType.STATE_TRANSITION:
                        type_name = 'stateTransition';
                        type_event = away.events.AssetEvent.STATE_TRANSITION_COMPLETE;
                        break;
                    case away.library.AssetType.TEXTURE:
                        type_name = 'texture';
                        type_event = away.events.AssetEvent.TEXTURE_COMPLETE;
                        break;
                    case away.library.AssetType.TEXTURE_PROJECTOR:
                        type_name = 'textureProjector';
                        type_event = away.events.AssetEvent.TEXTURE_PROJECTOR_COMPLETE;
                        break;
                    case away.library.AssetType.CONTAINER:
                        type_name = 'container';
                        type_event = away.events.AssetEvent.CONTAINER_COMPLETE;
                        break;
                    case away.library.AssetType.GEOMETRY:
                        type_name = 'geometry';
                        type_event = away.events.AssetEvent.GEOMETRY_COMPLETE;
                        break;
                    case away.library.AssetType.MATERIAL:
                        type_name = 'material';
                        type_event = away.events.AssetEvent.MATERIAL_COMPLETE;
                        break;
                    case away.library.AssetType.MESH:
                        type_name = 'mesh';
                        type_event = away.events.AssetEvent.MESH_COMPLETE;
                        break;
                    case away.library.AssetType.SKELETON:
                        type_name = 'skeleton';
                        type_event = away.events.AssetEvent.SKELETON_COMPLETE;
                        break;
                    case away.library.AssetType.SKELETON_POSE:
                        type_name = 'skelpose';
                        type_event = away.events.AssetEvent.SKELETON_POSE_COMPLETE;
                        break;
                    case away.library.AssetType.ENTITY:
                        type_name = 'entity';
                        type_event = away.events.AssetEvent.ENTITY_COMPLETE;
                        break;
                    case away.library.AssetType.SKYBOX:
                        type_name = 'skybox';
                        type_event = away.events.AssetEvent.SKYBOX_COMPLETE;
                        break;
                    case away.library.AssetType.CAMERA:
                        type_name = 'camera';
                        type_event = away.events.AssetEvent.CAMERA_COMPLETE;
                        break;
                    case away.library.AssetType.SEGMENT_SET:
                        type_name = 'segmentSet';
                        type_event = away.events.AssetEvent.SEGMENT_SET_COMPLETE;
                        break;
                    case away.library.AssetType.EFFECTS_METHOD:
                        type_name = 'effectsMethod';
                        type_event = away.events.AssetEvent.EFFECTMETHOD_COMPLETE;
                        break;
                    case away.library.AssetType.SHADOW_MAP_METHOD:
                        type_name = 'effectsMethod';
                        type_event = away.events.AssetEvent.SHADOWMAPMETHOD_COMPLETE;
                        break;
                    default:
                        throw new away.errors.Error('Unhandled asset type ' + asset.assetType + '. Report as bug!');
                        break;
                }
                ;

                console.log('ParserBase', '_pFinalizeAsset.type_event: ', type_event);

                if (!asset.name)
                    asset.name = type_name;

                this.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.ASSET_COMPLETE, asset));
                this.dispatchEvent(new away.events.AssetEvent(type_event, asset));
            };

            /**
            * Parse the next block of data.
            * @return Whether or not more data needs to be parsed. Can be <code>ParserBase.ParserBase.PARSING_DONE</code> or
            * <code>ParserBase.ParserBase.MORE_TO_PARSE</code>.
            */
            ParserBase.prototype._pProceedParsing = function () {
                throw new away.errors.AbstractMethodError();
                return true;
            };

            ParserBase.prototype._pDieWithError = function (message) {
                if (typeof message === "undefined") { message = 'Unknown parsing error'; }
                if (this._timer) {
                    this._timer.removeEventListener(away.events.TimerEvent.TIMER, this._pOnInterval, this);
                    this._timer.stop();
                    this._timer = null;
                }

                this.dispatchEvent(new away.events.ParserEvent(away.events.ParserEvent.PARSE_ERROR, message));
            };

            ParserBase.prototype._pAddDependency = function (id, req, retrieveAsRawData, data, suppressErrorEvents) {
                if (typeof retrieveAsRawData === "undefined") { retrieveAsRawData = false; }
                if (typeof data === "undefined") { data = null; }
                if (typeof suppressErrorEvents === "undefined") { suppressErrorEvents = false; }
                this._dependencies.push(new away.loaders.ResourceDependency(id, req, data, this, retrieveAsRawData, suppressErrorEvents));
            };

            ParserBase.prototype._pPauseAndRetrieveDependencies = function () {
                if (this._timer) {
                    this._timer.stop();
                }

                this._parsingPaused = true;
                this.dispatchEvent(new away.events.ParserEvent(away.events.ParserEvent.READY_FOR_DEPENDENCIES));
            };

            /**
            * Tests whether or not there is still time left for parsing within the maximum allowed time frame per session.
            * @return True if there is still time left, false if the maximum allotted time was exceeded and parsing should be interrupted.
            */
            ParserBase.prototype._pHasTime = function () {
                return ((away.utils.getTimer() - this._lastFrameTime) < this._frameLimit);
            };

            /**
            * Called when the parsing pause interval has passed and parsing can proceed.
            */
            ParserBase.prototype._pOnInterval = function (event) {
                if (typeof event === "undefined") { event = null; }
                this._lastFrameTime = away.utils.getTimer();

                if (this._pProceedParsing() && !this._parsingFailure) {
                    this._pFinishParsing();
                }
            };

            /**
            * Initializes the parsing of data.
            * @param frameLimit The maximum duration of a parsing session.
            */
            ParserBase.prototype.startParsing = function (frameLimit) {
                this._frameLimit = frameLimit;
                this._timer = new away.utils.Timer(this._frameLimit, 0);
                this._timer.addEventListener(away.events.TimerEvent.TIMER, this._pOnInterval, this);
                this._timer.start();
            };

            /**
            * Finish parsing the data.
            */
            ParserBase.prototype._pFinishParsing = function () {
                console.log('ParserBase._pFinishParsing');

                if (this._timer) {
                    this._timer.removeEventListener(away.events.TimerEvent.TIMER, this._pOnInterval, this);
                    this._timer.stop();
                }

                this._timer = null;
                this._parsingComplete = true;

                this.dispatchEvent(new away.events.ParserEvent(away.events.ParserEvent.PARSE_COMPLETE));
            };
            ParserBase.PARSING_DONE = true;

            ParserBase.MORE_TO_PARSE = false;
            return ParserBase;
        })(away.events.EventDispatcher);
        loaders.ParserBase = ParserBase;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        var HTTPStatusEvent = (function (_super) {
            __extends(HTTPStatusEvent, _super);
            function HTTPStatusEvent(type, status) {
                if (typeof status === "undefined") { status = null; }
                _super.call(this, type);

                this.status = status;
            }
            HTTPStatusEvent.HTTP_STATUS = "HTTPStatusEvent_HTTP_STATUS";
            return HTTPStatusEvent;
        })(away.events.Event);
        events.HTTPStatusEvent = HTTPStatusEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="Event.ts" />
    (function (events) {
        var ProgressEvent = (function (_super) {
            __extends(ProgressEvent, _super);
            function ProgressEvent(type) {
                _super.call(this, type);
            }
            ProgressEvent.PROGRESS = "ProgressEvent_progress";
            return ProgressEvent;
        })(away.events.Event);
        events.ProgressEvent = ProgressEvent;
    })(away.events || (away.events = {}));
    var events = away.events;
})(away || (away = {}));
var away;
(function (away) {
    (function (net) {
        var URLLoaderDataFormat = (function () {
            function URLLoaderDataFormat() {
            }
            URLLoaderDataFormat.TEXT = 'text';

            URLLoaderDataFormat.VARIABLES = 'variables';

            URLLoaderDataFormat.BLOB = 'blob';

            URLLoaderDataFormat.ARRAY_BUFFER = 'arraybuffer';

            URLLoaderDataFormat.BINARY = 'binary';
            return URLLoaderDataFormat;
        })();
        net.URLLoaderDataFormat = URLLoaderDataFormat;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="../events/Event.ts" />
    ///<reference path="../events/IOErrorEvent.ts" />
    ///<reference path="../events/HTTPStatusEvent.ts" />
    ///<reference path="../events/ProgressEvent.ts" />
    ///<reference path="URLRequest.ts" />
    ///<reference path="URLLoaderDataFormat.ts" />
    ///<reference path="URLRequestMethod.ts" />
    ///<reference path="URLRequest.ts" />
    ///<reference path="../errors/Error.ts" />
    (function (net) {
        // TODO: implement / test cross domain policy
        var URLLoader = (function (_super) {
            __extends(URLLoader, _super);
            function URLLoader() {
                _super.call(this);
                this._bytesLoaded = 0;
                this._bytesTotal = 0;
                this._dataFormat = away.net.URLLoaderDataFormat.TEXT;
                this._loadError = false;
            }
            // Public
            /**
            *
            * @param request {away.net.URLRequest}
            */
            URLLoader.prototype.load = function (request) {
                this.initXHR();
                this._request = request;

                if (request.method === away.net.URLRequestMethod.POST) {
                    this.postRequest(request);
                } else {
                    this.getRequest(request);
                }
            };

            /**
            *
            */
            URLLoader.prototype.close = function () {
                this._XHR.abort();
                this.disposeXHR();
            };

            /**
            *
            */
            URLLoader.prototype.dispose = function () {
                if (this._XHR) {
                    this._XHR.abort();
                }

                this.disposeXHR();

                this._data = null;
                this._dataFormat = null;
                this._bytesLoaded = null;
                this._bytesTotal = null;

                /*
                if( this._request )
                {
                
                this._request.dispose();
                
                }
                */
                this._request = null;
            };


            Object.defineProperty(URLLoader.prototype, "dataFormat", {
                get: /**
                *
                * @returns {string}
                *      away.net.URLLoaderDataFormat
                */
                function () {
                    return this._dataFormat;
                },
                set: // Get / Set
                /**
                *
                * away.net.URLLoaderDataFormat.BINARY
                * away.net.URLLoaderDataFormat.TEXT
                * away.net.URLLoaderDataFormat.VARIABLES
                *
                * @param format
                */
                function (format) {
                    if (format === away.net.URLLoaderDataFormat.BLOB || format === away.net.URLLoaderDataFormat.ARRAY_BUFFER || format === away.net.URLLoaderDataFormat.BINARY || format === away.net.URLLoaderDataFormat.TEXT || format === away.net.URLLoaderDataFormat.VARIABLES) {
                        this._dataFormat = format;
                    } else {
                        throw new away.errors.Error('URLLoader error: incompatible dataFormat');
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(URLLoader.prototype, "data", {
                get: /**
                *
                * @returns {*}
                */
                function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(URLLoader.prototype, "bytesLoaded", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._bytesLoaded;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(URLLoader.prototype, "bytesTotal", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._bytesTotal;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(URLLoader.prototype, "request", {
                get: /**
                *
                * @returns {away.net.URLRequest}
                */
                function () {
                    return this._request;
                },
                enumerable: true,
                configurable: true
            });

            // Private
            /**
            *
            * @param xhr
            * @param responseType
            */
            URLLoader.prototype.setResponseType = function (xhr, responseType) {
                switch (responseType) {
                    case away.net.URLLoaderDataFormat.ARRAY_BUFFER:
                    case away.net.URLLoaderDataFormat.BLOB:
                    case away.net.URLLoaderDataFormat.TEXT:
                        xhr.responseType = responseType;

                        break;

                    case away.net.URLLoaderDataFormat.VARIABLES:
                        xhr.responseType = away.net.URLLoaderDataFormat.TEXT;

                        break;

                    case away.net.URLLoaderDataFormat.BINARY:
                        xhr.responseType = '';

                        break;
                }
            };

            /**
            *
            * @param request {away.net.URLRequest}
            */
            URLLoader.prototype.getRequest = function (request) {
                try  {
                    this._XHR.open(request.method, request.url, request.async);
                    this.setResponseType(this._XHR, this._dataFormat);
                    this._XHR.send();
                } catch (e) {
                    this.handleXmlHttpRequestException(e);
                }
            };

            /**
            *
            * @param request {away.net.URLRequest}
            */
            URLLoader.prototype.postRequest = function (request) {
                this._loadError = false;

                this._XHR.open(request.method, request.url, request.async);

                if (request.data != null) {
                    if (request.data instanceof away.net.URLVariables) {
                        var urlVars = request.data;

                        try  {
                            this._XHR.responseType = 'text';
                            this._XHR.send(urlVars.formData);
                        } catch (e) {
                            this.handleXmlHttpRequestException(e);
                        }
                    } else {
                        this.setResponseType(this._XHR, this._dataFormat);

                        if (request.data) {
                            this._XHR.send(request.data);
                        } else {
                            this._XHR.send();
                        }
                    }
                } else {
                    this._XHR.send();
                }
            };

            /**
            *
            * @param error {XMLHttpRequestException}
            */
            URLLoader.prototype.handleXmlHttpRequestException = function (error/* <XMLHttpRequestException> */ ) {
                switch (error.code) {
                    case 101:
                        break;
                }
            };

            /**
            *
            */
            URLLoader.prototype.initXHR = function () {
                var _this = this;
                if (!this._XHR) {
                    this._XHR = new XMLHttpRequest();

                    this._XHR.onloadstart = function (event) {
                        return _this.onLoadStart(event);
                    };
                    this._XHR.onprogress = function (event) {
                        return _this.onProgress(event);
                    };
                    this._XHR.onabort = function (event) {
                        return _this.onAbort(event);
                    };
                    this._XHR.onerror = function (event) {
                        return _this.onLoadError(event);
                    };
                    this._XHR.onload = function (event) {
                        return _this.onLoadComplete(event);
                    };
                    this._XHR.ontimeout = function (event) {
                        return _this.onTimeOut(event);
                    };
                    this._XHR.onloadend = function (event) {
                        return _this.onLoadEnd(event);
                    };
                    this._XHR.onreadystatechange = function (event) {
                        return _this.onReadyStateChange(event);
                    };
                }
            };

            /**
            *
            */
            URLLoader.prototype.disposeXHR = function () {
                if (this._XHR !== null) {
                    this._XHR.onloadstart = null;
                    this._XHR.onprogress = null;
                    this._XHR.onabort = null;
                    this._XHR.onerror = null;
                    this._XHR.onload = null;
                    this._XHR.ontimeout = null;
                    this._XHR.onloadend = null;
                    this._XHR = null;
                }
            };

            /**
            *
            * @param source
            */
            URLLoader.prototype.decodeURLVariables = function (source) {
                var result = new Object();

                source = source.split("+").join(" ");

                var tokens, re = /[?&]?([^=]+)=([^&]*)/g;

                while (tokens = re.exec(source)) {
                    result[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
                }

                return result;
            };

            // XMLHttpRequest - Event Handlers
            /**
            * When XHR state changes
            * @param event
            */
            URLLoader.prototype.onReadyStateChange = function (event) {
                if (this._XHR.readyState == 4) {
                    if (this._XHR.status == 404) {
                        this._loadError = true;
                        this.dispatchEvent(new away.events.IOErrorEvent(away.events.IOErrorEvent.IO_ERROR));
                    }

                    this.dispatchEvent(new away.events.HTTPStatusEvent(away.events.HTTPStatusEvent.HTTP_STATUS, this._XHR.status));
                }
            };

            /**
            * When the request has completed, regardless of whether or not it was successful.
            * @param event
            */
            URLLoader.prototype.onLoadEnd = function (event) {
                if (this._loadError === true)
                    return;
            };

            /**
            * When the author specified timeout has passed before the request could complete.
            * @param event
            */
            URLLoader.prototype.onTimeOut = function (event) {
            };

            /**
            * When the request has been aborted, either by invoking the abort() method or navigating away from the page.
            * @param event
            */
            URLLoader.prototype.onAbort = function (event) {
            };

            /**
            * While loading and sending data.
            * @param event
            */
            URLLoader.prototype.onProgress = function (event) {
                this._bytesTotal = event.total;
                this._bytesLoaded = event.loaded;

                var progressEvent = new away.events.ProgressEvent(away.events.ProgressEvent.PROGRESS);
                progressEvent.bytesLoaded = this._bytesLoaded;
                progressEvent.bytesTotal = this._bytesTotal;
                this.dispatchEvent(progressEvent);
            };

            /**
            * When the request starts.
            * @param event
            */
            URLLoader.prototype.onLoadStart = function (event) {
                this.dispatchEvent(new away.events.Event(away.events.Event.OPEN));
            };

            /**
            * When the request has successfully completed.
            * @param event
            */
            URLLoader.prototype.onLoadComplete = function (event) {
                if (this._loadError === true)
                    return;

                switch (this._dataFormat) {
                    case away.net.URLLoaderDataFormat.TEXT:
                        this._data = this._XHR.responseText;

                        break;

                    case away.net.URLLoaderDataFormat.VARIABLES:
                        this._data = this.decodeURLVariables(this._XHR.responseText);

                        break;

                    case away.net.URLLoaderDataFormat.BLOB:
                    case away.net.URLLoaderDataFormat.ARRAY_BUFFER:
                    case away.net.URLLoaderDataFormat.BINARY:
                        this._data = this._XHR.response;

                        break;

                    default:
                        this._data = this._XHR.responseText;

                        break;
                }

                this.dispatchEvent(new away.events.Event(away.events.Event.COMPLETE));
            };

            /**
            * When the request has failed. ( due to network issues ).
            * @param event
            */
            URLLoader.prototype.onLoadError = function (event) {
                this._loadError = true;
                this.dispatchEvent(new away.events.IOErrorEvent(away.events.IOErrorEvent.IO_ERROR));
            };
            return URLLoader;
        })(away.events.EventDispatcher);
        net.URLLoader = URLLoader;
    })(away.net || (away.net = {}));
    var net = away.net;
})(away || (away = {}));
var away;
(function (away) {
    (function (loaders) {
        /**
        * An enumeration providing values to describe the data format of parsed data.
        */
        var ParserDataFormat = (function () {
            function ParserDataFormat() {
            }
            ParserDataFormat.BINARY = "binary";

            ParserDataFormat.PLAIN_TEXT = "plainText";

            ParserDataFormat.IMAGE = "image";
            return ParserDataFormat;
        })();
        loaders.ParserDataFormat = ParserDataFormat;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    (function (display3D) {
        var TextureBase = (function () {
            function TextureBase() {
                this._glTexture = GL.createTexture();
            }
            TextureBase.prototype.dispose = function () {
                GL.deleteTexture(this._glTexture);
            };

            Object.defineProperty(TextureBase.prototype, "glTexture", {
                get: function () {
                    return this._glTexture;
                },
                enumerable: true,
                configurable: true
            });
            return TextureBase;
        })();
        display3D.TextureBase = TextureBase;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    ///<reference path="../../def/js.d.ts"/>
    ///<reference path="TextureBase.ts"/>
    ///<reference path="../display/BitmapData.ts"/>
    (function (display3D) {
        var Texture = (function (_super) {
            __extends(Texture, _super);
            function Texture(width, height) {
                _super.call(this);
                this._width = width;
                this._height = height;

                GL.bindTexture(GL.TEXTURE_2D, this.glTexture);
                GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
            }
            Object.defineProperty(Texture.prototype, "width", {
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Texture.prototype, "height", {
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });

            Texture.prototype.uploadFromHTMLImageElement = function (image, miplevel) {
                if (typeof miplevel === "undefined") { miplevel = 0; }
                GL.texImage2D(GL.TEXTURE_2D, miplevel, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
            };

            Texture.prototype.uploadFromBitmapData = function (data, miplevel) {
                if (typeof miplevel === "undefined") { miplevel = 0; }
                GL.texImage2D(GL.TEXTURE_2D, miplevel, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, data.imageData);
            };
            return Texture;
        })(display3D.TextureBase);
        display3D.Texture = Texture;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../../events/AssetEvent.ts" />
    ///<reference path="../../library/assets/IAsset.ts" />
    (function (library) {
        var NamedAssetBase = (function (_super) {
            __extends(NamedAssetBase, _super);
            function NamedAssetBase(name) {
                if (typeof name === "undefined") { name = null; }
                _super.call(this);

                if (name == null)
                    name = 'null';

                this._name = name;
                this._originalName = name;

                this.updateFullPath();
            }
            Object.defineProperty(NamedAssetBase.prototype, "originalName", {
                get: /**
                * The original name used for this asset in the resource (e.g. file) in which
                * it was found. This may not be the same as <code>name</code>, which may
                * have changed due to of a name conflict.
                */
                function () {
                    return this._originalName;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(NamedAssetBase.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (newID) {
                    this._id = newID;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(NamedAssetBase.prototype, "assetType", {
                get: function () {
                    return this._assetType;
                },
                set: function (type) {
                    this._assetType = type;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(NamedAssetBase.prototype, "name", {
                get: function () {
                    return this._name;
                },
                set: function (val) {
                    var prev;

                    prev = this._name;
                    this._name = val;

                    if (this._name == null) {
                        this._name = 'null';
                    }

                    this.updateFullPath();

                    //if (hasEventListener(AssetEvent.ASSET_RENAME))
                    this.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.ASSET_RENAME, this, prev));
                },
                enumerable: true,
                configurable: true
            });


            NamedAssetBase.prototype.dispose = function () {
            };

            Object.defineProperty(NamedAssetBase.prototype, "assetNamespace", {
                get: function () {
                    return this._namespace;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(NamedAssetBase.prototype, "assetFullPath", {
                get: function () {
                    return this._full_path;
                },
                enumerable: true,
                configurable: true
            });

            NamedAssetBase.prototype.assetPathEquals = function (name, ns) {
                return (this._name == name && (!ns || this._namespace == ns));
            };

            NamedAssetBase.prototype.resetAssetPath = function (name, ns, overrideOriginal) {
                if (typeof ns === "undefined") { ns = null; }
                if (typeof overrideOriginal === "undefined") { overrideOriginal = true; }
                this._name = name ? name : 'null';
                this._namespace = ns ? ns : NamedAssetBase.DEFAULT_NAMESPACE;

                if (overrideOriginal) {
                    this._originalName = this._name;
                }

                this.updateFullPath();
            };

            NamedAssetBase.prototype.updateFullPath = function () {
                this._full_path = [this._namespace, this._name];
            };
            NamedAssetBase.DEFAULT_NAMESPACE = 'default';
            return NamedAssetBase;
        })(away.events.EventDispatcher);
        library.NamedAssetBase = NamedAssetBase;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    (function (display3D) {
        var Context3DClearMask = (function () {
            function Context3DClearMask() {
            }
            Context3DClearMask.COLOR = 8 << 11;
            Context3DClearMask.DEPTH = 8 << 5;
            Context3DClearMask.STENCIL = 8 << 7;
            Context3DClearMask.ALL = Context3DClearMask.COLOR | Context3DClearMask.DEPTH | Context3DClearMask.STENCIL;
            return Context3DClearMask;
        })();
        display3D.Context3DClearMask = Context3DClearMask;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    (function (display3D) {
        var VertexBuffer3D = (function () {
            function VertexBuffer3D(numVertices, data32PerVertex) {
                this._buffer = GL.createBuffer();
                this._numVertices = numVertices;
                this._data32PerVertex = data32PerVertex;
            }
            VertexBuffer3D.prototype.upload = function (vertices, startVertex, numVertices) {
                GL.bindBuffer(GL.ARRAY_BUFFER, this._buffer);
                console.log("** WARNING upload not fully implemented, startVertex & numVertices not considered.");

                // TODO add offsets , startVertex, numVertices * this._data32PerVertex
                GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
            };

            Object.defineProperty(VertexBuffer3D.prototype, "numVertices", {
                get: function () {
                    return this._numVertices;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(VertexBuffer3D.prototype, "data32PerVertex", {
                get: function () {
                    return this._data32PerVertex;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(VertexBuffer3D.prototype, "glBuffer", {
                get: function () {
                    return this._buffer;
                },
                enumerable: true,
                configurable: true
            });

            VertexBuffer3D.prototype.dispose = function () {
                GL.deleteBuffer(this._buffer);
            };
            return VertexBuffer3D;
        })();
        display3D.VertexBuffer3D = VertexBuffer3D;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    (function (display3D) {
        var IndexBuffer3D = (function () {
            function IndexBuffer3D(numIndices) {
                this._buffer = GL.createBuffer();
                this._numIndices = numIndices;
            }
            IndexBuffer3D.prototype.upload = function (data, startOffset, count) {
                GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._buffer);

                // TODO add index offsets
                GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), GL.STATIC_DRAW);
            };

            IndexBuffer3D.prototype.dispose = function () {
                GL.deleteBuffer(this._buffer);
            };

            Object.defineProperty(IndexBuffer3D.prototype, "numIndices", {
                get: function () {
                    return this._numIndices;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IndexBuffer3D.prototype, "glBuffer", {
                get: function () {
                    return this._buffer;
                },
                enumerable: true,
                configurable: true
            });
            return IndexBuffer3D;
        })();
        display3D.IndexBuffer3D = IndexBuffer3D;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    (function (display3D) {
        var Program3D = (function () {
            function Program3D() {
                this._program = GL.createProgram();
            }
            Program3D.prototype.upload = function (vertexProgram, fragmentProgram) {
                this._vertexShader = GL.createShader(GL.VERTEX_SHADER);
                this._fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);

                GL.shaderSource(this._vertexShader, vertexProgram);
                GL.compileShader(this._vertexShader);

                if (!GL.getShaderParameter(this._vertexShader, GL.COMPILE_STATUS)) {
                    alert(GL.getShaderInfoLog(this._vertexShader));
                    return null;
                }

                GL.shaderSource(this._fragmentShader, fragmentProgram);
                GL.compileShader(this._fragmentShader);

                if (!GL.getShaderParameter(this._fragmentShader, GL.COMPILE_STATUS)) {
                    alert(GL.getShaderInfoLog(this._fragmentShader));
                    return null;
                }

                GL.attachShader(this._program, this._vertexShader);
                GL.attachShader(this._program, this._fragmentShader);
                GL.linkProgram(this._program);

                if (!GL.getProgramParameter(this._program, GL.LINK_STATUS)) {
                    alert("Could not link the program.");
                }
            };

            Program3D.prototype.dispose = function () {
                GL.deleteProgram(this._program);
            };

            Program3D.prototype.focusProgram = function () {
                GL.useProgram(this._program);
            };

            Object.defineProperty(Program3D.prototype, "glProgram", {
                get: function () {
                    return this._program;
                },
                enumerable: true,
                configurable: true
            });
            return Program3D;
        })();
        display3D.Program3D = Program3D;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="Vector3D.ts" />
    ///<reference path="../errors/ArgumentError.ts" />
    (function (geom) {
        var Matrix3D = (function () {
            /**
            * Creates a Matrix3D object.
            */
            function Matrix3D(v) {
                if (typeof v === "undefined") { v = null; }
                if (v != null && v.length == 16) {
                    this.rawData = v;
                } else {
                    this.rawData = [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1
                    ];
                }
            }
            /**
            * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
            */
            Matrix3D.prototype.append = function (lhs) {
                var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];

                this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
                this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
                this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
                this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

                this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
                this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
                this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
                this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

                this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
                this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
                this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
                this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

                this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
                this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
                this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
                this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            };

            /**
            * Appends an incremental rotation to a Matrix3D object.
            */
            Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
                if (typeof pivotPoint === "undefined") { pivotPoint = null; }
                var m = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);

                if (pivotPoint != null) {
                    var p = pivotPoint;
                    m.appendTranslation(p.x, p.y, p.z);
                }

                this.append(m);
            };

            /**
            * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
            */
            Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
                this.append(new Matrix3D([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0]));
            };

            /**
            * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
            */
            Matrix3D.prototype.appendTranslation = function (x, y, z) {
                this.rawData[12] += x;
                this.rawData[13] += y;
                this.rawData[14] += z;
            };

            /**
            * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
            */
            Matrix3D.prototype.clone = function () {
                return new Matrix3D(this.rawData.slice(0));
            };

            /**
            * Copies a Vector3D object into specific column of the calling Matrix3D object.
            */
            Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
                switch (column) {
                    case 0:
                        vector3D.x = this.rawData[0];
                        vector3D.y = this.rawData[4];
                        vector3D.z = this.rawData[8];
                        vector3D.w = this.rawData[12];
                        break;
                    case 1:
                        vector3D.x = this.rawData[1];
                        vector3D.y = this.rawData[5];
                        vector3D.z = this.rawData[9];
                        vector3D.w = this.rawData[13];
                        break;
                    case 2:
                        vector3D.x = this.rawData[2];
                        vector3D.y = this.rawData[6];
                        vector3D.z = this.rawData[10];
                        vector3D.w = this.rawData[14];
                        break;
                    case 3:
                        vector3D.x = this.rawData[3];
                        vector3D.y = this.rawData[7];
                        vector3D.z = this.rawData[11];
                        vector3D.w = this.rawData[15];
                        break;
                    default:
                        throw new away.errors.ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
                }
            };

            /**
            * Copies specific column of the calling Matrix3D object into the Vector3D object.
            */
            Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
                switch (column) {
                    case 0:
                        this.rawData[0] = vector3D.x;
                        this.rawData[4] = vector3D.y;
                        this.rawData[8] = vector3D.z;
                        this.rawData[12] = vector3D.w;
                        break;
                    case 1:
                        this.rawData[1] = vector3D.x;
                        this.rawData[5] = vector3D.y;
                        this.rawData[9] = vector3D.z;
                        this.rawData[13] = vector3D.w;
                        break;
                    case 2:
                        this.rawData[2] = vector3D.x;
                        this.rawData[6] = vector3D.y;
                        this.rawData[10] = vector3D.z;
                        this.rawData[14] = vector3D.w;
                        break;
                    case 3:
                        this.rawData[3] = vector3D.x;
                        this.rawData[7] = vector3D.y;
                        this.rawData[11] = vector3D.z;
                        this.rawData[15] = vector3D.w;
                        break;
                    default:
                        throw new away.errors.ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
                }
            };

            /**
            * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
            */
            Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
                this.rawData = sourceMatrix3D.rawData.slice(0);
            };

            Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
                if (typeof index === "undefined") { index = 0; }
                if (typeof transpose === "undefined") { transpose = false; }
                //TODO fully implement
                this.rawData = vector.splice(0);
            };

            /* TODO implement copyRawDataTo
            public copyRawDataTo( vector:number[], index:number = 0, transpose:boolean = false )
            {
            }
            */
            /**
            * Copies a Vector3D object into specific row of the calling Matrix3D object.
            */
            Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
                switch (row) {
                    case 0:
                        vector3D.x = this.rawData[0];
                        vector3D.y = this.rawData[1];
                        vector3D.z = this.rawData[2];
                        vector3D.w = this.rawData[3];
                        break;
                    case 1:
                        vector3D.x = this.rawData[4];
                        vector3D.y = this.rawData[5];
                        vector3D.z = this.rawData[6];
                        vector3D.w = this.rawData[7];
                        break;
                    case 2:
                        vector3D.x = this.rawData[8];
                        vector3D.y = this.rawData[9];
                        vector3D.z = this.rawData[10];
                        vector3D.w = this.rawData[11];
                        break;
                    case 3:
                        vector3D.x = this.rawData[12];
                        vector3D.y = this.rawData[13];
                        vector3D.z = this.rawData[14];
                        vector3D.w = this.rawData[15];
                        break;
                    default:
                        throw new away.errors.ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
                }
            };

            /**
            * Copies specific row of the calling Matrix3D object into the Vector3D object.
            */
            Matrix3D.prototype.copyRowTo = function (row, vector3D) {
                switch (row) {
                    case 0:
                        this.rawData[0] = vector3D.x;
                        this.rawData[1] = vector3D.y;
                        this.rawData[2] = vector3D.z;
                        this.rawData[3] = vector3D.w;
                        break;
                    case 1:
                        this.rawData[4] = vector3D.x;
                        this.rawData[5] = vector3D.y;
                        this.rawData[6] = vector3D.z;
                        this.rawData[7] = vector3D.w;
                        break;
                    case 2:
                        this.rawData[8] = vector3D.x;
                        this.rawData[9] = vector3D.y;
                        this.rawData[10] = vector3D.z;
                        this.rawData[11] = vector3D.w;
                        break;
                    case 3:
                        this.rawData[12] = vector3D.x;
                        this.rawData[13] = vector3D.y;
                        this.rawData[14] = vector3D.z;
                        this.rawData[15] = vector3D.w;
                        break;
                    default:
                        throw new away.errors.ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
                }
            };

            /**
            * Copies this Matrix3D object into a destination Matrix3D object.
            */
            Matrix3D.prototype.copyToMatrix3D = function (dest) {
                dest.rawData = this.rawData.slice(0);
            };

            // TODO orientationStyle:string = "eulerAngles"
            /**
            * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects.
            */
            Matrix3D.prototype.decompose = function () {
                var vec = [];
                var m = this.clone();
                var mr = m.rawData;

                var pos = new geom.Vector3D(mr[12], mr[13], mr[14]);
                mr[12] = 0;
                mr[13] = 0;
                mr[14] = 0;

                var scale = new geom.Vector3D();

                scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
                scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
                scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);

                if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) {
                    scale.z = -scale.z;
                }

                mr[0] /= scale.x;
                mr[1] /= scale.x;
                mr[2] /= scale.x;
                mr[4] /= scale.y;
                mr[5] /= scale.y;
                mr[6] /= scale.y;
                mr[8] /= scale.z;
                mr[9] /= scale.z;
                mr[10] /= scale.z;

                var rot = new geom.Vector3D();
                rot.y = Math.asin(-mr[2]);
                var cos = Math.cos(rot.y);

                if (cos > 0) {
                    rot.x = Math.atan2(mr[6], mr[10]);
                    rot.z = Math.atan2(mr[1], mr[0]);
                } else {
                    rot.z = 0;
                    rot.x = Math.atan2(mr[4], mr[5]);
                }

                vec.push(pos);
                vec.push(rot);
                vec.push(scale);

                return vec;
            };

            /**
            * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
            * coordinate to another.
            */
            Matrix3D.prototype.deltaTransformVector = function (v) {
                var x = v.x, y = v.y, z = v.z;
                return new geom.Vector3D((x * this.rawData[0] + y * this.rawData[1] + z * this.rawData[2] + this.rawData[3]), (x * this.rawData[4] + y * this.rawData[5] + z * this.rawData[6] + this.rawData[7]), (x * this.rawData[8] + y * this.rawData[9] + z * this.rawData[10] + this.rawData[11]), 0);
            };

            /**
            * Converts the current matrix to an identity or unit matrix.
            */
            Matrix3D.prototype.identity = function () {
                this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            };

            Matrix3D.interpolate = /**
            * [static] Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix.
            */
            function (thisMat, toMat, percent) {
                var m = new Matrix3D();
                for (var i = 0; i < 16; ++i) {
                    m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
                }
                return m;
            };

            /**
            * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix.
            */
            Matrix3D.prototype.interpolateTo = function (toMat, percent) {
                for (var i = 0; i < 16; ++i) {
                    this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
                }
            };

            /**
            * Inverts the current matrix.
            */
            Matrix3D.prototype.invert = function () {
                var d = this.determinant;
                var invertable = Math.abs(d) > 0.00000000001;

                if (invertable) {
                    d = -1 / d;
                    var m11 = this.rawData[0];
                    var m21 = this.rawData[4];
                    var m31 = this.rawData[8];
                    var m41 = this.rawData[12];
                    var m12 = this.rawData[1];
                    var m22 = this.rawData[5];
                    var m32 = this.rawData[9];
                    var m42 = this.rawData[13];
                    var m13 = this.rawData[2];
                    var m23 = this.rawData[6];
                    var m33 = this.rawData[10];
                    var m43 = this.rawData[14];
                    var m14 = this.rawData[3];
                    var m24 = this.rawData[7];
                    var m34 = this.rawData[11];
                    var m44 = this.rawData[15];

                    this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                    this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                    this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                    this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                    this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                    this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                    this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                    this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                    this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                    this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                    this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                    this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                    this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                    this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                    this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                    this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
                }
                return invertable;
            };

            /* TODO implement pointAt
            public pointAt( pos:Vector3D, at:Vector3D = null, up:Vector3D = null )
            {
            }
            */
            /**
            * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
            */
            Matrix3D.prototype.prepend = function (rhs) {
                var m111 = rhs.rawData[0], m121 = rhs.rawData[4], m131 = rhs.rawData[8], m141 = rhs.rawData[12], m112 = rhs.rawData[1], m122 = rhs.rawData[5], m132 = rhs.rawData[9], m142 = rhs.rawData[13], m113 = rhs.rawData[2], m123 = rhs.rawData[6], m133 = rhs.rawData[10], m143 = rhs.rawData[14], m114 = rhs.rawData[3], m124 = rhs.rawData[7], m134 = rhs.rawData[11], m144 = rhs.rawData[15], m211 = this.rawData[0], m221 = this.rawData[4], m231 = this.rawData[8], m241 = this.rawData[12], m212 = this.rawData[1], m222 = this.rawData[5], m232 = this.rawData[9], m242 = this.rawData[13], m213 = this.rawData[2], m223 = this.rawData[6], m233 = this.rawData[10], m243 = this.rawData[14], m214 = this.rawData[3], m224 = this.rawData[7], m234 = this.rawData[11], m244 = this.rawData[15];

                this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
                this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
                this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
                this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

                this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
                this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
                this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
                this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

                this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
                this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
                this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
                this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

                this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
                this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
                this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
                this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            };

            /**
            * Prepends an incremental rotation to a Matrix3D object.
            */
            Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
                if (typeof pivotPoint === "undefined") { pivotPoint = null; }
                var m = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);
                if (pivotPoint != null) {
                    var p = pivotPoint;
                    m.appendTranslation(p.x, p.y, p.z);
                }
                this.prepend(m);
            };

            /**
            * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
            */
            Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
                this.prepend(new Matrix3D([xScale, 0, 0, 0, 0, yScale, 0, 0, 0, 0, zScale, 0, 0, 0, 0, 1]));
            };

            /**
            * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
            */
            Matrix3D.prototype.prependTranslation = function (x, y, z) {
                var m = new Matrix3D();
                m.position = new geom.Vector3D(x, y, z);
                this.prepend(m);
            };

            // TODO orientationStyle
            /**
            * Sets the transformation matrix's translation, rotation, and scale settings.
            */
            Matrix3D.prototype.recompose = function (components) {
                if (components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0)
                    return false;

                this.identity();
                this.appendScale(components[2].x, components[2].y, components[2].z);

                var angle;
                angle = -components[1].x;
                this.append(new Matrix3D([1, 0, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 0]));
                angle = -components[1].y;
                this.append(new Matrix3D([Math.cos(angle), 0, Math.sin(angle), 0, 0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 0]));
                angle = -components[1].z;
                this.append(new Matrix3D([Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));

                this.position = components[0];
                this.rawData[15] = 1;

                return true;
            };

            /**
            * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
            */
            Matrix3D.prototype.transformVectors = function (vin, vout) {
                var i = 0;
                var x = 0, y = 0, z = 0;

                while (i + 3 <= vin.length) {
                    x = vin[i];
                    y = vin[i + 1];
                    z = vin[i + 2];
                    vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
                    vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
                    vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
                    i += 3;
                }
            };

            /**
            * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
            */
            Matrix3D.prototype.transpose = function () {
                var oRawData = this.rawData.slice(0);

                this.rawData[1] = oRawData[4];
                this.rawData[2] = oRawData[8];
                this.rawData[3] = oRawData[12];
                this.rawData[4] = oRawData[1];
                this.rawData[6] = oRawData[9];
                this.rawData[7] = oRawData[13];
                this.rawData[8] = oRawData[2];
                this.rawData[9] = oRawData[6];
                this.rawData[11] = oRawData[14];
                this.rawData[12] = oRawData[3];
                this.rawData[13] = oRawData[7];
                this.rawData[14] = oRawData[11];
            };

            Matrix3D.getAxisRotation = function (x, y, z, degrees) {
                var m = new Matrix3D();

                var a1 = new geom.Vector3D(x, y, z);
                var rad = -degrees * (Math.PI / 180);
                var c = Math.cos(rad);
                var s = Math.sin(rad);
                var t = 1.0 - c;

                m.rawData[0] = c + a1.x * a1.x * t;
                m.rawData[5] = c + a1.y * a1.y * t;
                m.rawData[10] = c + a1.z * a1.z * t;

                var tmp1 = a1.x * a1.y * t;
                var tmp2 = a1.z * s;
                m.rawData[4] = tmp1 + tmp2;
                m.rawData[1] = tmp1 - tmp2;
                tmp1 = a1.x * a1.z * t;
                tmp2 = a1.y * s;
                m.rawData[8] = tmp1 - tmp2;
                m.rawData[2] = tmp1 + tmp2;
                tmp1 = a1.y * a1.z * t;
                tmp2 = a1.x * s;
                m.rawData[9] = tmp1 + tmp2;
                m.rawData[6] = tmp1 - tmp2;

                return m;
            };

            Object.defineProperty(Matrix3D.prototype, "determinant", {
                get: /**
                * [read-only] A Number that determines whether a matrix is invertible.
                */
                function () {
                    return -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Matrix3D.prototype, "position", {
                get: /**
                * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
                * transformation's frame of reference.
                */
                function () {
                    return new geom.Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
                },
                set: function (value) {
                    this.rawData[12] = value.x;
                    this.rawData[13] = value.y;
                    this.rawData[14] = value.z;
                },
                enumerable: true,
                configurable: true
            });

            return Matrix3D;
        })();
        geom.Matrix3D = Matrix3D;
    })(away.geom || (away.geom = {}));
    var geom = away.geom;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    (function (display3D) {
        var Context3DTextureFormat = (function () {
            function Context3DTextureFormat() {
            }
            Context3DTextureFormat.BGRA = "bgra";
            Context3DTextureFormat.BGRA_PACKED = "bgraPacked4444";
            Context3DTextureFormat.BGR_PACKED = "bgrPacked565";
            Context3DTextureFormat.COMPRESSED = "compressed";
            Context3DTextureFormat.COMPRESSED_ALPHA = "compressedAlpha";
            return Context3DTextureFormat;
        })();
        display3D.Context3DTextureFormat = Context3DTextureFormat;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    (function (display3D) {
        var Context3DTriangleFace = (function () {
            function Context3DTriangleFace() {
            }
            Context3DTriangleFace.BACK = "back";
            Context3DTriangleFace.FRONT = "front";
            Context3DTriangleFace.FRONT_AND_BACK = "frontAndBack";
            Context3DTriangleFace.NONE = "none";
            return Context3DTriangleFace;
        })();
        display3D.Context3DTriangleFace = Context3DTriangleFace;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    (function (display3D) {
        var Context3DVertexBufferFormat = (function () {
            function Context3DVertexBufferFormat() {
            }
            Context3DVertexBufferFormat.BYTES_4 = "bytes4";
            Context3DVertexBufferFormat.FLOAT_1 = "float1";
            Context3DVertexBufferFormat.FLOAT_2 = "float2";
            Context3DVertexBufferFormat.FLOAT_3 = "float3";
            Context3DVertexBufferFormat.FLOAT_4 = "float4";
            return Context3DVertexBufferFormat;
        })();
        display3D.Context3DVertexBufferFormat = Context3DVertexBufferFormat;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    (function (display3D) {
        var Context3DProgramType = (function () {
            function Context3DProgramType() {
            }
            Context3DProgramType.FRAGMENT = "fragment";
            Context3DProgramType.VERTEX = "vertex";
            return Context3DProgramType;
        })();
        display3D.Context3DProgramType = Context3DProgramType;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    /**
    * ...
    * @author Gary Paluk - http://www.plugin.io
    */
    ///<reference path="../../def/webgl.d.ts"/>
    ///<reference path="Context3DClearMask.ts"/>
    ///<reference path="VertexBuffer3D.ts"/>
    ///<reference path="IndexBuffer3D.ts"/>
    ///<reference path="Program3D.ts"/>
    ///<reference path="../geom/Matrix3D.ts"/>
    ///<reference path="../geom/Rectangle.ts"/>
    ///<reference path="Context3DTextureFormat.ts"/>
    ///<reference path="Texture.ts"/>
    ///<reference path="Context3DTriangleFace.ts"/>
    ///<reference path="Context3DVertexBufferFormat.ts"/>
    ///<reference path="Context3DProgramType.ts"/>
    (function (display3D) {
        var Context3D = (function () {
            function Context3D(canvas) {
                this._indexBufferList = [];
                this._vertexBufferList = [];
                this._textureList = [];
                this._programList = [];
                try  {
                    GL = canvas.getContext("experimental-webgl");
                    if (!GL) {
                        GL = canvas.getContext("webgl");
                    }
                } catch (e) {
                }

                if (GL) {
                } else {
                    //this.dispatchEvent( new away.events.AwayEvent( away.events.AwayEvent.INITIALIZE_FAILED, e ) );
                    alert("WebGL is not available.");
                }
            }
            Context3D.prototype.clear = function (red, green, blue, alpha, depth, stencil, mask) {
                if (typeof red === "undefined") { red = 0; }
                if (typeof green === "undefined") { green = 0; }
                if (typeof blue === "undefined") { blue = 0; }
                if (typeof alpha === "undefined") { alpha = 1; }
                if (typeof depth === "undefined") { depth = 1; }
                if (typeof stencil === "undefined") { stencil = 0; }
                if (typeof mask === "undefined") { mask = display3D.Context3DClearMask.ALL; }
                console.log("===== clear =====");
                console.log("\tred: " + red);
                console.log("\tgreen: " + green);
                console.log("\tblue: " + blue);
                console.log("\talpha: " + alpha);
                console.log("\tdepth: " + depth);
                console.log("\tstencil: " + stencil);
                console.log("\tmask: " + mask);

                if (!this._drawing) {
                    this.updateBlendStatus();
                    this._drawing = true;
                }
                GL.clearColor(red, green, blue, alpha);
                GL.clearDepth(depth);
                GL.clearStencil(stencil);
                GL.clear(mask);
            };

            Context3D.prototype.configureBackBuffer = function (width, height, antiAlias, enableDepthAndStencil) {
                if (typeof enableDepthAndStencil === "undefined") { enableDepthAndStencil = true; }
                console.log("===== configureBackBuffer =====");
                console.log("\twidth: " + width);
                console.log("\theight: " + height);
                console.log("\tantiAlias: " + antiAlias);
                console.log("\tenableDepthAndStencil: " + enableDepthAndStencil);

                if (enableDepthAndStencil) {
                    GL.enable(GL.STENCIL_TEST);
                    GL.enable(GL.DEPTH_TEST);
                }

                // TODO add antialias (seems to be a webgl bug)
                // TODO set webgl / canvas dimensions
                GL.viewport.width = width;
                GL.viewport.height = height;
            };

            /*
            public function createCubeTexture( size:number, format:Context3DTextureFormat, optimizeForRenderToTexture:boolean, streamingLevels:number = 0 ):CubeTexture
            {
            var texture = new nme.display3D.textures.CubeTexture (GL.createTexture (), size);     // TODO use format, optimizeForRenderToTexture and  streamingLevels?
            texturesCreated.push(texture);
            return texture;
            }*/
            Context3D.prototype.createIndexBuffer = function (numIndices) {
                console.log("===== createIndexBuffer =====");
                console.log("\tnumIndices: " + numIndices);
                var indexBuffer = new away.display3D.IndexBuffer3D(numIndices);
                this._indexBufferList.push(indexBuffer);
                return indexBuffer;
            };

            Context3D.prototype.createProgram = function () {
                console.log("===== createProgram =====");
                var program = new away.display3D.Program3D();
                this._programList.push(program);
                return program;
            };

            Context3D.prototype.createTexture = function (width, height, format, optimizeForRenderToTexture, streamingLevels) {
                if (typeof streamingLevels === "undefined") { streamingLevels = 0; }
                console.log("===== createTexture =====");
                console.log("\twidth: " + width);
                console.log("\theight: " + height);
                console.log("\tformat: " + format);
                console.log("\toptimizeForRenderToTexture: " + optimizeForRenderToTexture);
                console.log("\tstreamingLevels: " + streamingLevels);

                var texture = new away.display3D.Texture(width, height);
                this._textureList.push(texture);
                return texture;
            };

            Context3D.prototype.createVertexBuffer = function (numVertices, data32PerVertex) {
                console.log("===== createVertexBuffer =====");
                console.log("\tnumVertices: " + numVertices);
                console.log("\tdata32PerVertex: " + data32PerVertex);
                var vertexBuffer = new away.display3D.VertexBuffer3D(numVertices, data32PerVertex);
                this._vertexBufferList.push(vertexBuffer);
                return vertexBuffer;
            };

            Context3D.prototype.dispose = function () {
                console.log("===== dispose =====");
                var i;
                for (i = 0; i < this._indexBufferList.length; ++i) {
                    this._indexBufferList[i].dispose();
                }
                this._indexBufferList = null;

                for (i = 0; i < this._vertexBufferList.length; ++i) {
                    this._vertexBufferList[i].dispose();
                }
                this._vertexBufferList = null;

                for (i = 0; i < this._textureList.length; ++i) {
                    this._textureList[i].dispose();
                }
                this._textureList = null;

                for (i = 0; i < this._programList.length; ++i) {
                    this._programList[i].dispose();
                }
                this._programList = null;
            };

            /*
            public function drawToBitmapData(destination:BitmapData)
            {
            // TODO
            }
            */
            Context3D.prototype.drawTriangles = function (indexBuffer, firstIndex, numTriangles) {
                if (typeof firstIndex === "undefined") { firstIndex = 0; }
                if (typeof numTriangles === "undefined") { numTriangles = -1; }
                console.log("===== drawTriangles =====");
                console.log("\tfirstIndex: " + firstIndex);
                console.log("\tnumTriangles: " + numTriangles);

                if (!this._drawing) {
                    throw "Need to clear before drawing if the buffer has not been cleared since the last present() call.";
                }
                var numIndices = 0;

                if (numTriangles == -1) {
                    numIndices = indexBuffer.numIndices;
                } else {
                    numIndices = numTriangles * 3;
                }

                GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
                GL.drawElements(GL.TRIANGLES, numIndices, GL.UNSIGNED_SHORT, firstIndex);
            };

            Context3D.prototype.present = function () {
                console.log("===== present =====");
                this._drawing = false;
                GL.useProgram(null);
            };

            //TODO Context3DBlendFactor
            Context3D.prototype.setBlendFactors = function (sourceFactor, destinationFactor) {
                console.log("===== setBlendFactors =====");
                console.log("\tsourceFactor: " + sourceFactor);
                console.log("\tdestinationFactor: " + destinationFactor);
                this._blendEnabled = true;
                this._blendSourceFactor = sourceFactor;
                this._blendDestinationFactor = destinationFactor;

                this.updateBlendStatus();
            };

            Context3D.prototype.setColorMask = function (red, green, blue, alpha) {
                console.log("===== setColorMask =====");
                GL.colorMask(red, green, blue, alpha);
            };

            Context3D.prototype.setCulling = function (triangleFaceToCull) {
                console.log("===== setCulling =====");
                console.log("\ttriangleFaceToCull: " + triangleFaceToCull);
                if (triangleFaceToCull == display3D.Context3DTriangleFace.NONE) {
                    GL.disable(GL.CULL_FACE);
                } else {
                    GL.enable(GL.CULL_FACE);
                    switch (triangleFaceToCull) {
                        case display3D.Context3DTriangleFace.FRONT:
                            GL.cullFace(GL.FRONT);
                            break;
                        case display3D.Context3DTriangleFace.BACK:
                            GL.cullFace(GL.BACK);
                            break;
                        case display3D.Context3DTriangleFace.FRONT_AND_BACK:
                            GL.cullFace(GL.FRONT_AND_BACK);
                            break;
                        default:
                            throw "Unknown Context3DTriangleFace type.";
                    }
                }
            };

            // TODO Context3DCompareMode
            Context3D.prototype.setDepthTest = function (depthMask, passCompareMode) {
                console.log("===== setDepthTest =====");
                console.log("\tdepthMask: " + depthMask);
                console.log("\tpassCompareMode: " + passCompareMode);
                GL.depthFunc(passCompareMode);
                GL.depthMask(depthMask);
            };

            Context3D.prototype.setProgram = function (program3D) {
                console.log("===== setProgram =====");

                //TODO decide on construction/reference resposibilities
                this._currentProgram = program3D;
                program3D.focusProgram();
            };

            Context3D.prototype.getUniformLocationNameFromAgalRegisterIndex = function (programType, firstRegister) {
                switch (programType) {
                    case display3D.Context3DProgramType.VERTEX:
                        return "vc";
                        break;
                    case display3D.Context3DProgramType.FRAGMENT:
                        return "fc";
                        break;
                    default:
                        throw "Program Type " + programType + " not supported";
                }
            };

            /*
            public setProgramConstantsFromByteArray
            */
            Context3D.prototype.setProgramConstantsFromMatrix = function (programType, firstRegister, matrix, transposedMatrix) {
                if (typeof transposedMatrix === "undefined") { transposedMatrix = false; }
                var locationName = this.getUniformLocationNameFromAgalRegisterIndex(programType, firstRegister);
                this.setGLSLProgramConstantsFromMatrix(locationName, matrix, transposedMatrix);
            };

            /*
            public setProgramConstantsFromVector(programType:string, firstRegister:number, matrix:away.geom.Matrix3D, transposedMatrix:boolean = false )
            {
            throw "fu";
            }*/
            /*
            public setGLSLProgramConstantsFromByteArray
            
            */
            Context3D.prototype.setGLSLProgramConstantsFromMatrix = function (locationName, matrix, transposedMatrix) {
                if (typeof transposedMatrix === "undefined") { transposedMatrix = false; }
                console.log("===== setGLSLProgramConstantsFromMatrix =====");
                console.log("\tlocationName: " + locationName);
                console.log("\tmatrix: " + matrix.rawData);
                console.log("\ttransposedMatrix: " + transposedMatrix);

                var location = GL.getUniformLocation(this._currentProgram.glProgram, locationName);
                GL.uniformMatrix4fv(location, !transposedMatrix, new Float32Array(matrix.rawData));
            };

            Context3D.prototype.setGLSLProgramConstantsFromVector4 = function (locationName, data, startIndex) {
                if (typeof startIndex === "undefined") { startIndex = 0; }
                console.log("===== setGLSLProgramConstantsFromVector4 =====");
                console.log("\tlocationName: " + locationName);
                console.log("\tdata: " + data);
                console.log("\tstartIndex: " + startIndex);
                var location = GL.getUniformLocation(this._currentProgram.glProgram, locationName);
                GL.uniform4f(location, data[startIndex], data[startIndex + 1], data[startIndex + 2], data[startIndex + 3]);
            };

            Context3D.prototype.setScissorRectangle = function (rectangle) {
                console.log("===== setScissorRectangle =====");
                console.log("\trectangle: " + rectangle);
                GL.scissor(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            };

            Context3D.prototype.setGLSLTextureAt = function (locationName, texture, textureIndex) {
                var location = GL.getUniformLocation(this._currentProgram.glProgram, locationName);
                switch (textureIndex) {
                    case 0:
                        GL.activeTexture(GL.TEXTURE0);
                        break;
                    case 1:
                        GL.activeTexture(GL.TEXTURE1);
                        break;
                    case 2:
                        GL.activeTexture(GL.TEXTURE2);
                        break;
                    case 3:
                        GL.activeTexture(GL.TEXTURE3);
                        break;
                    case 4:
                        GL.activeTexture(GL.TEXTURE4);
                        break;
                    case 5:
                        GL.activeTexture(GL.TEXTURE5);
                        break;
                    case 6:
                        GL.activeTexture(GL.TEXTURE6);
                        break;
                    case 7:
                        GL.activeTexture(GL.TEXTURE7);
                        break;
                    default:
                        throw "Texture " + textureIndex + " is out of bounds.";
                }

                GL.bindTexture(GL.TEXTURE_2D, texture.glTexture);
                GL.uniform1i(location, textureIndex);

                // TODO create something like setSamplerStateAt(....
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            };

            Context3D.prototype.setVertexBufferAt = function (index, buffer, bufferOffset, format) {
                if (typeof bufferOffset === "undefined") { bufferOffset = 0; }
                if (typeof format === "undefined") { format = null; }
                console.log("===== setVertexBufferAt =====");
                console.log("\tindex: " + index);
                console.log("\tbufferOffset: " + bufferOffset);
                console.log("\tformat: " + format);

                var locationName = "va" + index;
                this.setGLSLVertexBufferAt(locationName, buffer, bufferOffset, format);
            };

            Context3D.prototype.setGLSLVertexBufferAt = function (locationName, buffer, bufferOffset, format) {
                if (typeof bufferOffset === "undefined") { bufferOffset = 0; }
                if (typeof format === "undefined") { format = null; }
                console.log("===== setGLSLVertexBufferAt =====");
                console.log("\tbuffer.length: " + buffer.numVertices);
                console.log("\tbuffer.data32PerVertex: " + buffer.data32PerVertex);
                console.log("\tlocationName: " + locationName);
                console.log("\tbufferOffset: " + bufferOffset);

                var location = GL.getAttribLocation(this._currentProgram.glProgram, locationName);

                GL.bindBuffer(GL.ARRAY_BUFFER, buffer.glBuffer);

                var dimension;
                var type = GL.FLOAT;
                var numBytes = 4;

                switch (format) {
                    case display3D.Context3DVertexBufferFormat.BYTES_4:
                        dimension = 4;
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_1:
                        dimension = 1;
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_2:
                        dimension = 2;
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_3:
                        dimension = 3;
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_4:
                        dimension = 4;
                        break;
                    default:
                        throw "Buffer format " + format + " is not supported.";
                }

                GL.enableVertexAttribArray(location);
                GL.vertexAttribPointer(location, dimension, type, false, buffer.data32PerVertex * numBytes, bufferOffset * numBytes);
            };

            Context3D.prototype.updateBlendStatus = function () {
                console.log("===== updateBlendStatus =====");
                if (this._blendEnabled) {
                    GL.enable(GL.BLEND);
                    GL.blendEquation(GL.FUNC_ADD);
                    GL.blendFunc(this._blendSourceFactor, this._blendDestinationFactor);
                } else {
                    GL.disable(GL.BLEND);
                }
            };
            return Context3D;
        })();
        display3D.Context3D = Context3D;
    })(away.display3D || (away.display3D = {}));
    var display3D = away.display3D;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../library/assets/IAsset.ts" />
    ///<reference path="../library/assets/NamedAssetBase.ts" />
    ///<reference path="../library/assets/AssetType.ts" />
    ///<reference path="../display3D/Context3D.ts" />
    ///<reference path="../display3D/TextureBase.ts" />
    ///<reference path="../display3D/Context3DTextureFormat.ts" />
    ///<reference path="../errors/AbstractMethodError.ts" />
    (function (textures) {
        var TextureProxyBase = (function (_super) {
            __extends(TextureProxyBase, _super);
            function TextureProxyBase() {
                _super.call(this);
                this._format = away.display3D.Context3DTextureFormat.BGRA;
                this._hasMipmaps = true;

                this._textures = new Array(8);
                this._dirty = new Array(8);
            }
            Object.defineProperty(TextureProxyBase.prototype, "hasMipMaps", {
                get: /**
                *
                * @returns {boolean}
                */
                function () {
                    return this._hasMipmaps;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TextureProxyBase.prototype, "format", {
                get: /**
                *
                * @returns {string}
                */
                function () {
                    return this._format;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TextureProxyBase.prototype, "assetType", {
                get: /**
                *
                * @returns {string}
                */
                function () {
                    return away.library.AssetType.TEXTURE;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TextureProxyBase.prototype, "width", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TextureProxyBase.prototype, "height", {
                get: /**
                *
                * @returns {number}
                */
                function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });

            /* TODO: implement Stage3DProxy
            public getTextureForStage3D(stage3DProxy : Stage3DProxy) : TextureBase
            {
            var contextIndex : number = stage3DProxy._stage3DIndex;
            var tex : TextureBase = _textures[contextIndex];
            var context : Context3D = stage3DProxy._context3D;
            
            if (!tex || _dirty[contextIndex] != context) {
            _textures[contextIndex] = tex = createTexture(context);
            _dirty[contextIndex] = context;
            uploadContent(tex);//_pUploadContent
            }
            
            return tex;
            }
            */
            /**
            *
            * @param texture
            * @private
            */
            TextureProxyBase.prototype._pUploadContent = function (texture) {
                throw new away.errors.AbstractMethodError();
            };

            /**
            *
            * @param width
            * @param height
            * @private
            */
            TextureProxyBase.prototype._pSetSize = function (width, height) {
                if (this._width != width || this._height != height) {
                    this._pInvalidateSize();
                }

                this._width = width;
                this._height = height;
            };

            /**
            *
            */
            TextureProxyBase.prototype.invalidateContent = function () {
                for (var i = 0; i < 8; ++i) {
                    this._dirty[i] = null;
                }
            };

            /**
            *
            * @private
            */
            TextureProxyBase.prototype._pInvalidateSize = function () {
                var tex;
                for (var i = 0; i < 8; ++i) {
                    tex = this._textures[i];

                    if (tex) {
                        tex.dispose();

                        this._textures[i] = null;
                        this._dirty[i] = null;
                    }
                }
            };

            /**
            *
            * @param context
            * @private
            */
            TextureProxyBase.prototype._pCreateTexture = function (context) {
                throw new away.errors.AbstractMethodError();
            };

            /**
            * @inheritDoc
            */
            TextureProxyBase.prototype.dispose = function () {
                for (var i = 0; i < 8; ++i) {
                    if (this._textures[i]) {
                        this._textures[i].dispose();
                    }
                }
            };
            return TextureProxyBase;
        })(away.library.NamedAssetBase);
        textures.TextureProxyBase = TextureProxyBase;
    })(away.textures || (away.textures = {}));
    var textures = away.textures;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../library/assets/IAsset.ts" />
    ///<reference path="../library/assets/NamedAssetBase.ts" />
    ///<reference path="../display3D/Context3D.ts" />
    ///<reference path="../display3D/TextureBase.ts" />
    ///<reference path="../display3D/Context3DTextureFormat.ts" />
    ///<reference path="../errors/AbstractMethodError.ts" />
    ///<reference path="TextureProxyBase.ts" />
    (function (textures) {
        //use namespace arcane;
        var Texture2DBase = (function (_super) {
            __extends(Texture2DBase, _super);
            function Texture2DBase() {
                _super.call(this);
            }
            Texture2DBase.prototype._pCreateTexture = function (context) {
                return context.createTexture(this.width, this.height, away.display3D.Context3DTextureFormat.BGRA, false);
            };
            return Texture2DBase;
        })(away.textures.TextureProxyBase);
        textures.Texture2DBase = Texture2DBase;
    })(away.textures || (away.textures = {}));
    var textures = away.textures;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../display/BitmapData.ts" />
    ///<reference path="../../geom/Matrix.ts" />
    ///<reference path="../../geom/Rectangle.ts" />
    ///<reference path="../../display3D/TextureBase.ts" />
    ///<reference path="../../display3D/Texture.ts" />
    (function (materials) {
        //import flash.display.*;
        //import flash.display3D.textures.CubeTexture;
        //import flash.display3D.textures.Texture;
        //import flash.display3D.textures.TextureBase;
        //import flash.geom.*;
        /**
        * MipmapGenerator is a helper class that uploads BitmapData to a Texture including mipmap levels.
        */
        var MipmapGenerator = (function () {
            function MipmapGenerator() {
            }
            MipmapGenerator.generateHTMLImageElementMipMaps = /**
            * Uploads a BitmapData with mip maps to a target Texture object.
            * @param source
            * @param target The target Texture to upload to.
            * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
            * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
            */
            function (source, target, mipmap, alpha, side) {
                if (typeof mipmap === "undefined") { mipmap = null; }
                if (typeof alpha === "undefined") { alpha = false; }
                if (typeof side === "undefined") { side = -1; }
                MipmapGenerator._rect.width = source.width;
                MipmapGenerator._rect.height = source.height;

                MipmapGenerator._source = new away.display.BitmapData(source.width, source.height, alpha);
                MipmapGenerator._source.copyImage(source, MipmapGenerator._rect, MipmapGenerator._rect);

                MipmapGenerator.generateMipMaps(MipmapGenerator._source, target, mipmap);

                MipmapGenerator._source.dispose();
                MipmapGenerator._source = null;
            };

            MipmapGenerator.generateMipMaps = /**
            * Uploads a BitmapData with mip maps to a target Texture object.
            * @param source The source BitmapData to upload.
            * @param target The target Texture to upload to.
            * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
            * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
            */
            function (source, target, mipmap, alpha, side) {
                if (typeof mipmap === "undefined") { mipmap = null; }
                if (typeof alpha === "undefined") { alpha = false; }
                if (typeof side === "undefined") { side = -1; }
                var w = source.width;
                var h = source.height;
                var regen = mipmap != null;
                var i;

                if (!mipmap) {
                    mipmap = new away.display.BitmapData(w, h, alpha);
                }

                MipmapGenerator._rect.width = w;
                MipmapGenerator._rect.height = h;

                var tx;

                while (w >= 1 || h >= 1) {
                    if (alpha) {
                        mipmap.fillRect(MipmapGenerator._rect, 0);
                    }

                    MipmapGenerator._matrix.a = MipmapGenerator._rect.width / source.width;
                    MipmapGenerator._matrix.d = MipmapGenerator._rect.height / source.height;

                    mipmap.width = MipmapGenerator._rect.width;
                    mipmap.height = MipmapGenerator._rect.height;
                    mipmap.copyPixels(source, source.rect, MipmapGenerator._rect);

                    if (target instanceof away.display3D.Texture) {
                        tx = target;

                        mipmap.imageData;
                    } else {
                    }

                    w >>= 1;
                    h >>= 1;

                    MipmapGenerator._rect.width = w > 1 ? w : 1;
                    MipmapGenerator._rect.height = h > 1 ? h : 1;
                }

                if (!regen) {
                    mipmap.dispose();
                }
            };
            MipmapGenerator._matrix = new away.geom.Matrix();
            MipmapGenerator._rect = new away.geom.Rectangle();
            return MipmapGenerator;
        })();
        materials.MipmapGenerator = MipmapGenerator;
    })(away.materials || (away.materials = {}));
    var materials = away.materials;
})(away || (away = {}));
var away;
(function (away) {
    //<reference path="../library/assets/IAsset.ts" />
    ///<reference path="../display3D/TextureBase.ts" />
    ///<reference path="../display3D/Texture.ts" />
    ///<reference path="../textures/Texture2DBase.ts" />
    ///<reference path="../errors/AbstractMethodError.ts" />
    ///<reference path="../display/BitmapData.ts" />
    ///<reference path="../materials/utils/MipmapGenerator.ts" />
    ///<reference path="../utils/TextureUtils.ts" />
    ///<reference path="../errors/Error.ts" />
    (function (textures) {
        var HTMLImageElementTexture = (function (_super) {
            __extends(HTMLImageElementTexture, _super);
            function HTMLImageElementTexture(htmlImageElement, generateMipmaps) {
                if (typeof generateMipmaps === "undefined") { generateMipmaps = true; }
                _super.call(this);

                this._htmlImageElement = htmlImageElement;
                this._generateMipmaps = generateMipmaps;
            }
            Object.defineProperty(HTMLImageElementTexture.prototype, "htmlImageElement", {
                get: function () {
                    return this._htmlImageElement;
                },
                set: function (value) {
                    if (value == this._htmlImageElement) {
                        return;
                    }

                    if (!away.utils.TextureUtils.isHTMLImageElementValid(value)) {
                        throw new away.errors.Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
                    }

                    this.invalidateContent();
                    this._pSetSize(value.width, value.height);
                    this._htmlImageElement = value;

                    if (this._generateMipmaps) {
                        this.getMipMapHolder();
                    }
                },
                enumerable: true,
                configurable: true
            });


            HTMLImageElementTexture.prototype._pUploadContent = function (texture) {
                if (this._generateMipmaps) {
                    away.materials.MipmapGenerator.generateHTMLImageElementMipMaps(this._htmlImageElement, texture, this._mipMapHolder, true);
                } else {
                    var tx = texture;
                    tx.uploadFromHTMLImageElement(this._htmlImageElement, 0);
                }
            };

            HTMLImageElementTexture.prototype.getMipMapHolder = function () {
                var newW = this._htmlImageElement.width;
                var newH = this._htmlImageElement.height;

                if (this._mipMapHolder) {
                    if (this._mipMapHolder.width == newW && this._htmlImageElement.height == newH) {
                        return;
                    }

                    this.freeMipMapHolder();
                }

                if (!HTMLImageElementTexture._mipMaps[newW]) {
                    HTMLImageElementTexture._mipMaps[newW] = [];
                    HTMLImageElementTexture._mipMapUses[newW] = [];
                }

                if (!HTMLImageElementTexture._mipMaps[newW][newH]) {
                    this._mipMapHolder = HTMLImageElementTexture._mipMaps[newW][newH] = new away.display.BitmapData(newW, newH, true);
                    HTMLImageElementTexture._mipMapUses[newW][newH] = 1;
                } else {
                    HTMLImageElementTexture._mipMapUses[newW][newH] = HTMLImageElementTexture._mipMapUses[newW][newH] + 1;
                    this._mipMapHolder = HTMLImageElementTexture._mipMaps[newW][newH];
                }
            };

            HTMLImageElementTexture.prototype.freeMipMapHolder = function () {
                var holderWidth = this._mipMapHolder.width;
                var holderHeight = this._mipMapHolder.height;

                if (--HTMLImageElementTexture._mipMapUses[holderWidth][holderHeight] == 0) {
                    HTMLImageElementTexture._mipMaps[holderWidth][holderHeight].dispose();
                    HTMLImageElementTexture._mipMaps[holderWidth][holderHeight] = null;
                }
            };

            HTMLImageElementTexture.prototype.dispose = function () {
                _super.prototype.dispose.call(this);

                if (this._mipMapHolder) {
                    this.freeMipMapHolder();
                }
            };
            HTMLImageElementTexture._mipMaps = [];
            HTMLImageElementTexture._mipMapUses = [];
            return HTMLImageElementTexture;
        })(away.textures.Texture2DBase);
        textures.HTMLImageElementTexture = HTMLImageElementTexture;
    })(away.textures || (away.textures = {}));
    var textures = away.textures;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="ParserBase.ts" />
    ///<reference path="ParserDataFormat.ts" />
    ///<reference path="ParserLoaderType.ts" />
    ///<reference path="../../net/IMGLoader.ts" />
    ///<reference path="../../textures/HTMLImageElementTexture.ts" />
    ///<reference path="../../textures/Texture2DBase.ts" />
    ///<reference path="../../utils/TextureUtils.ts" />
    (function (loaders) {
        /**
        * ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
        * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
        * exception cases.
        */
        var ImageParser = (function (_super) {
            __extends(ImageParser, _super);
            //private var _loader           : Loader;
            /**
            * Creates a new ImageParser object.
            * @param uri The url or id of the data or file to be parsed.
            * @param extra The holder for extra contextual data that the parser might need.
            */
            function ImageParser() {
                _super.call(this, away.loaders.ParserDataFormat.IMAGE, away.loaders.ParserLoaderType.IMG_LOADER);
            }
            ImageParser.supportsType = /**
            * Indicates whether or not a given file extension is supported by the parser.
            * @param extension The file extension of a potential file to be parsed.
            * @return Whether or not the given file type is supported.
            */
            function (extension) {
                extension = extension.toLowerCase();
                return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif";
            };

            ImageParser.supportsData = /**
            * Tests whether a data block can be parsed by the parser.
            * @param data The data block to potentially be parsed.
            * @return Whether or not the given data is supported.
            */
            function (data) {
                if (data instanceof HTMLImageElement) {
                    return true;
                }

                return false;
            };

            /**
            * @inheritDoc
            */
            ImageParser.prototype._pProceedParsing = function () {
                var asset;

                if (this.data instanceof HTMLImageElement) {
                    asset = new away.textures.HTMLImageElementTexture(this.data);

                    if (away.utils.TextureUtils.isHTMLImageElementValid(this.data)) {
                        this._pFinalizeAsset(asset, this._iFileName);
                    } else {
                        this.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.TEXTURE_SIZE_ERROR, asset));
                    }

                    return away.loaders.ParserBase.PARSING_DONE;
                }

                return away.loaders.ParserBase.PARSING_DONE;
            };
            return ImageParser;
        })(away.loaders.ParserBase);
        loaders.ImageParser = ImageParser;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../net/URLRequest.ts" />
    ///<reference path="../../net/IMGLoader.ts" />
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="ISingleFileTSLoader.ts" />
    ///<reference path="../../events/Event.ts" />
    ///<reference path="../../events/IOErrorEvent.ts" />
    ///<reference path="../../events/Event.ts" />
    (function (loaders) {
        var SingleFileImageLoader = (function (_super) {
            __extends(SingleFileImageLoader, _super);
            function SingleFileImageLoader() {
                _super.call(this);
                this.initLoader();
            }
            // Public
            /**
            *
            * @param req
            */
            SingleFileImageLoader.prototype.load = function (req) {
                this._loader.load(req);
            };

            /**
            *
            */
            SingleFileImageLoader.prototype.dispose = function () {
                this.disposeLoader();
                this._data = null;
            };

            Object.defineProperty(SingleFileImageLoader.prototype, "data", {
                get: // Get / Set
                /**
                *
                * @returns {*}
                */
                function () {
                    return this._loader.image;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SingleFileImageLoader.prototype, "dataFormat", {
                get: /**
                *
                * @returns {*}
                */
                function () {
                    return this._dataFormat;
                },
                set: function (value) {
                    this._dataFormat = value;
                },
                enumerable: true,
                configurable: true
            });

            // Private
            /**
            *
            */
            SingleFileImageLoader.prototype.initLoader = function () {
                if (!this._loader) {
                    this._loader = new away.net.IMGLoader();
                    this._loader.addEventListener(away.events.Event.COMPLETE, this.onLoadComplete, this);
                    this._loader.addEventListener(away.events.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                }
            };

            /**
            *
            */
            SingleFileImageLoader.prototype.disposeLoader = function () {
                if (this._loader) {
                    this._loader.dispose();
                    this._loader.removeEventListener(away.events.Event.COMPLETE, this.onLoadComplete, this);
                    this._loader.removeEventListener(away.events.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                    this._loader = null;
                }
            };

            // Events
            /**
            *
            * @param event
            */
            SingleFileImageLoader.prototype.onLoadComplete = function (event) {
                this.dispatchEvent(event);
            };

            /**
            *
            * @param event
            */
            SingleFileImageLoader.prototype.onLoadError = function (event) {
                this.dispatchEvent(event);
            };
            return SingleFileImageLoader;
        })(away.events.EventDispatcher);
        loaders.SingleFileImageLoader = SingleFileImageLoader;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../net/URLRequest.ts" />
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="ISingleFileTSLoader.ts" />
    ///<reference path="../../events/Event.ts" />
    ///<reference path="../../net/URLLoader.ts" />
    (function (loaders) {
        var SingleFileURLLoader = (function (_super) {
            __extends(SingleFileURLLoader, _super);
            function SingleFileURLLoader() {
                _super.call(this);
                this.initLoader();
            }
            // Public
            /**
            *
            * @param req
            */
            SingleFileURLLoader.prototype.load = function (req) {
                this._loader.load(req);
            };

            /**
            *
            */
            SingleFileURLLoader.prototype.dispose = function () {
                this.disposeLoader();
                this._data = null;
            };

            Object.defineProperty(SingleFileURLLoader.prototype, "data", {
                get: // Get / Set
                /**
                *
                * @returns {*}
                */
                function () {
                    return this._loader.data;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SingleFileURLLoader.prototype, "dataFormat", {
                get: /**
                *
                * @returns {*}
                */
                function () {
                    return this._loader.dataFormat;
                },
                set: function (value) {
                    this._loader.dataFormat = value;
                },
                enumerable: true,
                configurable: true
            });

            // Private
            /**
            *
            */
            SingleFileURLLoader.prototype.initLoader = function () {
                if (!this._loader) {
                    this._loader = new away.net.URLLoader();
                    this._loader.addEventListener(away.events.Event.COMPLETE, this.onLoadComplete, this);
                    this._loader.addEventListener(away.events.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                }
            };

            /**
            *
            */
            SingleFileURLLoader.prototype.disposeLoader = function () {
                if (this._loader) {
                    this._loader.dispose();
                    this._loader.removeEventListener(away.events.Event.COMPLETE, this.onLoadComplete, this);
                    this._loader.removeEventListener(away.events.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                    this._loader = null;
                }
            };

            // Events
            /**
            *
            * @param event
            */
            SingleFileURLLoader.prototype.onLoadComplete = function (event) {
                this.dispatchEvent(event);
            };

            /**
            *
            * @param event
            */
            SingleFileURLLoader.prototype.onLoadError = function (event) {
                this.dispatchEvent(event);
            };
            return SingleFileURLLoader;
        })(away.events.EventDispatcher);
        loaders.SingleFileURLLoader = SingleFileURLLoader;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../../events/Event.ts" />
    ///<reference path="../../events/IOErrorEvent.ts" />
    ///<reference path="../../events/HTTPStatusEvent.ts" />
    ///<reference path="../../events/ProgressEvent.ts" />
    ///<reference path="../../events/LoaderEvent.ts" />
    ///<reference path="../../net/URLRequest.ts" />
    ///<reference path="../../net/URLLoaderDataFormat.ts" />
    ///<reference path="../../net/URLRequestMethod.ts" />
    ///<reference path="../../net/URLRequest.ts" />
    ///<reference path="../../net/URLLoader.ts" />
    ///<reference path="../../loaders/parsers/ParserBase.ts" />
    ///<reference path="../../loaders/parsers/ParserDataFormat.ts" />
    ///<reference path="../../loaders/parsers/ImageParser.ts" />
    ///<reference path="ISingleFileTSLoader.ts" />
    ///<reference path="SingleFileImageLoader.ts" />
    ///<reference path="SingleFileURLLoader.ts" />
    (function (loaders) {
        /**
        * The SingleFileLoader is used to load a single file, as part of a resource.
        *
        * While SingleFileLoader can be used directly, e.g. to create a third-party asset
        * management system, it's recommended to use any of the classes Loader3D, AssetLoader
        * and AssetLibrary instead in most cases.
        *
        * @see away3d.loading.Loader3D
        * @see away3d.loading.AssetLoader
        * @see away3d.loading.AssetLibrary
        */
        var SingleFileLoader = (function (_super) {
            __extends(SingleFileLoader, _super);
            // Constructor
            /**
            * Creates a new SingleFileLoader object.
            */
            function SingleFileLoader(materialMode) {
                if (typeof materialMode === "undefined") { materialMode = 0; }
                _super.call(this);
                this._materialMode = materialMode;
            }
            SingleFileLoader.enableParser = function (parser) {
                if (SingleFileLoader._parsers.indexOf(parser) < 0) {
                    SingleFileLoader._parsers.push(parser);
                }
            };

            SingleFileLoader.enableParsers = function (parsers) {
                var pc;

                for (var c = 0; c < parsers.length; c++) {
                    SingleFileLoader.enableParser(parsers[c]);
                }
            };

            Object.defineProperty(SingleFileLoader.prototype, "url", {
                get: // Get / Set
                function () {
                    return this._req ? this._req.url : '';
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SingleFileLoader.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SingleFileLoader.prototype, "loadAsRawData", {
                get: function () {
                    return this._loadAsRawData;
                },
                enumerable: true,
                configurable: true
            });

            // Public
            /**
            * Load a resource from a file.
            *
            * @param urlRequest The URLRequest object containing the URL of the object to be loaded.
            * @param parser An optional parser object that will translate the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            SingleFileLoader.prototype.load = function (urlRequest, parser, loadAsRawData) {
                if (typeof parser === "undefined") { parser = null; }
                if (typeof loadAsRawData === "undefined") { loadAsRawData = false; }
                //var urlLoader   : away.net.URLLoader;
                var dataFormat;
                var loaderType = away.loaders.ParserLoaderType.URL_LOADER;

                this._loadAsRawData = loadAsRawData;
                this._req = urlRequest;

                this.decomposeFilename(this._req.url);

                if (this._loadAsRawData) {
                    // Always use binary for raw data loading
                    dataFormat = away.net.URLLoaderDataFormat.BINARY;
                } else {
                    if (parser) {
                        this._parser = parser;
                    }

                    if (!this._parser) {
                        this._parser = this.getParserFromSuffix();
                    }

                    console.log('SingleFileURLLoader.load._parser: ' + this._parser);

                    if (this._parser) {
                        switch (this._parser.dataFormat) {
                            case away.loaders.ParserDataFormat.BINARY:
                                dataFormat = away.net.URLLoaderDataFormat.BINARY;

                                break;

                            case away.loaders.ParserDataFormat.PLAIN_TEXT:
                                dataFormat = away.net.URLLoaderDataFormat.TEXT;

                                break;
                        }

                        switch (this._parser.loaderType) {
                            case away.loaders.ParserLoaderType.IMG_LOADER:
                                loaderType = away.loaders.ParserLoaderType.IMG_LOADER;

                                break;

                            case away.loaders.ParserLoaderType.URL_LOADER:
                                loaderType = away.loaders.ParserLoaderType.URL_LOADER;

                                break;
                        }
                    } else {
                        // Always use BINARY for unknown file formats. The thorough
                        // file type check will determine format after load, and if
                        // binary, a text load will have broken the file data.
                        dataFormat = away.net.URLLoaderDataFormat.BINARY;
                    }
                }

                console.log('SingleFileURLLoader.load.dataFormat:', dataFormat, 'ParserFormat: ', this._parser.dataFormat);
                console.log('SingleFileURLLoader.load.loaderType: ', loaderType);

                var loader = this.getLoader(loaderType);
                loader.dataFormat = dataFormat;
                loader.addEventListener(away.events.Event.COMPLETE, this.handleUrlLoaderComplete, this);
                loader.addEventListener(away.events.IOErrorEvent.IO_ERROR, this.handleUrlLoaderError, this);
                loader.load(urlRequest);
            };

            /**
            * Loads a resource from already loaded data.
            * @param data The data to be parsed. Depending on the parser type, this can be a ByteArray, String or XML.
            * @param uri The identifier (url or id) of the object to be loaded, mainly used for resource management.
            * @param parser An optional parser object that will translate the data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            SingleFileLoader.prototype.parseData = function (data, parser, req) {
                if (typeof parser === "undefined") { parser = null; }
                if (typeof req === "undefined") { req = null; }
                if (data.constructor === Function) {
                    data = new data();
                }

                if (parser) {
                    this._parser = parser;
                }

                this._req = req;

                this.parse(data);
            };

            Object.defineProperty(SingleFileLoader.prototype, "parser", {
                get: /**
                * A reference to the parser that will translate the loaded data into a usable resource.
                */
                function () {
                    return this._parser;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SingleFileLoader.prototype, "dependencies", {
                get: /**
                * A list of dependencies that need to be loaded and resolved for the loaded object.
                */
                function () {
                    return this._parser ? this._parser.dependencies : new Array();
                },
                enumerable: true,
                configurable: true
            });

            // Private
            /**
            *
            * @param loaderType
            */
            SingleFileLoader.prototype.getLoader = function (loaderType) {
                var loader;

                switch (loaderType) {
                    case away.loaders.ParserLoaderType.IMG_LOADER:
                        loader = new away.loaders.SingleFileImageLoader();

                        break;

                    case away.loaders.ParserLoaderType.URL_LOADER:
                        loader = new away.loaders.SingleFileURLLoader();

                        break;
                }

                return loader;
            };

            /**
            * Splits a url string into base and extension.
            * @param url The url to be decomposed.
            */
            SingleFileLoader.prototype.decomposeFilename = function (url) {
                // Get rid of query string if any and extract suffix
                var base = (url.indexOf('?') > 0) ? url.split('?')[0] : url;
                var i = base.lastIndexOf('.');
                this._fileExtension = base.substr(i + 1).toLowerCase();
                this._fileName = base.substr(0, i);
            };

            /**
            * Guesses the parser to be used based on the file extension.
            * @return An instance of the guessed parser.
            */
            SingleFileLoader.prototype.getParserFromSuffix = function () {
                var len = SingleFileLoader._parsers.length;

                for (var i = len - 1; i >= 0; i--) {
                    var currentParser = SingleFileLoader._parsers[i];
                    var supportstype = SingleFileLoader._parsers[i].supportsType(this._fileExtension);

                    console.log('SingleFileURLLoader.getParserFromSuffix.supportstype', supportstype);

                    if (SingleFileLoader._parsers[i]['supportsType'](this._fileExtension)) {
                        return new SingleFileLoader._parsers[i]();
                    }
                }

                return null;
            };

            /**
            * Guesses the parser to be used based on the file contents.
            * @param data The data to be parsed.
            * @param uri The url or id of the object to be parsed.
            * @return An instance of the guessed parser.
            */
            SingleFileLoader.prototype.getParserFromData = function (data) {
                var len = SingleFileLoader._parsers.length;

                for (var i = len - 1; i >= 0; i--)
                    if (SingleFileLoader._parsers[i].supportsData(data))
                        return new SingleFileLoader._parsers[i]();

                return null;
            };

            /**
            * Cleanups
            */
            SingleFileLoader.prototype.removeListeners = function (urlLoader) {
                urlLoader.removeEventListener(away.events.Event.COMPLETE, this.handleUrlLoaderComplete, this);
                urlLoader.removeEventListener(away.events.IOErrorEvent.IO_ERROR, this.handleUrlLoaderError, this);
            };

            // Events
            /**
            * Called when loading of a file has failed
            */
            SingleFileLoader.prototype.handleUrlLoaderError = function (event) {
                var urlLoader = event.target;
                this.removeListeners(urlLoader);

                //if(this.hasEventListener(away.events.LoaderEvent.LOAD_ERROR , this.handleUrlLoaderError , this ))
                this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.LOAD_ERROR, this._req.url, true));
            };

            /**
            * Called when loading of a file is complete
            */
            SingleFileLoader.prototype.handleUrlLoaderComplete = function (event) {
                var urlLoader = event.target;
                this.removeListeners(urlLoader);

                this._data = urlLoader.data;

                console.log('SingleFileURLLoader.handleUrlLoaderComplete url: ', this.url, '   LoadedDataType: ', typeof this._data);

                if (this._loadAsRawData) {
                    // No need to parse this data, which should be returned as is
                    this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE));
                } else {
                    this.parse(this._data);
                }
            };

            /**
            * Initiates parsing of the loaded data.
            * @param data The data to be parsed.
            */
            SingleFileLoader.prototype.parse = function (data) {
                if (!this._parser) {
                    this._parser = this.getParserFromData(data);
                }

                if (this._parser) {
                    this._parser.addEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this.onReadyForDependencies, this);
                    this._parser.addEventListener(away.events.ParserEvent.PARSE_ERROR, this.onParseError, this);
                    this._parser.addEventListener(away.events.ParserEvent.PARSE_COMPLETE, this.onParseComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                    this._parser.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                    this._parser.addEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);

                    if (this._req && this._req.url) {
                        this._parser._iFileName = this._req.url;
                    }

                    this._parser.materialMode = this._materialMode;
                    this._parser.parseAsync(data);
                } else {
                    var msg = "No parser defined. To enable all parsers for auto-detection, use Parsers.enableAllBundled()";

                    //if(hasEventListener(LoaderEvent.LOAD_ERROR)){
                    this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.LOAD_ERROR, "", true, msg));
                }
            };

            SingleFileLoader.prototype.onParseError = function (event) {
                this.dispatchEvent(event.clone());
            };

            SingleFileLoader.prototype.onReadyForDependencies = function (event) {
                this.dispatchEvent(event.clone());
            };

            SingleFileLoader.prototype.onAssetComplete = function (event) {
                console.log('SingleFileLoader.onAssetComplete', event);
                this.dispatchEvent(event.clone());
            };

            SingleFileLoader.prototype.onTextureSizeError = function (event) {
                this.dispatchEvent(event.clone());
            };

            /**
            * Called when parsing is complete.
            */
            SingleFileLoader.prototype.onParseComplete = function (event) {
                console.log('SingleFileLoader.onParseComplete', event);
                this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.url));

                this._parser.removeEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this.onReadyForDependencies, this);
                this._parser.removeEventListener(away.events.ParserEvent.PARSE_COMPLETE, this.onParseComplete, this);
                this._parser.removeEventListener(away.events.ParserEvent.PARSE_ERROR, this.onParseError, this);
                this._parser.removeEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                this._parser.removeEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                this._parser.removeEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);
            };
            SingleFileLoader._parsers = new Array(away.loaders.ImageParser);
            return SingleFileLoader;
        })(away.events.EventDispatcher);
        loaders.SingleFileLoader = SingleFileLoader;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../events/EventDispatcher.ts" />
    ///<reference path="../../library/assets/IAsset.ts" />
    ///<reference path="../../loaders/parsers/ParserBase.ts" />
    ///<reference path="SingleFileLoader.ts" />
    ///<reference path="../../net/URLRequest.ts" />
    (function (loaders) {
        //import away3d.arcane;
        //import away3d.library.assets.IAsset;
        //import away3d.loaders.parsers.ParserBase;
        //import flash.net.URLRequest;
        //use namespace arcane;
        /**
        * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
        * required by a parser, used by ResourceLoadSession.
        *
        */
        var ResourceDependency = (function () {
            function ResourceDependency(id, req, data, parentParser, retrieveAsRawData, suppressAssetEvents) {
                if (typeof retrieveAsRawData === "undefined") { retrieveAsRawData = false; }
                if (typeof suppressAssetEvents === "undefined") { suppressAssetEvents = false; }
                this._id = id;
                this._req = req;
                this._parentParser = parentParser;
                this._data = data;
                this._retrieveAsRawData = retrieveAsRawData;
                this._suppressAssetEvents = suppressAssetEvents;

                this._assets = new Array();
                this._dependencies = new Array();
            }
            Object.defineProperty(ResourceDependency.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "assets", {
                get: function () {
                    return this._assets;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "dependencies", {
                get: function () {
                    return this._dependencies;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "request", {
                get: function () {
                    return this._req;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "retrieveAsRawData", {
                get: function () {
                    return this._retrieveAsRawData;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "suppresAssetEvents", {
                get: function () {
                    return this._suppressAssetEvents;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ResourceDependency.prototype, "data", {
                get: /**
                * The data containing the dependency to be parsed, if the resource was already loaded.
                */
                function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * @private
            * Method to set data after having already created the dependency object, e.g. after load.
            */
            ResourceDependency.prototype._iSetData = function (data) {
                this._data = data;
            };

            Object.defineProperty(ResourceDependency.prototype, "parentParser", {
                get: /**
                * The parser which is dependent on this ResourceDependency object.
                */
                function () {
                    return this._parentParser;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
            * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
            * to its intended parent. The dependency should be a member of the dependencies property.
            */
            ResourceDependency.prototype.resolve = function () {
                if (this._parentParser)
                    this._parentParser._iResolveDependency(this);
            };

            /**
            * Resolve a dependency failure. For example, map loading failure from a 3d file
            */
            ResourceDependency.prototype.resolveFailure = function () {
                if (this._parentParser)
                    this._parentParser._iResolveDependencyFailure(this);
            };

            /**
            * Resolve the dependencies name
            */
            ResourceDependency.prototype.resolveName = function (asset) {
                if (this._parentParser)
                    return this._parentParser._iResolveDependencyName(this, asset);
                return asset.name;
            };
            return ResourceDependency;
        })();
        loaders.ResourceDependency = ResourceDependency;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../errors/Error.ts" />
    ///<reference path="../events/LoaderEvent.ts" />
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="../events/ParserEvent.ts" />
    ///<reference path="misc/AssetLoaderContext.ts" />
    ///<reference path="misc/AssetLoaderToken.ts" />
    ///<reference path="misc/ResourceDependency.ts" />
    ///<reference path="misc/SingleFileLoader.ts" />
    ///<reference path="parsers/ParserBase.ts" />
    ///<reference path="../net/URLLoader.ts" />
    ///<reference path="../net/URLRequest.ts" />
    (function (loaders) {
        //import away3d.*;
        //import away3d.events.*;
        //import away3d.loaders.misc.*;
        //import away3d.loaders.parsers.*;
        //import flash.events.*;
        //import flash.net.*;
        //use namespace arcane;
        /**
        * Dispatched when any asset finishes parsing. Also see specific events for each
        * individual asset type (meshes, materials et c.)
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="assetComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a full resource (including dependencies) finishes loading.
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="resourceComplete", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when a single dependency (which may be the main file of a resource)
        * finishes loading.
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="dependencyComplete", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when an error occurs during loading. I
        *
        * @eventType away3d.events.LoaderEvent
        */
        //[Event(name="loadError", type="away3d.events.LoaderEvent")]
        /**
        * Dispatched when an error occurs during parsing.
        *
        * @eventType away3d.events.ParserEvent
        */
        //[Event(name="parseError", type="away3d.events.ParserEvent")]
        /**
        * Dispatched when a skybox asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skyboxComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a camera3d asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="cameraComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a mesh asset has been costructed from a ressource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="meshComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a geometry asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="geometryComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a skeleton asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skeletonComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a skeleton pose asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="skeletonPoseComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a container asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="containerComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a texture asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="textureComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a texture projector asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="textureProjectorComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a material asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="materialComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when a animator asset has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animatorComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation set has been constructed from a group of animation state resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationSetComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation state has been constructed from a group of animation node resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationStateComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation node has been constructed from a resource.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="animationNodeComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an animation state transition has been constructed from a group of animation node resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="stateTransitionComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an light asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="lightComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an light picker asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="lightPickerComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an effect method asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="effectMethodComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an shadow map method asset has been constructed from a resources.
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="shadowMapMethodComplete", type="away3d.events.AssetEvent")]
        /**
        * Dispatched when an image asset dimensions are not a power of 2
        *
        * @eventType away3d.events.AssetEvent
        */
        //[Event(name="textureSizeError", type="away3d.events.AssetEvent")]
        /**
        * AssetLoader can load any file format that Away3D supports (or for which a third-party parser
        * has been plugged in) and it's dependencies. Events are dispatched when assets are encountered
        * and for when the resource (or it's dependencies) have been loaded.
        *
        * The AssetLoader will not make assets available in any other way than through the dispatched
        * events. To store assets and make them available at any point from any module in an application,
        * use the AssetLibrary to load and manage assets.
        *
        * @see away3d.loading.Loader3D
        * @see away3d.loading.AssetLibrary
        */
        var AssetLoader = (function (_super) {
            __extends(AssetLoader, _super);
            /**
            * Create a new ResourceLoadSession object.
            */
            function AssetLoader() {
                _super.call(this);

                this._stack = new Array();
                this._errorHandlers = new Array();
                this._parseErrorHandlers = new Array();
            }
            Object.defineProperty(AssetLoader.prototype, "baseDependency", {
                get: /**
                * Returns the base dependency of the loader
                */
                function () {
                    return this._baseDependency;
                },
                enumerable: true,
                configurable: true
            });

            AssetLoader.enableParser = /**
            * Enables a specific parser.
            * When no specific parser is set for a loading/parsing opperation,
            * loader3d can autoselect the correct parser to use.
            * A parser must have been enabled, to be considered when autoselecting the parser.
            *
            * @param parserClass The parser class to enable.
            *
            * @see away3d.loaders.parsers.Parsers
            */
            function (parserClass) {
                away.loaders.SingleFileLoader.enableParser(parserClass);
            };

            AssetLoader.enableParsers = /**
            * Enables a list of parsers.
            * When no specific parser is set for a loading/parsing opperation,
            * AssetLoader can autoselect the correct parser to use.
            * A parser must have been enabled, to be considered when autoselecting the parser.
            *
            * @param parserClasses A Vector of parser classes to enable.
            * @see away3d.loaders.parsers.Parsers
            */
            function (parserClasses) {
                away.loaders.SingleFileLoader.enableParsers(parserClasses);
            };

            /**
            * Loads a file and (optionally) all of its dependencies.
            *
            * @param req The URLRequest object containing the URL of the file to be loaded.
            * @param context An optional context object providing additional parameters for loading
            * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
            * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            AssetLoader.prototype.load = function (req, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                if (!this._token) {
                    this._token = new away.loaders.AssetLoaderToken(this);

                    this._uri = req.url = req.url.replace(/\\/g, "/");
                    this._context = context;
                    this._namespace = ns;

                    this._baseDependency = new away.loaders.ResourceDependency('', req, null, null);
                    this.retrieveDependency(this._baseDependency, parser);

                    return this._token;
                }

                // TODO: Throw error (already loading)
                return null;
            };

            /**
            * Loads a resource from already loaded data.
            *
            * @param data The data object containing all resource information.
            * @param context An optional context object providing additional parameters for loading
            * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
            * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            AssetLoader.prototype.loadData = function (data, id, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                if (!this._token) {
                    this._token = new away.loaders.AssetLoaderToken(this);

                    this._uri = id;
                    this._context = context;
                    this._namespace = ns;

                    this._baseDependency = new loaders.ResourceDependency(id, null, data, null);
                    this.retrieveDependency(this._baseDependency, parser);

                    return this._token;
                }

                // TODO: Throw error (already loading)
                return null;
            };

            /**
            * Recursively retrieves the next to-be-loaded and parsed dependency on the stack, or pops the list off the
            * stack when complete and continues on the top set.
            * @param parser The parser that will translate the data into a usable resource.
            */
            AssetLoader.prototype.retrieveNext = function (parser) {
                if (typeof parser === "undefined") { parser = null; }
                if (this._loadingDependency.dependencies.length) {
                    var dep = this._loadingDependency.dependencies.pop();

                    this._stack.push(this._loadingDependency);
                    this.retrieveDependency(dep);
                } else if (this._loadingDependency._iLoader.parser && this._loadingDependency._iLoader.parser.parsingPaused) {
                    this._loadingDependency._iLoader.parser._iResumeParsingAfterDependencies();
                    this._stack.pop();
                } else if (this._stack.length) {
                    var prev = this._loadingDependency;

                    this._loadingDependency = this._stack.pop();

                    if (prev._iSuccess) {
                        prev.resolve();
                    }

                    this.retrieveNext(parser);
                } else {
                    this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.RESOURCE_COMPLETE, this._uri));
                }
            };

            /**
            * Retrieves a single dependency.
            * @param parser The parser that will translate the data into a usable resource.
            */
            AssetLoader.prototype.retrieveDependency = function (dependency, parser) {
                if (typeof parser === "undefined") { parser = null; }
                var data;
                var matMode = 0;

                if (this._context && this._context.materialMode != 0) {
                    matMode = this._context.materialMode;
                }

                this._loadingDependency = dependency;
                this._loadingDependency._iLoader = new away.loaders.SingleFileLoader(matMode);

                this.addEventListeners(this._loadingDependency._iLoader);

                // Get already loaded (or mapped) data if available
                data = this._loadingDependency.data;

                if (this._context && this._loadingDependency.request && this._context._iHasDataForUrl(this._loadingDependency.request.url)) {
                    data = this._context._iGetDataForUrl(this._loadingDependency.request.url);
                }

                if (data) {
                    if (this._loadingDependency.retrieveAsRawData) {
                        // No need to parse. The parent parser is expecting this
                        // to be raw data so it can be passed directly.
                        this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this._loadingDependency.request.url, true));
                        this._loadingDependency._iSetData(data);
                        this._loadingDependency.resolve();

                        // Move on to next dependency
                        this.retrieveNext();
                    } else {
                        this._loadingDependency._iLoader.parseData(data, parser, this._loadingDependency.request);
                    }
                } else {
                    // Resolve URL and start loading
                    dependency.request.url = this.resolveDependencyUrl(dependency);
                    this._loadingDependency._iLoader.load(dependency.request, parser, this._loadingDependency.retrieveAsRawData);
                }
            };

            AssetLoader.prototype.joinUrl = function (base, end) {
                if (end.charAt(0) == '/') {
                    end = end.substr(1);
                }

                if (base.length == 0) {
                    return end;
                }

                if (base.charAt(base.length - 1) == '/') {
                    base = base.substr(0, base.length - 1);
                }

                return base.concat('/', end);
            };

            AssetLoader.prototype.resolveDependencyUrl = function (dependency) {
                var scheme_re;
                var base;
                var url = dependency.request.url;

                if (this._context && this._context._iHasMappingForUrl(url))
                    return this._context._iGetRemappedUrl(url);

                if (url == this._uri) {
                    return url;
                }

                // Absolute URL? Check if starts with slash or a URL
                // scheme definition (e.g. ftp://, http://, file://)
                scheme_re = new RegExp('/^[a-zA-Z]{3,4}:\/\//');

                if (url.charAt(0) == '/') {
                    if (this._context && this._context.overrideAbsolutePaths)
                        return this.joinUrl(this._context.dependencyBaseUrl, url); else
                        return url;
                } else if (scheme_re.test(url)) {
                    if (this._context && this._context.overrideFullURLs) {
                        var noscheme_url;

                        noscheme_url = url['replace'](scheme_re);

                        return this.joinUrl(this._context.dependencyBaseUrl, noscheme_url);
                    }
                }

                if (this._context && this._context.dependencyBaseUrl) {
                    base = this._context.dependencyBaseUrl;
                    return this.joinUrl(base, url);
                } else {
                    base = this._uri.substring(0, this._uri.lastIndexOf('/') + 1);
                    return this.joinUrl(base, url);
                }
            };

            AssetLoader.prototype.retrieveLoaderDependencies = function (loader) {
                if (!this._loadingDependency) {
                    //loader.parser = null;
                    //loader = null;
                    return;
                }
                var i, len = loader.dependencies.length;

                for (i = 0; i < len; i++) {
                    this._loadingDependency.dependencies[i] = loader.dependencies[i];
                }

                // Since more dependencies might be added eventually, empty this
                // list so that the same dependency isn't retrieved more than once.
                loader.dependencies.length = 0;

                this._stack.push(this._loadingDependency);

                this.retrieveNext();
            };

            /**
            * Called when a single dependency loading failed, and pushes further dependencies onto the stack.
            * @param event
            */
            AssetLoader.prototype.onRetrievalFailed = function (event) {
                var handled;
                var isDependency = (this._loadingDependency != this._baseDependency);
                var loader = event.target;

                this.removeEventListeners(loader);

                event = new away.events.LoaderEvent(away.events.LoaderEvent.LOAD_ERROR, this._uri, isDependency, event.message);

                // TODO: JS / AS3 Change - debug this code with a fine tooth combe
                //if (this.hasEventListener( away.events.LoaderEvent.LOAD_ERROR , this )) {
                this.dispatchEvent(event);
                handled = true;

                //} else {
                // TO - Away - Consider not doing this even when AssetLoader does
                // have it's own LOAD_ERROR listener
                var i, len = this._errorHandlers.length;
                for (i = 0; i < len; i++) {
                    var handlerFunction = this._errorHandlers[i];

                    handled = handled || handlerFunction(event);
                }

                if (handled) {
                    if (isDependency) {
                        this._loadingDependency.resolveFailure();
                        this.retrieveNext();
                    } else {
                        // Either this was the base file (last left in the stack) or
                        // default behavior was prevented by the handlers, and hence
                        // there is nothing more to do than clean up and bail.
                        this.dispose();
                        return;
                    }
                } else {
                    throw new away.errors.Error(event.message);
                }
            };

            /**
            * Called when a dependency parsing failed, and dispatches a <code>ParserEvent.PARSE_ERROR</code>
            * @param event
            */
            AssetLoader.prototype.onParserError = function (event) {
                var handled;

                var isDependency = (this._loadingDependency != this._baseDependency);

                var loader = event.target;

                this.removeEventListeners(loader);

                event = new away.events.ParserEvent(away.events.ParserEvent.PARSE_ERROR, event.message);

                // TODO: keep on eye on this / debug - JS / AS3 Change
                //if (this.hasEventListener(away.events.ParserEvent.PARSE_ERROR)) {
                this.dispatchEvent(event);
                handled = true;

                //} else {
                // TODO: Consider not doing this even when AssetLoader does
                // have it's own LOAD_ERROR listener
                var i, len = this._parseErrorHandlers.length;

                for (i = 0; i < len; i++) {
                    var handlerFunction = this._parseErrorHandlers[i];

                    handled = handled || handlerFunction(event);
                }

                if (handled) {
                    this.dispose();
                    return;
                } else {
                    throw new Error(event.message);
                }
            };

            AssetLoader.prototype.onAssetComplete = function (event) {
                if (event.type == away.events.AssetEvent.ASSET_COMPLETE) {
                    if (this._loadingDependency) {
                        this._loadingDependency.assets.push(event.asset);
                    }

                    event.asset.resetAssetPath(event.asset.name, this._namespace);
                }

                console.log('AssetLoader.onAssetComplete suppresAssetEvents:', this._loadingDependency.suppresAssetEvents, event);

                if (!this._loadingDependency.suppresAssetEvents) {
                    this.dispatchEvent(event.clone());
                }
            };

            AssetLoader.prototype.onReadyForDependencies = function (event) {
                var loader = event.target;

                if (this._context && !this._context.includeDependencies) {
                    loader.parser._iResumeParsingAfterDependencies();
                } else {
                    this.retrieveLoaderDependencies(loader);
                }
            };

            /**
            * Called when a single dependency was parsed, and pushes further dependencies onto the stack.
            * @param event
            */
            AssetLoader.prototype.onRetrievalComplete = function (event) {
                var loader = event.target;

                //var loader:SingleFileLoader = SingleFileLoader(event.target);
                // Resolve this dependency
                this._loadingDependency._iSetData(loader.data);
                this._loadingDependency._iSuccess = true;

                this.dispatchEvent(new away.events.LoaderEvent(away.events.LoaderEvent.DEPENDENCY_COMPLETE, event.url));
                this.removeEventListeners(loader);

                if (loader.dependencies.length && (!this._context || this._context.includeDependencies)) {
                    this.retrieveLoaderDependencies(loader);
                } else {
                    this.retrieveNext();
                }
            };

            /**
            * Called when an image is too large or it's dimensions are not a power of 2
            * @param event
            */
            AssetLoader.prototype.onTextureSizeError = function (event) {
                event.asset.name = this._loadingDependency.resolveName(event.asset);
                this.dispatchEvent(event);
            };

            AssetLoader.prototype.addEventListeners = function (loader) {
                loader.addEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onRetrievalComplete, this);
                loader.addEventListener(away.events.LoaderEvent.LOAD_ERROR, this.onRetrievalFailed, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                loader.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this.onReadyForDependencies, this);
                loader.addEventListener(away.events.ParserEvent.PARSE_ERROR, this.onParserError, this);
            };

            AssetLoader.prototype.removeEventListeners = function (loader) {
                loader.removeEventListener(away.events.ParserEvent.READY_FOR_DEPENDENCIES, this.onReadyForDependencies, this);
                loader.removeEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onRetrievalComplete, this);
                loader.removeEventListener(away.events.LoaderEvent.LOAD_ERROR, this.onRetrievalFailed, this);
                loader.removeEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                loader.removeEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.ParserEvent.PARSE_ERROR, this.onParserError, this);
            };

            AssetLoader.prototype.stop = function () {
                this.dispose();
            };

            AssetLoader.prototype.dispose = function () {
                this._errorHandlers = null;
                this._parseErrorHandlers = null;
                this._context = null;
                this._token = null;
                this._stack = null;

                if (this._loadingDependency && this._loadingDependency._iLoader) {
                    this.removeEventListeners(this._loadingDependency._iLoader);
                }

                this._loadingDependency = null;
            };

            /**
            * @private
            * This method is used by other loader classes (e.g. Loader3D and AssetLibraryBundle) to
            * add error event listeners to the AssetLoader instance. This system is used instead of
            * the regular EventDispatcher system so that the AssetLibrary error handler can be sure
            * that if hasEventListener() returns true, it's client code that's listening for the
            * event. Secondly, functions added as error handler through this custom method are
            * expected to return a boolean value indicating whether the event was handled (i.e.
            * whether they in turn had any client code listening for the event.) If no handlers
            * return true, the AssetLoader knows that the event wasn't handled and will throw an RTE.
            */
            AssetLoader.prototype._iAddParseErrorHandler = function (handler) {
                if (this._parseErrorHandlers.indexOf(handler) < 0) {
                    this._parseErrorHandlers.push(handler);
                }
            };

            AssetLoader.prototype._iAddErrorHandler = function (handler) {
                if (this._errorHandlers.indexOf(handler) < 0) {
                    this._errorHandlers.push(handler);
                }
            };
            return AssetLoader;
        })(away.events.EventDispatcher);
        loaders.AssetLoader = AssetLoader;
    })(away.loaders || (away.loaders = {}));
    var loaders = away.loaders;
})(away || (away = {}));
var away;
(function (away) {
    (function (library) {
        /**
        * Enumaration class for precedence when resolving naming conflicts in the library.
        *
        * @see away3d.library.AssetLibrary.conflictPrecedence
        * @see away3d.library.AssetLibrary.conflictStrategy
        * @see away3d.library.naming.ConflictStrategy
        */
        var ConflictPrecedence = (function () {
            function ConflictPrecedence() {
            }
            ConflictPrecedence.FAVOR_OLD = 'favorOld';

            ConflictPrecedence.FAVOR_NEW = 'favorNew';
            return ConflictPrecedence;
        })();
        library.ConflictPrecedence = ConflictPrecedence;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../assets/IAsset.ts" />
    ///<reference path="../../events/AssetEvent.ts" />
    ///<reference path="../../errors/AbstractMethodError.ts" />
    ///<reference path="../../events/AssetEvent.ts" />
    ///<reference path="ConflictPrecedence.ts" />
    (function (library) {
        /**
        * Abstract base class for naming conflict resolution classes. Extend this to create a
        * strategy class which the asset library can use to resolve asset naming conflicts, or
        * use one of the bundled concrete strategy classes:
        *
        * <ul>
        *   <li>IgnoreConflictStrategy (ConflictStrategy.IGNORE)</li>
        *   <li>ErrorConflictStrategy (ConflictStrategy.THROW_ERROR)</li>
        *   <li>NumSuffixConflictStrategy (ConflictStrategy.APPEND_NUM_SUFFIX)</li>
        * </ul>
        *
        * @see away3d.library.AssetLibrary.conflictStrategy
        * @see away3d.library.naming.ConflictStrategy
        * @see away3d.library.naming.IgnoreConflictStrategy
        * @see away3d.library.naming.ErrorConflictStrategy
        * @see away3d.library.naming.NumSuffixConflictStrategy
        */
        var ConflictStrategyBase = (function () {
            function ConflictStrategyBase() {
            }
            /**
            * Resolve a naming conflict between two assets. Must be implemented by concrete strategy
            * classes.
            */
            ConflictStrategyBase.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
                throw new away.errors.AbstractMethodError();
            };

            /**
            * Create instance of this conflict strategy. Used internally by the AssetLibrary to
            * make sure the same strategy instance is not used in all AssetLibrary instances, which
            * would break any state caching that happens inside the strategy class.
            */
            ConflictStrategyBase.prototype.create = function () {
                throw new away.errors.AbstractMethodError();
            };

            /**
            * Provided as a convenience method for all conflict strategy classes, as a way to finalize
            * the conflict resolution by applying the new names and dispatching the correct events.
            */
            ConflictStrategyBase.prototype._pUpdateNames = function (ns, nonConflictingName, oldAsset, newAsset, assetsDictionary, precedence) {
                var loser_prev_name;
                var winner;
                var loser;

                winner = (precedence === away.library.ConflictPrecedence.FAVOR_NEW) ? newAsset : oldAsset;
                loser = (precedence === away.library.ConflictPrecedence.FAVOR_NEW) ? oldAsset : newAsset;

                loser_prev_name = loser.name;

                assetsDictionary[winner.name] = winner;
                assetsDictionary[nonConflictingName] = loser;
                loser.resetAssetPath(nonConflictingName, ns, false);

                loser.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.ASSET_CONFLICT_RESOLVED, loser, loser_prev_name));
            };
            return ConflictStrategyBase;
        })();
        library.ConflictStrategyBase = ConflictStrategyBase;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../assets/IAsset.ts" />
    ///<reference path="ConflictStrategyBase.ts" />
    //<reference path="../../events/AssetEvent.ts" />
    //<reference path="../../errors/AbstractMethodError.ts" />
    //<reference path="../../events/AssetEvent.ts" />
    //<reference path="ConflictPrecedence.ts" />
    (function (library) {
        var NumSuffixConflictStrategy = (function (_super) {
            __extends(NumSuffixConflictStrategy, _super);
            function NumSuffixConflictStrategy(separator) {
                if (typeof separator === "undefined") { separator = '.'; }
                _super.call(this);

                this._separator = separator;
                this._next_suffix = {};
            }
            NumSuffixConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
                var orig;
                var new_name;
                var base;
                var suffix;

                orig = changedAsset.name;

                if (orig.indexOf(this._separator) >= 0) {
                    // Name has an ocurrence of the separator, so get base name and suffix,
                    // unless suffix is non-numerical, in which case revert to zero and
                    // use entire name as base
                    base = orig.substring(0, orig.lastIndexOf(this._separator));
                    suffix = parseInt(orig.substring(base.length - 1));

                    if (isNaN(suffix)) {
                        base = orig;
                        suffix = 0;
                    }
                } else {
                    base = orig;
                    suffix = 0;
                }

                if (suffix == 0 && this._next_suffix.hasOwnProperty(base)) {
                    suffix = this._next_suffix[base];
                }

                do {
                    suffix++;

                    new_name = base.concat(this._separator, suffix.toString());
                } while(assetsDictionary.hasOwnProperty(new_name));

                this._next_suffix[base] = suffix;
                this._pUpdateNames(oldAsset.assetNamespace, new_name, oldAsset, changedAsset, assetsDictionary, precedence);
            };

            NumSuffixConflictStrategy.prototype.create = function () {
                return new away.library.NumSuffixConflictStrategy(this._separator);
            };
            return NumSuffixConflictStrategy;
        })(away.library.ConflictStrategyBase);
        library.NumSuffixConflictStrategy = NumSuffixConflictStrategy;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../assets/IAsset.ts" />
    ///<reference path="ConflictStrategyBase.ts" />
    (function (library) {
        //import away3d.library.assets.IAsset;
        var IgnoreConflictStrategy = (function (_super) {
            __extends(IgnoreConflictStrategy, _super);
            function IgnoreConflictStrategy() {
                _super.call(this);
            }
            IgnoreConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
                // Do nothing, ignore the fact that there is a conflict.
                return;
            };

            IgnoreConflictStrategy.prototype.create = function () {
                return new away.library.IgnoreConflictStrategy();
            };
            return IgnoreConflictStrategy;
        })(away.library.ConflictStrategyBase);
        library.IgnoreConflictStrategy = IgnoreConflictStrategy;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../../errors/Error.ts" />
    ///<reference path="ConflictStrategyBase.ts" />
    ///<reference path="../assets/IAsset.ts" />
    (function (library) {
        //import away3d.library.assets.IAsset;
        var ErrorConflictStrategy = (function (_super) {
            __extends(ErrorConflictStrategy, _super);
            function ErrorConflictStrategy() {
                _super.call(this);
            }
            ErrorConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
                throw new away.errors.Error('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
            };

            ErrorConflictStrategy.prototype.create = function () {
                return new ErrorConflictStrategy();
            };
            return ErrorConflictStrategy;
        })(away.library.ConflictStrategyBase);
        library.ErrorConflictStrategy = ErrorConflictStrategy;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="NumSuffixConflictStrategy.ts" />
    ///<reference path="IgnoreConflictStrategy.ts" />
    ///<reference path="ErrorConflictStrategy.ts" />
    (function (library) {
        /**
        * Enumeration class for bundled conflict strategies. Set one of these values (or an
        * instance of a self-defined sub-class of ConflictStrategyBase) to the conflictStrategy
        * property on an AssetLibrary to define how that library resolves naming conflicts.
        *
        * The value of the <code>AssetLibrary.conflictPrecedence</code> property defines which
        * of the conflicting assets will get to keep it's name, and which is renamed (if any.)
        *
        * @see away3d.library.AssetLibrary.conflictStrategy
        * @see away3d.library.naming.ConflictStrategyBase
        */
        var ConflictStrategy = (function () {
            function ConflictStrategy() {
            }
            ConflictStrategy.APPEND_NUM_SUFFIX = new away.library.NumSuffixConflictStrategy();

            ConflictStrategy.IGNORE = new away.library.IgnoreConflictStrategy();

            ConflictStrategy.THROW_ERROR = new away.library.ErrorConflictStrategy();
            return ConflictStrategy;
        })();
        library.ConflictStrategy = ConflictStrategy;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="../assets/IAsset.ts" />
    (function (library) {
        //import away3d.library.assets.IAsset;
        var AssetLibraryIterator = (function () {
            function AssetLibraryIterator(assets, assetTypeFilter, namespaceFilter, filterFunc) {
                this._assets = assets;
                this.filter(assetTypeFilter, namespaceFilter, filterFunc);
            }
            Object.defineProperty(AssetLibraryIterator.prototype, "currentAsset", {
                get: function () {
                    // Return current, or null if no current
                    return (this._idx < this._filtered.length) ? this._filtered[this._idx] : null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AssetLibraryIterator.prototype, "numAssets", {
                get: function () {
                    return this._filtered.length;
                },
                enumerable: true,
                configurable: true
            });

            AssetLibraryIterator.prototype.next = function () {
                var next = null;

                if (this._idx < this._filtered.length)
                    next = this._filtered[this._idx];

                this._idx++;

                return next;
            };

            AssetLibraryIterator.prototype.reset = function () {
                this._idx = 0;
            };

            AssetLibraryIterator.prototype.setIndex = function (index) {
                this._idx = index;
            };

            AssetLibraryIterator.prototype.filter = function (assetTypeFilter, namespaceFilter, filterFunc) {
                if (assetTypeFilter || namespaceFilter) {
                    var idx;
                    var asset;

                    idx = 0;
                    this._filtered = new Array();

                    var l = this._assets.length;

                    for (var c = 0; c < l; c++) {
                        asset = this._assets[c];

                        if (assetTypeFilter && asset.assetType != assetTypeFilter)
                            continue;

                        if (namespaceFilter && asset.assetNamespace != namespaceFilter)
                            continue;

                        if (filterFunc != null && !filterFunc(asset))
                            continue;

                        this._filtered[idx++] = asset;
                    }
                } else {
                    this._filtered = this._assets;
                }
            };
            return AssetLibraryIterator;
        })();
        library.AssetLibraryIterator = AssetLibraryIterator;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    (function (library) {
        var IDUtil = (function () {
            function IDUtil() {
            }
            IDUtil.createUID = /**
            *  Generates a UID (unique identifier) based on ActionScript's
            *  pseudo-random number generator and the current time.
            *
            *  <p>The UID has the form
            *  <code>"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"</code>
            *  where X is a hexadecimal digit (0-9, A-F).</p>
            *
            *  <p>This UID will not be truly globally unique; but it is the best
            *  we can do without player support for UID generation.</p>
            *
            *  @return The newly-generated UID.
            *
            *  @langversion 3.0
            *  @playerversion Flash 9
            *  @playerversion AIR 1.1
            *  @productversion Flex 3
            */
            function () {
                var uid = new Array(36);
                var index = 0;

                var i;
                var j;

                for (i = 0; i < 8; i++)
                    uid[index++] = IDUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];

                for (i = 0; i < 3; i++) {
                    uid[index++] = 45;

                    for (j = 0; j < 4; j++)
                        uid[index++] = IDUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];
                }

                uid[index++] = 45;

                var time = new Date().getTime();

                // Note: time is the number of milliseconds since 1970,
                // which is currently more than one trillion.
                // We use the low 8 hex digits of this number in the UID.
                // Just in case the system clock has been reset to
                // Jan 1-4, 1970 (in which case this number could have only
                // 1-7 hex digits), we pad on the left with 7 zeros
                // before taking the low digits.
                var timeString = ("0000000" + time.toString(16).toUpperCase()).substr(-8);

                for (i = 0; i < 8; i++)
                    uid[index++] = timeString.charCodeAt(i);

                for (i = 0; i < 4; i++)
                    uid[index++] = IDUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];

                return String.fromCharCode.apply(null, uid);
            };
            IDUtil.ALPHA_CHAR_CODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
            return IDUtil;
        })();
        library.IDUtil = IDUtil;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));
var away;
(function (away) {
    ///<reference path="AssetLibraryBundle.ts"/>
    ///<reference path="../loaders/misc/SingleFileLoader.ts"/>
    ///<reference path="../loaders/misc/AssetLoaderContext.ts"/>
    ///<reference path="../loaders/misc/AssetLoaderToken.ts"/>
    ///<reference path="../loaders/parsers/ParserBase.ts"/>
    ///<reference path="naming/ConflictStrategyBase.ts"/>
    ///<reference path="utils/AssetLibraryIterator.ts"/>
    ///<reference path="assets/IAsset.ts"/>
    (function (library) {
        /**
        * AssetLibrary enforces a singleton pattern and is not intended to be instanced.
        * It's purpose is to allow access to the default library bundle through a set of static shortcut methods.
        * If you are interested in creating multiple library bundles, please use the <code>getBundle()</code> method.
        */
        var AssetLibrary = (function () {
            /**
            * Creates a new <code>AssetLibrary</code> object.
            *
            * @param se A singleton enforcer for the AssetLibrary ensuring it cannnot be instanced.
            */
            //*
            function AssetLibrary(se) {
                se = se;
            }
            AssetLibrary.getBundle = //*/
            /**
            * Returns an AssetLibrary bundle instance. If no key is given, returns the default bundle (which is
            * similar to using the AssetLibraryBundle as a singleton). To keep several separated library bundles,
            * pass a string key to this method to define which bundle should be returned. This is
            * referred to as using the AssetLibraryBundle as a multiton.
            *
            * @param key Defines which multiton instance should be returned.
            * @return An instance of the asset library
            */
            function (key) {
                if (typeof key === "undefined") { key = 'default'; }
                return away.library.AssetLibraryBundle.getInstance(key);
            };

            AssetLibrary.enableParser = /**
            *
            */
            function (parserClass) {
                away.loaders.SingleFileLoader.enableParser(parserClass);
            };

            AssetLibrary.enableParsers = /**
            *
            */
            function (parserClasses) {
                away.loaders.SingleFileLoader.enableParsers(parserClasses);
            };

            Object.defineProperty(AssetLibrary, "conflictStrategy", {
                get: /**
                * Short-hand for conflictStrategy property on default asset library bundle.
                *
                * @see away3d.library.AssetLibraryBundle.conflictStrategy
                */
                function () {
                    return away.library.AssetLibrary.getBundle().conflictStrategy;
                },
                set: function (val) {
                    away.library.AssetLibrary.getBundle().conflictStrategy = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLibrary, "conflictPrecedence", {
                get: /**
                * Short-hand for conflictPrecedence property on default asset library bundle.
                *
                * @see away3d.library.AssetLibraryBundle.conflictPrecedence
                */
                function () {
                    return away.library.AssetLibrary.getBundle().conflictPrecedence;
                },
                set: function (val) {
                    away.library.AssetLibrary.getBundle().conflictPrecedence = val;
                },
                enumerable: true,
                configurable: true
            });


            AssetLibrary.createIterator = /**
            * Short-hand for createIterator() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.createIterator()
            */
            function (assetTypeFilter, namespaceFilter, filterFunc) {
                if (typeof assetTypeFilter === "undefined") { assetTypeFilter = null; }
                if (typeof namespaceFilter === "undefined") { namespaceFilter = null; }
                if (typeof filterFunc === "undefined") { filterFunc = null; }
                return away.library.AssetLibrary.getBundle().createIterator(assetTypeFilter, namespaceFilter, filterFunc);
            };

            AssetLibrary.load = /**
            * Short-hand for load() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.load()
            */
            function (req, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                return away.library.AssetLibrary.getBundle().load(req, context, ns, parser);
            };

            AssetLibrary.loadData = /**
            * Short-hand for loadData() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.loadData()
            */
            function (data, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                return away.library.AssetLibrary.getBundle().loadData(data, context, ns, parser);
            };

            AssetLibrary.stopLoad = function () {
                away.library.AssetLibrary.getBundle().stopAllLoadingSessions();
            };

            AssetLibrary.getAsset = /**
            * Short-hand for getAsset() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.getAsset()
            */
            function (name, ns) {
                if (typeof ns === "undefined") { ns = null; }
                return away.library.AssetLibrary.getBundle().getAsset(name, ns);
            };

            AssetLibrary.addEventListener = /**
            * Short-hand for addEventListener() method on default asset library bundle.
            */
            function (type, listener, target) {
                away.library.AssetLibrary.getBundle().addEventListener(type, listener, target);
            };

            AssetLibrary.removeEventListener = /**
            * Short-hand for removeEventListener() method on default asset library bundle.
            */
            function (type, listener, target) {
                away.library.AssetLibrary.getBundle().removeEventListener(type, listener, target);
            };

            AssetLibrary.addAsset = /**
            * Short-hand for hasEventListener() method on default asset library bundle.
            
            public static hasEventListener(type:string):boolean
            {
            return away.library.AssetLibrary.getBundle().hasEventListener(type);
            }
            
            public static willTrigger(type:string):boolean
            {
            return getBundle().willTrigger(type);
            }
            */
            /**
            * Short-hand for addAsset() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.addAsset()
            */
            function (asset) {
                away.library.AssetLibrary.getBundle().addAsset(asset);
            };

            AssetLibrary.removeAsset = /**
            * Short-hand for removeAsset() method on default asset library bundle.
            *
            * @param asset The asset which should be removed from the library.
            * @param dispose Defines whether the assets should also be disposed.
            *
            * @see away3d.library.AssetLibraryBundle.removeAsset()
            */
            function (asset, dispose) {
                if (typeof dispose === "undefined") { dispose = true; }
                away.library.AssetLibrary.getBundle().removeAsset(asset, dispose);
            };

            AssetLibrary.removeAssetByName = /**
            * Short-hand for removeAssetByName() method on default asset library bundle.
            *
            * @param name The name of the asset to be removed.
            * @param ns The namespace to which the desired asset belongs.
            * @param dispose Defines whether the assets should also be disposed.
            *
            * @see away3d.library.AssetLibraryBundle.removeAssetByName()
            */
            function (name, ns, dispose) {
                if (typeof ns === "undefined") { ns = null; }
                if (typeof dispose === "undefined") { dispose = true; }
                return away.library.AssetLibrary.getBundle().removeAssetByName(name, ns, dispose);
            };

            AssetLibrary.removeAllAssets = /**
            * Short-hand for removeAllAssets() method on default asset library bundle.
            *
            * @param dispose Defines whether the assets should also be disposed.
            *
            * @see away3d.library.AssetLibraryBundle.removeAllAssets()
            */
            function (dispose) {
                if (typeof dispose === "undefined") { dispose = true; }
                away.library.AssetLibrary.getBundle().removeAllAssets(dispose);
            };

            AssetLibrary.removeNamespaceAssets = /**
            * Short-hand for removeNamespaceAssets() method on default asset library bundle.
            *
            * @see away3d.library.AssetLibraryBundle.removeNamespaceAssets()
            */
            function (ns, dispose) {
                if (typeof ns === "undefined") { ns = null; }
                if (typeof dispose === "undefined") { dispose = true; }
                away.library.AssetLibrary.getBundle().removeNamespaceAssets(ns, dispose);
            };
            AssetLibrary._iInstances = {};
            return AssetLibrary;
        })();
        library.AssetLibrary = AssetLibrary;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));

// singleton enforcer
var AssetLibrarySingletonEnforcer = (function () {
    function AssetLibrarySingletonEnforcer() {
    }
    return AssetLibrarySingletonEnforcer;
})();
var away;
(function (away) {
    ///<reference path="../loaders/AssetLoader.ts" />
    ///<reference path="naming/ConflictStrategyBase.ts" />
    ///<reference path="naming/ConflictStrategy.ts" />
    ///<reference path="assets/IAsset.ts" />
    ///<reference path="../errors/Error.ts" />
    ///<reference path="utils/AssetLibraryIterator.ts" />
    ///<reference path="../net/URLRequest.ts" />
    ///<reference path="../loaders/misc/AssetLoaderContext.ts" />
    ///<reference path="../loaders/misc/AssetLoaderToken.ts" />
    ///<reference path="../loaders/parsers/ParserBase.ts" />
    ///<reference path="assets/NamedAssetBase.ts" />
    ///<reference path="utils/IDUtil.ts" />
    ///<reference path="../events/AssetEvent.ts" />
    ///<reference path="../events/LoaderEvent.ts" />
    ///<reference path="../events/EventDispatcher.ts" />
    ///<reference path="AssetLibrary.ts" />
    (function (library) {
        /**
        * AssetLibraryBundle enforces a multiton pattern and is not intended to be instanced directly.
        * Its purpose is to create a container for 3D data management, both before and after parsing.
        * If you are interested in creating multiple library bundles, please use the <code>getInstance()</code> method.
        */
        var AssetLibraryBundle = (function (_super) {
            __extends(AssetLibraryBundle, _super);
            /**
            * Creates a new <code>AssetLibraryBundle</code> object.
            *
            * @param me A multiton enforcer for the AssetLibraryBundle ensuring it cannnot be instanced.
            */
            function AssetLibraryBundle(me) {
                _super.call(this);

                me = me;

                this._assets = new Array();
                this._assetDictionary = new Object();
                this._loadingSessions = new Array();

                this.conflictStrategy = away.library.ConflictStrategy.IGNORE.create();
                this.conflictPrecedence = away.library.ConflictPrecedence.FAVOR_NEW;
            }
            AssetLibraryBundle.getInstance = /**
            * Returns an AssetLibraryBundle instance. If no key is given, returns the default bundle instance (which is
            * similar to using the AssetLibraryBundle as a singleton.) To keep several separated library bundles,
            * pass a string key to this method to define which bundle should be returned. This is
            * referred to as using the AssetLibrary as a multiton.
            *
            * @param key Defines which multiton instance should be returned.
            * @return An instance of the asset library
            */
            function (key) {
                if (typeof key === "undefined") { key = 'default'; }
                if (!key) {
                    key = 'default';
                }

                if (!away.library.AssetLibrary._iInstances.hasOwnProperty(key)) {
                    away.library.AssetLibrary._iInstances[key] = new away.library.AssetLibraryBundle(new AssetLibraryBundleSingletonEnforcer());
                }

                return away.library.AssetLibrary._iInstances[key];
            };

            /**
            *
            */
            AssetLibraryBundle.prototype.enableParser = function (parserClass) {
                away.loaders.SingleFileLoader.enableParser(parserClass);
            };

            /**
            *
            */
            AssetLibraryBundle.prototype.enableParsers = function (parserClasses) {
                away.loaders.SingleFileLoader.enableParsers(parserClasses);
            };

            Object.defineProperty(AssetLibraryBundle.prototype, "conflictStrategy", {
                get: /**
                * Defines which strategy should be used for resolving naming conflicts, when two library
                * assets are given the same name. By default, <code>ConflictStrategy.APPEND_NUM_SUFFIX</code>
                * is used which means that a numeric suffix is appended to one of the assets. The
                * <code>conflictPrecedence</code> property defines which of the two conflicting assets will
                * be renamed.
                *
                * @see away3d.library.naming.ConflictStrategy
                * @see away3d.library.AssetLibrary.conflictPrecedence
                */
                function () {
                    return this._strategy;
                },
                set: function (val) {
                    if (!val) {
                        throw new away.errors.Error('namingStrategy must not be null. To ignore naming, use AssetLibrary.IGNORE');
                    }

                    this._strategy = val.create();
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AssetLibraryBundle.prototype, "conflictPrecedence", {
                get: /**
                * Defines which asset should have precedence when resolving a naming conflict between
                * two assets of which one has just been renamed by the user or by a parser. By default
                * <code>ConflictPrecedence.FAVOR_NEW</code> is used, meaning that the newly renamed
                * asset will keep it's new name while the older asset gets renamed to not conflict.
                *
                * This property is ignored for conflict strategies that do not actually rename an
                * asset automatically, such as ConflictStrategy.IGNORE and ConflictStrategy.THROW_ERROR.
                *
                * @see away3d.library.naming.ConflictPrecedence
                * @see away3d.library.naming.ConflictStrategy
                */
                function () {
                    return this._strategyPreference;
                },
                set: function (val) {
                    this._strategyPreference = val;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * Create an AssetLibraryIterator instance that can be used to iterate over the assets
            * in this asset library instance. The iterator can filter assets on asset type and/or
            * namespace. A "null" filter value means no filter of that type is used.
            *
            * @param assetTypeFilter Asset type to filter on (from the AssetType enum class.) Use
            * null to not filter on asset type.
            * @param namespaceFilter Namespace to filter on. Use null to not filter on namespace.
            * @param filterFunc Callback function to use when deciding whether an asset should be
            * included in the iteration or not. This needs to be a function that takes a single
            * parameter of type IAsset and returns a boolean where true means it should be included.
            *
            * @see away3d.library.assets.AssetType
            */
            AssetLibraryBundle.prototype.createIterator = function (assetTypeFilter, namespaceFilter, filterFunc) {
                if (typeof assetTypeFilter === "undefined") { assetTypeFilter = null; }
                if (typeof namespaceFilter === "undefined") { namespaceFilter = null; }
                if (typeof filterFunc === "undefined") { filterFunc = null; }
                return new away.library.AssetLibraryIterator(this._assets, assetTypeFilter, namespaceFilter, filterFunc);
            };

            /**
            * Loads a file and (optionally) all of its dependencies.
            *
            * @param req The URLRequest object containing the URL of the file to be loaded.
            * @param context An optional context object providing additional parameters for loading
            * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
            * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            AssetLibraryBundle.prototype.load = function (req, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                return this.loadResource(req, context, ns, parser);
            };

            /**
            * Loads a resource from existing data in memory.
            *
            * @param data The data object containing all resource information.
            * @param context An optional context object providing additional parameters for loading
            * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
            * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, AssetLoader will attempt to auto-detect the file type.
            */
            AssetLibraryBundle.prototype.loadData = function (data, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                return this.parseResource(data, context, ns, parser);
            };

            /**
            *
            */
            AssetLibraryBundle.prototype.getAsset = function (name, ns) {
                if (typeof ns === "undefined") { ns = null; }
                if (this._assetDictDirty) {
                    this.rehashAssetDict();
                }

                if (ns == null) {
                    ns = away.library.NamedAssetBase.DEFAULT_NAMESPACE;
                }

                if (!this._assetDictionary.hasOwnProperty(ns)) {
                    return null;
                }

                return this._assetDictionary[ns][name];
            };

            /**
            * Adds an asset to the asset library, first making sure that it's name is unique
            * using the method defined by the <code>conflictStrategy</code> and
            * <code>conflictPrecedence</code> properties.
            */
            AssetLibraryBundle.prototype.addAsset = function (asset) {
                var ns;
                var old;

                if (this._assets.indexOf(asset) >= 0) {
                    return;
                }

                old = this.getAsset(asset.name, asset.assetNamespace);
                ns = asset.assetNamespace || library.NamedAssetBase.DEFAULT_NAMESPACE;

                if (old != null) {
                    this._strategy.resolveConflict(asset, old, this._assetDictionary[ns], this._strategyPreference);
                }

                //create unique-id (for now this is used in AwayBuilder only
                asset.id = away.library.IDUtil.createUID();

                // Add it
                this._assets.push(asset);

                if (!this._assetDictionary.hasOwnProperty(ns)) {
                    this._assetDictionary[ns] = new Object();
                }

                this._assetDictionary[ns][asset.name] = asset;

                asset.addEventListener(away.events.AssetEvent.ASSET_RENAME, this.onAssetRename, this);
                asset.addEventListener(away.events.AssetEvent.ASSET_CONFLICT_RESOLVED, this.onAssetConflictResolved, this);
            };

            /**
            * Removes an asset from the library, and optionally disposes that asset by calling
            * it's disposeAsset() method (which for most assets is implemented as a default
            * version of that type's dispose() method.
            *
            * @param asset The asset which should be removed from this library.
            * @param dispose Defines whether the assets should also be disposed.
            */
            AssetLibraryBundle.prototype.removeAsset = function (asset, dispose) {
                if (typeof dispose === "undefined") { dispose = true; }
                var idx;

                this.removeAssetFromDict(asset);

                asset.removeEventListener(away.events.AssetEvent.ASSET_RENAME, this.onAssetRename, this);
                asset.removeEventListener(away.events.AssetEvent.ASSET_CONFLICT_RESOLVED, this.onAssetConflictResolved, this);

                idx = this._assets.indexOf(asset);
                if (idx >= 0) {
                    this._assets.splice(idx, 1);
                }

                if (dispose) {
                    asset.dispose();
                }
            };

            /**
            * Removes an asset which is specified using name and namespace.
            *
            * @param name The name of the asset to be removed.
            * @param ns The namespace to which the desired asset belongs.
            * @param dispose Defines whether the assets should also be disposed.
            *
            * @see away3d.library.AssetLibrary.removeAsset()
            */
            AssetLibraryBundle.prototype.removeAssetByName = function (name, ns, dispose) {
                if (typeof ns === "undefined") { ns = null; }
                if (typeof dispose === "undefined") { dispose = true; }
                var asset = this.getAsset(name, ns);

                if (asset) {
                    this.removeAsset(asset, dispose);
                }

                return asset;
            };

            /**
            * Removes all assets from the asset library, optionally disposing them as they
            * are removed.
            *
            * @param dispose Defines whether the assets should also be disposed.
            */
            AssetLibraryBundle.prototype.removeAllAssets = function (dispose) {
                if (typeof dispose === "undefined") { dispose = true; }
                if (dispose) {
                    var asset;

                    for (var c = 0; c < this._assets.length; c++) {
                        asset = this._assets[c];
                        asset.dispose();
                    }
                }

                this._assets.length = 0;
                this.rehashAssetDict();
            };

            /**
            * Removes all assets belonging to a particular namespace (null for default)
            * from the asset library, and optionall disposes them by calling their
            * disposeAsset() method.
            *
            * @param ns The namespace from which all assets should be removed.
            * @param dispose Defines whether the assets should also be disposed.
            *
            * @see away3d.library.AssetLibrary.removeAsset()
            */
            AssetLibraryBundle.prototype.removeNamespaceAssets = function (ns, dispose) {
                if (typeof ns === "undefined") { ns = null; }
                if (typeof dispose === "undefined") { dispose = true; }
                var idx = 0;
                var asset;
                var old_assets;

                // Empty the assets vector after having stored a copy of it.
                // The copy will be filled with all assets which weren't removed.
                old_assets = this._assets.concat();
                this._assets.length = 0;

                if (ns == null) {
                    ns = away.library.NamedAssetBase.DEFAULT_NAMESPACE;
                }

                for (var d = 0; d < old_assets.length; d++) {
                    asset = old_assets[d];

                    if (asset.assetNamespace == ns) {
                        if (dispose) {
                            asset.dispose();
                        }

                        // Remove asset from dictionary, but don't try to auto-remove
                        // the namespace, which will trigger an unnecessarily expensive
                        // test that is not needed since we know that the namespace
                        // will be empty when loop finishes.
                        this.removeAssetFromDict(asset, false);
                    } else {
                        this._assets[idx++] = asset;
                    }
                }

                if (this._assetDictionary.hasOwnProperty(ns)) {
                    delete this._assetDictionary[ns];
                }
            };

            AssetLibraryBundle.prototype.removeAssetFromDict = function (asset, autoRemoveEmptyNamespace) {
                if (typeof autoRemoveEmptyNamespace === "undefined") { autoRemoveEmptyNamespace = true; }
                if (this._assetDictDirty) {
                    this.rehashAssetDict();
                }

                if (this._assetDictionary.hasOwnProperty(asset.assetNamespace)) {
                    if (this._assetDictionary[asset.assetNamespace].hasOwnProperty(asset.name)) {
                        delete this._assetDictionary[asset.assetNamespace][asset.name];
                    }

                    if (autoRemoveEmptyNamespace) {
                        var key;
                        var empty = true;

                        for (key in this._assetDictionary[asset.assetNamespace]) {
                            empty = false;
                            break;
                        }

                        if (empty) {
                            delete this._assetDictionary[asset.assetNamespace];
                        }
                    }
                }
            };

            /**
            * Loads a yet unloaded resource file from the given url.
            */
            AssetLibraryBundle.prototype.loadResource = function (req, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                var loader = new away.loaders.AssetLoader();

                if (!this._loadingSessions) {
                    this._loadingSessions = new Array();
                }

                this._loadingSessions.push(loader);

                loader.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this.onResourceRetrieved, this);
                loader.addEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onDependencyRetrieved, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                loader.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);

                // Error are handled separately (see documentation for addErrorHandler)
                loader._iAddErrorHandler(this.onDependencyRetrievingError);
                loader._iAddParseErrorHandler(this.onDependencyRetrievingParseError);

                return loader.load(req, context, ns, parser);
            };

            AssetLibraryBundle.prototype.stopAllLoadingSessions = function () {
                var i;

                if (!this._loadingSessions) {
                    this._loadingSessions = new Array();
                }

                var length = this._loadingSessions.length;

                for (i = 0; i < length; i++) {
                    this.killLoadingSession(this._loadingSessions[i]);
                }

                this._loadingSessions = null;
            };

            /**
            * Retrieves an unloaded resource parsed from the given data.
            * @param data The data to be parsed.
            * @param id The id that will be assigned to the resource. This can later also be used by the getResource method.
            * @param ignoreDependencies Indicates whether or not dependencies should be ignored or loaded.
            * @param parser An optional parser object that will translate the data into a usable resource.
            * @return A handle to the retrieved resource.
            */
            AssetLibraryBundle.prototype.parseResource = function (data, context, ns, parser) {
                if (typeof context === "undefined") { context = null; }
                if (typeof ns === "undefined") { ns = null; }
                if (typeof parser === "undefined") { parser = null; }
                var loader = new away.loaders.AssetLoader();

                if (!this._loadingSessions) {
                    this._loadingSessions = new Array();
                }

                this._loadingSessions.push(loader);

                loader.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this.onResourceRetrieved, this);
                loader.addEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onDependencyRetrieved, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                loader.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                loader.addEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);

                // Error are handled separately (see documentation for addErrorHandler)
                loader._iAddErrorHandler(this.onDependencyRetrievingError);
                loader._iAddParseErrorHandler(this.onDependencyRetrievingParseError);

                return loader.loadData(data, '', context, ns, parser);
            };

            AssetLibraryBundle.prototype.rehashAssetDict = function () {
                var asset;

                this._assetDictionary = {};

                var l = this._assets.length;

                for (var c = 0; c < l; c++) {
                    asset = this._assets[c];

                    if (!this._assetDictionary.hasOwnProperty(asset.assetNamespace)) {
                        this._assetDictionary[asset.assetNamespace] = {};
                    }

                    this._assetDictionary[asset.assetNamespace][asset.name] = asset;
                }

                this._assetDictDirty = false;
            };

            /**
            * Called when a dependency was retrieved.
            */
            AssetLibraryBundle.prototype.onDependencyRetrieved = function (event) {
                //if (hasEventListener(LoaderEvent.DEPENDENCY_COMPLETE))
                this.dispatchEvent(event);
            };

            /**
            * Called when a an error occurs during dependency retrieving.
            */
            AssetLibraryBundle.prototype.onDependencyRetrievingError = function (event) {
                if (this.hasEventListener(away.events.LoaderEvent.LOAD_ERROR, this.onDependencyRetrievingError, this)) {
                    this.dispatchEvent(event);
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Called when a an error occurs during parsing.
            */
            AssetLibraryBundle.prototype.onDependencyRetrievingParseError = function (event) {
                if (this.hasEventListener(away.events.ParserEvent.PARSE_ERROR, this.onDependencyRetrievingParseError, this)) {
                    this.dispatchEvent(event);
                    return true;
                } else {
                    return false;
                }
            };

            AssetLibraryBundle.prototype.onAssetComplete = function (event) {
                if (event.type == away.events.AssetEvent.ASSET_COMPLETE) {
                    this.addAsset(event.asset);
                }

                this.dispatchEvent(event.clone());
            };

            AssetLibraryBundle.prototype.onTextureSizeError = function (event) {
                this.dispatchEvent(event.clone());
            };

            /**
            * Called when the resource and all of its dependencies was retrieved.
            */
            AssetLibraryBundle.prototype.onResourceRetrieved = function (event) {
                var loader = event.target;
                this.killLoadingSession(loader);
                var index = this._loadingSessions.indexOf(loader);
                this._loadingSessions.splice(index, 1);

                /*
                if(session.handle){
                dispatchEvent(event);
                }else{
                onResourceError((session is IResource)? IResource(session) : null);
                }
                */
                this.dispatchEvent(event.clone());
            };

            AssetLibraryBundle.prototype.killLoadingSession = function (loader) {
                loader.removeEventListener(away.events.LoaderEvent.LOAD_ERROR, this.onDependencyRetrievingError, this);
                loader.removeEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this.onResourceRetrieved, this);
                loader.removeEventListener(away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onDependencyRetrieved, this);
                loader.removeEventListener(away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError, this);
                loader.removeEventListener(away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_SET_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_STATE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ANIMATION_NODE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.STATE_TRANSITION_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.TEXTURE_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.CONTAINER_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.GEOMETRY_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.MATERIAL_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.MESH_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.ENTITY_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.SKELETON_COMPLETE, this.onAssetComplete, this);
                loader.removeEventListener(away.events.AssetEvent.SKELETON_POSE_COMPLETE, this.onAssetComplete, this);
                loader.stop();
            };

            /**
            * Called when unespected error occurs
            */
            /*
            private onResourceError() : void
            {
            var msg:string = "Unexpected parser error";
            if(hasEventListener(LoaderEvent.DEPENDENCY_ERROR)){
            var re:LoaderEvent = new LoaderEvent(LoaderEvent.DEPENDENCY_ERROR, "");
            dispatchEvent(re);
            } else{
            throw new Error(msg);
            }
            }
            */
            AssetLibraryBundle.prototype.onAssetRename = function (ev) {
                var asset = ev.target;
                var old = this.getAsset(asset.assetNamespace, asset.name);

                if (old != null) {
                    this._strategy.resolveConflict(asset, old, this._assetDictionary[asset.assetNamespace], this._strategyPreference);
                } else {
                    var dict = this._assetDictionary[ev.asset.assetNamespace];

                    if (dict == null) {
                        return;
                    }

                    dict[ev.assetPrevName] = null;
                    dict[ev.asset.name] = ev.asset;
                }
            };

            AssetLibraryBundle.prototype.onAssetConflictResolved = function (ev) {
                this.dispatchEvent(ev.clone());
            };
            return AssetLibraryBundle;
        })(away.events.EventDispatcher);
        library.AssetLibraryBundle = AssetLibraryBundle;
    })(away.library || (away.library = {}));
    var library = away.library;
})(away || (away = {}));

// singleton enforcer
var AssetLibraryBundleSingletonEnforcer = (function () {
    function AssetLibraryBundleSingletonEnforcer() {
    }
    return AssetLibraryBundleSingletonEnforcer;
})();
///<reference path="../src/away/library/AssetLibraryBundle.ts"/>
//------------------------------------------------------------------------------------------------
// Web / PHP Storm arguments string
//------------------------------------------------------------------------------------------------
// --sourcemap $ProjectFileDir$/tests/AssetLibraryTest.ts --target ES5 --comments --out $ProjectFileDir$/tests/AssetLibraryTest.js
//------------------------------------------------------------------------------------------------
var tests;
(function (tests) {
    var AssetLibraryTest = (function () {
        function AssetLibraryTest() {
        }
        return AssetLibraryTest;
    })();
    tests.AssetLibraryTest = AssetLibraryTest;
})(tests || (tests = {}));

var GL = null;

window.onload = function () {
    var test = new tests.AssetLibraryTest();
    var canvas = document.createElement('canvas');
    GL = canvas.getContext("experimental-webgl");
};
//@ sourceMappingURL=AssetLibraryTest.js.map
