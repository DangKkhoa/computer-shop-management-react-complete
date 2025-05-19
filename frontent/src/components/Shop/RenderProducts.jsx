import { Link } from "react-router"

const RenderProducts = ({ items, category }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-10 md:px-20 mb-12'>
      {items.map(p => (
        <Link
          key={p.id}
          to={`/products/${category || p.category}/${p.id}`}
          className='flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-100'
        >
          <div className='w-full h-48 bg-gray-50 flex items-center justify-center'>
            <img
              src={`http://localhost:3000/uploads/products/${p.image}`}
              alt={p.name}
              className='h-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-105'
            />
          </div>
          <div className='p-4'>
            <p className='text-sm font-semibold text-gray-800 line-clamp-2'>{p.name}</p>
            <p className='text-red-500 font-bold mt-1'>{p.retailed_price.toLocaleString()} VND</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RenderProducts