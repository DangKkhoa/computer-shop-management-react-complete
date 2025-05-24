import React from 'react'

const ProductDetail = ({name, product, image, canEdit, 
                        user, handleValueChange, handleImageChange,
                        handleUpdateProduct, isChanged, errorMessage, addToCart
                      }) => {
  return (
    <>
      <div className='grid grid-cols-2'>
        <div>
          <h2 className='text-2xl font-bold mb-4'>{name}</h2>
          <div className='flex'>
            <div className='w-64 h-64 bg-white mb-4'>
              <img src={image} alt="" className='w-full h-full'/>
              {canEdit ? <>
                  <input 
                    type="file" 
                    onChange={handleImageChange}/>
              </>
              :
              ''}
              
            </div>
            <div className='ml-4 text-lg font-semibold'>
              Tình trạng: 
              {product.quantity > 0 ? 
                <span className='text-2xl text-green-500 font-bold italic'> Còn hàng</span> 
                :
                <span className='text-2xl text-red-500 font-bold italic'> Hết hàng</span>
              }
            </div>
          </div>
          {!user ? <div className=''>
            <div className='mb-4 text-lg italic'><b>Giá:</b> <span className='font-bold text-2xl text-red-500'>{product.retailed_price.toLocaleString()} VND</span></div>
            <button 
              className='px-3 py-2 bg-green-500 text-white rounded-md mr-4 hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none'
              disabled={product.quantity <= 0}
              onClick={() => addToCart(product)}>
                Thêm vào giỏ hàng
            </button>
            <button 
              className='px-3 py-2 bg-white border border-green-500 text-green-500 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none'
              disabled={product.quantity <= 0}>
                Mua ngay
            </button>
            </div> 
            : 
            <></>
          }
        </div>
        <div className='shadow-lg p-2 h-fit'>
          <p className='text-lg font-semibold mb-4'>Thông tin sản phẩm</p>
          <table className='table-fixed'>
            <tbody>
              {user && 
              <>
                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>ID</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='id'
                      value={product.id} 
                      className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                      onChange={handleValueChange}
                      readOnly={!canEdit}
                      />
                  </td>
                </tr>

                <tr className='p-4'>
                  <td className='p-2 w-[200px] font-semibold'>Tên sản phẩm</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name="name" 
                      value={product.name || ''} 
                      className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                      onChange={handleValueChange}
                      readOnly={!canEdit}/>
                  </td>
                </tr>

                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Ngày nhập</td>
                  <td className='px-4 py-2 w-3/4 text-right '>{new Date(product.created_at).toLocaleString()}</td>
                </tr>
              
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Giá nhập</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='imported_price'
                      value={product.imported_price || 0} 
                      className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                      onChange={handleValueChange}
                      readOnly={!canEdit}/>
                  </td>
                </tr>
                </>
              }
              {/* <tr className='p-4'>
                <td className='p-2 font-semibold'>Giá bán</td>
                <td className='p-2'>
                  <input 
                    type="text" 
                    name='retailed_price'
                    value={product.retailed_price.toLocaleString() || 0} 
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr> */}
              {user && <>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Danh mục</td>
                  <td className='px-4 py-2 w-3/4 text-right'>{product.category}</td>
                </tr>
                <tr className='p-4'>
                  <td className='p-2 font-semibold'>Số lượng</td>
                  <td className='p-2 w-3/4'>
                    <input 
                      type="text" 
                      name='quantity'
                      value={product.quantity || ''} 
                      className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                      onChange={handleValueChange}
                      readOnly={!canEdit}/>
                  </td>
                </tr>
              </>}
              <tr className='p-4'>
                <td className='p-2 font-semibold'>CPU</td>
                <td className='p-2 w-3/4'>
                  <input 
                    type="text" 
                    name='cpu'
                    value={product.cpu || ''} 
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
              <tr className='p-4'>
                <td className='p-2 font-semibold'>RAM</td>
                <td className='p-2 w-3/4'>
                  <input 
                    type="text" 
                    name='ram'
                    value={product.ram || ''} 
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
              <tr className='p-4'>
                <td className='p-2 font-semibold'>Bộ nhớ</td>
                <td className='p-2 w-3/4'>
                  <input 
                    type="text" 
                    name='storage'
                    value={product.storage || ''} 
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
              <tr className='p-4'>
                <td className='p-2 w-[200px] font-semibold'>Màn hình</td>
                <td className='p-2'>
                  <input 
                    type="text" 
                    name="screen"
                    value={product.screen || ''} 
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
              <tr className='p-4'>
                <td className='p-2 w-[200px] font-semibold'>Card đồ họa</td>
                <td className='p-2'>
                  <input 
                    type="text" 
                    value={product.gpu || ''}
                    name="gpu"
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : 'hover:bg-gray-200 focus:text-left focus:bg-gray-200'}`} 
                    dir='rtl'
                    onFocus={(e) => e.target.value = e.target.value}
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
              <tr className='p-4'>
                <td className='p-2 w-[200px] font-semibold'>Cân nặng</td>
                <td className='p-2'>
                  <input 
                    type="text" 
                    value={product.weight || ''}
                    name="weight"
                    className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
                    onChange={handleValueChange}
                    readOnly={!canEdit}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-span-full mt-4'>
          <p className='text-lg font-semibold text-amber-500'>Đặc điểm nổi bật</p>
          <textarea 
            name="description" 
            id="description" 
            rows={6} 
            value={product.description || ''} 
            className={`w-full p-2 ${!user ? 'outline-none' : ''} ${canEdit ? 'border-2' : ''}`}
            onChange={handleValueChange}
            readOnly={!canEdit}/>
        </div>
         
      </div>
      {user && <button 
        className='px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50 disabled:pointer-events-none'
        disabled={!isChanged}
        onClick={handleUpdateProduct}>
          Cập nhật
      </button>}
    </>
  )
}

export default ProductDetail