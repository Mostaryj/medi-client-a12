import useCategory from "../../Hook/useCategory";
import { IoEye } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
// import useAxiosSecure from '../../Hook/useAxiosSecure'
import useAxiosSecure from '../../Hook/useAxiosSecure'

const Shop = () => {
  const [categories] = useCategory();

  const {user} = useAuth();

   const axiosSecure = useAxiosSecure()

   const navigate = useNavigate();
   const location = useLocation();

  // const [, refetch] = useCart();
 

  const handleAddToCart = (item) =>{
    if(user && user.email){
      // console.log(item, user.email)


      //send data item to the database
      const cartItem = {
          menuId: item._id,
          email: user.email,
          name: item.name,
          image: item.image,
          price: item.price,
          company: item.company_name,
          price_per_unit: item.price_per_unit
      }
      console.log(cartItem);

       axiosSecure.post('/carts', cartItem)
      .then(res => {
       console.log(res.data);
       if(res.data.insertedId){
        Swal.fire({
          icon: "success",
          title: `${item.name} Added Successfully`,
          showConfirmButton: false,
          timer: 1500
        });

        //refetch cart to update the cart items count
        // refetch();
       }
      })


    }else{
      Swal.fire({
        title: "You are not logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login'), {state: {from: location}}
         
        }
      });
    }

  }








  const [selectedItem, setSelectedItem] = useState(null);
  //  console.log(selectedItem);
  const modalRef = useRef(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

   // Sorting state
   const [sortOrder, setSortOrder] = useState("asc");

   // Search state
   const [searchQuery, setSearchQuery] = useState("");


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  // Sorting logic
  const sortedItems = [...currentItems].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  // Search logic
  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.generic_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openModal = (shop) => {
    setSelectedItem(shop);
    document.getElementById("my_modal_5").showModal();
  };

  useEffect(() => {
    if (selectedItem && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Shop
      </h1>
         {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
          {/* Sort Button */}
          <div className="flex justify-end my-4">
        <button
          className="btn bg-purple-700 text-white"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>See Details</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((shop, index) => (
              <tr className="font-bold" key={shop._id}>
                <th>{index + 1}</th>
                <th><img src={shop.image} className="w-12 h-12 rounded" alt="medicine" /></th>
                <td>{shop.name}</td>
                <th>{shop.company_name}</th>
                <td className="">${shop.price}</td>
                <td>
                  <IoEye
                    onClick={() => openModal(shop)}
                    className="text-purple-500 h-8 w-4"
                  />
                </td>

                <th>
                  <button 
                  onClick={() => handleAddToCart(shop)}
                  className="btn bg-purple-900 text-white">
                    Select
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from(
          { length: Math.ceil(categories.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              className={`btn ${currentPage === i + 1 ? "btn-active bg-purple-700 text-white" : "bg-white text-purple-700"}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>


      {/* Modal */}
      {selectedItem && (
        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="">
              <div>
                <img src={selectedItem.image} alt="image" />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">Name: {selectedItem.name}</h3>
                <p className="py-4">
                  <span className="font-bold">Price: </span>
                  {selectedItem.price} $
                </p>
                <p className="py-4">
                  <span className="font-bold">Category: </span>
                  {selectedItem.category}
                </p>
                <p className="py-4">
                  <span className="font-bold">Company: </span>
                  {selectedItem.company_name}
                </p>
                <p className="py-4">
                  <span className="font-bold">Description: </span>
                  {selectedItem.description}
                </p>
                <p className="py-4">
                  <span className="font-bold">Generic Name: </span>
                  {selectedItem.generic_name}
                </p>
                <p className="py-4">
                  <span className="font-bold">Price Per Unit: </span>
                  {selectedItem.price_per_unit} $
                </p>
                <p className="py-4">
                  <span className="font-bold">Item Mass Unit: </span>
                  {selectedItem.item_mass_unit}
                </p>
                <p className="py-4">
                  <span className="font-bold">Quantity: </span>
                  {selectedItem.number_of_medicines_in_category} piece
                </p>
                <p className="py-4">
                  <span className="font-bold">Discount: </span>
                  {selectedItem.discount_medicine}
                </p>
                <p className="py-4">
                  <span className="font-bold">Discount Percentage: </span>
                  {selectedItem.discount_percentage} %
                </p>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-red-400">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Shop;
