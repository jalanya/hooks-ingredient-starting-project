import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should no get there!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest } = useHttp();
  const filteredIngredientHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  },[]);

  const addIngredientHandler = useCallback(ingredient => {
    // dispatchHttp({ type: 'SEND' });
    // fetch('https://react-hooks-update-2aade.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => {
    //   dispatchHttp({ type: 'RESPONSE' });
    //   return response.json();
    // }).then(responseData => {
    //   dispatch({ type: 'ADD', ingredient: {
    //     id: responseData.name,
    //     ...ingredient
    //   }});
    // });
  }, []);
  
  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://react-hooks-update-2aade.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE', )
    // dispatchHttp({ type: 'SEND' });
  }, [sendRequest]);
  
  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        { ingredientList }
      </section>
    </div>
  );
}

export default Ingredients;
