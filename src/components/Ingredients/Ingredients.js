import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const filteredIngredientHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  },[]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-2aade.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {
          id: responseData.name,
          ...ingredient
        }
      ])
    });
  }
  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-update-2aade.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    })
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
