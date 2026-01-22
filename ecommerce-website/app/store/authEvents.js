let openLogin = null;

export const registerAuthDrawer = (fn) => {
	openLogin = fn;
};

export const triggerAuthDrawer = () => {
	openLogin?.();
};
