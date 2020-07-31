import { useRecoilState } from "recoil";
import { loggedInState } from './atoms';

export const useSetLoggedInState = () => {
    const [, setLoggedInState] = useRecoilState(loggedInState)
    return (data) => {
        setLoggedInState(data)
    }
}