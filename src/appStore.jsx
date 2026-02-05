import {create} from 'zustand';
import {persist}  from 'zustand/middleware';


let appStore = (set) => ({
    dopen: true,
    rows:[],
    setRows: (rows) => set((state)=> ({rows: rows})),
    updateOpen: (dopen) => set((state) => ({ dopen })),
});

appStore = persist(appStore, {name: 'my_app_storage'});
export const useAppStore = create(appStore);