import { useCallback, useEffect, useState } from "react";
import { fetchComics } from "../utils/api";
import styles from "./ComicsPage.module.css";
import { ComicCard } from "../components/ComicCard/ComicCard";
import { Comic } from "../types/types";
import Spinner from "../components/Spinner/Spinner";

export const ComicsPage = ({ format }: { format: string }) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadComics = useCallback(async () => {
    setLoading(true);
    const data = await fetchComics(format, 20, offset);
    setComics((prev) => [...prev, ...data]);
    setLoading(false);
  }, [format, offset]);

  useEffect(() => {
    setComics([]);
    setOffset(0);
  }, [format]);

  useEffect(() => {
    loadComics();
  }, [offset, format, loadComics]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && !loading) {
        setOffset((prev) => prev + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Grid}>
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>

      {loading && (
        <div className={styles.LoadingWrapper}>
          <Spinner />
          <h3 className={styles.LoadingText}>Loading...</h3>
        </div>
      )}

      {!loading && (
        <div className={styles.LoadMore}>
          <button onClick={() => setOffset((prev) => prev + 20)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
