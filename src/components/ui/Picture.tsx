import type { ImgHTMLAttributes } from 'react'
import type { Picture as PictureData } from '../../assets/images'

/** Responsive <img> from a Picture (src + srcSet). */
export function Picture({ pic, sizes, alt, ...rest }: { pic: PictureData; sizes: string; alt: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'>) {
  return <img src={pic.src} srcSet={pic.srcSet} sizes={sizes} alt={alt} decoding="async" loading="lazy" {...rest} />
}
