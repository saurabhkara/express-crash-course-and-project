const App = () => {
  const [product, setProduct] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });

  React.useEffect(() => {
    fetchProduct();
  }, []);

  function fetchProduct() {
    fetch("/api/products")
      .then((product) => product.json())
      .then((data) => setProduct(data));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!form.name || !form.price){
      return
    }

    fetch('/api/products',{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      }, 
      body: JSON.stringify(form)
    }).then(res=>res.json())
    .then(data=>{
      fetchProduct();
      setForm({
        name:'',
        price:''
      })
    })

  }

  function updateForm(event, field) {
    setForm({
      ...form,
      [field]:event.target.value
    })
  }


function deleteProduct(productId){
  fetch(`/api/products/${productId}`,{
    method:'DELETE'
  }).then((res)=>res.json())
  .then((data)=>{
    fetchProduct();
  })
}

  return (
    <>
      <div className="card m-4 p-2">
        <h5>Add Product</h5>
        <form className="form" onClick={handleSubmit}>
          <input
            placeholder="Enter product name.."
            className="mb-2"
            value={form.name}
            onChange={(event) => updateForm(event, "name")}
          />
          <br />
          <input
            placeholder="Enter product price"
            value={form.price}
            onChange={(event) => updateForm(event, "price")}
          />
          <br />
          <button className="btn text-primary bg-dark mt-2" type="submit">
            {" "}
            Add Product
          </button>
        </form>
      </div>
      <ul className="list-group m-4">
        {product.map((prod) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={prod.id}
            >
              <div>
                <strong>{prod.name} : </strong>${prod.price}
              </div>
              <button className="btn" onClick={()=>{deleteProduct(prod.id)}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

// ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
