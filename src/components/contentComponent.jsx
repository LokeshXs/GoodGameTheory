import styles from "./contentComponent.module.css";
import usePunkSearch from "../hooks/usePunkSearch";
import { useCallback, useRef, useState } from "react";
import 'animate.css';

const ContentComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { punkData, loading, error } = usePunkSearch(pageNumber);
  const observer = useRef();
  const lastElement = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('visible');
        setPageNumber(prevState => prevState + 1)
      }
    });

    if (node) observer.current.observe(node);
    console.log(node);
  }, [loading]);

  console.log(punkData);


  return (
    <main className={styles.punkSection}>
      {punkData.map((item, index) => {
        if (punkData.length === index + 1) {
          return <div ref={lastElement} key={item.name} className={`${styles.punkContainer}`}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>

            <img src={item.img} alt="" className={styles.image} />


          </div>
        } else {
          return <div key={item.name} className={styles.punkContainer}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <img src={item.img} alt="" className={styles.image} />

          </div>
        }

      })}
      {loading && <h1>Loading....</h1>}
      {error && <h1>Error</h1>}
    </main>
  )
};

export default ContentComponent;