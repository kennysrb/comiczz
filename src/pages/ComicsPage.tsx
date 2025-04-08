import { useEffect, useState } from "react";
import { fetchComics } from "../utils/api";
import styles from "./ComicsPage.module.css";
import { ComicCard } from "../components/ComicCard/ComicCard";
import { Comic } from "../types/types";
import Spinner from "../components/Spinner/Spinner";

export const ComicsPage = ({ format }: { format: string }) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComics = async () => {
      setLoading(true);
      const data = await fetchComics(format);
      setComics(data);
      setLoading(false);
    };

    getComics();
  }, [format]);

  return (
    <div className={styles.PageWrapper}>
      {loading ? (
        <div className={styles.LoadingWrapper}>
          <Spinner />
          <h3 className={styles.LoadingText}>Loading...</h3>
        </div>
      ) : (
        <div className={styles.Grid}>
          {comics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}
    </div>
  );
};
