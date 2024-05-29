import ProdTable from "./ProdTable";
import useContainer from "../../Hooks/useContainer";

function WishList() {
    const wishlist = useContainer('wishlist')
    return (
        <>
            <ProdTable data={wishlist}/>
        </>
    )
}

export default WishList