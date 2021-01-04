import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    try {
      fetch('https://phrasal-method-255400-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(responseData => {
          setIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient }]);
        })
    } catch (error) {
      console.error(error.message);
    }
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);
  const removeIgredientHandler = ingredientid => {
    setIngredients(prevIngredients => prevIngredients.filter(ingr => ingr.id !== ingredientid));
  }
  console.log(ingredients);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIgredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
