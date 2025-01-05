import React, { useState } from 'react';

const FoodieSignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    favoriteCuisine: '',
    dietaryRestrictions: [],
    spiceTolerance: '',
    preferredDiningStyle: '',
    favoriteIngredients: '',
    allergies: '',
    priceRange: '',
    frequencyOfDiningOut: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const updatedRestrictions = [...formData.dietaryRestrictions];
      if (e.target.checked) {
        updatedRestrictions.push(value);
      } else {
        const index = updatedRestrictions.indexOf(value);
        if (index > -1) {
          updatedRestrictions.splice(index, 1);
        }
      }
      setFormData(prevState => ({
        ...prevState,
        dietaryRestrictions: updatedRestrictions
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // and generate food and restaurant recommendations based on the preferences
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ddd'
    },
    select: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ddd'
    },
    checkboxGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      margin: '10px 0'
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      margin: '20px 0',
      padding: '10px',
      fontSize: '18px',
      color: 'white',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    label: {
      fontWeight: 'bold',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Foodie Sign Up</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <label style={styles.label}>Favorite Cuisine</label>
        <select
          name="favoriteCuisine"
          value={formData.favoriteCuisine}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Favorite Cuisine</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
          <option value="japanese">Japanese</option>
          <option value="indian">Indian</option>
          <option value="french">French</option>
          <option value="thai">Thai</option>
          <option value="american">American</option>
        </select>
        
        <label style={styles.label}>Dietary Restrictions</label>
        <div style={styles.checkboxGroup}>
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Lactose-Free', 'Kosher', 'Halal'].map((restriction) => (
            <label key={restriction} style={styles.checkbox}>
              <input
                type="checkbox"
                name="dietaryRestrictions"
                value={restriction.toLowerCase()}
                checked={formData.dietaryRestrictions.includes(restriction.toLowerCase())}
                onChange={handleChange}
              />
              {restriction}
            </label>
          ))}
        </div>

        <label style={styles.label}>Spice Tolerance</label>
        <select
          name="spiceTolerance"
          value={formData.spiceTolerance}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Spice Tolerance</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
          <option value="extraHot">Extra Hot</option>
        </select>

        <label style={styles.label}>Preferred Dining Style</label>
        <select
          name="preferredDiningStyle"
          value={formData.preferredDiningStyle}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Preferred Dining Style</option>
          <option value="casual">Casual</option>
          <option value="fineDining">Fine Dining</option>
          <option value="fastFood">Fast Food</option>
          <option value="buffet">Buffet</option>
          <option value="streetFood">Street Food</option>
        </select>

        <label style={styles.label}>Favorite Ingredients (comma-separated)</label>
        <input
          type="text"
          name="favoriteIngredients"
          placeholder="e.g., garlic, tomatoes, basil"
          value={formData.favoriteIngredients}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Allergies (comma-separated)</label>
        <input
          type="text"
          name="allergies"
          placeholder="e.g., peanuts, shellfish, dairy"
          value={formData.allergies}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Price Range</label>
        <select
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Price Range</option>
          <option value="budget">Budget</option>
          <option value="moderate">Moderate</option>
          <option value="expensive">Expensive</option>
          <option value="luxury">Luxury</option>
        </select>

        <label style={styles.label}>Frequency of Dining Out</label>
        <select
          name="frequencyOfDiningOut"
          value={formData.frequencyOfDiningOut}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Frequency</option>
          <option value="rarely">Rarely (less than once a month)</option>
          <option value="occasionally">Occasionally (1-2 times a month)</option>
          <option value="regularly">Regularly (1-2 times a week)</option>
          <option value="frequently">Frequently (3+ times a week)</option>
        </select>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default FoodieSignUpPage;

