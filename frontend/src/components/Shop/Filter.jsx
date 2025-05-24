import React from 'react'

const Filter = ({onSortChange}) => {
  const handleChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  }

  return (
    <form className='mb-4'>
      <select name="sort" id="" onChange={handleChange}>
        <option value="">Sắp xếp theo</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>
      {/* <button>TÌm</button> */}
    </form>
  )
}

export default Filter