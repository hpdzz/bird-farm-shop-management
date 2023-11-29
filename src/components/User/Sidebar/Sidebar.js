import { useEffect, useState } from 'react';
import { Checkbox, Radio, RadioGroup, FormControlLabel, Slider, Button } from '@mui/material';
import './Sidebar.scss';
const Sidebar = ({ categories, onFilterChange }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSex, setSelectedSex] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        if (selectedCategoryId === null) {
            setSelectedCategoryId('all');
        }
    }, [selectedCategoryId]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    };

    const handleSexChange = (event) => {
        const newSelectedSex = event.target.value === 'all' ? null : event.target.value;
        setSelectedSex(newSelectedSex);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleApplyFilters = () => {
        const filters = {};

        if (selectedCategoryId !== null && selectedCategoryId !== 'all') {
            filters.category_id = selectedCategoryId;
        }

        if (selectedSex !== null) {
            filters.sex = selectedSex;
        }

        filters.priceFrom = priceRange[0];
        filters.priceTo = priceRange[1];

        if (onFilterChange) {
            onFilterChange(filters);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="sidebar-title">Categories</h3>

            <FormControlLabel
                control={
                    <Checkbox checked={selectedCategoryId === 'all'} onChange={() => handleCategoryChange('all')} />
                }
                label="All"
            />

            {categories.map((category) => (
                <FormControlLabel
                    key={category.id}
                    control={
                        <Checkbox
                            checked={selectedCategoryId === category.id}
                            onChange={() => handleCategoryChange(category.id)}
                        />
                    }
                    label={category.category_name}
                />
            ))}
            <h3 className="sidebar-title">Filter By</h3>
            <RadioGroup name="sex" value={selectedSex ? selectedSex : 'all'} onChange={handleSexChange}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="true" control={<Radio />} label="Male" />
                <FormControlLabel value="false" control={<Radio />} label="Female" />
            </RadioGroup>
            <div>
                <label>Price Range:</label>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    min={0}
                    max={10000}
                />
            </div>

            <Button variant="contained" onClick={handleApplyFilters}>
                Apply
            </Button>
        </div>
    );
};

export default Sidebar;
