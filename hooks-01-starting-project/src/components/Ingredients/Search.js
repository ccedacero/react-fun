import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients } = props;
  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://phrasal-method-255400-default-rtdb.firebaseio.com/ingredients.json' + query)
      .then(r => r.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (let ingredient in responseData) {
          loadedIngredients.push({
            id: ingredient,
            title: responseData[ingredient].title,
            amount: responseData[ingredient].amount
          })
        }
        props.onLoadIngredients(loadedIngredients);
      })
  }, [enteredFilter,onLoadIngredients])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
