import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImagesWithQuery, PER_PAGE } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const buttonRef = useRef();

  useEffect(() => {
    async function getImages() {
      if (searchQuery === '' && page === 1) return;
      setIsLoading(true);
      try {
        const gallery = await fetchImagesWithQuery(searchQuery, page);
        if (gallery.length === 0) {
          Report.info(
            'Ooops!',
            'No results found for your search query.',
            'Okay'
          );
          return;
        }
        setGallery(prevGallery => [...prevGallery, ...gallery]);
      } catch (error) {
        setError(error.message);
        Report.failure('Error', `${error.message}`, 'Okay');
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [searchQuery, page, error]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
    buttonRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = selectedImage => {
    setIsModalOpen(true);
    setModalData(selectedImage);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery searchResult={gallery} handleOpenModal={handleOpenModal} />

      {isLoading && <Loader />}

      {!isLoading && gallery.length >= PER_PAGE && (
        <Button ref={buttonRef} onClick={handleLoadMore} title="Load more" />
      )}

      {isModalOpen && (
        <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};
