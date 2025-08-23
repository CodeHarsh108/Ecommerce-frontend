import { MenuItem, FormControl, InputLabel, Select, Tooltip, Button } from '@mui/material';
import React, { useState } from 'react';
import { FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";

const Filter = () => {
  const categories = [
    { categoryId: 3, name: 'Electronics' },
    { categoryId: 4, name: 'Fashion' },
    { categoryId: 5, name: 'Furniture' },
    { categoryId: 6, name: 'Beauty' },
  ];

  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6 px-6 py-4 bg-white shadow-lg rounded-xl">

      {/* Search Bar */}
      <div className="relative flex items-center w-full sm:w-[420px] 2xl:w-[450px]">
        <input
          type="text"
          placeholder="Search Products"
          className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <FiSearch className="absolute left-4 text-gray-500" size={22} />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            sx={{ color: '#374151', borderColor: '#374151', background: '#f9fafb' }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem value={item.name} key={item.categoryId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Button and Clear Filter */}
        <Tooltip title="Sorted By Price : Ascending">
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              height: 40,
              boxShadow: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Sort By
            <FiArrowUp size={20} />
          </Button>
        </Tooltip>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-500 text-white rounded-lg shadow-lg font-semibold transition hover:from-rose-800 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <FiRefreshCcw size={18} />
          <span>Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
