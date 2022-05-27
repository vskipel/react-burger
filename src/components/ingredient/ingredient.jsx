import React, {useCallback} from 'react';
import IngredientsStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';



function Ingredient({ ingredient, handleOpenIngredient }) {
  const match = useRouteMatch();
  const {
    selectedBun,
    selectedIngredients
  } = useSelector(store => store.ingredientsStore)

  const handleIngredientCount = (ingr) => {
    const countOne = 1;
    if (ingr.type === 'bun' && ingr.name === selectedBun.name) {
      return countOne;
    } else {
      return selectedIngredients.filter((i) => i.name === ingr.name).length;
    }
  }

  const history = useHistory();

  const openIngredient = useCallback(
      () => {
          history.replace(`${match.url}ingredients/${ingredient._id}`)
      },
      [history, ingredient._id, match.url]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  });

  return (

    <li ref={dragRef} className={IngredientsStyles.ingredient} style={{ opacity }} key={ingredient._id} onClick={handleOpenIngredient} id={ingredient._id}>
     <img onClick={openIngredient} className={IngredientsStyles.image} src={ingredient.image} alt={ingredient.name} />
      {handleIngredientCount(ingredient) > 0 && <Counter count={handleIngredientCount(ingredient)} size="default" />}
      <p className={`${IngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className={`${IngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
    </li >

  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  handleOpenIngredient: PropTypes.func.isRequired
};

export default Ingredient; 