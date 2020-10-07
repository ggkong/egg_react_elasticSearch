import 'antd/dist/antd.css'
import { Input,List } from 'antd'
import React, { useState,useRef } from 'react';
import axios from 'axios';
const { Search } = Input;

const TodoList = () => {
    const searchValue = useRef("")
    const [resultList, setResultList] = useState([]);
    const search = (e) => {
        console.log("将要搜索的值 是什么:"+e);
        searchValue.current = e;
        es_search();   // 调用请求后台的方法
    }
    const es_search = () => {
        // 向后台发送请求 将搜索结果展示出来
        // 将要发送了
        console.log("将要发送了")
        console.log(`发送的 data 是什么${searchValue.current}`)
        axios({
            method:'post',
            url: 'http://localhost:7001/search',
            data: { searchValue: searchValue.current },
            // withCredentials:true
        }).then((res) => {
            console.log("success")
            console.log(res.data.data)
            
            setResultList(res.data.data)
        })
    }
    return (
        <div>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch= {search}
            />
            <p>搜索的关键词是<span style = {{color:"red"}}>{ searchValue.current } </span></p>
            <List
                header = {<p>搜索结果</p>}
                itemLayout='vertical'
                dataSource = {resultList}
                renderItem = {(item) => (
                    <List.Item>
                        <p dangerouslySetInnerHTML={{ __html: item.highlight.desc }}></p>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default TodoList;
