export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_NAVBAR = 'OPEN_NAVBAR';
export const CLOSE_NAVBAR = 'CLOSE_NAVBAR';

export const openModal = (modal, props=null) => {
    return {
        type: OPEN_MODAL,
        modal,
        props
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    };
};

export const openNavbar = () => ({
    type: OPEN_NAVBAR
});

export const closeNavbar = () => ({
    type: CLOSE_NAVBAR
});