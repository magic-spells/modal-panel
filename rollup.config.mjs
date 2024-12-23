import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

const dev = process.env.ROLLUP_WATCH;

export default [
	// Development build
	{
		input: 'src/modal-panel.js',
		output: {
			file: 'dist/modal-panel.js',
			format: 'iife',
			sourcemap: dev,
		},
		plugins: [
			resolve(),
			postcss({
				extract: 'modal-panel.min.css',
				minimize: true,
			}),
			dev &&
				serve({
					contentBase: ['dist', 'demo'],
					open: true,
					port: 3000,
				}),
			copy({
				targets: [
					{ src: 'dist/modal-panel.js', dest: 'demo' },
					{ src: 'dist/modal-panel.min.css', dest: 'demo' },
					{ src: 'dist/modal-panel.js.map', dest: 'demo' },
				],
				hook: 'writeBundle',
			}),
		],
	},
	// Production build (minified)
	{
		input: 'src/modal-panel.js',
		output: {
			file: 'dist/modal-panel.min.js',
			format: 'iife',
			sourcemap: false,
		},
		plugins: [
			resolve(),
			postcss({
				extract: 'modal-panel.min.css', // Minified CSS output
				minimize: true,
			}),
			terser({
				format: {
					comments: false,
				},
			}),
		],
	},
];
