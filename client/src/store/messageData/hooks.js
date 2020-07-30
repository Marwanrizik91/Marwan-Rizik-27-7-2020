import { useRecoilState } from "recoil";
import { messageState } from './atoms';

export const useSetMessageData = () => {
    const [, setMessageData] = useRecoilState(messageState)
    return (data) => {
        setMessageData(data)
    }
}