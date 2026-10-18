import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  quality?: number | string;
  unoptimized?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { fill, priority, quality, unoptimized, style, className = '', src, onError, ...props },
  ref
) {
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const fillStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        ...style,
      }
    : style || {};

  return (
    <img
      ref={ref}
      src={currentSrc}
      style={fillStyle}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => {
        if (typeof currentSrc === 'string' && currentSrc.startsWith('/.tempmediaStorage/')) {
          setCurrentSrc(currentSrc.replace('/.tempmediaStorage/', '/'));
        }
        onError?.(e);
      }}
      {...props}
    />
  );
});

export default Image;
