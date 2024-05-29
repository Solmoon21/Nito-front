import './ProdTable.css';

function ProdTable({ data }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Color and Size</th>
          <th>Image</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td style={{textTransform:'uppercase'}}>{item.color}, {item.size}</td>
            <td><img src={item.image} /></td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProdTable;
