import { ReactNode } from "react";

export interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode
}
