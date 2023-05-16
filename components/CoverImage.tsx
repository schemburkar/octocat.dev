'use client';
import { useScreenHeight } from './useScreenHeight';
import CoverImageComponent from './cover-image';


const CoverImage = ({ title, src, slug, aspectRatio, type, className, responsive = true, rounded = true }: CoverImageProps) => {
  const size = useScreenHeight(aspectRatio);
  return <CoverImageComponent {...{ title, src, slug, type, className, responsive, rounded, height: size.height, width: size.width }} />;
};
type CoverImageProps = {
  title: string; src: string; slug?: string[]; type: string; className?: string;
  responsive?: boolean;
  rounded?: boolean;
  aspectRatio: number;
};

export default CoverImage;