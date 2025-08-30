import { MenuItem, FormControl, InputLabel, Select, Tooltip, Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Filter = ({ categories = [], loading = false }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";
    
    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if(searchTerm) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      navigate(`${location.pathname}?${params.toString()}`);
    }, 500);

    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm, navigate, location.pathname, searchParams]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${location.pathname}?${params.toString()}`);
    setCategory(selectedCategory);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams);
    
    params.set("sortOrder", newOrder);
    navigate(`${location.pathname}?${params.toString()}`);
    setSortOrder(newOrder);
  };

  const handleClearFilter = () => {
    navigate(location.pathname);
    setCategory("all");
    setSortOrder("asc");
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6 px-6 py-4 bg-white shadow-lg rounded-xl">
      {/* Search Bar */}
      <div className="relative flex items-center w-full sm:w-[420px] 2xl:w-[450px]">
        <input
          type="text"
          placeholder="Search Products"
          className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            disabled={loading}
          >
            <MenuItem value="all">All</MenuItem>
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              categories.map((item) => (
                <MenuItem value={item.categoryName} key={item.categoryId}>
                  {item.categoryName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Sort Button and Clear Filter */}
        <Tooltip title={`Sorted By Price: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleSortOrder}
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
            {sortOrder === "asc" ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
          </Button>
        </Tooltip>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-700 to-rose-500 text-white rounded-lg shadow-lg font-semibold transition hover:from-rose-800 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
          onClick={handleClearFilter}
        >
          <FiRefreshCcw size={18} />
          <span>Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;