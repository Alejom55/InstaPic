import { signalStore, withState } from "@ngrx/signals";

export interface WordState {
    word: string;
}

const initialState: WordState = {
    word: ''
}

export const WordStore = signalStore(
    withState(initialState)
    
)
