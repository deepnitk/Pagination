import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = new URL("https://dummyjson.com/products");
      url.searchParams.set("limit", 10);
      url.searchParams.set("skip", page * 10 - 10);
      const response = await fetch(url);
      const jsonResponse = await response.json();
      if (jsonResponse?.products) {
        setProducts(jsonResponse.products);
        setTotalPages(jsonResponse.total);
        console.log(products);
      }
    };
    fetchProducts();
  }, [page]);

  const handleClick = (index) => {
    console.log(index);
    if (index >= 1 && index <= totalPages / 10 && index !== page) {
      setPage(index);
    }
  };
  return (
    <div className="App">
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => {
          return (
            <span className="product__item" key={product.id}>
              <img src={product.thumbnail} alt={product.title}></img>
              <span>{product.title}</span>
            </span>
          );
        })}
        {totalPages > 0 && (
          <div className="pagination">
            <span
              className={
                page > 1 ? "pagination__selected" : "pagination__disabled"
              }
              onClick={() => handleClick(page - 1)}
            >
              ⬅️
            </span>
            {[...Array(totalPages / 10)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => handleClick(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
            {page < totalPages && (
              <span
                className={
                  page < totalPages / 10
                    ? "pagination__selected"
                    : "pagination__disabled"
                }
                onClick={() => handleClick(page + 1)}
              >
                ➡️
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
