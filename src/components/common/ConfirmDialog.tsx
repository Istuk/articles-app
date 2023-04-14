import { ReactNode, useCallback, useRef, useState } from "react";
import styled from "styled-components";

export interface Props {
    open: boolean;
    message: string;
    onOk: () => void;
    onCancel: () => void;
}

const Overlay = styled.div`
    position: fixed;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: #00000077;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Dialog = styled.div`
    width: 100%;
    max-width: 450px;
    margin: 16px;
    padding: 32px;

    background-color: white;

    display: flex;

    flex-direction: column;
    gap: 32px;
`
const Message = styled.p`
    font-weight: bold;
    font-size: 16px;
`

const Actions = styled.div`
    display: flex;
    gap: 16px;

    & button {
        flex-grow: 1;

        padding: 8px;
        border: none;
        border-radius: 8px;

        background-color: silver;

        &.danger {
            background-color: red;
            color: white;
        }
    }
`

export const ConfirmDialog: React.FC<Props> = (props) => {
    const {
        open,
        message,
        onOk,
        onCancel
    } = props;

    if (!open) {
        return null;
    }

    return (
        <Overlay>
            <Dialog>
                <Message>{message}</Message>
                <Actions>
                    <button onClick={onCancel}>No</button>
                    <button onClick={onOk} className="danger">Yes</button>
                </Actions>
            </Dialog>
        </Overlay>
    )
}

export interface ConfirmValues {
    message: string;
    onOk: Function;
}

export function useConfirm(): [ReactNode, (options: ConfirmValues) => void] {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const callback = useRef<Function>();

    const factory = useCallback((options: ConfirmValues) => {
        setOpen(true);
        setMessage(options.message);

        callback.current = options.onOk;
    }, []);

    const handleOk = () => {
        setOpen(false);
        setMessage('');

        callback.current?.()

        callback.current = undefined;
    }

    const handleCancel = () => {
        setOpen(false);
        setMessage('');

        callback.current = undefined;
    }

    return [
        <ConfirmDialog
            open={open}
            message={message}
            onOk={handleOk}
            onCancel={handleCancel}
        />,
        factory
    ]
}
