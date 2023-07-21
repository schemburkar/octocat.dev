'use client'

import { ImageLoader } from "next/legacy/image";

 const customImageLoader :ImageLoader= ({ src, width, quality }) =>{
    if (src.startsWith('https://'))
        return `${src}?w=${width}&q=${quality || 75}`
    return src;
}
export default customImageLoader
