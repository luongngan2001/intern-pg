import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { useEffect } from "react";
import { useState } from "react";
import { setListAction } from "../redux/listReducer";
import { IListParams } from "../../../models/auth";
import EditText from "../components/EditText";

const ListPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const list = useSelector((state: AppState) => state.listitem.list);
    const [newList, setNewList] = useState<IListParams[]>([]);
    const [disable, setDisable] = useState(true);

    const getList = React.useCallback(
        async () => {
            const json = await dispatch(fetchThunk('https://jsonplaceholder.typicode.com/photos?_limit=20', 'get'));
            dispatch(setListAction([...json]));
            setNewList([...json]);
        }, []
    );

    useEffect(() => {
        getList();
    }, [])

    const reset = () => {
        setNewList([...list])
    }
    const confirm = () => { dispatch(setListAction([...newList])) }


    const handleChange = (index: number) => (e: any) => {
        setDisable(false);
        const value = e.target.value;
        const temp = [...newList];
        const el = { ...temp[index], title: value };
        temp[index] = el;
        setNewList(temp);
    }
    return (
        <div className='container'>
            <div id='header'>
                <div>
                    <a href='/home'><i className="fa fa-arrow-circle-left"></i></a>
                </div>
                <div id='btn-for-list'>
                    <button
                        className='btn'
                        id='confirm'
                        onClick={confirm}
                        disabled={disable}
                    >
                        Confirm
                    </button>
                    <button
                        className='btn'
                        id='reset'
                        onClick={reset}
                        disabled={disable}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {newList.map((li, index) => 
                <div key={li.id} className='item' style={Number(li.id) % 2 == 0 ? { backgroundColor: '#dddddd' } : { backgroundColor: 'white' }}>
                    <img
                        src={li.thumbnailUrl}
                        alt=''
                    />
                    <div id='content'>
                        <EditText
                            key={li.id}
                            value={li.title}
                            onChange={handleChange(index)}
                        />
                        <div>{new Date(Date.now()).toString()}</div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default ListPage;