import React from "react";
import axios from 'axios';
import {useState,useEffect} from "react";
import './App.css';
import Alerts from "./Alerts";
function App() {
    const freqMap = {};
    const [n, setN] = useState(0);
    const [topWords, setTopWords] = useState([]);
    const [top, setTop] = useState([]);
    const[alert,setAlert]=useState("");
    function handle(e) {
        setN(e.target.value);
    }
    useEffect(()=>{
        setTop(prev=>[...prev,topWords])
    },[topWords]);

    function detail(res) {
        const string = res.data;
        const words = string.toLowerCase().replace(/[.]|[,]|[-]|20|1|500/gi, "").split(/\s/);

        words.forEach(function (w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });

        let sortable = Object.fromEntries(
            Object.entries(freqMap).sort(([, a], [, b]) => b - a)
        );
        delete sortable[""];
        let len=Object.keys(sortable).length;
        
        if(len>=n){
        for (let i = 0; i < n; i++) {
            const word = {
                word: Object.keys(sortable)[i],
                freq: sortable[Object.keys(sortable)[i]]
            };
            setTopWords(prevState => [...prevState, word]);
        }
        
        console.log(top);
        setAlert("")
      }
      else{
        setAlert("Number exceded");
      }
    }

    function submit(e) {
        e.preventDefault();
        setTopWords([]);
        const OPTIONS = {
            url: "https://raw.githubusercontent.com/invictustech/test/main/README.md",
            method: "GET",
            headers: {
                "content-type": "json",
            },
        };
        axios(OPTIONS).then(res => detail(res)).catch(err => console.log(err));
    }


    return (
      
        <div className="centerDiv">
            <h1>Word Frequency</h1>
            <form className="search-form" onSubmit={(e) => submit(e)}>
            {
              alert!=="" &&<Alerts alert={alert}/>

            }
                <input id="name" type="text" placeholder="Enter Number" onChange={(e) => handle(e)}/>
                <button type="submit">Submit</button>
            </form>
            
            {
                topWords.length > 0
                &&
                <table id="details">
                    <tr>
                        <th>Word</th>
                        <th>Frequency</th>
                    </tr>
                    {
                        topWords.map((topWord, i) => {
                            return (
                                <tr key={i}>
                                    <td>{top.word}</td>
                                    <td>{top.freq}</td>
                                </tr>
                            );
                        })
                    }
                </table>

            }
            
        </div>
        
    );
}

export default App;