/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require("next-plugin-antd-less");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withLess({
	env: {
		// here add your environment variables
	},
	webpack(config) {
		if (config.resolve.plugins) {
			config.resolve.plugins.push(new TsConfigPathsPlugin());
		} else {
			config.resolve.plugins = [new TsConfigPathsPlugin()];
		}

		return config;
	}
});
