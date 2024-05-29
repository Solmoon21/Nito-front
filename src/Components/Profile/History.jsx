import ProdTable from "./ProdTable";
import useContainer from "../../Hooks/useContainer";

function History() {
    const pastOrders = useContainer('history');

    return (
        <>
            {pastOrders && <ProdTable data={pastOrders}/>}
        </>
    )
}

export default History