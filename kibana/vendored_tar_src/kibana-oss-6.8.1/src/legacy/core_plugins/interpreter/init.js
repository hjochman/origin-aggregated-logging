'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./server/routes');

var _common = require('@kbn/interpreter/common');

var _server = require('@kbn/interpreter/server');

exports.default = async function (server /*options*/) {
  server.injectUiAppVars('canvas', () => {
    const config = server.config();
    const basePath = config.get('server.basePath');
    const reportingBrowserType = (() => {
      const configKey = 'xpack.reporting.capture.browser.type';
      if (!config.has(configKey)) return null;
      return config.get(configKey);
    })();

    return {
      kbnIndex: config.get('kibana.index'),
      esShardTimeout: config.get('elasticsearch.shardTimeout'),
      esApiVersion: config.get('elasticsearch.apiVersion'),
      serverFunctions: _server.registries.serverFunctions.toArray(),
      basePath,
      reportingBrowserType
    };
  });

  // Expose server.plugins.interpreter.register(specs) and
  // server.plugins.interpreter.registries() (a getter).
  server.expose((0, _common.registryFactory)(_server.registries));

  (0, _routes.routes)(server);
}; /*
    * Licensed to Elasticsearch B.V. under one or more contributor
    * license agreements. See the NOTICE file distributed with
    * this work for additional information regarding copyright
    * ownership. Elasticsearch B.V. licenses this file to you under
    * the Apache License, Version 2.0 (the "License"); you may
    * not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing,
    * software distributed under the License is distributed on an
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    * KIND, either express or implied.  See the License for the
    * specific language governing permissions and limitations
    * under the License.
    */

module.exports = exports['default'];