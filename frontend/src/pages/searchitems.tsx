import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Checkbox, FormControlLabel, Button, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



interface Item {
  id: string;
  name: string;
  price: number;
  sellerid: { First_Name: string; Last_Name: string; };
  category: string;
  image: string;
}

// Others is a specific category. All items view-> Dont select anything

const categories = ['Food', 'Snacks', 'Electronics', 'Accessories', 'Magic_Portions'];

const SearchItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        console.log('fetchItems response:', response.data);
        if(response.data.success) {
          console.log('response.data: ', response.data);
          const fetcheditems=response.data.items.map((item: any) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            sellerid: item.sellerid,
            category: item.category,
            image: item.image,
          }));
          console.log('fetcheditems: ', fetcheditems);
          setItems(fetcheditems);
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    console.log('state of items after setItems:', items);
  }, [items]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearchTerm && matchesCategory;
  });

  const handleItemClick = (id: string) => {
    console.log('Item clicked:', id);
    navigate(`/dash/items/${id}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <TextField
        fullWidth
        label="Search Items"
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: 2 }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card onClick={() => handleItemClick(item.id)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />

              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Item ID: {item.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Seller: {item.sellerid.First_Name} {item.sellerid.Last_Name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ₹{item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {item.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchItems;

//got it succesfully in searchitems but on clicking the item, the id goes to undefined.
