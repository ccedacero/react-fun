import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(({ onAddIngredient }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const submitHandler = event => {
    event.preventDefault();
    onAddIngredient({ title: title, amount: amount })
  };
  const handleChange = ((e) => {
    const { value, id } = e.target;
    id === 'title' ? setTitle(value) : setAmount(value)
  })
  console.log(title, amount);
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={handleChange} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
