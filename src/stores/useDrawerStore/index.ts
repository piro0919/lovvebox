import { create } from "zustand";

type DrawerStore = {
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
  toggled: boolean;
};

const useDrawerStore = create<DrawerStore>()((set) => ({
  setIsOpen: (isOpen: boolean): void => set(() => ({ toggled: isOpen })),
  toggle: (): void => set((state) => ({ toggled: !state.toggled })),
  toggled: false,
}));

export default useDrawerStore;
