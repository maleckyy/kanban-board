import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode,
} from 'react';
import { X } from "@untitledui/icons";

import {
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    Dialog as AriaDialog,
} from 'react-aria-components';
import { cx } from '@/utils/cx';

export type ModalData = {
    title?: string;
    description?: string;
    content?: ReactNode;
    dataTestId?: string;
    hideTitle?: boolean;
    modalWidth?: number;
    hideCloseButton?: boolean
};

type ModalContextType = {
    openModal: (data: ModalData) => void;
    closeModal: () => void;
    registerStatusCallback: (fn?: () => void) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useGlobalModal = (onStatusChange?: () => void) => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useGlobalModal must be used inside GlobalModalProvider');

    useEffect(() => {
        ctx.registerStatusCallback?.(onStatusChange);
    }, [ctx, onStatusChange]);

    return ctx;
};

export const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<ModalData>({});
    const callbackRef = useRef<(() => void) | undefined>(undefined);

    const registerStatusCallback = (fn?: () => void) => {
        callbackRef.current = fn;
    };

    const openModal = (data: ModalData) => {
        setModalData(data);
        setOpen(true);
    };

    const closeModal = () => {
        onModalStatusChange(false);
        setTimeout(() => setModalData({}), 300);
    };

    const onModalStatusChange = (status: boolean) => {
        callbackRef.current?.();
        setOpen(status);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, registerStatusCallback }}>
            {children}
            <AriaModalOverlay
                isOpen={open}
                onOpenChange={onModalStatusChange}
                data-testid={modalData.dataTestId}
                isDismissable
                className={(state) =>
                    cx(
                        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity',
                        state.isEntering && 'animate-in fade-in',
                        state.isExiting && 'animate-out fade-out'
                    )
                }
            >
                <AriaModal
                    style={modalData.modalWidth ? { width: `${modalData.modalWidth}px`, maxWidth: `100vw` } : {}}
                    className={(state) =>
                        cx(
                            ' bg-primary rounded-2xl shadow-xl transition-transform p-6 md:min-w-[400px] max-w-[90vw] mx-4',
                            state.isEntering && 'animate-in zoom-in-95',
                            state.isExiting && 'animate-out zoom-out-95'
                        )
                    }>
                    <AriaDialog className="outline-hidden relative text-primary" aria-label={modalData.title || "Dialog window"}>
                        {!modalData.hideCloseButton && <button className='absolute -top-3 -right-3 cursor-pointer' onClick={closeModal}><X size={18}></X></button>}
                        {modalData.title && !modalData.hideTitle && (
                            <h2 className="text-lg font-semibold mb-2">{modalData.title}</h2>
                        )}
                        {modalData.description && (
                            <p className="text-sm text-gray-400 mb-4">{modalData.description}</p>
                        )}
                        {modalData.content}
                    </AriaDialog>
                </AriaModal>
            </AriaModalOverlay>
        </ModalContext.Provider >
    );
};
