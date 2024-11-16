import { createStore } from 'zustand';


export interface BotStore {
    bot: {};
    setBot: (bot: {}) => void
}

export function craeteBotStore(){
    return createStore<BotStore>((set) => ({
        
            bot: {},
            setBot: (bot) => {
                set({bot})
            }
        
    }))
}