import { sveltekit } from '@sveltejs/kit/vite';
import { server } from 'typescript';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	plugins: [sveltekit(), glsl()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
