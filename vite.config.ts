import { sveltekit } from '@sveltejs/kit/vite';
import { server } from 'typescript';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
			fs: {
				allow: ['..']
			}
		}
	
});
