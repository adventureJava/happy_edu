import { useEffect, useRef, useState } from 'react';
import { NoticeSearchStyled } from './styled';
import { Button } from '../../../common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export const NoticeSearch = () => {
    const title= useRef<HTMLInputElement>();
    const [startDate,setStartDate] = useState<string>();
    const [endDate,setEndDate] = useState<string>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        location.search && navigate(location.pathname, {replace: true});
    }, [navigate]);

    const handlerSearch = () => {
        const query:string[] = [];

        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join('&')}`:'';
        navigate(`/react/board/notice.do${queryString}`);
    };

    return (
        <NoticeSearchStyled>
            <div className="input-box">
                <input ref={title}></input>
                <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
                <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
                <Button onClick={handlerSearch}>검색</Button>
                {/* <Button onClick={handlerModal}>등록</Button> */}
            </div>
        </NoticeSearchStyled>
    );
};
