import { useEffect, useState } from "react";
import { fetchComics } from "../utils/api";
import styles from "./ComicsPage.module.css";
import { ComicCard } from "../components/ComicCard/ComicCard";
import { Comic } from "../types/types";
import { Header } from "../components/Header/Header";

export const ComicsPage = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<string>("All");

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
      <Header selectedFormat={format} onSelectFormat={setFormat} />
      {loading && <p>Loading...</p>}
      <div className={styles.Grid}>
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};
