import { readable, derived } from 'svelte/store';

export const windowWidth = readable(typeof window !== 'undefined' ? window.innerWidth : 1024, (set) => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => set(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
});

export const isMobile = derived(windowWidth, $width => $width <= 1024);
