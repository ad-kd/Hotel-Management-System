import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationModal from '../components/NotificationModal';

const NotificationContext = createContext();

export const useNotify = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        onConfirm: null
    });

    const notify = useCallback(({ type = 'info', title, message, onConfirm }) => {
        setModalConfig({
            isOpen: true,
            type,
            title,
            message,
            onConfirm
        });
    }, []);

    const closeNotify = useCallback(() => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <NotificationModal 
                isOpen={modalConfig.isOpen}
                onClose={closeNotify}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
            />
        </NotificationContext.Provider>
    );
};
