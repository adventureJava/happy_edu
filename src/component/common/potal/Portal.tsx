import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: ReactNode;
}

export const Portal: FC<PortalProps> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};
