import { useCallback, useEffect, useState } from "react";
import { fetchComicById, fetchComics } from "../utils/api";
import styles from "./ComicsPage.module.css";
import { ComicCard } from "../components/ComicCard/ComicCard";
import { Comic } from "../types/types";
import Spinner from "../components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ComicModal from "../components/ComicModal/ComicModal";

export const ComicsPage = ({
  format,
  loading,
  setLoading,
}: {
  format: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadComics = useCallback(async () => {
    setLoading(true);
    const { results, total } = await fetchComics(format, 20, offset);
    setComics((prev) => [...prev, ...results]);
    setHasMore(offset + 20 < total);
    setLoading(false);
  }, [format, offset, setLoading]);

  useEffect(() => {
    setComics([]);
    setOffset(0);
  }, [format]);

  useEffect(() => {
    loadComics();
  }, [offset, format, loadComics]);

  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleMoreInfo = async (id: number) => {
    const comic = await fetchComicById(id);
    if (comic) {
      setSelectedComic(comic);
      setModalOpen(true);
    }
  };

  //UNCOMMENT FOLLOWING CODE FOR CUSTOM INFINTE SCROLL
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const nearBottom =
  //         window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  //       if (nearBottom && !loading) {
  //         setOffset((prev) => prev + 20);
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [loading]);

  return (
    //CUSTOM INFINTE SCROLL CODE

    // <div className={styles.PageWrapper}>
    //   <div className={styles.Grid}>
    //     {comics.map((comic) => (
    //       <ComicCard key={comic.id} comic={comic} />
    //     ))}
    //   </div>

    //   {loading && (
    //     <div className={styles.LoadingWrapper}>
    //       <Spinner />
    //       <h3 className={styles.LoadingText}>Loading...</h3>
    //     </div>
    //   )}

    //   {!loading && (
    //     <div className={styles.LoadMoreWrapper}>
    //       <button
    //         className={styles.LoadMoreBtn}
    //         onClick={() => setOffset((prev) => prev + 20)}
    //       >
    //         Load More
    //       </button>
    //     </div>
    //   )}
    // </div>

    //LIBRARY INFINTE SCROLL

    <div className={styles.PageWrapper}>
      <InfiniteScroll
        dataLength={comics.length}
        next={() => setOffset((prev) => prev + 20)}
        hasMore={hasMore}
        loader={
          <div className={styles.LoadingWrapper}>
            <Spinner />
            <h3 className={styles.LoadingText}>Loading...</h3>
          </div>
        }
      >
        <div className={styles.Grid}>
          {comics.map((comic) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              onMoreInfo={() => {
                handleMoreInfo(comic.id);
              }}
            />
          ))}
        </div>
      </InfiniteScroll>
      {!loading && (
        <div className={styles.LoadMoreWrapper}>
          <button
            className={styles.LoadMoreBtn}
            onClick={() => setOffset((prev) => prev + 20)}
          >
            Load More
          </button>
        </div>
      )}
      {modalOpen && selectedComic && (
        <ComicModal comic={selectedComic} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};
