import { nanoid } from 'nanoid';
import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const OPEN_SELECTED_INGREDIENT = 'OPEN_SELECTED_INGREDIENT';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';
export const ADD_DRAGGED_INGREDIENT = 'ADD_DRAGGED_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_SELECTED_INGREDIENTS = 'UPDATE_SELECTED_INGREDIENTS';



const getIngredientsRequest = () => {
    return (fetch(`${baseUrl}ingredients/`)
        .then(checkResponse))
}

// получаем все ингредиенты
export const getIngredients = (): any => {
    return function (dispatch: any) {
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
const sendOrderRequest = (data: any) => {
    return (fetch(`${baseUrl}orders/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            ingredients: data
        })
    })
        .then(checkResponse))
}

export function sendOrder(data: any): any {
    return function (dispatch: any) {
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
                type: GET_INGREDIENTS_FAILED,
                err: err
            }));
    }
}


// экшн добавления ингредиента
export function addSelectedIngredient(e: any) {
    return {
        type: ADD_INGREDIENT,
        selectedIngredientId: e.currentTarget.id,
        nanoid: nanoid()
    }
}

// экшн добавления перетаскиванием
export function addDraggedIngredient(ingredient: any) {
    return {
        type: ADD_DRAGGED_INGREDIENT,
        selectedIngredientId: ingredient._id,
        nanoid: nanoid()
    }
}

// открываем выбранный ингредиент
export function openSelectedIngredient(id: string) {
    return {
        type: OPEN_SELECTED_INGREDIENT,
        currentIngredientId: id
    }
}

// закрываем модалку
export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

// отправляем заказ
export function closeOrder() {
    return {
        type: CLOSE_ORDER
    }
}


// удаляем ингредиент из кон    структора
export function deleteIngredient(e: any) {
    return {
        type: DELETE_INGREDIENT,
        ingredientToDelNanoId: e.currentTarget.id
    }
}

// обновляем список
export function updateSelectedIngredients(dragIndex: number, hoverIndex: number) {
    return {
        type: UPDATE_SELECTED_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    }
}
