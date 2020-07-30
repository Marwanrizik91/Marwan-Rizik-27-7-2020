import { useRecoilState } from "recoil";
import { messageData } from './atoms';

export const useSetMessageData = () => {
    const [, setMessageData] = useRecoilState(messageData)
    return (data) => {
        setMessageData(data)
    }
}