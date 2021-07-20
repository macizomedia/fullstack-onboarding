import { proxy, subscribe as valtioSubscribe, snapshot } from 'valtio'

export interface Store {
    screen: string
    hero: string
    span: string
    message: string
    text: string
    foot: string
}

const store = proxy<Store>({
    screen: '',
    hero: '',
    span: '',
    message: '',
    text: '',
    foot: '',
})

export const load = (): void => {
    fetch('./content.json', {
        method: 'GET', 
        mode: 'no-cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    }).then((response) => {
         response.json()
    }).then((data) => console.log(data))
}

export const subscribe = (callback: (state: Store) => void): (() => void) => {
    callback(snapshot(store))
    return valtioSubscribe(store, () => callback(snapshot(store)))
}

export default store
