import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FilterBar from '../Components/FilterBar/FilterBar'
import Products from '../Components/Products/Products'

const baesUrl = 'http://localhost:3000/api/products';

function SearchPage() {
  const [products, setProducts] = useState([]);
	const [sort, setSort] = useState({ sort: "price", order: "asc" });
	const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250]);
	const [page, setPage] = useState(1);

  const params = useParams();

    useEffect(()=>{
      const fetchProducts = async () => {

          const url = `${baesUrl}?page=${page}&sort=${sort.sort},${sort.order}&category=${category.toString()}&gender=${gender.toString()}&priceRange=${priceRange.toString()}&keyword=${params.keyword??''}`;

          try{
            await fetch(url).then((res) => res.json()).then(result => {
              setProducts(result) 
            })
          }
          catch(e){ setProducts([]) }
      }
      fetchProducts();

      return () => {}
  }, [sort, category, page, priceRange, gender, params.keyword])

  return (
    <div className='search-page-temp'>
        <FilterBar category={category} sort={sort} priceRange={priceRange} 
          setSort={setSort} setCategory={setCategory} setPriceRange={setPriceRange}
          gender={gender} setGender={setGender}
        />
        <Products product_list={[...products]}/>
    </div>
  )
}

export default SearchPage