import { createStore } from "zustand";

//#region ../node_modules/.pnpm/zustand@5.0.5_@types+react@19.1.6_react@19.1.0/node_modules/zustand/esm/middleware.mjs
const subscribeWithSelectorImpl = (fn) => (set, get, api) => {
	const origSubscribe = api.subscribe;
	api.subscribe = (selector, optListener, options) => {
		let listener = selector;
		if (optListener) {
			const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
			let currentSlice = selector(api.getState());
			listener = (state) => {
				const nextSlice = selector(state);
				if (!equalityFn(currentSlice, nextSlice)) {
					const previousSlice = currentSlice;
					optListener(currentSlice = nextSlice, previousSlice);
				}
			};
			if (options == null ? void 0 : options.fireImmediately) optListener(currentSlice, currentSlice);
		}
		return origSubscribe(listener);
	};
	const initialState = fn(set, get, api);
	return initialState;
};
const subscribeWithSelector = subscribeWithSelectorImpl;

//#endregion
//#region src/globalStore.ts
/** 创建 zustand store */
const store = createStore()(subscribeWithSelector((set) => ({
	initialState: {},
	setInitialState: (newInitialState, replace = false) => set((state) => ({ initialState: {
		...!replace ? state.initialState : {},
		...newInitialState
	} }))
})));
if (!window.__ZUSTAND_STORE__)
 /** 定义 window 变量 */
Object.defineProperty(window, "__ZUSTAND_STORE__", {
	value: store,
	writable: false,
	configurable: false
});
/** 导出全局状态 */
const globalStore = window.__ZUSTAND_STORE__;

//#endregion
export { globalStore };
//# sourceMappingURL=index.mjs.map