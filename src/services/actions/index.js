import { nanoid } from 'nanoid';

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
export const GET_TOTAL = 'GET_TOTAL';
export const ADD_DRAGGED_INGREDIENT = 'ADD_DRAGGED_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_SELECTED_INGREDIENTS = 'UPDATE_SELECTED_INGREDIENTS';



const baseUrl = "https://norma.nomoreparties.space/api/";

// проверяем ответ сервера
const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

const getIngredientsRequest = () => {
    return (fetch(`${baseUrl}ingredients/`)
        .then(checkResponse))
}

// получаем все ингредиенты
export function getIngredients() {
    return function (dispatch) {
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
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch(err => console.log(err));
    }
}


// отправляем заказ на сервер
const sendOrderRequest = (data) => {
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

export function sendOrder(data) {
    return function (dispatch) {
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
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED
                    })
                }
            })
            .catch(err => console.log(err));
    }
}


// экшн добавления ингредиента
export function addSelectedIngredient(e) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            selectedIngredientId: e.currentTarget.id,
            nanoid: nanoid()

        })
    }
}

// экшн добавления перетаскиванием
export function addDraggedIngredient(ingredient) {
    return function (dispatch) {
        dispatch({
            type: ADD_DRAGGED_INGREDIENT,
            selectedIngredientId: ingredient._id,
            nanoid: nanoid()

        })
    }
}

// открываем выбранный ингредиент
export function openSelectedIngredient(e) {
    return function (dispatch) {
        dispatch({
            type: OPEN_SELECTED_INGREDIENT,
            currentIngredientId: e.currentTarget.id
        })
    }
}

// закрываем модалку
export function closeModal() {
    return function (dispatch) {
        dispatch({
            type: CLOSE_MODAL
        })
    }
}

// отправляем заказ
export function closeOrder() {
    return function (dispatch) {
        dispatch({
            type: CLOSE_ORDER
        })
    }
}

// отправляем заказ
export function getTotal(sum) {
    return function (dispatch) {
        dispatch({
            type: GET_TOTAL,
            total: sum
        })
    }
}

// удаляем ингредиент из кон    структора
export function deleteIngredient(e) {
    return function (dispatch) {
        dispatch({
            type: DELETE_INGREDIENT,
            ingredientToDelNanoId: e.currentTarget.id
        })
    }
}

// обновляем список
export function updateSelectedIngredients(dragIndex, hoverIndex) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_SELECTED_INGREDIENTS,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }
}

