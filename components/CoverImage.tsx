'use client';
import { useScreenHeight } from './useScreenHeight';
import CoverImageComponent from './cover-image';


const CoverImage = ({ title, src, slug, aspectRatio, type, className, responsive = true, rounded = true, maxHeight }: CoverImageProps) => {
  const size = useScreenHeight(aspectRatio, maxHeight);
  return <CoverImageComponent {...{ title, src, slug, type, className, responsive, rounded, height: size.height, width: size.width }} />;
};
type CoverImageProps = {
  title: string; src: string; slug?: string[]; type: string; className?: string;
  responsive?: boolean;
  rounded?: boolean;
  aspectRatio: number;
  maxHeight?: number
};

export default CoverImage;