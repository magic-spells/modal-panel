import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

const dev = process.env.ROLLUP_WATCH;

// Shared CSS plugin config to avoid duplicate processing
const cssPlugin = postcss({
	extract: 'modal-panel.min.css',
	minimize: true,
});

export default [
	// ESM build
	{
		input: 'src/modal-panel.js',
		output: {
			file: 'dist/modal-panel.esm.js',
			format: 'es',
			sourcemap: true,
		},
		plugins: [resolve(), cssPlugin],
	},
	// CommonJS build
	{
		input: 'src/modal-panel.js',
		output: {
			file: 'dist/modal-panel.cjs.js',
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		plugins: [resolve(), cssPlugin],
	},
	// Minified IIFE for browsers
	{
		input: 'src/modal-panel.js',
		output: {
			file: 'dist/modal-panel.min.js',
			format: 'iife',
			name: 'ModalPanel',
			sourcemap: false,
		},
		plugins: [
			resolve(),
			cssPlugin,
			terser({
				keep_classnames: true,
				format: {
					comments: false,
				},
			}),
		],
	},
	// Development build
	...(dev
		? [
				{
					input: 'src/modal-panel.js',
					output: {
						file: 'dist/modal-panel.esm.js',
						format: 'es',
						sourcemap: true,
					},
					plugins: [
						resolve(),
						cssPlugin,
						serve({
							contentBase: ['dist', 'demo'],
							open: true,
							port: 3000,
						}),
						copy({
							targets: [
								{ src: 'dist/modal-panel.esm.js', dest: 'demo' },
								{ src: 'dist/modal-panel.esm.js.map', dest: 'demo' },
								{ src: 'dist/modal-panel.min.css', dest: 'demo' },
							],
							hook: 'writeBundle',
						}),
					],
				},
			]
		: []),
];
