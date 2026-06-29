import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Grado = '7mo' | '8vo' | '9no';

type ProgresoEjercicios = Record<string, boolean>;

type UsoAppAlmacenState = {
  gradoActual: Grado;
  vistaDocente: boolean;
  progresoEjercicios: ProgresoEjercicios;
  setGrado: (grado: Grado) => void;
  setVistaDocente: (valor: boolean) => void;
  reiniciarProgreso: () => void;
  reiniciarEjercicios: (ids: string[]) => void;
  registrarProgreso: (id: string | number, exito: boolean) => void;
};

export const useAppAlmacen = create<UsoAppAlmacenState>()(persist((set) => ({
  gradoActual: '7mo',
  vistaDocente: false,
  progresoEjercicios: {},
  setGrado: (grado) => set({ gradoActual: grado }),
  setVistaDocente: (valor) => set({ vistaDocente: valor }),
  reiniciarProgreso: () => set({ progresoEjercicios: {} }),
  reiniciarEjercicios: (ids) => set((state) => {
    const siguiente = { ...state.progresoEjercicios };
    ids.forEach((id) => delete siguiente[id]);
    return { progresoEjercicios: siguiente };
  }),
  registrarProgreso: (id, exito) =>
    set((state) => ({
      progresoEjercicios: {
        ...state.progresoEjercicios,
        [String(id)]: exito,
      },
    })),
}), {
  name: 'rea-programacion-progreso',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ gradoActual: state.gradoActual, vistaDocente: state.vistaDocente, progresoEjercicios: state.progresoEjercicios }),
}));
