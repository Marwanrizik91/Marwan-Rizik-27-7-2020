import { useRecoilState } from "recoil";
import { userData } from './atoms';

export const useSetUserData = () => {
    const [, setUserData] = useRecoilState(userData)
    return (data) => {
        setUserData(data)
    }
}