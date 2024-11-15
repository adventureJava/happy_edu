import { useContext, useEffect, useRef, useState } from 'react';
import { NoticeSearchStyled } from './styled';
import { Button } from '../../../common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { NoticeContext } from '../../../../api/provider/NoticeProvider';
import { title } from 'process';

export const NoticeSearch = () => {
    // const title= useRef<HTMLInputElement>();
    // const [startDate,setStartDate] = useState<string>();
    // const [endDate,setEndDate] = useState<string>();

    const navigate = useNavigate();
    const location = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [searchValue, setSearchValue] = useState<{title:string; startDate:string; endDate:string}>({
        title:'', 
        startDate: '', 
        endDate:''
    });

    const {setSearchKeyWord}= useContext(NoticeContext);
    
    useEffect(() => {
        location.search && navigate(location.pathname, {replace: true});
    }, [navigate]);

    // const handlerSearch = () => {
    //     const query:string[] = [];

    //     !title.current.value || query.push(`searchTitle=${title.current.value}`);
    //     !startDate || query.push(`searchStDate=${startDate}`);
    //     !endDate || query.push(`searchEdDate=${endDate}`);

    //     const queryString = query.length > 0 ? `?${query.join('&')}`:'';
    //     navigate(`/react/board/notice.do${queryString}`);
    // };

    const handlerSearch = () => {
        setSearchKeyWord(searchValue);
    }

    const handlerModal = () => {
        setModal(!modal)
    }

    return (
        <NoticeSearchStyled>
            <div className="input-box">
                <input onChange={(e) => setSearchValue({...searchValue,title:e.target.value})}></input>
                <input type="date" onChange={(e) => setSearchValue({...searchValue,startDate:e.target.value})}></input>
                <input type="date" onChange={(e) => setSearchValue({...searchValue,endDate:e.target.value})}></input>
                <Button onClick={handlerSearch}>검색</Button>
                <Button onClick={handlerModal}>등록</Button> 
            </div>
        </NoticeSearchStyled>
    );
};
