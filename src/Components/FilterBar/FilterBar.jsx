import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import './FilterBar.css';
import { Slider, Typography, Checkbox, IconButton } from "@mui/material";
import { FormControlLabel } from '@mui/material';
import { MenuItem, Select } from '@mui/material';

const genders = ['male', 'female'];
const categories = [
    'headwear',
    'upperbodywear',
    'lowerbodywear',
    'footwear'
]

function FilterBar({category, gender, sort, priceRange, setSort, setCategory, setGender, setPriceRange}) {

  	const onSortKeyChange = (e) => {
		setSort({ sort: e.target.value, order: sort.order });
	};

	const onSortDirectionChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

  	const onCategoryChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...category, input.value];
			setCategory(state);
		} else {
			const state = category.filter((val) => val !== input.value);
			setCategory(state);
		}
	};

	const onGenderChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...gender, input.value];
			setGender(state);
		} else {
			const state = gender.filter((val) => val !== input.value);
			setGender(state);
		}
	};

	const onPriceRangeChange = (e, newValue) => {
		setPriceRange(newValue);
	}

  return (
    <div className="filterbar" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <div className='filter-category' style={{maxWidth:'25vw', padding:'15px'}}>
			<h1>Filters</h1>
			<div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
				{genders.map((gender) => (
					<FormControlLabel key={gender} sx={{background:'#fff', borderRadius:'20px', padding:'5px 10px'}}
						control={<Checkbox value={gender} onChange={onGenderChange}/>} 
						label={gender} 
					/>
				))}
			</div>
			<br />
			<div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
				{categories.map((category) => (
					<FormControlLabel key={category} sx={{background:'#fff', borderRadius:'20px', padding:'5px 10px'}}
						control={<Checkbox value={category} onChange={onCategoryChange}/>} 
						label={category} 
					/>
				))}
			</div>
		</div>

		<div className="filter-price" style={{padding:'0 30px'}}>
			<Typography>Price</Typography>
			<Typography>Min : {priceRange[0]} - Max : {priceRange[1]} </Typography>
			<Slider value={priceRange} min={0} max={5000} onChange={onPriceRangeChange} disableSwap />
		</div>

		<div className='filter-sort'>
			<Typography>Sort By {sort.sort}</Typography>
			<br />
			<div className="filter-sort-control" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
					<Select
						value={sort.sort}
						onChange={onSortKeyChange}
						sx={{width:'40%'}}
					>
						<MenuItem value={'price'}>Price</MenuItem>
						<MenuItem value={'rating'}>Rating</MenuItem>
					</Select>
				<IconButton onClick={onSortDirectionChange}> {sort.order == 'asc' ? <ArrowUpward /> : <ArrowDownward/>}  </IconButton>
			</div>
		</div>
    </div>
  )
}

export default FilterBar