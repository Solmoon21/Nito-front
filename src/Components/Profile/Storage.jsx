import ProdTable from "./ProdTable";
import useContainer from "../../Hooks/useContainer";

function Storage() {
  const products = useContainer('storage')

  return (
    <>
      {products && <ProdTable data={products}/>}
    </>
  )
}

export default Storage