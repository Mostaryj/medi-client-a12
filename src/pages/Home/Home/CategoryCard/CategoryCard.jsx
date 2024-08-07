import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const CategoryCard = () => {
  const axiosPublic = useAxiosPublic();


  const {  data: categories = []} = useQuery({
    queryKey: ['category-cards-home'],
    queryFn: async () => {
      const res = await axiosPublic.get('/categoryCard')
      return res.data
    }
  })
  
  

  return (
    <div>
         <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Category of Medicines
      </h1>
    
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4  mt-8">
        {categories.slice(0, 6).map((card) => (
            <Link to={`/categoryDetails/${card.category}`}
            key={card._id}
            className=" p-6  rounded-md border-2 shadow-md dark:bg-gray-50text-gray-900"
          >
            <img
              src={card.image}
              alt={card.name}
              className="object-cover object-center  w-full rounded-md h-72 border-2 bg-yellow-50 border-gray-200"
            />
            <div className="mt-6 mb-2">
              <h2 className="font-semibold tracking-wide">
                {card.category}
              </h2>
            </div>
            <p className="text-gray-800 dark:text-gray-400">
              Quantity: {card.number_of_medicine} pieces
            </p>
            </Link>
        ))}
      </div>
      
    </div>
  );
};

export default CategoryCard;
