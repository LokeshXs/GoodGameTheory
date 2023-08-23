import { useEffect, useState } from "react";

export default function usePunkSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [punkData, setPunkData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getPunk = async () => {
      try {
        const res = await fetch(
          `https://api.punkapi.com/v2/beers?per_page=9&page=${pageNumber}`
        );

        const data = await res.json();
        setPunkData((prevState) => {
          return [
            ...prevState,
            ...data.map((item) => {
              return {
                title: item.name,
                img: item.image_url,
                description: item.tagline,
              };
            }),
          ];
        });
        console.log(res);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    getPunk();
  }, [pageNumber]);

  return {
    loading,
    punkData,
    error,
  };
}
