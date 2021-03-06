import { nanoid } from 'nanoid';
import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';
import { IGetIngredientsResp, TIngredient } from '../../utils/types';
import { AppDispatch } from '../store-types';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    OPEN_SELECTED_INGREDIENT,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLOSE_ORDER,
    DELETE_INGREDIENT,
    UPDATE_SELECTED_INGREDIENTS,
} from './ingredients-constants'
import { IAddIngredient, ICloseOrder, IDeleteIngredient, IOpenSelectedIngredient, IUpdateSelectedIngredients } from './ingredients-types';

const getIngredientsRequest = (): Promise<IGetIngredientsResp> => {
    return (fetch(`${baseUrl}ingredients/`)
        .then(checkResponse))
}

// получаем все ингредиенты
export const getIngredients = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsRequest()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    })
                }
            })
            .catch(err => dispatch({
                type: GET_INGREDIENTS_FAILED,
                err: err
            }));
    }
}


// отправляем заказ на сервер
const sendOrderRequest = (data: string[]) => {
    return (fetch(`${baseUrl}orders/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: "POST",
        body: JSON.stringify({
            ingredients: data
        })
    })
        .then(checkResponse))
}

export const sendOrder = (data: string[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })
        sendOrderRequest(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        order: res
                    })
                    dispatch({
                        type: CLOSE_ORDER,
                    })
                }
            })
            .catch(err => dispatch({
                type: SEND_ORDER_FAILED,
                err: err
            }));
    }
}

// экшн добавления ингредиента
export const addIngredient = (ingredient: TIngredient):IAddIngredient => {
    return {
        type: ADD_INGREDIENT,
        selectedIngredientId: ingredient._id,
        ingredient: ingredient,
        nanoid: nanoid()
    }
}

// открываем выбранный ингредиент
export const openSelectedIngredient = (id: string):IOpenSelectedIngredient => {
    return  {
        type: OPEN_SELECTED_INGREDIENT,
        currentIngredientId: id, 
    } 
}

// отправляем заказ
export const closeOrder = ():ICloseOrder => {
    return {
        type: CLOSE_ORDER
    }
}


// удаляем ингредиент из кон    структора
export const deleteIngredient = (id: string):IDeleteIngredient => {
    return {
        type: DELETE_INGREDIENT,
        ingredientToDelNanoId: id
    }
}

// обновляем список
export const updateSelectedIngredients = (dragIndex: number, hoverIndex: number):IUpdateSelectedIngredients => {
    return {
        type: UPDATE_SELECTED_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    }
}

