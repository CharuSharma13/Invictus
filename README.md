# INVICTUS

 Display records on react js front-end.

[![CircleCI](https://circleci.com/gh/cezerin/cezerin/tree/master.svg?style=svg)](https://circleci.com/gh/cezerin/cezerin/tree/master)

Built with:
* React.js


## FrontEnd



On entering the value and pressing submit
```js
 <form className="search-form" onSubmit={(e) => submit(e)}>
            {
              alert!=="" &&<Alerts alert={alert}/>

            }
                <input id="name" type="text" placeholder="Enter Number" onChange={(e) => handle(e)}/>
                <button type="submit">Submit</button>
            </form>
 ```


React Snippets

```js
const freqMap = {};
    const [n, setN] = useState(0);
    const [topWords, setTopWords] = useState([]);
    const[alert,setAlert]=useState("");
    function handle(e) {
        setN(e.target.value);
    }
    useEffect(()=>{
    },[n]);
 ```


After pressing on submit,  a request should be sent to the backend and fetch the data 

```js

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


```

After fetching the data and it maps the frequency of each word
```js


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
        setAlert("")
      }
      else{
        setAlert("Number exceded");
      }
    }


```

display the record in the form of table.
```js
 
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
                                    <td>{topWord.word}</td>
                                    <td>{topWord.freq}</td>
                                </tr>
                            );
                        })
                    }
                </table>

            }

```

