import React from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = React.forwardRef(
  ({ searchResult, handleOpenModal }, ref) => {
    return (
      <Gallery ref={ref}>
        {Array.isArray(searchResult) &&
          searchResult.map(({ id, tags, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
      </Gallery>
    );
  }
);
