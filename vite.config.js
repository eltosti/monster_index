import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

const config = {
	resolve:{
		alias:{
			'$lib': path.resolve(__dirname, './src/lib')
		}
	},
	plugins: [sveltekit()]
};

export default config;
