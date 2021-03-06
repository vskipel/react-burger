import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { OrderDetails } from '../../components/order-details/order-details';
import { Modals } from '../../components/modals/modals'
import { Switch, Route, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import {
    openSelectedIngredient, sendOrder,
} from '../../services/actions/ingredients';
import { TIngredient } from '../../utils/types';
import { openModal } from '../../services/actions/modals';

export const HomePage = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const location: { state: { background: string }, pathname: string } = useLocation();
    const dispatch = useDispatch();

    const background = location.state && location.state.background;

    // получаем данные из стора
    const {
        ingredients,
        selectedIngredients,
        selectedBun,
        currentIngredient,
        order
    } = useSelector(store => store.ingredientsStore)

    const {
        user
    } = useSelector(store => store.auth)

    const findIdInUrl = history.location.pathname.slice(history.location.pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        if (ingredients.find((ingredient: TIngredient) => ingredient._id === findIdInUrl)) {

            dispatch(openSelectedIngredient(findIdInUrl));
            dispatch(openModal());
        }
    }, [ingredients, dispatch, findIdInUrl])
    
    // хэндлер открытия ингредиента
    const handleOpenIngredient = (e: { currentTarget: { id: string; }; }) => {
        dispatch(openSelectedIngredient(e.currentTarget.id));
        dispatch(openModal());
    }

    // хэндлер открытия тотала 
    const handleTotalClick = () => {
        if (!user) {
            history.push('/login')
        } else {
            const choosenBunIdArray: string[] = [];
            selectedBun && choosenBunIdArray.splice(0, 1, selectedBun._id);
            const choosenIngredientsIdsArray = selectedIngredients.map((i: TIngredient) => i._id);
            const ingredientsIdsArray = choosenBunIdArray.concat(choosenIngredientsIdsArray);
            dispatch(sendOrder(ingredientsIdsArray));
            dispatch(openModal());
        }
    }

    if (!background && location.pathname !== '/') {
        return (
            <Route
                path={`${match.path}ingredients/:id`}
                children={() => {
                    return (
                        <IngredientDetails
                        />
                    );
                }}
            />
        )
    }

    return (
        <>
            <h1 className={`text text_type_main-large ${styles.h1}`}>
                Соберите бургер
            </h1>

            <section className={styles.burgers}>
                <DndProvider backend={HTML5Backend}>
                    {!ingredients[0]
                        ?
                        <p className={`text text_type_main-default`}>Загрузка</p>
                        :
                        <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />
                    }
                    {
                        <BurgerConstructor handleTotalClick={handleTotalClick} />
                    }
                </DndProvider>
            </section>

            {currentIngredient
                && background
                &&
                <Switch>
                    <Modals >
                        <Route
                            path={`${match.path}ingredients/:id`}
                            children={() => {
                                return (
                                    <IngredientDetails
                                    />
                                );
                            }}
                        />
                    </Modals>
                </Switch>
            }

            {order
                &&
                <Modals>
                    <OrderDetails />
                </Modals>
            }

        </>
    )
}
