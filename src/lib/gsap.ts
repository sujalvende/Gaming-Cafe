/**
 * GSAP singleton — import from here to ensure plugins are registered once.
 * All components that need GSAP should import { gsap, ScrollTrigger } from '@/lib/gsap'
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
