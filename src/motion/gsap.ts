import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registered once for the whole app. Headings are split with splitLines.ts rather than
// SplitText, whose line detection assumes left-to-right text and fails on Arabic.
gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

export { Flip, gsap, ScrollTrigger, useGSAP }
